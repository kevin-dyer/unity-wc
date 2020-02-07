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
    // need .main to fill the entire space as if .pane didn't exist
    // .main needs to shrink itself when pane is open, but not what's inside of it
    return html`
      <div class="wrapper">
        <div class="main">
          <slot name="main"></slot>
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
          display: flex;
          flex-direction: row;
          height: 100%;
          width: 100%;
        }
        .wrapper {
          flex: 1;
          overflow: auto;
        }
        .main {
          height: 100%;
          width: max-content;
        }
        .pane {
          height: 100%;
          border: 1px solid black;
          background-color: white;
          min-width: 33%;
          box-sizing: border-box;
          // z-index: 1;
        }
        .hide {
          display: none;
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
