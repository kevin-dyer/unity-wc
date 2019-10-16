import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import { UnityDefaultThemeStyles } from '../unity-default-theme-styles.js';

class UnityButton extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          
        }

        paper-button {
          height: 30px;
          border-radius: 30px;
          font-size: var(--small-text-size, 11px);
          padding: 0 20px;
        }
        paper-button.gradient {
          background: transparent linear-gradient(90deg, #3080C3 0%, var(--primary-brand-color, #3ABCE1) 100%) 0% 0% no-repeat padding-box;

          color: #FFF; 
        }
      `
    ];
  }

  static get properties() {
    return {
      label: {
        type: String
      },
      disabled: {
        type: Boolean
      },
      gradient: {
        type: Boolean
      },
      outlined: {
        type: Boolean
      },
    }
  }

  constructor() {
    super()

    this.label=''
    this.gradient=false
    this.disabled=false
    this.outlined=false
  }

  render() {

    //NOTE: @click is bubbled  up
    return html`
      <paper-button ?disabled=${this.disabled} class=${`${this.gradient && !this.disabled && 'gradient'}`}>
        ${this.label}
      </paper-button>
    `
  }
}

window.customElements.define('unity-button', UnityButton);
