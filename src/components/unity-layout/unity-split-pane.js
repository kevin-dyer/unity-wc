import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * A container to hold two views:
 *   1) one which will hold main content to always be rendered and fit to the full view
 *   2) and one to act in a modal-like fashion, to hold contextual information, and cause
 *      the other view to shrink in view but not in function
 * @name UnitySplitPane
 * @param {bool} show, controls if the other pane should be visible or not
 * @param {func} onClose, function to call whent he close button is clicked
 * @example
 *   <unity-split-pane
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
    this.onClose = ()=>{}
  }

  static get properties() {
    return {
      show: { type: Boolean },
      onClose: { type: Function }
    }
  }

  render() {
    const {
      show,
      onClose
    } = this

    return html`
      <div class="wrapper">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="scroller">
          <div class="main ${!!show ? 'stretch' : ''}">
            <slot name="main"></slot>
          </div>
        </div>
      </div>
      <div class="pane ${!show ? 'hide' : ''}">
        <unity-button
          centerIcon="close"
          @click=${onClose}
        ></unity-button>
        <slot name="pane"></slot>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --border-color: var(--border-color, var(--black-text-color, var(--default-black-text-color)));
          --background: var(--background-color, var(--default-background-color));
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
        .header {
          flex: 0;
        }
        .scroller {
          flex: 1;
          overflow-x: auto;
        }
        .main {
          height: 100%;
          width: 100%;
          overflow: auto;
        }
        .pane {
          position: relative;
          border: 1px solid black;
          border-right: 0;
          width: ${panelWidth}%;
          box-sizing: border-box;
        }
        .stretch {
          width: ${stretch(panelWidth)}%;
        }
        .hide {
          display: none;
        }
        unity-button {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 2;
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
