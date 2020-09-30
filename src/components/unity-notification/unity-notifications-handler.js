import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-notification'

/**
 * Component to control notifications 
 * @name UnityNotificationsHandler
 * @param {String} target, (required) a unique name for use with the addNotification function. No two unity-notifications-handler components should share this within one app. Name must be alphanumeric and can contain hyphens (but no other special character).
 * @param {String} position, (optional) position in the container; options are 'top-right', 'top-left', 'bottom-right', and 'bottom-left'. Defaults to 'top-right'.
 * @param {Object} icons, (optional) an object with entries for each type ('success', 'warning', 'error', 'help', 'tip') and the corresponding icons you want for each.
 * @param {Object} colors (optional) an object with entries for each type ('success', 'warning', 'error', 'help', 'tip') and the corresponding colors you want for each.
 * @param {Object} customTypes, (optional) an object with values being new types you want to add and entries
 * @param {Boolean} allowDuplicates, stipulate whether duplicate messages should be allowed
 * @param {Boolean} noAnimation, removes animation for the notifications
 * @param {Function} onClose, callback function to call when clicking the close button
 *
 * CSS vars:
 * --notification-height: height of the notification. Defaults to 60px.
 * --notification-width: width of the notification. Defaults to 450px.
 * --notification-flex: flex definition of the component. Default to none.
 *
 * @example
 *  // to import addNotification
 *  import { addNotification } from 'smartworks.unity.unity-core/unity-notifications-handler'
 *  // also available in export are closeNotification and clearNotifications
 * 
 *  // to add a notification
 *  addNotification({
 *    target: 'foo-notifications',
 *    notification: {
 *      text:  'Notification Main Text',
 *      subtext:  'Extra notification information',
 *      // EITHER
 *      type:  'help', // default types are 'success', 'warning', 'error', 'help', 'tip'; you can also add custom types (see below)
 *      // OR
 *      icon: 'unity:help',
 *      color: 'olive' // must be rgb[a], hsl[a], hex, color name, or a css variable
 *    }
 *  })
 * 
 *  // in render method
 *    <unity-notifications-handler
 *      target='foo-notifications'
 *      .onClose=${()=>console.log('closed')}
 *      .customTypes=${{
 *        'my-custom-type': {
 *          icon: 'unity:double_right_chevron',
 *          color: 'magenta'
 *        }
 *      }}
 *    >
 *      ${/* ...other content }
 *    </unity-notifications-handler>
*/

const defaultColors  = {
  error: css`var(--danger-color, var(--default-error-color))`,
  warning: css`var(--danger-lite-color, var(--default-danger-color))`,
  success: css`var(--success-color, var(--default-success-color))`,
  tip: css`var(--secondary-brand-color, var(--default-secondary-brand-color))`,
  help: css`var(--primary-brand-color, var(--default-primary-brand-color))`,
}

