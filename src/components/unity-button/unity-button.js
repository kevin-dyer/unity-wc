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
 * @param {string} centerIcon, iron icon name to be displayed in place of the label. Note: Do not pass in a label if used, overwrites label
 * @param {string} type, type of button to render (optional): primary , secondary, borderless
 * @param {bool} important, style button in important colors.
 * @param {bool} disabled, style button in disabled mode
 * @param {bool} loading, displays loading spinner in place of leftIcon
 * @param {function} click, event handler
*  @example
*   <unity-button
*     label="example button"
*     ?loading=${fetching}
*     leftIcon="add"
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
          --default-button-secondary-text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-button-secondary-color: var(--gray-color, var(--default-gray-color));
          --default-button-borderless-text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-button-borderless-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
          --default-button-borderless-pressed-color: var(--light-gray-1-color, var(--default-light-gray-1-color));
          --default-button-disabled-text-color: var(--gray-color, var(--default-gray-color));
          --default-button-disabled-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
          --default-button-important-color: var(--tertiary-1-color, var(--default-tertiary-1-color));
          --default-button-important-pressed-color: var(--tertiary-1-shade-color, var(--default-tertiary-1-shade-color));
          --default-background-color: var(--white-color, var(--default-white-color));
          --default-button-width: unset;
          --default-button-padding: 7px 14px; /* Design wants 8x15, but must account for border 1 */
          flex-shrink: 0;
          display: block;
          --button-color: var(--button-primary-color, var(--default-button-primary-color));
          --pressed-color: var(--button-primary-pressed-color, var(--default-button-primary-pressed-color));
          --font-color: var(--background-color, var(--default-background-color));
          --icon-color: var(--font-color);
          --default-button-hover-color: var(--button-color);
        }

        paper-button {
          height: var(--unity-button-height, var(--default-unity-button-height));
          border-radius: var(--unity-border-radius, var(--default-unity-button-border-radius));
          min-width: max-content;
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          text-transform: none;
          white-space: nowrap;
          outline: none;
          margin: 0;
          border: 1px solid var(--button-color);
          padding: var(--button-padding, var(--default-button-padding));
          width: var(--button-width, var(--default-button-width));
        }

        paper-button.text-button {
          padding: 0 10px;
          min-width: 0;
        }

        /* Primary Styles */
        paper-button.primary {
          background-color: var(--button-color);
        }

        /* Secondary Styles */
        paper-button.secondary {
          background-color: var(--background-color, var(--default-background-color));
          --font-color: var(--button-secondary-text-color, var(--default-button-secondary-text-color));
          border: 1px solid var(--button-secondary-color, var(--default-button-secondary-color));
        }

        paper-button.unity-button:hover {
          /*NOTE: css filters are not supported on older browsers*/
          border-color: var(--button-hover-color, var(--default-button-hover-color));
          background-color: var(--background-color, var(--default-background-color));
          --font-color: var(--button-hover-color, var(--default-button-hover-color));
        }

        paper-button.unity-button:active {
          --button-color: var(--pressed-color);
        }

        /* Borderless Styles */
        paper-button.unity-button.borderless {
          --font-color: var(--button-borderless-text-color, var(--default-button-borderless-text-color));
          --bg-color: var(--background-color, var(--default-background-color));
          background-color: var(--bg-color);
          border: 1px solid var(--bg-color);
        }


        paper-button.unity-button.borderless:hover {
          --font-color: var(--button-color);
          --bg-color: var(--button-borderless-color, var(--default-button-borderless-color));
        }

        paper-button.unity-button.borderless:active {
          --font-color: var(--pressed-color);
          --bg-color: var(--button-borderless-pressed-color, var(--default-button-borderless-pressed-color));

        }

        .icon {
          margin: 0;
          color: var(--font-color);
          height: 16px;
          width: 16px;
          --iron-icon-width: 16px;
          --iron-icon-height: 16px;
          --paper-spinner-color: var(--font-color);
          --paper-spinner-stroke-width: 2px;
        }

        paper-spinner-lite.icon.left-icon {
          margin-right: 8px;
        }
        paper-spinner-lite.icon.right-icon {
          margin-left: 8px;
        }

        .icon-btn paper-spinner-lite.icon.left-icon {
          padding: 0;
        }

        iron-icon.left-icon {
          padding-right: 2px;
        }
        iron-icon.right-icon {
          padding-left: 2px;
        }

        paper-button.icon-btn {
          min-width: 30px;
          width: 30px;
          padding: 0;
        }

        /* Important Styles */
        paper-button.important {
          --button-color: var(--button-important-color, var(--default-button-important-color));
          --pressed-color: var(--button-important-pressed-color, var(--default-button-important-pressed-color));
        }

        paper-button.icon-btn .icon {
          --iron-icon-width: var(--medium-icon-size, var(--default-medium-icon-size));
          --iron-icon-height: var(--medium-icon-size, var(--default-medium-icon-size));
        }

        /*Including .unity-button selector for increased specificity and override other class styles*/
        paper-button.unity-button.disabled {
          --font-color: var(--button-disabled-text-color, var(--default-button-disabled-text-color));
          background-color: var(--button-disabled-color, var(--default-button-disabled-color));
          border-color: var(--button-disabled-color, var(--default-button-disabled-color));
        }

        paper-button.borderless.disabled {
          --font-color: var(--button-disabled-text-color, var(--default-button-disabled-text-color));
          background-color: var(--background-color, var(--default-background-color));
          border-color: var(--background-color, var(--default-background-color));
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
      leftIcon: {
        type: String
      },
      centerIcon: {
        type: String
      },
      rightIcon: {
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
    this.leftIcon=''
    this.centerIcon=''
    this.rightIcon=''
  }

  _getClassNames() {
    let classList = ['unity-button']
    const {
      label,
      type,
      important,
      disabled,
      loading,
      leftIcon,
      centerIcon,
      rightIcon
    } = this

    switch (type) {
      case SECONDARY: {
        classList.push(SECONDARY)
        break
      }
      case BORDERLESS: {
        classList.push(BORDERLESS)
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

    if(leftIcon) {
      classList.push('left-icon')
    }
    if (centerIcon) {
      classList.push('icon-btn')
    }
    if(rightIcon) {
      classList.push('right-icon')
    }


    return classList.join(' ')
  }

  //NOTE: consider rendering slot inside paper button that will render in place of label
  render() {
    //NOTE: @click is bubbled up
    if (this.label==='left icon') {
      console.log('this.label', this.label)
      console.log('this.loading', this.loading)
      console.log('this.leftIcon', this.leftIcon)
    }
    return html`
      <paper-button
        noink
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
            : null
        }

        ${this.centerIcon && !this.loading
          ? html`<iron-icon
              icon=${this.centerIcon}
              class="icon center-icon"
            ></iron-icon>`
          : html`<unity-typography>
            ${this.label}
          </unity-typography>`
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
