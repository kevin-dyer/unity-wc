import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import { UnityDefaultThemeStyles } from '../unity-default-theme-styles.js';

class UnityButton extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --gradient-background: transparent linear-gradient(90deg, var(--secondary-brand-color, var(--primary-brand-color, var(--default-primary-brand-color))) 0%, var(--primary-brand-color, var(--default-primary-brand-color)) 100%) 0% 0% no-repeat padding-box;
        }

        paper-button {
          height: 30px;
          border-radius: 30px;
          min-width: 79px;
          font-size: var(--small-text-size, var(--default-small-text-size));
          font-weight: var(--small-text-weight, var(--default-small-text-weight));
          padding: 0 20px;
          text-transform: none;
        }

        paper-button:hover {
          /*NOTE: css filters are not supported on older browsers*/
          filter: brightness(85%);
        }

        /*Including .unity-button selector for increased specificity and override other class styles*/
        paper-button.unity-button.disabled {
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          background: var(--light-grey-background-color, var(--default-light-grey-background-color));
          border: none;
        }


        /*Gradient Styles*/
        paper-button.gradient {
          /*NOTE: gradient from left to right: secondary brand color(if exists) -> primary brand color*/
          /* If secondary brand color does not exist, use primary brand color to creat solid background color */
          background: var(--gradient-background);
          color: #FFF;
        }

        /*NOTE: commenting this out. Looks weird with ripple effect*/
        /*paper-button.gradient:active {
          filter: brightness(70%);
        }*/

        /*Outlined Styles*/
        paper-button.outlined {
          background: white;
          border: 1px solid var(--primary-brand-color, var(--default-primary-brand-color));
          color: var(--black-text-color, var(--default-black-text-color));
        }

        paper-button.outlined:hover {
          /*TODO: set border color to be 15% darker - How do I do this without affecting background color*/
          filter: brightness(93%);
        }

        paper-button.outlined.disabled {
          background: white;
          border: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        }

        /*Danger Styles*/
        paper-button.danger {
          background: white;
          border: 1px solid var(--danger-color, var(--default-danger-color));
          color: var(--danger-color, var(--default-danger-color));
        }

        paper-button.danger:hover {
          background: rgba(var(--danger-rgb, var(--default-danger-rgb)), 0.2);
        }

        paper-button.unity-button.danger.disabled {
          border: 1px solid rgba(var(--danger-rgb, var(--default-danger-rgb)), 0.2);
          color: rgba(var(--danger-rgb, var(--default-danger-rgb)), 0.5);
          background: white;
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
      danger: {
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
    this.danger=false
  }

  _getClassNames() {
    let classList = ['unity-button']

    if (this.gradient) {
      classList.push('gradient')
    }

    if (this.outlined) {
      classList.push('outlined')
    }

    if (this.danger) {
      classList.push('danger')
    }

    if (this.disabled) {
      classList.push('disabled')
    }

    console.log("getClassNames returns: ", classList.join(' '))
    return classList.join(' ')
  }

  //TODO: Add props for displaying icons
  //NOTE: consider rendering slot inside paper button that will render in place of label
  render() {
    //NOTE: @click is bubbled  up
    return html`
      <paper-button
        ?disabled=${this.disabled}
        class=${this._getClassNames()}
      >
        ${this.label}
      </paper-button>
    `
  }
}

window.customElements.define('unity-button', UnityButton);
