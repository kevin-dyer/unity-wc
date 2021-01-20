import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-input/iron-input'
import '@polymer/iron-autogrow-textarea'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-icon'

/**
* Renders a bordered text input
* @name UnityTextInput
* @param {''} value, the text defaulted text in the field
* @param {func} onChange, function to handle changes to the field, receives current text value, and true/false if validation is in effect
* @param {''} label, floating header label
* @param {''} placeholder, initial text to be overwritten
* @param {''} remark, text to render below input field
* @param {bool} charCount, show current char count
* @param {int} maxlength, maximum number of characters to allow
* @param {bool} disabled, controls if field is enabled/disabled, defaults: false (enabled)
* @param {bool} required, marks field as being required, defaults: false
* @param {bool} readOnly, marks field as being readOnly, defaults: false
* @param {''} units, right bound units
* @param {''} hint, text to show when hovering over/clicked on hint icon
* @param {bool} time, option to have input by type time, overriden by password
* @param {bool} password, converts characters to dots/password field, overwrites rightIcon
* @param {''} error, error message for external error control or default forcing, can give true to not render remark error text, if validation is also sent it it will overwrite error's effects
* @param {func} validation, func used to show if value is valid, return falsey or string for invalid, truth for valid.
* @param {bool} showIcon, show/hide right-bound in/valid icon, only renders w/ validation func, defaults: false (hide)
* @param {bool} rounded, if specified, makes the text input edges rounded, defaults: false (square corners)
* @param {bool} hideBorder, hides the border of the element, defaults: false (show border)
* @param {bool} borderEffects, apply styles (color and shadow) on hover/focus, default: true
* @param {bool} area, field shows as text area with scrolling and multiline, disables many other features
* @param {number} minLines, minimum number of lines to show in a text area, default 4
* @param {number} maxLines, maximum number of lines to show in a text area before scrolling, default 12
* @param {''} innerRightIcon, if defined, puts an icon (specified) from the unity icon set on the right side of the text input
* @param {''} innerLeftIcon, if defined, puts an icon (specified) from the unity icon set on the left side of the text input
* @param {bool} dirty, if true, will render left-side bar to show that the element has been changed from it's original contents
* @param {bool} autofocus, focus input on load
* @param {''} prefixedText, read-only text to include at the start of the input

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

css vars
  input-font
  input-label-color
  input-text-color
  input-text-size
  input-small-text-size
  input-dirty-color
  input-border-color
  input-border-hover-color
  input-border-focus-color
  input-border-readOnly-color
  input-border-error-color
  input-background-error-color
  input-border-disabled-color
  input-background-disabled-color
  input-icon-hint-color
  input-icon-valid-color
  input-icon-error-color
  input-prefixed-text-color
  input-prefixed-text-padding
  inner-icon-size
**/

const MIN_LINES = 4
const MAX_LINES = 12

