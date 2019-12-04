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
    this.password = false
    this.placeholder = ""
    this.units = ""

    // internals
    this._valid = this.validation ? false : true
    this._error = ""
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      disabled: { type: Boolean },
      onChange: { type: Function },
      password: { type: Boolean },
      placeholder: { type: String },
      units: { type: String },
      // internals
      _valid: { type: Boolean },
      _error: { type: String }
    }
  }

  _onChange(e) {
    const report = this.onChange

    this.value = e.target.value
    report instanceof Function && report(this.value)
  }

  _clickUnits() {
    const input = this.shadowRoot.getElementById('input')
    input.focus()
  }

  render() {
    const {
      value,
      label,
      disabled,
      password,
      placeholder,
      units,
      _onChange,
      _valid,
      _error,
      _clickUnits
    } = this
    // .label="${label}"
    return html`
      <div>
        ${!!label ?
          html`<p class="label">
            ${label}
            </p>`
          : null
        }
        <iron-input
          class="input-wrapper ${!_valid ? 'invalid' : 'valid'} ${!!units ? 'units' : ''} ${!!disabled ? 'disabled' : ''}"
          bind-value="${value}"
          @input="${_onChange}"
        >
          ${!!disabled ?
            html`<input
              value="{{value::input}}"
              id="input"
              class="disabled"
              type="${!!password ? 'password' : 'text'}"
              placeholder="${!!placeholder ? placeholder : ''}"
              disabled
            >`
            :
            html`<input
              id="input"
              type="${!!password ? 'password' : 'text'}"
              placeholder="${!!placeholder ? placeholder : ''}"
              value="{{value::input}}"
            >`
          }
          ${!!units ?
            html`<div
              class="units ${!!disabled ? 'disabled' : ''}"
              @click="${_clickUnits}"
            >
              ${units}
            </div>`
          : null}
        </iron-input>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --font-family: Avenir;
          font-family: var(--font-family, var(--default-font-family));
          --label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --border-color: var(--global-nav-border-color, var(--default-global-nav-border-color));
          border-collapse: collapse;
          user-select: none;
        }
        iron-input {
          width: 100%;
          min-width: 200px;
          margin-top: 6px;
        }
        p.label {
          margin: 0;
          padding: 0;
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          color: var(--label-color);
        }
        .input-wrapper {
          background-color: var(--background-color, var(--default-background-color));
          height: 24px;
          width: 100%;
          min-width: 200px;
          padding: 0 8px;
          box-sizing: border-box;
          border-width: 1px;
          border-color: var(--border-color);
          border-style: solid;
          border-radius: 2px;
          display: flex;
          flex-direction: row;
        }
        .invalid {
          border-color: var(--danger-color, var(--default-danger-color));
          background-color: rgba(var(--danger-rgb, var(--default-danger-rgb)), .2);
        }
        .input-wrapper:hover {
          border-color: var(--primary-brand-color, var(--default-primary-brand-color));
        }
        .input-wrapper:focus-within {
          border-color: var(--primary-brand-color, var(--default-primary-brand-color));
          outline: none;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
        }
        input {
          padding: 0;
          margin: 0;
          line-height: 2;
          flex: 1;
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          color: rgb(var(--text-color));
          border: 0;
          background-color: transparent;
        }
        input:focus {
          outline: none;
        }
        .units {
          flex: 0;
          padding-left: 8px;
          line-height: 2;
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          color: rgb(var(--text-color));
          line-height: 2;
        }
        .disabled {
          border-color: var(--dark-grey-background, var(--default-dark-grey-background));
          background-color: var(--light-grey-background-color, var(--default-light-grey-background-color));
          color: rgba(var(--text-color), .4);
        }
      `
    ]
  }
}

window.customElements.define('unity-text-input', UnityTextInput)
