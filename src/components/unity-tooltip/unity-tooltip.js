import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'

/**
* Tooltip with optional arrow
* @name UnityTooltip
* @param {string} label, the text of the tooltip
* @param {string} arrow, direction of the tooltip arrow (top, bottom, right or left), optional
* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-tooltip
*   label="I am a tooltip"
*   arrow="bottom"
* ></unity-tooltip>
**/

class UnityTooltip extends LitElement {

  constructor() {
    super()
    this.label = ''
    this.arrow = ''
  }

  static get properties() {
    return {
      label: { type: String },
      arrow: { type: String }
    }
  }
  
  render() {
    const { label, arrow } = this
    let classes = 'tooltip'
    if (!!arrow) {
      classes += ` arrow ${arrow}`
    }
    return html`<span class=${classes}><unity-typography size="paragraph">${label}<unity-typography></span>`
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
      .tooltip {
        position: absolute;
        width: max-content;
        background-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        padding: 2px 8px;
        border-radius: 3px;
      }
      .arrow::after {
        content: " ";
        position: absolute;
        border-width: 5px;
        border-style: solid;
        border-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color)) transparent transparent transparent;
      }
      .left::after {
        left: -8px;
        bottom: 50%;
        margin-bottom: -5px;
        transform: rotate(90deg);
      }
      .bottom::after {
        left: 50%;
        margin-left: -5px;
      }
      .top::after {
        left: 50%;
        margin-left: -5px;
        transform: rotate(180deg);
        top: 0;
        margin-top: -8px;
      }
      .right::after {
        bottom: 50%;
        margin-bottom: -5px;
        transform: rotate(-90deg);
        right: 0;
        margin-right: -8px;
      `
    ]
  }
}

window.customElements.define('unity-tooltip', UnityTooltip)
