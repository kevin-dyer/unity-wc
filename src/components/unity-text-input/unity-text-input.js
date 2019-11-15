import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-input/paper-input.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a bordered text input
* @name UnityTextInput
* @param {''} text, the text defaulted text in the field
* @param {func} onChange, function to handle changes to the field, receives current text value, false if validation fails
* @param {''} title, floating header title
* @param {''} placeholder, initial text to be overwritten
* @param {''} remark, text to render below input field
* @param {bool} charCount, show current char count
* @param {bool} disabled, controls if field is enabled/disabled, defaults: false (enabled)
* @param {''} units, right bound units
* @param {''} hint, text to show when hovering over/clicked on hint icon
* @param {bool} password, converts characters to dots/password field
* @param {func} validation, func that takes input, returns true/false to control if input is accepted
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

    // internals
    this._valid = this.validation ? false : true
  }

  static get properties() {
    return {

      // internals
      _valid: { type: Boolean }
    }
  }

  render() {
    return html`
      <div>
        This is an input (eventually).
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css``
    ]
  }
}

window.customElements.define('unity-text-input', UnityTextInput)