const testValidTarget = target => /^[A-z0-9\-]+$/.test(target)
const testValidColor = color => /^[A-z0-9\#\(\), \-\.]+$/.test(color)

class UnityNotificationsHandler extends LitElement {
  constructor() {
    super()
    this.position = ''
    this.target = ''
    this.icons = {}
    this.colors = {}
    this.customTypes = {}
    this.allowDuplicates = false
    this.noAnimation = false
    this.onClose = () => {}

    this._queuedNotifications = []
    this._showNotification = false
    this._notificationStyle = ''
    this._topBottomPosition = 'top'
    this._leftRightPosition = 'right'

    this._notificationTimeout = null

    this._handleAddNotification = this._handleAddNotification.bind(this)
    this._handleNextNotification = this._handleNextNotification.bind(this)
    this._handleCloseNotification = this._handleCloseNotification.bind(this)
  }
  
  static get properties() {
    return {
      // Props/Attributes
      position: { type: String},
      target: { type: String},
      icons: { type: Object },
      colors: { type: Object },
      customTypes: { type: Object },
      allowDuplicates: { type: Boolean },
      noAnimation: { type: Boolean },
      onClose: { type: Function },
      // Internals 
      _queuedNotifications: false,
      _showNotification: false,
      _notificationStyle: false,
      _topBottomPosition: false,
      _leftRightPosition: false,
    }
  }
  
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --notification-height: 60px;
          --notification-width: 450px;
          --notification-z-index: 10;
          --internal-notification-height: var(--notification-height);
          --internal-notification-width: var(--notification-width);
          --default-notification-flex: none;
          --internal-notification-z-index: var(--notification-z-index);

          flex: var(--notification-flex, var(--default-notification-flex));
        }

        #container {
          overflow-y: hidden;
          overflow-x: visible;
          position: relative;
          height: 100%;
          width: 100%;
        }

        unity-notification {
          display: flex;
          flex-direction: row;
          position: absolute;
          margin: 12px;
          transition: top 500ms, bottom 500ms, opacity 500ms;
          transition-timing-function: ease-out ease-out ease-out;
          z-index: 10;
          --notification-height: var(--internal-notification-height, 60px);
          --notification-width: var(--internal-notification-width, 450px);
          --notification-z-index: var(--internal-notification-z-index, 10);
        }

        .top {
          top: 0;
        }

        .bottom {
          bottom: 0;
        }

        .left {
          left: 0;
        }

        .right {
          right: 0;
        }
      `
    ]
  }
    
  firstUpdated() {
    const { target }  = this
    if (!target) throw `Target not provided for unity-notifications-handler`
    if (!testValidTarget(target)) throw `Target ${target} may contain only alphanumeric characters and hyphens`

    
    document.addEventListener(`${target}-add`, ({ detail: notification={} }={}) => {
      this._handleAddNotification(notification)
    })
    document.addEventListener(`${target}-close`, this._handleCloseNotification)
    document.addEventListener(`${target}-clear`, this._handleClearNotifications)

    this._calculateStyles()
  }

  updated(changedProps) {
    if (changedProps.has('_queuedNotifications') || changedProps.has('_showNotification')) this._calculateStyles()
    if (changedProps.has('position')) {
      // only allow 'top' and 'bottom', defaulting to 'top'
      this._topBottomPosition = !this.position || this.position.split('-')[0] !== 'bottom'
        ? `top`
        : `bottom`
      
      // only allow 'left' and 'right', defaulting to 'right'
      this._leftRightPosition = !this.position || this.position.split('-')[1] !== 'left'
        ? `right`
        : `left`
    }
  }

  disconnectedCallback() {
    const { target } = this
    document.removeEventListener(target, ({ detail: notification={} }={}) => {
      this._handleAddNotification(notification)
    })
    document.removeEventListener(`${target}-close`, this._handleCloseNotification)
    document.removeEventListener(`${target}-clear`, this._handleClearNotifications)
  }

  static addNotification({
    target,
    notification={}
  }={}) {
    if (!target || !testValidTarget(target)) throw `Error: Invalid target: ${target}`
    const addNotificationEvent = new CustomEvent(`${target}-add`, {
      bubbles: true,
      detail: { ...notification }
    })
    document.dispatchEvent(addNotificationEvent)
  }

  static closeNotification(target) {
    if (!target || !testValidTarget(target)) throw `Error: Invalid target: ${target}`
    const closeNotificationEvent = new CustomEvent(`${target}-close`, {
      bubbles: true
    })
    document.dispatchEvent(closeNotificationEvent)
  }

  static clearNotifications(target) {
    if (!target || !testValidTarget(target)) throw `Error: Invalid target: ${target}`
    const clearNotificationsEvent = new CustomEvent(`${target}-clear`, {
      bubbles: true
    })
    document.dispatchEvent(clearNotificationsEvent)
  }

  _calculateStyles() {
    const { _topBottomPosition, _showNotification, noAnimation } = this
    const currentNotification = this._queuedNotifications[0]

    if (!currentNotification) {
      this._notificationStyle = `
        ${_topBottomPosition}: calc(-20px - var(--notification-height, 60px));
        opacity: 0;
      `
      return
    }
    
    // prevent css injection:
    const { color } = currentNotification
    if (!testValidColor(color)) throw `Color value "${color}" does not pass secure color values test.`
    
    this._notificationStyle = `
      --notification-color: ${color};
      ${_topBottomPosition}: ${_showNotification ? `0px` : `calc(-20px - var(--notification-height, 60px))`};
      opacity: ${_showNotification ? `1` : `0`};
    `
  }

  _getIconAndColorFromType(type) {
    const options = {
      error: {
        icon: this.icons.error || 'unity:error',
        color: this.colors.error || defaultColors.error 
      },
      warning: {
        icon: this.icons.warning || 'unity:error',
        color: this.colors.warning || defaultColors.warning 
      },
      success: {
        icon: this.icons.success || 'unity:circle_check',
        color: this.colors.success || defaultColors.success 
      },
      tip: {
        icon: this.icons.tip || 'unity:hand_right',
        color: this.colors.tip || defaultColors.tip 
      },
      help: {
        icon: this.icons.help || 'unity:help',
        color: this.colors.help || defaultColors.help 
      },
      ...this.customTypes
    }
    return options[type]
  }

  _handleAddNotification(notification={}) {
    const { text, subtext, type, timeout } = notification
    
    const { icon, color } = this._getIconAndColorFromType(type) || notification
    
    if (!icon) throw `Could not retrieve icon.`
    if (!color) throw `Could not retrieve color.`
    
    // Ignore duplicates
    const lastNotification = this._queuedNotifications[0]
    if (
      !this.allowDuplicates &&
      !!lastNotification && lastNotification.text === text &&
      lastNotification.subtext === subtext &&
      lastNotification.icon === icon
    ) return

    const newNotification = {
      text,
      subtext,
      icon,
      color,
      timeout,
      onClose: async () => {
        const closeResult = await this.onClose()
        if (closeResult !== false) this._handleCloseNotification() // if user returns false, don't close notification (but accept undefined)
      },
    }

    this._queuedNotifications = [...this._queuedNotifications, newNotification]
    this._showNotification = true
    if (!this._queuedNotifications[1] && !!timeout) {
      clearTimeout(this._notificationTimeout)
      this._notificationTimeout = setTimeout(() => {
        this._handleCloseNotification()
      }, timeout)
    }
  }
  
  _handleCloseNotification() {
    if (!this._showNotification) return // notification is already closed or closing currently
    this._showNotification = false
    clearTimeout(this._notificationTimeout)
    this._notificationTimeout = setTimeout(this._handleNextNotification, 500) // go to next notification, after animation
  }
  
  _handleNextNotification() {
    this._queuedNotifications = this._queuedNotifications.slice(1)
    const nextNotification = this._queuedNotifications[0]
    if (!!nextNotification) {
      this._showNotification = true
      clearTimeout(this._notificationTimeout)
      this._notificationTimeout = !!nextNotification.timeout ? setTimeout(this._handleCloseNotification, nextNotification.timeout) : null
    }
  }

  _handleClearNotifications() {
    this._showNotification = false
    this._queuedNotifications = []
    clearTimeout(this._notificationTimeout)
    this._notificationTimeout = null
  }

  render() {
    const {
      text='',
      subtext='',
      icon='',
      onClose=()=>{},
    } = this._queuedNotifications[0] || {}

    return html`
      <div id='container'>
        <unity-notification
          class="${this._topBottomPosition} ${this._leftRightPosition}"
          .text=${text}
          .subtext=${subtext}
          .icon=${icon}
          .onClose=${onClose}
          style=${this._notificationStyle}
        ></unity-notification>
        <slot></slot>
      </div>
    `
  }
}

window.customElements.define('unity-notifications-handler', UnityNotificationsHandler)

export const addNotification = UnityNotificationsHandler.addNotification
export const closeNotification = UnityNotificationsHandler.closeNotification
export const clearNotifications = UnityNotificationsHandler.clearNotifications