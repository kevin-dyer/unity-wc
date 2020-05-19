import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-notifications'

/**
 * Component to control notifications 
 * @name UnityNotificationsHandler
 * @param {String} position, position in the container; options are 'top-right', 'top-left', 'bottom-right', and 'bottom-left'.
 * @param {String} name, a unique name for use with the addNotification function. No two unity-notifications-handler components should share this within one app. Name should only include characters A-z and hyphens.
 * @param {Object} icons
 * @param {Object} colors
 * @param {Object} customTypes
 * @param {Function} onClose, callback function to call when clicking the close button
 *
 * CSS vars:
 * --notification-height: height of the notification. Defaults to 60px.
 * --notification-width: width of the notification. Defaults to 450px.
 *
 * @example
 * import { addNotification } from 'smartworks.unity.unity-core/unity-notifications-handler'
 * 
 * 
 * // in render method of your component, inside container on which you want to show the notification
 *   <unity-notifications-handler
 *     .onClose=${()=>console.log('closed')}
 *   >
 *   </unity-notifications-handler>
*/

class UnityNotification extends LitElement {
  constructor() {
    super()
    this.position = 'top-right'
    this.name = ''
    this.icons = {}
    this.colors = {}
    this.customTypes = {}
    this.onClose = () => {}

    this._queuedNotifications = []
    this._notificationTimeout = null
  }
  
  static get properties() {
    return {
      position: { type: String},
      name: { type: String},
      onClose: { type: Function },
    }
  }
  
  firstUpdated = () => {
    if (!/^[A-z\-]+$/.test(this.name)) throw `Name ${this.name} cntains characters other than A-z and hyphens`

    document.addEventListener(this.name, ({
      detail: {
        text,
        subtext,
        type
      }
    }) => this._handleAddNotification({ show: true, text, subtext, type, timeout }) )
  }

  static get styles() {
    const  topBottomPosition = this.position.split('-')[0] === 'bottom' ? 'bottom' : 'top' // only allow 'bottom' and 'top', defaulting to 'top'
    const  leftRightPosition = this.position.split('-')[1] === 'left' ? 'left' : 'right' // only allow 'left' and 'right', defaulting to 'right'
    
    return [
      UnityDefaultThemeStyles,
      css`
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
        
        unity-notification {
            font-family: Avenir;
            display: flex;
            flex-direction: row;
            position: fixed;
            ${leftRightPosition}: 0;
            ${topBottomPosition}: 0;
            margin: 12px;
        }
      `
    ]
  }

  static addNotification = ({
    name=this.name,
    notification={}
  }={}) => {
    const addNotificationEvent = new CustomEvent(name, {
      bubbles: true,
      detail: { ...notification }
    })
    document.dispatchEvent(addNotificationEvent)
  }

  static nextNotification = () => this._handleNextNotification

  static clearNotifications = () => this._handleClearNotifications

  _getIconAndColorFromType = (type) => ({
    error: {
      icon: this.icons.error || 'unity:error',
      color: this.colors.error || 
    },
    warning: {
      icon: this.icons.warning || 'unity:error',
      color: this.colors.warning || 
    },
    success: {
      icon: this.icons.success || 'unity:circle_check',
      color: this.colors.success || 
    },
    tip: {
      icon: this.icons.tip || 'unity:hand_right',
      color: this.colors.tip || 
    },
    help: {
      icon: this.icons.help || 'unity:help',
      color: this.colors.help || 
    },
    ...this.customTypes
  })[type]

  _handleAddNotification = ({ text, subtext, type, timeout }) => {
    // Ignore duplicates
    const lastNotification = this._queuedNotifications[0]
    if (!!lastNotification && lastNotification.text === text && lastNotification.subtext === subtext) return

    const { icon, color } = this._getIconAndColorFromType(type)

    const notification = {
      text,
      subText,
      icon,
      style: css`
        --notification-color: ${color};
        animation: notification${this._showNotification ? 'In' : 'Out'} 0.5s ease-out;
      `,
      onClose: async () => {
        const closeResult = await this.onClose()
        if (!!closeResult) this._handleCloseNotification()
      },
    }

    this._queuedNotifications.push(notification)
  }

  _handleCloseNotification = () => {
    this._showNotification = false
    this.setTimeout(this._handleNextNotification, 500) // go to next notification, after animation
  }

  _handleNextNotification = () => {
    this._queuedNotifications.shift()
    const nextNotification = this._queuedNotifications[0]
    if (!!nextNotification) {
      this._showNotification = true
      this._notificationTimeout = !!nextNotification.timeout ? setTimeout(this._handleCloseNotification, timeout) : null
    }
  }

  _handleClearNotifications = () => {
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
        onClose="${onClose}"
        style="${style}"
      />
    `
  }
}

window.customElements.define('unity-notifications-handler', UnityNotification)

export const addNotification = UnityNotificationsHandler.addNotification
export const nextNotification = UnityNotificationsHandler.nextNotification
export const clearNotifications = UnityNotificationsHandler.clearNotifications
