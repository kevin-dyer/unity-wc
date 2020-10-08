import { LitElement, html, css } from 'lit-element'
import '@spectrum-web-components/checkbox/sp-checkbox.js'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'

/**
 * Displays three state checkmark
 * @name UnityCheckbox
 * @param {string} label, label to render next to the checkbox
 * @param {boolean} checked, whether the checkbox is checked
 * @param {boolean} indeterminate, whether the checkbox is in the indeterminate state, overrides checked
 * @param {boolean} disabled, whether the checkbox is disabled
 * @param {func} onChange, callback for returning the checkbox's new state
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
    this.onChange = ()=>{}
  }

  // inputs
  static get properties() {
    return {
      label: { type: String },
      checked: { type: Boolean },
      indeterminate: { type: Boolean },
      disabled: { type: Boolean },
      onChange: { type: Function }
    }
  }

  _handleClick() {
    const {
      checked: priorChecked,
      indeterminate: priorIndeterminate
    } = this
    this.checked = priorIndeterminate ? true : !priorChecked
    this.indeterminate = false
    this.onChange(this.checked)
  }

  render() {
    const {
      label,
      checked,
      indeterminate,
      disabled
    } = this
    const state = indeterminate ? 2 : checked ? 1 : 0
    return html`
      <sp-checkbox
        class="checkbox${disabled ? " disabled" : ""}"
        ?disabled="${disabled ? true : null}"
        ?checked="${state === 1 ? true : null}"
        ?indeterminate="${state === 2 ? true: null}"
        @change="${this._handleClick}"
      ><unity-typography>${label}</unity-typography></sp-checkbox>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --spectrum-checkbox-box-size: 16px;
          --spectrum-checkbox-box-border-radius: 1px;
          --spectrum-checkbox-box-border-size: 1px;
          --spectrum-icon-checkmark-small-height: 14px;
          --spectrum-icon-checkmark-small-width: 14px;
          --spectrum-icon-dash-small-height: 14px;
          --spectrum-icon-dash-small-width: 14px;
          --spectrum-checkbox-text-gap: 4px;

          /* Unselected */
          --spectrum-checkbox-emphasized-box-background-color: var(--white-color, var(--default-white-color));
          --spectrum-checkbox-emphasized-box-border-color: var(--gray-color, var(--default-gray-color));
          --spectrum-checkbox-emphasized-box-border-color-hover: var(--spectrum-checkbox-emphasized-box-border-color);
          --spectrum-checkbox-emphasized-box-border-color-down: var(--spectrum-checkbox-emphasized-box-border-color);

          /* Selected */
          --spectrum-checkbox-checkmark-color: var(--spectrum-checkbox-emphasized-box-background-color);
          --spectrum-checkbox-emphasized-box-border-color-selected: var(--primary-color, var(--default-primary-color));
          --spectrum-checkbox-emphasized-box-border-color-selected-hover: var(--primary-shade-color, var(--default-primary-shade-color));
          --spectrum-checkbox-emphasized-box-border-color-selected-down: var(--primary-shade-color, var(--default-primary-shade-color));

          /* Disabled */
          --spectrum-checkbox-emphasized-box-background-color-disabled: var(--light-gray-2-color, var(--default-light-gray-2-color));
          --spectrum-checkbox-emphasized-box-border-color-disabled: var(--spectrum-checkbox-emphasized-box-border-color);
        }

        sp-checkbox.checkbox {
          outline: none;
        }

        sp-checkbox.checkbox:hover {
          --spectrum-checkbox-emphasized-box-background-color: var(--primary-tint-1-color, var(--default-primary-tint-1-color));
        }

        sp-checkbox..checkbox.disabled {
          --spectrum-checkbox-checkmark-color: var(--gray-color, var(--default-gray-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-checkbox', UnityCheckbox)
