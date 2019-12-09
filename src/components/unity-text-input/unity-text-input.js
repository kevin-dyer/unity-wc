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
* @param {func} validation, func used to show if value is valid, return falsey or string for invalid, truth for valid. if in password mode, return 'strong' or 'weak' for strong/weak, otherwise considered failure
* @param {bool} showIcon, show/hide right-bound in/valid icon, only renders w/ validation func, defaults: false (hide)
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

    this._value = ""
    this.label = ""
    this.remark = ""
    this.disabled = false
    this.onChange = ()=>{}
    this.password = false
    this.placeholder = ""
    this.units = ""
    this.charCount = false
    this._validation = null
    this.showIcon = false

    // internals
    this._valid = true
    this._error = ""
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      remark: { type: String },
      disabled: { type: Boolean },
      onChange: { type: Function },
      password: { type: Boolean },
      placeholder: { type: String },
      units: { type: String },
      charCount: { type: Boolean },
      validation: { type: Function },
      showIcon: { type: Boolean },
      // internals
      _valid: { type: Boolean },
      _error: { type: String }
    }
  }

  set value(value) {
    const oldValue = this._value
    this._value = value
    this._validate()
    this.requestUpdate('value', oldValue)
  }

  get value() { return this._value }

  set validation(value) {
    const oldValue = this._validation
    this._validation = value
    this._validate()
    this.requestUpdate('validation', oldValue)
  }

  get validation() { return this._validation}

  _onChange(e) {
    const report = this.onChange
    const newValue = e.target.value
    this.value = newValue
    report instanceof Function && report(this.value)
  }

  _validate() {
    const {
      validation,
      value
    } = this

    if (validation instanceof Function) {
      const isValid = validation(value)
      if (isValid === true) {
        this._valid = true
        this._error = ''
      } else {
        this._valid = false
        this._error = isValid || ''
      }
    }
  }

  _clickUnits() {
    const input = this.shadowRoot.getElementById('input')
    input.focus()
  }

  render() {
    const {
      value,
      label,
      remark,
      disabled,
      password,
      placeholder,
      units,
      charCount,
      showIcon,
      _onChange,
      _valid,
      _error,
      _clickUnits
    } = this
    return html`
      <div>
        ${!!label ?
          html`<span class="label">
            ${label}
            </span>`
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
          ${!!showIcon || true ?
            html`<div class="icon-circle ${!_valid ? 'invalid' : 'valid'}">
              ${!_valid
                ? html`<iron-icon class="icon icon-error" icon="icons:error-outline"></iron-icon>`
                : html`<iron-icon class="icon icon-valid" icon="icons:check"></iron-icon>`
              }
            </div>`
          : null}
        </iron-input>
        <div class="bottom">
          <span class="remark">
            ${_error || remark}
          </span>
          ${!!charCount ?
            html`<span class="charCount">
              ${value.length}
            </span>`
            : null
          }
        </div>
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
          --text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --border-color: var(--global-nav-border-color, var(--default-global-nav-border-color));
          border-collapse: collapse;
          user-select: none;
        }
        .label {
          margin: 0;
          padding: 0;
          font-size: var(--text-size);
          color: var(--label-color);
        }
        .bottom {
          margin: 0;
          padding-top: 4px;
          display: flex;
          flex-direction: row;
        }
        .remark {
          flex: 1;
          word-break: break-word;
          font-size: var(--text-size);
          color: var(--label-color);
        }
        .charCount {
          flex: 1;
          padding-left: 4px;
          text-align: right;
          font-size: var(--text-size);
          color: var(--label-color);
        }
        .input-wrapper {
          width: 100%;
          min-width: 200px;
          margin-top: 6px;
          background-color: var(--background-color, var(--default-background-color));
          height: 27px;
          width: 100%;
          min-width: 200px;
          padding: 0 8px;
          box-sizing: border-box;
          border-width: 1px;
          border-color: var(--border-color);
          border-style: solid;
          border-radius: 2px;
          position: relative;
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
        #input {
          padding: 0;
          margin: 0;
          align-self: center;
          flex: 1;
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--text-size);
          color: rgb(var(--text-color));
          border: 0;
          background-color: transparent;
        }
        #input:focus {
          outline: none;
        }
        .units {
          flex: 0;
          padding-left: 8px;
          align-self: center;
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          color: rgb(var(--text-color));
          line-height: 2;
        }
        .disabled {
          border-color: var(--dark-grey-background, var(--default-dark-grey-background));
          background-color: var(--light-grey-background-color, var(--default-light-grey-background-color));
          color: rgba(var(--text-color), .4);
        }
        .icon-circle {
          position: absolute;
          right: -29px;
          top: 50%;
          transform: translateY(-50%);
          height: 20px;
          width: 20px;
          border-radius: 10px;
          background-color: var(--success-color, var(--default-success-color));
        }
        .icon-circle.invalid {
          background-color: var(--danger-color, var(--default-danger-color));
        }
        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 16px;
          width: 16px;
          color: white;
        }
        .icon-error {

        }
        .icon-valid {

        }
      `
    ]
  }
}

window.customElements.define('unity-text-input', UnityTextInput)
