import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-input/iron-input.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a bordered text input
* @name UnityTextInput
* @param {''} value, the text defaulted text in the field
* @param {func} onChange, function to handle changes to the field, receives current text value, false if validation fails
* @param {''} title, floating header title
* @param {''} placeholder, initial text to be overwritten
* @param {''} remark, text to render below input field
* @param {bool} charCount, show current char count
* @param {bool} disabled, controls if field is enabled/disabled, defaults: false (enabled)
* @param {''} units, right bound units
* @param {''} hint, text to show when hovering over/clicked on hint icon
* @param {bool} password, converts characters to dots/password field
* @param {func} validation, func used to show if value is valid, return falsey for invalid, truthy for valid. if in password mode, 1 will be considered weak (but valid) and 2 will be considered strong
* @param {bool} validationIcon, show/hide right-bound in/valid icon, only renders w/ validation func, defaults: false (hide)
* @example
* <unity-text-input>
* </unity-text-input>
**/

// Text Input for general use: login, password, setting values, etc
// Can have text, title, placeholder, remark set by string
// Can have internal string for unit type
// Can have string for hover/click hint box
// Requires function to send changed text to parent, should try to throttle from being called too often
// Bool to control showing charCount and for disabling
// Bool to change if field should be treated like a password
// Can take a function and bool to control what validation function is used and if valid icon is shown

class UnityTextInput extends LitElement {
  constructor() {
    super()

    this.value = ""
    this.label = ""
    this.disabled = false
    this.onChange = ()=>{}

    // internals
    this._valid = this.validation ? false : true
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      disabled: { type: Boolean },
      onChange: { type: Function },
      // internals
      _valid: { type: Boolean }
    }
  }

  _onChange(e) {
    const report = this.onChange

    this.value = e.target.value
    report instanceof Function && report(this.value)
  }

  render() {
    const {
      value,
      label,
      disabled,
      _onChange
    } = this
    // .label="${label}"
    return html`
      <div>
        <div>
          ${label}
        </div>
        <iron-input
          bind-value="${value}"
          @input="${_onChange}"
        >
          ${!!disabled ?
            html`<input
              value="{{value::input}}"
              disabled
            >`
            :
            html`<input
              value="{{value::input}}"
            >`
          }
        </iron-input>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          --primary-menu-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          --secondary-menu-color: var(--global-nav-expanded-color, var(--default-global-nav-expanded-color));
          --text-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --border-breakers: var(--global-nav-border-color, var(--default-global-nav-border-color));
          --tall-height: 52px;
          --short-height: 32px;
          --label-padding: 16px;
          border-collapse: collapse;
          user-select: none;
        }
      `
    ]
  }
}

window.customElements.define('unity-text-input', UnityTextInput)
