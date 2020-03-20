import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon-set'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * A container to hold two views:
 *   1) one which will hold main content to always be rendered and fit to the full view
 *   2) and one to act in a modal-like fashion, to hold contextual information, and cause
 *      the other view to shrink in view but not in function
 * @name UnitySplitPane
 * @param {bool} show, controls if the other pane should be visible or not
 * @param {bool} closeButton, controls if the overlapping close button is rendered
 * @param {func} onClose, function to call whent he close button is clicked
 * @example
 *   <unity-split-pane
 *     closeButton
 *     show=${showDetails}
 *     onClose="${toggleShowDetails}"
 *   >
 *     <div slot="main">
 *       Content
 *     </div>
 *     <div slot="pane">
 *       Details
 *     </div>
 *   </unity-split-pane>
 */

const stretch = overlapPercent => (100 / (100 - overlapPercent)) * 100
const panelWidth = 50

class UnitySplitPane extends LitElement {
  constructor() {
    super()

    this.show = false
    this.closeButton = false
    this.collapsed = false
    this.onClose = ()=>{}
  }

  static get properties() {
    return {
      show: { type: Boolean },
      closeButton: { type: Boolean },
      collapsed: { type: Boolean },
      onClose: { type: Function }
    }
  }

  collapse() {
    this.collapsed = true
    this.requestUpdate('collapsed')
  }

  expand() {
    this.collapsed = false
    this.requestUpdate('collapsed')
  }

  closePane() {
    this.expand()
    this.onClose()
  }

  render() {
    const {
      show,
      closeButton,
      collapsed,
    } = this
    return html`
      ${collapsed? html`<div class="bar" @click=${()=>this.expand()}><iron-icon icon="unity:double_right_chevron"></iron-icon></div>` : ''}
      <div class="wrapper ${collapsed?'hide':''}">
        ${show ? html`<unity-button class="collapse-button" centerIcon="unity:double_left_chevron" @click=${()=>this.collapse()}></unity-button>`: ''}
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="scroller">
          <div class="main ${!!show ? 'stretch' : ''}">
            <slot name="main"></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="pane ${!show ? 'hide' : ''} ${collapsed ? 'fullwidth' : ''}">
        ${!!closeButton ?
          html`
            <unity-button
              class="close-button"
              centerIcon="close"
              @click=${() => this.closePane()}
            ></unity-button>`
          : null
        }
        <slot name="pane"></slot>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --border-color: var(--black-text-color, var(--default-black-text-color));
          --bar-border-color: var(--light-grey-text-color, var(--default-light-grey-text-color));
          --background: var(--background-color, var(--default-background-color));
          --bar-background: var(--background-color, var(--default-background-color));
          background-color: var(--background);
          display: flex;
          flex-direction: row;
          height: 100%;
          width: 100%;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }
        .wrapper.hide {
          display: none;
        }
        .header {
          flex: 0;
        }
        .footer {
          flex: 0;
        }
        .scroller {
          flex: 1;
          display: flex;
          overflow-x: auto;
        }
        .scroller ::slotted(*) {
          flex: 1;
          display: flex;
        }
        .main {
          height: 100%;
          width: 100%;
          overflow: auto;
          flex: 1;
          display: flex;

        }
        .pane {
          position: relative;
          border-left: 1px solid var(--border-color);
          width: ${panelWidth}%;
          box-sizing: border-box;
        }
        .pane.fullwidth {
          width: 100%;
        }
        .stretch {
          width: ${stretch(panelWidth)}%;
        }
        .hide {
          display: none;
        }
        unity-button {
          position: absolute;
          z-index: 2;
        }
        .collapse-button {
          margin-top: -8px;
          margin-left: -8px;
        }
        unity-button.close-button {
          top: 0;
          right: 0;
        }
        .bar {
          width: 40px;
          display: flex;
          cursor: pointer;
          border-right: 1px solid var(--bar-border-color);
          background-color: var(--bar-background);
        }
        .bar iron-icon {
          margin: auto;
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
