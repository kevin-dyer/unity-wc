import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-core/unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-notification'

/**
 * Component to control notifications 
 * @name UnityNotificationsHandler
 * @param {String} name, a unique name for use with the addNotification function. No two unity-notifications-handler components should share this within one app. Name should only include characters A-z and hyphens.
 * @param {String} position, position in the container; options are 'top-right', 'top-left', 'bottom-right', and 'bottom-left'.
 * @param {Object} icons
 * @param {Object} colors
 * @param {Object} customTypes
 * @param {integer} animationDuration, duration of appear and disappear animations, in ms; default 500
 * @param {Function} onClose, callback function to call when clicking the close button
 *
 * CSS vars:
 * --notification-height: height of the notification. Defaults to 60px.
 * --notification-width: width of the notification. Defaults to 450px.
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
  danger: css`rgb(255,198,0)`,
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
    this.animationDuration = 500
    this.onClose = () => {}

    this._queuedNotifications = []
    this._notificationTimeout = null
  }
  
  static get properties() {
    return {
      position: { type: String},
      name: { type: String},
      icons: { type: Object },
      colors: { type: Object },
      customTypes: { type: Object },
      animationDuration: { type: Number },
      onClose: { type: Function },
    }
  }
  
  firstUpdated() {
    if (!this.name) throw `Name not provided for unity-notifications-handler`
    if (!/^[A-z\-]+$/.test(this.name)) throw `Name ${this.name} contains characters other than A-z and hyphens`

    document.addEventListener(this.name, ({
      detail: {
        text,
        subtext,
        type
      }
    }) => this._handleAddNotification({ text, subtext, type, timeout }) )
  }

  static get styles() {
    // only allow 'top' and 'bottom', defaulting to 'top'
    const  topBottomPosition = !this.position || this.position.split('-')[0] !== 'bottom'
      ? css`top`
      : css`bottom`
    
    // only allow 'left' and 'right', defaulting to 'right'
    const  leftRightPosition = !this.position || this.position.split('-')[1] !== 'left'
      ? css`right`
      : css`left`

    return [
      UnityDefaultThemeStyles,
      css`
        unity-notification {
            font-family: Avenir;
            display: flex;
            flex-direction: row;
            position: fixed;
            ${leftRightPosition}: 0;
            ${topBottomPosition}: 0;
            margin: 12px;
            ${!!this._queuedNotifications[0] && `
            --notification-color: ${this._queuedNotifications[0].color};
            animation: notification${this._showNotification ? 'In' : 'Out'} ${this.animationDuration}ms ease-out;
          `}
        }

        @keyframe notificationIn {
          from {
            ${topBottomPosition}: -80px;
            opactiy: 0%;
          }
          to {
            ${topBottomPosition}: 0;
            opacity: 100%;
          }
        }

        @keyframe notificationOut {
          from {
            ${topBottomPosition}: 0;
            opactiy: 100%;
          }
          to {
            ${topBottomPosition}: -80px;
            opacity: 0%;
          }
        }
      `
    ]
  }

  static addNotification({
    name=this.name,
    notification={}
  }={}) {
    const addNotificationEvent = new CustomEvent(name, {
      bubbles: true,
      detail: { ...notification }
    })
    document.dispatchEvent(addNotificationEvent)
  }

  static nextNotification() {
    console.log(`this`, this)
    this._handleNextNotification()
  }

  static clearNotifications() {
    this._handleClearNotifications()
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

  _handleAddNotification(test={}) {
    console.log(`notification`, notification)
    const { text, subtext, type, timeout } = notification
    // Ignore duplicates
    const lastNotification = this._queuedNotifications[0]
    if (!!lastNotification && lastNotification.text === text && lastNotification.subtext === subtext) return

    const { icon, color } = this._getIconAndColorFromType(type) || notification

    if (!icon || !color) throw `Could not retrieve icon or color.`

    const notification = {
      text,
      subText,
      icon,
      color,
      onClose: async () => {
        const closeResult = await this.onClose()
        if (closeResult !== false) this._handleCloseNotification() // if user returns false, don't close notification (but accept undefined)
      },
    }

    this._queuedNotifications.push(notification)
    if (!!timeout) this._notificationTimeout = setTimeout(this._handleCloseNotification, timeout)
  }

  _handleCloseNotification() {
    this._showNotification = false
    this._notificationTimeout = setTimeout(this._handleNextNotification, this.animationDuration) // go to next notification, after animation
  }

  _handleNextNotification() {
    this._queuedNotifications.shift()
    const nextNotification = this._queuedNotifications[0]
    if (!!nextNotification) {
      this._showNotification = true
      this._notificationTimeout = !!nextNotification.timeout ? setTimeout(this._handleCloseNotification, timeout) : null
    }
  }

  _handleClearNotifications() {
    this._showNotification = false
    this._queuedNotifications = []
    this._notificationTimeout = null
  }

  render() {
    const {
      text='',
      subtext='',
      icon='',
      style='',
      onClose=()=>{}
    } = this._queuedNotifications[0] || {}

    return html`
      <unity-notification
        .text="${text}"
        .subtext="${subtext}"
        .icon="${icon}"
        .onClose="${onClose}"
        style="${style}"
      />
    `
  }
}

window.customElements.define('unity-notifications-handler', UnityNotificationsHandler)

export const addNotification = UnityNotificationsHandler.addNotification
export const nextNotification = UnityNotificationsHandler.nextNotification
export const clearNotifications = UnityNotificationsHandler.clearNotifications
