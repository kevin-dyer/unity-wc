import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon'

class UnityNotification extends LitElement {

  constructor() {
    super()
    this.onClose = () => {}
    this.text = ''
    this.icon = ''
    this.dateSent = new Date()
  }

  static get properties() {
    return {
      icon: { type: String },
      text: { type: String },
      dateSent: { type: String },
      onClose: { type: Function }
    }
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --notification-color: var(--primary-brand-color, var(--default-primary-brand-color))
        }
        .notification {
          display: flex;
          align-items: center;
          width:  450px;
          height: 60px;
          background: white;
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
        }
        unity-icon {
          color: var(--notification-color);
          margin: 16px;
        }
      `
    ]
  }

  render() {
    const { dateSent, icon, onClose, text } = this
    const date = new Date() - dateSent // TODO: get date string
    return html`
      <div class='notification'>
        <unity-icon icon=${icon}></unity-icon>
        <div class='text-wrapper'>
          <unity-typography>${text}</unity-typography>
          <unity-typography color='dark' size='paragraph'>${date}</unity-typography>
        </div>
        <unity-button 
          centerIcon='unity:close'
          @click=${onClose}
        </unity-button>
      </div>
    `
  }
}

window.customElements.define('unity-notification', UnityNotification)