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
    const { icon, onClose, subtext, text } = this
    return html`
      <div class='notification'>
        <unity-icon icon=${icon}></unity-icon>
        <div class='text-wrapper'>
          <div>
            <unity-typography>${text}</unity-typography>
          </div>
          <div style='margin-top: 2px'>
            <unity-typography color='dark' size='paragraph'>${subtext}</unity-typography>
          </div>
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