import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'

/**
* Tooltip with optional arrow
* @name UnityTooltip
* @param {string} label, the text of the tooltip
* @param {bool} hideArrow, optional flag to hide arrow triangle
* @param {string} alignment, tooltip position relative to content, defaults to 'right'. Options: 'left', 'top', 'right', 'bottom'
* @param {bool} disabled, disable on hover display of tooltip label
* @param {css} --tooltip-background-color, css var used for coloring tooltip background
* @param {css} --tooltip-padding, css var used for tooltip padding
* @param {css} --tooltip-margin, css var used for tooltip margin
* @param {css} --tooltip-border-radius, css var used for tooltip border radius


* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-tooltip
*   label="I am a tooltip"
    alignment='right'
*   ?showArrow=${true}
*   ?disabled=${false}
* ></unity-tooltip>
**/

const LEFT_ALIGNMENT = 'left'
const TOP_ALIGNMENT = 'top'
const RIGHT_ALIGNMENT = 'right'
const BOTTOM_ALIGNMENT = 'bottom'

//position arrow oposite to tooltip alignment
const arrowAlignment = {
  [LEFT_ALIGNMENT]: RIGHT_ALIGNMENT,
  [TOP_ALIGNMENT]: BOTTOM_ALIGNMENT,
  [RIGHT_ALIGNMENT]: LEFT_ALIGNMENT,
  [BOTTOM_ALIGNMENT]: TOP_ALIGNMENT
}


class UnityTooltip extends LitElement {

  constructor() {
    super()
    this.label = ''
    this.hideArrow = false
    this.disabled = false
    this.alignment = RIGHT_ALIGNMENT
  }

  static get properties() {
    return {
      label: { type: String },
      hideArrow: { type: Boolean},
      alignment: { type: String },
      disabled: { type: Boolean }
    }
  }

  getContainerClass() {
    let containerClasses = 'tooltip-container'
    if (this.disabled) containerClasses += ' disabled'

    return containerClasses
  }

  //TODO: handle 'auto' alignment
  getTooltipClass() {
    const {
      hideArrow,
      alignment=RIGHT_ALIGNMENT
    } = this
    let spanClasses = 'tooltip'

    if (!hideArrow) {
      spanClasses += ' arrow'
      if (!!alignment) {
        spanClasses += ` ${arrowAlignment[alignment]}-arrow`
      }
    }
    if (!!alignment) {
      spanClasses += ` ${alignment}-align`
    }

    return spanClasses
  }

  render() {
    const {
      label,
      disabled
    } = this
    const containerClasses = this.getContainerClass()
    const spanClasses = this.getTooltipClass()

    return html`
      <div class=${containerClasses}>
        <slot></slot>
        <span class=${spanClasses}>
          <unity-typography size="paragraph">${label}</unity-typography>
        </span>
      </div>
    `
  }


  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
      :host {
        --tooltip-background-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        --tooltip-padding: 2px 8px;
        --tooltip-border-radius: 3px;
      }

      unity-typography {
        line-height: normal;
      }

      .tooltip-container {
        position: relative;
      }

      .tooltip-container:hover .tooltip {
        display: block;
      }
      .tooltip-container.disabled:hover .tooltip {
        display: none;
      }
      .tooltip-container .tooltip {
        width: max-content;
        background-color: var(--tooltip-background-color, var(--default-medium-grey-background-color));
        padding: var(--tooltip-padding, 2px 8px);
        margin: var(--tooltip-margin, 0);
        border-radius: var(--tooltip-border-radius, 3px);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 200;
        display: none;
        pointer-events: none;
      }
      .tooltip-container .arrow::after {
        content: " ";
        position: absolute;
        border-width: 5px;
        border-style: solid;
        border-color: var(--tooltip-background-color, var(--default-medium-grey-background-color)) transparent transparent transparent;
      }
      .tooltip-container .left-arrow::after {
        left: -8px;
        bottom: 50%;
        margin-bottom: -5px;
        transform: rotate(90deg);
      }
      .tooltip-container .bottom-arrow::after {
        left: 50%;
        margin-left: -5px;
      }
      .tooltip-container .top-arrow::after {
        left: 50%;
        margin-left: -5px;
        transform: rotate(180deg);
        top: 0;
        margin-top: -8px;
      }
      .tooltip-container .right-arrow::after {
        bottom: 50%;
        margin-bottom: -5px;
        transform: rotate(-90deg);
        right: 0;
        margin-right: -8px;
      }
      .tooltip-container .tooltip.left-align {
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);

      }
      .tooltip-container .tooltip.right-align {
        top: 50%;
        left: 100%;
        transform: translate(0, -50%);
      }
      .tooltip-container .tooltip.bottom-align {
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0);
      }
      .tooltip-container .tooltip.top-align {
        top: 0;
        left: 50%;
        transform: translate(-50%, -100%);
      }
      `
    ]
  }
}

window.customElements.define('unity-tooltip', UnityTooltip)
