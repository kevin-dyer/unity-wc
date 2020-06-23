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
 * @param {string} icon, iron icon name to be displayed to the left of the label, or replace label if no label
 * @param {string} type, type of button to render (optional): primary , secondary, borderless
 * @param {bool} important, style button in important colors.
 * @param {bool} loading, displays loading spinner in place of leftIcon
 * @param {bool} small, to decrease size of button
 * @param {function} click, event handler
*  @example
*   <unity-button
*     label="example button"
*     ?loading=${fetching}
*     icon="add"
*     @click=${() => console.log("button clicked")}
*   />
*/

const PRIMARY = 'primary'
const SECONDARY = 'secondary'
const BORDERLESS = 'borderless'

class UnityButton extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-button-primary-color: var(--secondary-color, var(--default-secondary-color));
          --default-button-primary-pressed-color: var(--secondary-tint-color, var(--default-secondary-tint-color));
          --default-button-secondary-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-button-secondary-color: var(--gray-color, var(--default-gray-color));
          --default-button-disabled-color: var(--gray-color, var(--default-gray-color));
          --default-button-important-color: var(--tertiary-1-color, var(--default-tertiary-1-color));
          --default-button-important-pressed-color: var(--tertiary-1-shade-color, var(--default-tertiary-1-shade-color));
          flex-shrink: 0;
          display: block;
        }

        /*Important Styles*/
        paper-button.important {
          --button-color: var(--button-important-color, var(--default-button-important-color));
          --black-text-color: var(--button-important-color, var(--default-button-important-color));
          color: var(--button-color);
        }

        paper-button.important:hover {
          filter: brightness(93%);
        }

        paper-button {
          width: 100%;
          height: var(--unity-button-height, var(--default-unity-button-height));
          border-radius: var(--unity-border-radius, var(--default-unity-button-border-radius));
          min-width: max-content;
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          text-transform: none;
          white-space: nowrap;
          color: var(--button-color);
          --font-color: var(--button-color);
          outline: none;
          margin: 0;
        }

        paper-button.text-button {
          padding: 0 10px;
          min-width: 0;
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
        paper-button.primary {
          background-color: var(--button-color);
          color: #FFF;
          --font-color: #FFF;
        }

        /*Secondary Styles*/
        paper-button.secondary {
          background: rgba(0,0,0,0);
          border: 1px solid var(--button-color);
          color: var(--button-color);
          --font-color: var(--black-text-color, var(--default-black-text-color));
        }

        paper-button.secondary iron-icon {
          color: var(--button-color);
        }

        paper-button.secondary paper-spinner-lite {
          color: var(--button-color);
        }

        paper-button.secondary.disabled iron-icon {
          color: var(--button-color);
        }

        paper-button.secondary.disabled paper-spinner-lite {
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
        }

        paper-button.secondary:hover {
          /*TODO: set border color to be 15% darker - How do I do this without affecting background color*/
          filter: brightness(93%);
        }

        paper-button.secondary.disabled {
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
        iron-icon.left-icon {
          margin-left: -15px;
        }
        iron-icon.right-icon {
          margin-right: -15px;
        }

        .small iron-icon.left-icon {
          margin-left: -6px;
        }
        .small iron-icon.right-icon {
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
      important: {
        type: Boolean
      },
      loading: {
        type: Boolean
      },
      small: {
        type: Boolean
      },
      icon: {
        type: String
      }
    }
  }

  constructor() {
    super()

    this.label=''
    this.type=''
    this.disabled=false
    this.important=false
    this.loading=false
    this.small=false
    this.icon=''
  }

  _getClassNames() {
    let classList = ['unity-button']
    const {
      label,
      type,
      important,
      disabled,
      loading,
      small,
      icon
    } = this

    switch (type) {
      case SECONDARY: {
        classList.push(SECONDARY)
        break
      }
      case BORDERLESS: {
        classList.push(important ? PRIMARY : BORDERLESS)
        break
      }
      default: {
        classList.push(PRIMARY)
        break
      }
    }

    if (important) {
      classList.push('important')
    }

    if (disabled) {
      classList.push('disabled')
    }

    if (loading) {
      classList.push('loading')
    }

    if (small) {
      classList.push('small')
    }

    if (!label && icon) {
      classList.push('icon-btn')
    } else if (icon) {
      classList.push('left-icon')
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
          : !!this.icon
            ? html`<iron-icon
                icon=${this.icon}
                class="icon left-icon"
              ></iron-icon>`
            : null
        }
        <unity-typography>
          ${this.label}
        </unity-typography>

        ${this.centerIcon && !this.loading
          ? html`<iron-icon
              icon=${this.icon}
              class="icon center-icon"
            ></iron-icon>`
          : null
        }
      </paper-button>
    `
  }
}

window.customElements.define('unity-button', UnityButton);
