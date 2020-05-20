import { LitElement, html, css, unsafeCSS } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-core/unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-notification'
import BooleanType from '@storybook/addon-knobs/dist/components/types/Boolean'

/**
 * Component to control notifications 
 * @name UnityNotificationsHandler
 * @param {String} name, a unique name for use with the addNotification function. No two unity-notifications-handler components should share this within one app. Name should only include characters A-z and hyphens.
 * @param {String} position, position in the container; options are 'top-right', 'top-left', 'bottom-right', and 'bottom-left'.
 * @param {Object} icons
 * @param {Object} colors
 * @param {Object} customTypes
 * @param {Boolean} allowDuplicates, stipulate whetehr duplicate messages should be allowed
 * @param {Boolean} noAnimation, removes animation for the notifications
 * @param {Function} onClose, callback function to call when clicking the close button
 *
 * CSS vars:
 * --notification-height: height of the notification. Defaults to 60px.
 * --notification-width: width of the notification. Defaults to 450px.
 *
 * Notes
 *  - IMPORTANT: To show the notification in a container, it must not have "position: static;" (note that this is the default position value).
 *      Instead, set it to something like "position: relative;", or the notification will be at the edge of the whole window.
 *  - You may also want to set the container to 'overflow: hidden;' to improve the transition.
 * 
 * @example
 *  // to add a notification
 *  import { addNotification } from 'smartworks.unity.unity-core/unity-notifications-handler'
 *  addNotification({
 *    name: 'foo-notifications',
 *    notification: {
 *       text:  'Notification Main Text',
 *       subtext:  'Extra notification information',
 *       type:  'help'
 *    }
 *  })
 * 
 * // in render method of your component, inside container on which you want to show the notification
 *    <unity-notifications-handler
 *      name='foo-notifications'
 *      .onClose=${()=>console.log('closed')}
 *    >
 *    </unity-notifications-handler>
*/

// TODO: Change this to use default theme styles
const defaultColors  = {
  error: css`rgb(224, 39, 18)`,
  warning: css`rgb(255,198,0)`,
  success: css`rgb(71,162,63)`,
  help: css`rgb(162, 170, 173)`,
  tip: css`rgb(45,204,211)`,
}

