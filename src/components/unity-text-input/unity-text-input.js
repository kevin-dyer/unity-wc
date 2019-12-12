import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-input/iron-input'
import '@polymer/iron-icon/iron-icon'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '../unity-icon-set/unity-icon-set'

/**
* Renders a bordered text input
* @name UnityTextInput
* @param {''} value, the text defaulted text in the field
* @param {func} onChange, function to handle changes to the field, receives current text value, false if validation fails
* @param {''} label, floating header label
* @param {''} placeholder, initial text to be overwritten
* @param {''} remark, text to render below input field
* @param {bool} charCount, show current char count
* @param {bool} disabled, controls if field is enabled/disabled, defaults: false (enabled)
* @param {''} units, right bound units
* @param {''} hint, text to show when hovering over/clicked on hint icon
* @param {bool} password, converts characters to dots/password field
* @param {func} validation, func used to show if value is valid, return falsey or string for invalid, truth for valid. if in password mode, return 2+ or 1 for strong/weak, otherwise considered failure
* @param {bool} showIcon, show/hide right-bound in/valid icon, only renders w/ validation func, defaults: false (hide)
* @example
* <unity-text-input>
*   .label="${'Strong Validation'}"
*   .value="${"astrongerpassword"}"
*   .validation="${val=> {
*     if (val.length < 8) return 'Password should be at least 8 characters'
*     else if (val.length < 16) return 1
*     else return 2
*   }}"
*   .onChange="${this.onInputChange}"
*   password
*   showIcon
* </unity-text-input>
**/

class UnityTextInput extends LitElement {
  constructor() {
    super()

    this._value = ""
    this.label = ""
    this.remark = ""
    this.disabled = false
    this.onChange = ()=>{}
    this._password = false
    this.placeholder = ""
    this.units = ""
    this.charCount = false
    this._validation = null
    this.showIcon = false

    // internals
    this._valid = true
    this._strength = 0
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
      _strength: { type: Number },
      _error: { type: String }
    }
  }

  // these set/get are set to make sure that _validate is called
  // when value/password/validation is set or altered
  set value(value) {
    const oldValue = this._value
    this._value = value
    this._validate()
    this.requestUpdate('value', oldValue)
  }

  get value() { return this._value }

  set password(value) {
    const oldValue = this._password
    this._password = value
    this._validate()
    this.requestUpdate('password', oldValue)
  }

  get password() { return this._password }

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
      password,
      value
    } = this

    if (validation instanceof Function) {
      const isValid = validation(value)
      if (!!password) {
        if (isValid === 2) {
          this._valid = true
          this._strength = 2
          this._error = ''
          return
        } else if (isValid === 1) {
          this._valid = true
          this._strength = 1
          this._error = ''
          return
        }
      } else {
        if (isValid === true) {
          this._valid = true
          this._error = ''
          return
        }
      }
      this._valid = false
      this._strength = 0
      this._error = isValid || ''
    }
  }

  _clickUnits() {
    const input = this.shadowRoot.getElementById('input')
    input.focus()
  }

  _renderIcon() {
    const {
      password,
      showIcon,
      _valid,
      _strength,
      _error
    } = this

    if (!!showIcon) {
      if (!!password) {
        if (_strength >= 1) {
          const strong = _strength >= 2
          return html`
            <div class="icon-wrapper rect">
              <div class="icon-text">${!!strong ? "Strong" : "Weak"}</div>
              <div class="circles-wrapper">
                <div class="password-circle ${strong ? 'green' : ''}" ></div>
                <div class="password-circle ${strong ? 'green' : ''}" ></div>
                <div class="password-circle ${strong ? 'green' : ''}" ></div>
                <div class="password-circle ${strong ? 'green' : ''}" ></div>
                <div class="password-circle ${strong ? 'green' : ''}" ></div>
              </div>
            </div>
          `
        }
      }
      const validClass = !_valid ? 'icon-error' : 'icon-valid'
      const icon = !_valid ? 'unity:error' : 'unity:check'
      return html`
        <div class="icon-wrapper circle ${!_valid ? 'invalid' : 'valid'}">
          <iron-icon class="icon ${validClass}" icon="${icon}"></iron-icon>
        </div>
      `
    } else {
      return null
    }
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
      _strength,
      _error,
      _clickUnits
    } = this

    // console.warn('this is a test')

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
          ${this._renderIcon()}
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
          --input-font: var(--font-family, var(--default-font-family));
          --label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --border-color: var(--global-nav-border-color, var(--default-global-nav-border-color));
          font-family: var(--input-font);
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
          flex: 0;
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
          font-family: var(--input-font);
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
        .icon-wrapper {
          position: absolute;
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
        }
        .circle {
          height: 20px;
          width: 20px;
          border-radius: 10px;
          background-color: var(--success-color, var(--default-success-color));
        }
        .circle.invalid {
          background-color: var(--danger-color, var(--default-danger-color));
        }
        .rect {
          width: 40px;
        }
        .icon-text {
          font-size: 11px;
          line-height: 16px;
          color: var(--label-text)
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
          top: calc(50% - 1px);
        }
        .icon-valid {

        }
        .password-circle {
          height: 5px;
          width: 5px;
          border-radius: 2.5px;
          background-color: var(--dark-grey-background-color, var(--default-dark-grey-background-color));
          margin: 0;
          margin-right: 3px;
          padding: 0;
          display: inline-block;
        }
        .green {
          background-color: var(--success-color, var(--default-success-color));
        }
        .circles-wrapper {
          font-size: 0;
          margin-top: 3px;
          line-height: 0;
        }
      `
    ]
  }
}

window.customElements.define('unity-text-input', UnityTextInput)
