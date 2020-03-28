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
 **/

class UnityToggleSwitch extends LitElement {
  constructor() {
    super()

    this.value = false
    this.label = ''
    this.onLabel = ''
    this.offLabel = ''
    this.remark = ''
    this.onChange = ()=>{}
  }

  static get properties() {
    return {
      value: { type: Boolean },
      label: { type: String },
      onLabel: { type: String },
      offLabel: { type: String },
      remark: { type: String },
      onChange: { type: Function }
    }
  }

  toggle() {
    const next = !this.value
    this.onChange(next)
    this.value = next
  }

  render() {
    const {
      value,
      label,
      onLabel,
      offLabel,
      remark,
      toggle
    } = this
    const switchMode = `unity:toggle_${value ? 'on' : 'off'}`
    return html`
      ${label ? html`<unity-typography size="paragraph" color="medium" class="label">
        ${label}
      </unity-typography>` : null}
      <div class="switch-container">
        ${offLabel ? html`<unity-typography size="paragraph" class="off-label switch">
          ${offLabel}
        </unity-typography>` : null}
        <iron-icon class="switch toggle" icon="${switchMode}" @click="${toggle}"></iron-icon>
        ${onLabel ? html`<unity-typography size="paragraph" class="on-label switch">
          ${onLabel}
        </unity-typography>` : null}
      </div>
      ${remark ? html`<unity-typography size="paragraph" color="dark" class="remark">
        ${remark}
      </unity-typography>` : null}
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
        }
        .switch-container {
          display: flex;
          white-space: nowrap;
        }
        .switch {
          display: flex;
          flex: 1;
          align-self: center;
        }
        .off-label {
          justify-content: flex-end;
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

      `
    ]
  }
}

window.customElements.define('unity-toggle-switch', UnityToggleSwitch)
