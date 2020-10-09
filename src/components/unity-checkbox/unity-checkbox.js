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

  _handleClick(e) {
    const {
      checked: priorChecked,
      indeterminate: priorIndeterminate
    } = this
    this.checked = priorIndeterminate ? true : !priorChecked
    this.indeterminate = false
    this.onChange(e, this.checked)
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
      >${label ? html`<unity-typography>${label}</unity-typography>` : ''}</sp-checkbox>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          display: flex;
          --spectrum-checkbox-box-size: var(--unity-checkbox-size, var(--default-unity-checkbox-size));
          --spectrum-checkbox-box-border-size: var(--unity-checkbox-border-size, var(--default-unity-checkbox-border-size));
          --spectrum-checkbox-box-border-radius: var(--unity-checkbox-border-radius, var(--default-unity-checkbox-border-radius));
          --checkbox-checkmark-size: calc(var(--spectrum-checkbox-box-size) * .625);
          --spectrum-icon-checkmark-small-height: var(--checkbox-checkmark-size);
          --spectrum-icon-checkmark-small-width: var(--checkbox-checkmark-size);
          --spectrum-icon-dash-small-height: var(--checkbox-checkmark-size);
          --spectrum-icon-dash-small-width: var(--checkbox-checkmark-size);
          --spectrum-checkbox-text-gap: var(--unity-checkbox-text-margin, var(--default-unity-checkbox-text-margin));

          --font-color: var(--unity-checkbox-text-color, var(--default-unity-checkbox-text-color));
          --font-size: var(--unity-checkbox-text-size, var(--default-unity-checkbox-text-size));

          /* Backgrounds */
          --spectrum-checkbox-emphasized-box-background-color: var(--unity-checkbox-background-color, var(--default-unity-checkbox-background-color));
          --spectrum-checkbox-emphasized-box-background-color-disabled: var(--unity-checkbox-background-color-disabled, var(--unity-checkbox-background-color-disabled));

          /* Borders */
          --spectrum-checkbox-emphasized-box-border-color: var(--unity-checkbox-border-color, var(--default-unity-checkbox-border-color));
          --spectrum-checkbox-emphasized-box-border-color-hover: var(--unity-checkbox-border-color, var(--default-unity-checkbox-border-color));
          --spectrum-checkbox-emphasized-box-border-color-down: var(--unity-checkbox-border-color, var(--default-unity-checkbox-border-color));
          --spectrum-checkbox-emphasized-box-border-color-selected: var(--unity-checkbox-color, var(--default-unity-checkbox-color));
          --spectrum-checkbox-emphasized-box-border-color-selected-hover: var(--unity-checkbox-color-hover, var(--default-unity-checkbox-color-hover));
          --spectrum-checkbox-emphasized-box-border-color-selected-down: var(--unity-checkbox-color-hover, var(--default-unity-checkbox-color-hover));
          --spectrum-checkbox-emphasized-box-border-color-disabled: var(--unity-checkbox-color-disabled, var(--default-unity-checkbox-color-disabled));

          /* Icon */
          --spectrum-checkbox-checkmark-color: var(--unity-checkbox-checkmark-color, var(--default-unity-checkbox-checkmark-color));
        }

        sp-checkbox.checkbox {
          outline: none;
        }

        sp-checkbox.checkbox.disabled {
          --spectrum-checkbox-checkmark-color: var(--unity-checkbox-checkmark-color-disabled, var(--default-unity-checkbox-checkmark-color-disabled));
        }

        sp-checkbox.checkbox:hover {
          --spectrum-checkbox-emphasized-box-background-color: var(--unity-checkbox-background-color-hover, var(--unity-checkbox-background-color-hover));
        }

        sp-checkbox.checkbox.disabled unity-typography {
          --font-color: var(--unity-checkbox-text-color-disabled, var(--default-unity-checkbox-text-color-disabled));
        }
      `
    ]
  }
}

window.customElements.define('unity-checkbox', UnityCheckbox)
