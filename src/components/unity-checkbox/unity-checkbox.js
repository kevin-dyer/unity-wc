import { LitElement, html, css } from 'lit-element'
import '@spectrum-web-components/checkbox/sp-checkbox.js'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays three state checkmark
 * @name UnityCheckbox
 * @param {string} label, label to render next to the checkbox
 * @param {boolean} checked, whether the checkbox is checked
 * @param {boolean} indeterminate, whether the checkbox is in the indeterminate state, must also be checked
 * @param {boolean} disabled, whether the checkbox is disabled
 * @return {LitElement} return s aclass extended from LitElement
 * @example
 *  <unity-checkbox
 *    label="Is Test?"
 *    checked
 *    indeterminate
 *  ></unity-checkbox>
 */

class UnityCheckbox extends LitElement {
  // internals
  constructor() {
    super()
    // defaults
    this.label = ''
    this.checked = false
    this.indeterminate = false
    this.disabled = false
  }

  // inputs
  static get properties() {
    return {
      label: { type: String },
      checked: { type: Boolean },
      indeterminate: { type: Boolean },
      disabled: { type: Boolean }
    }
  }

  render() {
    return html`
      <sp-checkbox></sp-checkbox>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --spectrum-checkbox-height: 16px;
          --spectrum-checkbox-box-size: 16px;
          --spectrum-checkbox-box-border-radius: 1px;
          --spectrum-checkbox-box-border-size: 1px;
          --spectrum-icon-checkmark-small-height: 11px;
          --spectrum-icon-checkmark-small-width: 14px;

          --spectrum-checkbox-emphasized-box-background-color: var(--white-color, var(--default-white-color));

          --spectrum-checkbox-emphasized-box-border-color: var(--gray-color, var(--default-gray-color));

          --spectrum-checkbox-checkmark-color: var(--spectrum-checkbox-emphasized-box-background-color);
          --spectrum-checkbox-emphasized-box-border-color-selected: var(--primary-color, var(--default-primary-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-checkbox', UnityCheckbox)
