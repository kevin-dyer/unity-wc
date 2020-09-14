import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js'
import '@bit/smartworks.unity.unity-icon-set'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Renders a clickable switch icon that toggles between on and off / true and false
 * @name UnityToggleSwitch
 * @param {bool} value, true/false value of the switch
 * @param {''} label, string label above switch
 * @param {''} onLabel, string for label on 'on' side, right
 * @param {''} offLabel, string for label on 'off' side, left
 * @param {''} remark, string for comment under the switch
 * @param {bool} disabled, whether the switch should be disabled or not
 * @param {func} onChange, function for responding to change, receives true/false
 * @example
 * <unity-toggle-switch
 *   .label="${"Valve"}"
 *   ?value="${true}"
 *   .onLabel="${"Open"}"
 *   .offLabel="${"Closed"}"
 *   .onChange="${report}"
 *   .remark="${Whether water is running through the valve.}"
 * ></unity-toggle-switch>
 * 
 * CSS variables:
 * --color: switch color
 * --size: switch size, used for both width and height to maintain proportions
 * --on-color: color for 'on' label
 * --off-color: color for 'off' label
 **/

class UnityToggleSwitch extends LitElement {
  constructor() {
    super()

    this.value = false
    this.label = ''
    this.onLabel = ''
    this.offLabel = ''
    this.remark = ''
    this.disabled = false
    this.onChange = ()=>{}
  }

  static get properties() {
    return {
      value: { type: Boolean },
      label: { type: String },
      onLabel: { type: String },
      offLabel: { type: String },
      remark: { type: String },
      disabled: { type: Boolean },
      onChange: { type: Function }
    }
  }

  toggle() {
    if (!this.disabled) {
      const next = !this.value
      this.onChange(next)
      this.value = next
    }
  }

  render() {
    const {
      value,
      label,
      onLabel,
      offLabel,
      remark,
      disabled,
      toggle
    } = this
    const switchMode = `unity:toggle_${value ? 'on' : 'off'}`
    return html`
      <div class="wrapper">
        ${label ? html`<unity-typography size="paragraph" color="dark" class="label">
          ${label}
        </unity-typography>` : null}
        <div class="switch-container">
          ${offLabel ? html`<unity-typography size="paragraph" class="off-label switch">
            ${offLabel}
          </unity-typography>` : null}
          <iron-icon class="switch toggle${disabled ? ' disabled' : ''}" icon="${switchMode}" @click="${toggle}"></iron-icon>
          ${onLabel ? html`<unity-typography size="paragraph" class="on-label switch">
            ${onLabel}
          </unity-typography>` : null}
        </div>
        ${remark ? html`<unity-typography size="paragraph" color="dark" class="remark">
          ${remark}
        </unity-typography>` : null}
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --color: var(--switch-color, var(--default-primary-brand-color));
          --size: var(--switch-size, 24px);
          --on-color: var(--on-label-color, var(--default-black-text-color));
          --off-color: var(--off-label-color, var(--default-black-text-color));
          display: inline-block;
          user-select: none;
        }
        .wrapper {
          display: flex;
          flex: 1;
          flex-direction: column;
        }
        .switch-container {
          white-space: nowrap;
        }
        .switch {
          display: inline-block;
          align-self: center;
        }
        .off-label {
          --font-color: var(--off-color);
        }
        .on-label {
          --font-color: var(--on-color);
        }
        .toggle {
          flex: 0;
          flex-basis: auto;
          padding: 0 6px;
          height: var(--size);
          width: var(--size);
          cursor: pointer;
          color: var(--color);
        }
        iron-icon.disabled {
          color: var(--dark-grey-background-color, var(--default-dark-grey-background-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-toggle-switch', UnityToggleSwitch)