class UnityTextInput extends LitElement {
  constructor() {
    super()

    this._value = ""
    this.label = ""
    this.remark = ""
    this.disabled = false
    this.required = false
    this.readOnly = false
    this.onChange = ()=>{}
    this.time = false
    this.placeholder = ""
    this.units = ""
    this.charCount = false
    this._maxlength = 0
    this.showIcon = false
    this.hideBorder = false
    this.borderEffects = true
    this.rounded = false
    this.innerRightIcon = ""
    this.innerLeftIcon = ""
    this.area = false
    this.minLines = MIN_LINES
    this.maxLines = MAX_LINES
    this.dirty = false
    this.autofocus = false
    this.prefixedText = ""

    // internals
    this._error = ''
    this._validation = null
    this._password = false
    this._valid = true
    this._strength = 0
    this._errorText = ""
    this._showPassword = false
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      remark: { type: String },
      disabled: { type: Boolean },
      required: { type: Boolean },
      readOnly: { type: Boolean },
      onChange: { type: Function },
      time: { type: Boolean },
      password: { type: Boolean },
      innerRightIcon: { type: String },
      innerLeftIcon: { type: String },
      placeholder: { type: String },
      units: { type: String },
      charCount: { type: Boolean },
      maxlength: { type: Number },
      error: { type: String },
      validation: { type: Function },
      showIcon: { type: Boolean },
      hideBorder: { type: Boolean },
      borderEffects: { type: Boolean},
      rounded: { type: Boolean },
      area: { type: Boolean },
      minLines: { type: Number },
      maxLines: { type: Number },
      dirty: { type: Boolean },
      autofocus: { type: Boolean },
      prefixedText: { type: String },

      // internals
      _valid: { type: Boolean },
      _strength: { type: Number },
      _errorText: { type: String },
      _showPassword: { type: Boolean }
    }
  }

  // this is to allow external control of errors/validity
  // if given validation and error, validation will overwrite error's message
  set error(value) {
    const oldValue = this._error
    this._error = value
    if (value === true || value === 'true') this._valid = false
    else if (!value) {
      this._valid = true
      this._errorText = ''
    }
    else {
      this._valid = false
      this._errorText = value
    }
    this.requestUpdate('error', oldValue)
  }

  firstUpdated() {
    if(this.autofocus) this._focusInput()
  }

  get error() { return this._error }

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
    if (report instanceof Function) {
      if (this.validation instanceof Function) {
        report(e, this.value, this._valid)
      } else {
        report(e, this.value)
      }
    }
  }

  set maxlength(value) {
    const oldValue = this._maxlength
    this._maxlength = value
    this._validate()
    this.requestUpdate('maxlength', oldValue)
  }

  get maxlength () { return this._maxlength }

  _validate() {
    const {
      validation,
      password,
      maxlength,
      value
    } = this
    if (!!maxlength && value.length > maxlength)
      this.value = value.slice(0, maxlength)
    if (validation instanceof Function) {
      const isValid = validation(value)
      if (isValid === true) {
        this._valid = true
        this._errorText = ''
        return
      }
      this._valid = false
      this._strength = 0
      this._errorText = isValid || ''
    }
  }

  _focusInput() {
    const input = this.shadowRoot.getElementById('input')

    if (!!input) {
      input.focus()
    } else {
      //If input is not found, look for textarea
      const textarea = this.shadowRoot.getElementById('textarea')

      if (!!textarea) {
        textarea.focus()
      }
    }
  }

  _clickRightIcon() {
    this._focusInput()
    // if password, toggles password
    if (!!this.password) {
      this.togglePassword()
    }
  }

  _renderIcon() {
    const {
      password,
      showIcon,
      _valid,
      _strength
    } = this

    if (!!showIcon) {
      const validClass = !_valid ? 'icon-error' : 'icon-valid'
      const icon = !_valid ? 'unity:warning_circle_outline' : 'unity:circle_check'
      return html`
        <div class="icon-wrapper">
          <unity-icon class="icon ${validClass}" icon="${icon}"></unity-icon>
        </div>
      `
    } else {
      return null
    }
  }

  _renderInnerIcon(icon, iconOnLeftSide) {
    const {
      password,
      _focusInput,
      _clickRightIcon
    } = this
    if (!icon) return
    return html`
      <div class="${!!iconOnLeftSide ? "icon-left-wrapper" : "icon-right-wrapper"}">
        <unity-icon class="inner-icon${password ? ' password' : ''}" icon="${icon}" @click="${!iconOnLeftSide ? _clickRightIcon : _focusInput}"></unity-icon>
      </div>
    `
  }

  _getInputWrapperClasses() {
    const {
      area,
      _valid,
      units,
      disabled,
      readOnly,
      hideBorder,
      rounded,
      borderEffects
    } = this
    let classes = ['input-wrapper']
    if (!!area) {
      classes.push('area', 'showBorder', 'notRounded')
    } else {
      if (!!hideBorder) classes.push('hideBorder')
      else classes.push('showBorder')
      if (!!rounded) classes.push('rounded')
      else classes.push('notRounded')
    }
    if (!_valid) classes.push('invalid')
    else classes.push('valid')
    if (!!readOnly) classes.push('readOnly')
    if (!!disabled) classes.push('disabled')
    if (borderEffects) classes.push('border-effects')
    return classes.join(" ")
  }

  /**
   * Toggles whether password styled text is hidden or visible
   */
  togglePassword() {
    this._showPassword = !this._showPassword
  }

  /**
   * Render div with remark or input error message.
   */
  renderBottomDiv() {
    const {
      maxlength,
      _errorText,
      _valid,
      remark,
      value,
      charCount
    } = this;

    return html`
      <div class="bottom">
        <span class="remark${_errorText && !_valid ? " invalid-text": ""}">
        ${_errorText || remark}
      </span>
      ${!!charCount ?
        html`<span class="charCount">
          ${value.length}${!!maxlength ? `/${maxlength}` : null}
        </span>`
        : null
      }
      </div>`;
  }

  render() {
    const {
      value,
      label,
      remark,
      disabled,
      required,
      readOnly,
      units,
      charCount,
      maxlength,
      hideBorder,
      rounded,
      innerRightIcon: originalRightIcon,
      innerLeftIcon,
      area,
      minLines: givenMinLines,
      maxLines: givenMaxLines,
      time,
      password,
      placeholder,
      dirty,
      showIcon,
      autofocus,
      prefixedText,
      _onChange,
      _valid,
      _strength,
      _errorText,
      _focusInput,
      _showPassword
    } = this
    const minLines = givenMinLines < 1 ? 1 : Math.floor(givenMinLines)
    const maxLines = givenMaxLines < minLines ? minLines : Math.floor(givenMaxLines)
    let innerRightIcon = originalRightIcon

    let type = 'text'
    if (!area) {
      if (!!time) type = 'time'
      if (!!password) {
        type = 'password'
        // set icon to eye
        // closed if _showPassword
        if (!!_showPassword) {
          type = 'text'
          innerRightIcon = 'unity:hide'
        }
        // else open
        else innerRightIcon = 'unity:show'
      }
    }

    return html`
      <div>
        ${!!label ?
          html`<p class="label">
            ${label}${required ? html`<span class="required"> *</span>`: ''}
            </p>`
          : null
        }
        <div
          class="${this._getInputWrapperClasses()}"
          @click="${_focusInput}"
        >
        ${(!area && !!prefixedText) ?
          html`<div
            class="prefixed-text ${!!disabled ? "disabled" : ""}"
          >
            ${prefixedText}
          </div>`
        : null}
        <iron-input
          bind-value="${value}"
          @input="${_onChange}"
          >

          ${!!area ?
            html`<iron-autogrow-textarea
              id="textarea"
              value="{{value::iron-autogrow-textarea}}"
              maxlength="${maxlength || null}"
              class="${!!disabled ? "disabled" : ""}"
              ?disabled=${!!disabled || !!readOnly}
              placeholder="${!!placeholder ? placeholder : ''}"
              style="--area-min-lines: ${minLines}; --area-max-lines: ${maxLines}"
              ?autofocus=${autofocus}
            ></iron-autogrow-textarea>`
            :
            html`<input
              value="{{value::input}}"
              id="input"
              type="${type}"
              maxlength="${maxlength || null}"
              placeholder="${!!placeholder ? placeholder : ''}"
              style="${!!innerLeftIcon ? "margin-left: 18px;" : ''}"
              class="${!!disabled ? "disabled" : ""}"
              ?disabled=${!!disabled || !!readOnly}
              ?autofocus=${autofocus}
              autocomplete="off"
              name="${label}"
            >`
          }
          ${!!dirty ? html`<div class="dirty" />` : null}
          ${!area ? this._renderInnerIcon(innerRightIcon, false) : null}
          ${!area ? this._renderInnerIcon(innerLeftIcon, true) : null}
          ${(!area && !!units) ?
            html`<div
              class="units ${!!disabled ? "disabled" : ""}"
            >
              ${units}
            </div>`
          : null}
          ${!showIcon && required ? html`<span class="required field">*</span>` : null}
          ${!area ? this._renderIcon() : null}
        </iron-input>
        </div>
        ${(_errorText || remark || charCount)? this.renderBottomDiv() : null}
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-input-font: var(--font-family, var(--default-font-family));
          --default-input-label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --default-input-text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --default-input-text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --default-input-small-text-size: var(--small-text-size, var(--default-small-text-size));
          --default-input-dirty-color: var(--primary-color, var(--defualt-primary-color));
          --default-input-border-color: var(--gray-color, var(--default-gray-color));
          --default-input-border-hover-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-input-border-focus-color: var(--primary-color, var(--default-primary-color));
          --default-input-border-readOnly-color: var(--light-gray-1-color, var(--default-light-gray-1-color));
          --default-input-border-error-color: var(--tertiary-1-color, var(--default-tertiary-1-color));
          --default-input-background-error-color: var(--tertiary-1-light-color, var(--default-tertiary-1-light-color));
          --default-input-border-disabled-color: var(--gray-color, var(--default-gray-color));
          --default-input-background-disabled-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
          --default-input-icon-hint-color: var(--primary-color, var(--default-primary-color));
          --default-input-icon-valid-color: var(--primary-color, var(--default-primary-color));
          --default-input-icon-error-color: var(--tertiary-1-color, var(--default-tertiary-1-color));
          --default-input-prefixed-text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-input-prefixed-text-padding: 0;
          font-family: var(--input-font, var(--default-input-font));
          font-size: var(--input-text-size, var(--default-input-text-size));
          --default-inner-icon-size: calc(var(--input-text-size, var(--default-input-text-size)) * 4 / 3);
          border-collapse: collapse;
          user-select: none;
        }
        p {
          margin-top: 0;
        }
        iron-input {
          display: flex;
          width: 100%;
        }
        .label {
          margin-bottom: 6px;
          padding: 0;
          color: var(--input-label-color, var(--default-input-label-color));
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
          font-size: var(--input-small-text-size, var(--default-input-small-text-size));
          color: var(--input-label-color, var(--default-input-label-color));
        }
        .charCount {
          flex: 0;
          padding-left: 4px;
          text-align: right;
          font-size: var(--input-small-text-size, var(--default-input-small-text-size));
          color: var(--input-label-color, var(--default-input-label-color));
        }
        .input-wrapper {
          width: 100%;
          background-color: var(--background-color, var(--default-background-color));
          height: var(--unity-text-input-height, var(--default-unity-text-input-height));
          padding: 0 8px;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: row;
        }
        .area {
          height: auto;
          padding: 6px 8px;
        }
        .invalid {
          background-color: var(--input-background-error-color, var(--default-input-background-error-color));
          border-color: var(--input-border-error-color, var(--default-input-border-error-color)) !important;
        }
        .invalid-text {
          color: var(--input-border-error-color, var(--default-input-border-error-color)) !important;
        }
        .input-wrapper.border-effects:hover {
          border-color: var(--input-border-hover-color, var(--default-input-border-hover-color));
        }
        .input-wrapper.border-effects:focus-within {
          border-color: var(--input-border-focus-color, var(--default-input-border-focus-color));
          outline: none;
          box-shadow: none;
        }
        .rounded {
          border-radius: calc(var(--unity-text-input-height, var(--default-unity-text-input-height)) * 0.5);
        }
        .notRounded {
          border-radius: 2px;
        }
        #input {
          padding: 0;
          margin: 0;
          align-self: center;
          flex: 1;
          font-family: var(--input-font, var(--default-input-font));
          font-size: var(--input-text-size, var(--default-input-text-size));
          color: var(--input-text-color, var(--default-input-text-color));
          border: 0;
          background-color: transparent;
          width: 100%;
          overflow: hidden;
        }
        #input:focus {
          outline: none;
        }
        #textarea {
          padding: 0;
          margin: 0;
          width: 100%;
          font-family: var(--input-font, var(--default-input-font));
          font-size: var(--input-text-size, var(--default-input-text-size));
          color: var(--input-text-color, var(--default-input-text-color));
          border: 0;
          background-color: transparent;
          resize: none;
          min-height: calc(var(--input-text-size, var(--default-input-text-size)) * 1.4545 * var(--area-min-lines, ${MIN_LINES}));
          max-height: calc(var(--input-text-size, var(--default-input-text-size)) * 1.4545 * var(--area-max-lines, ${MAX_LINES}));
          -webkit-appearance: none;
        }
        #textarea:focus {
          outline: none;
        }
        .units {
          flex: 0;
          padding-left: 8px;
          align-self: center;
          font-size: var(--input-small-text-size, var(--default-input-small-text-size));
          color: var(--input-text-color, var(--default-input-text-color));
          line-height: 2;
        }
        .prefixed-text {
          flex: 0;
          padding-right: var(--input-prefixed-text-padding, var(--default-input-prefixed-text-padding));
          align-self: center;
          color: var(--input-prefixed-text-color, var(--default-input-prefixed-text-color));
          line-height: 2;
        }
        .icon-wrapper {
          position: absolute;
          left: calc(100% + 4px);
          top: 50%;
          height: 24px;
          width: 24px;
          transform: translateY(-50%);
        }
        .icon-left-wrapper {
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          height: 20px;
          width: 20px;
        }
        .icon-right-wrapper {
          position: relative;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          height: 20px;
          width: 20px;
        }
        .showBorder {
          border-width: 1px;
          border-color: var(--input-border-color, var(--default-input-border-color));
          border-style: solid;
        }
        .hideBorder {
          border-width: 0px;
          height: 100%;
        }
        .hideBorder:focus-within {
          box-shadow: none;
        }
        .rect {
          width: 40px;
        }
        .icon-text {
          font-size: 11px;
          line-height: 16px;
          color: var(--input-label-color, var(--default-input-label-color));
        }
        .icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          --unity-icon-height: 24px;
          --unity-icon-width: 24px;
          color: var(--input-icon-valid-color, var(--default-input-icon-valid-color));
        }
        .inner-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          --unity-icon-height: var(--inner-icon-size, var(--default-inner-icon-size));
          --unity-icon-width: var(--inner-icon-size, var(--default-inner-icon-size));
          color: black;
        }
        .inner-icon.password {
          cursor: pointer;
        }
        .icon-error {
          color: var(--input-icon-error-color, var(--default-input-icon-error-color));
        }
        .icon-valid {

        }
        .dirty {
          background-color: var(--input-dirty-color, var(--default-input-dirty-color));
          width: 5px;
          height: calc(100% + 2px);
          position: absolute;
          left: -10px;
          top: -1px;
        }

        .required {
          color: var(--tertiary-1-color, var(--default-tertiary-1-color));
          font-size: 12px;
          line-height: 12px;
        }
        .required.field {
          position: relative;
          top: 1px;
          left: 19px;
        }
        .readOnly {
          border-color: var(--light-gray-1-color, var(--default-light-gray-1-color)) !important;
        }
        .disabled {
          border-color: var(--dark-grey-background, var(--default-dark-grey-background)) !important;
          background-color: var(--light-grey-background-color, var(--default-light-grey-background-color));
          color: var(--input-text-color, var(--default-input-text-color));
        }
        input.disabled {
          opacity: 50%;
        }
      `
    ]
  }
}

window.customElements.define('unity-text-input', UnityTextInput)
