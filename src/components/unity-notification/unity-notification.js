import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon'

/**
 * Component to display notifications
 * @name UnityNotification
 * @param {string} text, main notification text
 * @param {string} subtext, text to display below the main text
 * @param {string} icon, icon to show in the left side of the notification
 * @param {Function} onClose, callback function to call when clicking the close button
 *
 * CSS vars:
 * --notification-color: color for icon and left bar. Defaults to primary brand color.
 * --notification-height: height of the notification. Defaults to 60px.
 * --notification-width: width of the notification. Defaults to 450px.
 * --notification-button-padding: padding applied to the close button.
 *
 * @example
 *   <unity-notification
 *     text='This is the main text'
 *     subtext='Some explanatory text, or when was this sent'
 *     icon='unity:share'
 *     .onClose=${()=>console.log('closed')}
 *   >
 *   </unity-notification>
*/
class UnityNotification extends LitElement {

  constructor() {
    super()
    this.onClose = () => {}
    this.text = ''
    this.subtext = ''
    this.icon = ''
  }

  static get properties() {
    return {
      icon: { type: String },
      text: { type: String },
      subtext: { type: String },
      onClose: { type: Function }
    }
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --notification-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --notification-height: 60px;
          --notification-width: 450px;
          --default-notification-button-padding: var(--padding-size-sm, --default-padding-size-sm);
        }
        .notification {
          display: flex;
          align-items: center;
          width: var(--notification-width);
          height: var(--notification-height);
          background: var(--background-color, var(--default-background-color));
          box-shadow: 0 0 5px 1px rgba(0,0,0,0.25);

        }
        .notification::before {
          content: "";
          background: var(--notification-color);
          display: block;
          width: 4px;
          height: 100%;
        }
        .text-wrapper {
          flex: 1;
          padding: 12px 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .subtext {
          margin-top: 4px;
        }
        unity-icon {
          color: var(--notification-color);
          margin: 16px;
        }
        unity-button {
          --button-color: var(--default-dark-grey-text-color);
          padding: var(--notification-button-padding, --default-notification-button-padding);
        }
      `
    ]
  }

  render() {
    const { icon, onClose, subtext, text } = this
    return html`
      <div class='notification'>
        <unity-icon icon=${icon}></unity-icon>
        <div class='text-wrapper'>
          <div class="main-text">
            <unity-typography>${text}</unity-typography>
          </div>
          <div class="subtext">
            <unity-typography color='dark' size='small'>${subtext}</unity-typography>
          </div>
        </div>
        <unity-button
          type='borderless'
          centerIcon='unity:close'
          @click=${onClose}
        </unity-button>
      </div>
    `
  }
}

window.customElements.define('unity-notification', UnityNotification)