class UnityNotificationsHandler extends LitElement {
  constructor() {
    super()
    this.position = ''
    this.name = ''
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
      position: { type: String},
      name: { type: String},
      icons: { type: Object },
      colors: { type: Object },
      customTypes: { type: Object },
      allowDuplicates: { type: Boolean },
      noAnimation: { type: Boolean },
      onClose: { type: Function },
    }
  }
  
  set queuedNotifications(value) {
    const oldValue = this._queuedNotifications
    this._queuedNotifications = value
    this.requestUpdate('queuedNotifications', oldValue)
  }

  get queuedNotifications() {
    return this._queuedNotifications
  }
  
  set showNotification(value) {
    const oldValue = this._showNotification
    this._showNotification = value
    this.requestUpdate('showNotification', oldValue)
  }

  get showNotification() {
    return this._showNotification
  }
  
  set notificationStyle(value) {
    const oldValue = this._notificationStyle
    this._notificationStyle = value
    this.requestUpdate('notificationStyle', oldValue)
  }

  get notificationStyle() {
    return this._notificationStyle
  }
  
  set topBottomPosition(value) {
    const oldValue = this._topBottomPosition
    this._topBottomPosition = value
    this.requestUpdate('topBottomPosition', oldValue)
  }

  get topBottomPosition() {
    return this._topBottomPosition
  }
  
  set leftRightPosition(value) {
    const oldValue = this._leftRightPosition
    this._leftRightPosition = value
    this.requestUpdate('leftRightPosition', oldValue)
  }

  get leftRightPosition() {
    return this._leftRightPosition
  }
  
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        unity-notification {
          font-family: Avenir;
          display: flex;
          flex-direction: row;
          position: absolute;
          margin: 12px;
          transition: top 500ms, bottom 500ms, opacity 500ms;
          transition-timing-function: ease-out;
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
    if (!this.name) throw `Name not provided for unity-notifications-handler`
    if (!/^[A-z0-9\-]+$/.test(this.name)) throw `Name ${this.name} contains characters other than A-z and hyphens`

    document.addEventListener(this.name, ({ detail: notification={} }={}) => {
      this._handleAddNotification(notification)
    })
    this._calculateStyles()
  }

  updated(changedProps) {
    if (changedProps.has('queuedNotifications') || changedProps.has('showNotification')) this._calculateStyles()
    if (changedProps.has('position')) {
      // only allow 'top' and 'bottom', defaulting to 'top'
      this.topBottomPosition = !this.position || this.position.split('-')[0] !== 'bottom'
        ? `top`
        : `bottom`
      
      // only allow 'left' and 'right', defaulting to 'right'
      this.leftRightPosition = !this.position || this.position.split('-')[1] !== 'left'
        ? `right`
        : `left`
    }
  }

  disconnectedCallback() {
    document.removeEventListener(this.name, ({ detail: notification={} }={}) => {
      this._handleAddNotification(notification)
    })
  }

  static addNotification({
    name,
    notification={}
  }={}) {
    if (!name || !/^[A-z0-9\-]+$/.test(name)) throw `Error: Invalid name: ${name}`
    const addNotificationEvent = new CustomEvent(name, {
      bubbles: true,
      detail: { ...notification }
    })
    document.dispatchEvent(addNotificationEvent)
  }

  static nextNotification() {
    this._handleNextNotification()
  }

  static clearNotifications() {
    this._handleClearNotifications()
  }

  _calculateStyles() {
    const { topBottomPosition, showNotification, noAnimation } = this
    const currentNotification = this.queuedNotifications[0]

      if (!currentNotification) {
        this.notificationStyle = `
        ${topBottomPosition}: -80px;
        opacity: 0;
        `
        return
      }
      
      // prevent css injection:
      const { color } = currentNotification
      if (!/^[A-z0-9\#\(\), ]+$/.test(color)) throw `Color value "${color}" does not pass secure color values test.`

      this.notificationStyle = `
          --notification-color: ${color};
          ${topBottomPosition}: ${showNotification ? `0px` : `-80px`};
          opacity: ${showNotification ? `1` : `0`};
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
    const lastNotification = this.queuedNotifications[0]
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

    this.queuedNotifications = [...this.queuedNotifications, newNotification]
    this.showNotification = true
    if (!this.queuedNotifications[1] && !!timeout) {
      clearTimeout(this._notificationTimeout)
      this._notificationTimeout = setTimeout(() => {
        this._handleCloseNotification()
      }, timeout)
    }
  }
  
  _handleCloseNotification() {
    this.showNotification = false
    clearTimeout(this._notificationTimeout)
    this._notificationTimeout = setTimeout(this._handleNextNotification, 500) // go to next notification, after animation
  }
  
  _handleNextNotification() {
    this.queuedNotifications = this.queuedNotifications.slice(1)
    const nextNotification = this.queuedNotifications[0]
    if (!!nextNotification) {
      this.showNotification = true
      clearTimeout(this._notificationTimeout)
      this._notificationTimeout = !!nextNotification.timeout ? setTimeout(this._handleCloseNotification, nextNotification.timeout) : null
    }
  }

  _handleClearNotifications() {
    this.showNotification = false
    this.queuedNotifications = []
      clearTimeout(this._notificationTimeout)
    this._notificationTimeout = null
  }

  render() {
    const {
      text='',
      subtext='',
      icon='',
      onClose=()=>{}
    } = this.queuedNotifications[0] || {}

    return html`
      <unity-notification
        class="${this.topBottomPosition} ${this.leftRightPosition}"
        .text=${text}
        .subtext=${subtext}
        .icon=${icon}
        .onClose=${onClose}
        style=${this._notificationStyle}
      />
    `
  }
}

window.customElements.define('unity-notifications-handler', UnityNotificationsHandler)

export const addNotification = UnityNotificationsHandler.addNotification
export const nextNotification = UnityNotificationsHandler.nextNotification
export const clearNotifications = UnityNotificationsHandler.clearNotifications
