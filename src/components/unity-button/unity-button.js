import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'

/**
 * Button with configurable styles.
 * @name UnityButton
 * @param {string} label, button text
 * @param {string} leftIcon, iron icon name to be displayed to the left of the label
 * @param {string} rightIcon, iron icon name to be displayed to the right of the label
 * @param {string} centerIcon, iron icon name to be displayed in place of the label. Note: Do not pass in a label if used.
 * @param {string} type, type of button to render (optional): solid , gradient, outlined
 * @param {bool} danger, style button red.
 * @param {bool} loading, displays loading spinner in place of leftIcon
 * @param {bool} small, to decrease size of button
 * @param {function} click, event handler
*  @example
*   <unity-button
*     label="example button"
*     gradient
*     ?loading=${fetching}
*     leftIcon="add"
*     @click=${() => console.log("button clicked")}
*   />
*/

const SOLID = 'solid'
const GRADIENT = 'gradient'
const OUTLINED = 'outlined'

class UnityButton extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --gradient-background: transparent linear-gradient(90deg, var(--secondary-brand-color, var(--primary-brand-color, var(--default-primary-brand-color))) 0%, var(--primary-brand-color, var(--default-primary-brand-color)) 100%) 0% 0% no-repeat padding-box;
          --button-color: var(--primary-brand-color, var(--default-primary-brand-color));
          flex-shrink: 0;
        }

        /*Danger Styles*/
        paper-button.danger {
          --button-color: var(--danger-color, var(--default-danger-color));
          --black-text-color: var(--danger-color, var(--default-danger-color));
          color: var(--button-color);
        }

        paper-button.danger:hover {
          filter: brightness(93%);
        }

        paper-button {
          height: var(--unity-button-height, var(--default-unity-button-height));
          border-radius: var(--unity-border-radius, var(--default-unity-button-border-radius));
          min-width: 79px;
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          padding: var(--unity-button-padding, var(--default-unity-button-padding));
          text-transform: none;
          white-space: nowrap;
        }

        paper-button.small {
          height: 22px;
          padding: 0 10px;
          min-width: 22px;
          border-radius: 22px;
          --font-size: var(--small-text-size, var(--default-small-text-size));
          --font-weight: var(--small-text-weight, var(--default-small-text-weight));
        }

        paper-button:hover {
          /*NOTE: css filters are not supported on older browsers*/
          filter: brightness(85%);
        }

        /*Solid Styles*/
        paper-button.solid {
          background-color: var(--button-color);
          color: #FFF;
          --font-color: #FFF;
        }

        /*Gradient Styles*/
        paper-button.gradient {
          /*NOTE: gradient from left to right: secondary brand color(if exists) -> primary brand color*/
          /* If secondary brand color does not exist, use primary brand color to creat solid background color */
          --button-color: var(--gradient-background);
          background: var(--button-color);
          color: #FFF;
          --font-color: #FFF;
        }

        /*NOTE: commenting this out. Looks weird with ripple effect*/
        /*paper-button.gradient:active {
          filter: brightness(70%);
        }*/

        /*Outlined Styles*/
        paper-button.outlined {
          background: white;
          border: 1px solid var(--button-color);
          color: var(--button-color);
          --font-color: var(--black-text-color, var(--default-black-text-color));
        }

        paper-button.outlined iron-icon {
          color: var(--button-color);
        }

        paper-button.outlined paper-spinner-lite {
          color: var(--button-color);
        }

        paper-button.outlined.disabled iron-icon {
          color: var(--button-color);
        }

        paper-button.outlined.disabled paper-spinner-lite {
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
        }

        paper-button.outlined:hover {
          /*TODO: set border color to be 15% darker - How do I do this without affecting background color*/
          filter: brightness(93%);
        }

        paper-button.outlined.disabled {
          background: white;
          border: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        }

        paper-spinner-lite.icon {
          height: var(--small-icon-size, var(--default-small-icon-size));
          width: var(--small-icon-size, var(--default-small-icon-size));
          --paper-spinner-color: 'inherit';
          --paper-spinner-stroke-width: 2px;
        }

        .small paper-spinner-lite.icon {
          height: var(--xsmall-icon-size, var(--default-xsmall-icon-size));
          width: var(--xsmall-icon-size, var(--default-xsmall-icon-size));;
        }

        paper-spinner-lite.icon.left-icon {
          margin-right: 8px;
        }
        paper-spinner-lite.icon.right-icon {
          margin-left: 8px;
        }

        .icon-btn paper-spinner-lite.icon.left-icon {
          margin: 0;
        }

        .icon {
          margin: 0 4px;
        }
        .left-icon {
          margin-left: -15px;
        }
        .right-icon {
          margin-right: -15px;
        }

        .small .left-icon {
          margin-left: -6px;
        }
        .small .right-icon {
          margin-left: -6px;
        }

        iron-icon.icon {
          --iron-icon-width: var(--small-icon-size, var(--default-small-icon-size));
          --iron-icon-height: var(--small-icon-size, var(--default-small-icon-size));
        }

        .small iron-icon.icon {
          --iron-icon-width: var(--xmall-icon-size, var(--default-xsmall-icon-size));
          --iron-icon-height: var(--xsmall-icon-size, var(--default-xsmall-icon-size));
        }

        paper-button.icon-btn {
          min-width: 30px;
          width: 30px;
          padding: 0;
        }

        paper-button.icon-btn .icon {
          --iron-icon-width: var(--medium-icon-size, var(--default-medium-icon-size));
          --iron-icon-height: var(--medium-icon-size, var(--default-medium-icon-size));
        }

        /*Including .unity-button selector for increased specificity and override other class styles*/
        paper-button.unity-button.disabled {
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --font-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --button-color: var(--light-grey-background-color, var(--default-light-grey-background-color));
          border-color: var(--font-color);
        }

        paper-button.unity-button.disabled paper-spinner-lite{
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
        }

        paper-button.unity-button.disabled iron-icon{
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
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
      type: {
        type: String
      },
      danger: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      small: {
        type: Boolean
      },
      leftIcon: {
        type: String
      },
      rightIcon: {
        type: String
      },
      centerIcon: {
        type: String
      }
    }
  }

  constructor() {
    super()

    this.label=''
    this.type=''
    this.disabled=false
    this.danger=false
    this.loading=false
    this.small=false
    this.leftIcon=''
    this.rightIcon=''
    this.centerIcon=''
  }

  _getClassNames() {
    let classList = ['unity-button']
    const { type } = this

    switch (type) {
      case SOLID: {
        classList.push('solid')
        break
      }
      case GRADIENT: {
        classList.push('gradient')
        break
      }
      case OUTLINED: {
        classList.push('outlined')
        break
      }
      default: break
    }

    if (this.danger) {
      classList.push('danger')
    }

    if (this.disabled) {
      classList.push('disabled')
    }

    if (this.loading) {
      classList.push('loading')
    }

    if (this.small) {
      classList.push('small')
    }

    if (this.centerIcon) {
      classList.push('icon-btn')
    }

    return classList.join(' ')
  }

  //NOTE: consider rendering slot inside paper button that will render in place of label
  render() {
    //NOTE: @click is bubbled up
    return html`
      <paper-button
        ?disabled=${this.disabled}
        class=${this._getClassNames()}
      >
        ${this.loading
          ? html`<paper-spinner-lite active class="spinner icon left-icon" />`
          : !!this.leftIcon
            ? html`<iron-icon
                icon=${this.leftIcon}
                class="icon left-icon"
              ></iron-icon>`
            : ''
        }
        <unity-typography>
          ${this.label}
        </unity-typography>

        ${this.centerIcon && !this.loading
          ? html`<iron-icon
              icon=${this.centerIcon}
              class="icon center-icon"
            ></iron-icon>`
          : ''
        }

        ${this.rightIcon
          ? html`<iron-icon
              icon=${this.rightIcon}
              class="icon right-icon"
            ></iron-icon>`
          : ''
        }
      </paper-button>
    `
  }
}

window.customElements.define('unity-button', UnityButton);
