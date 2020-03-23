import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

const MIN_PANE_WIDTH = 20 // %
/**
 * A container to hold two views:
 *   1) one which will hold main content to always be rendered and fit to the full view
 *   2) and one to act in a modal-like fashion, to hold contextual information, and cause
 *      the other view to shrink in view but not in function
 * @name UnitySplitPane
 * @param {bool} show, controls if the other pane should be visible or not
 * @param {bool} closeButton, controls if the overlapping close button is rendered
 * @param {func} onClose, function to call whent he close button is clicked, sends new pane width in %
 * @param {number} paneWidth, width for the pane in percentage
 * @param {func} onResize, function to call when panel is being resized
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

class UnitySplitPane extends LitElement {
  constructor() {
    super()

    this.show = false
    this.closeButton = false
    this.onClose = ()=>{}
    this.paneWidth = 50
    this.onResize=()=>{}
    this._startingX = 0
  }

  static get properties() {
    return {
      show: { type: Boolean },
      closeButton: { type: Boolean },
      onClose: { type: Function },
      paneWidth: { type: Number },
      onResize: Function,
    }
  }

  handleMouseDown(e) {
    this._startingX = e.clientX
    this.mouseMoveListener = this.handleMouseMove.bind(this)
    this.mouseUpListener = this.handleMouseUp.bind(this)
    document.addEventListener('mousemove', this.mouseMoveListener)
    document.addEventListener('mouseup', this.mouseUpListener)
  }

  handleMouseMove(e) {
    const pane = this.shadowRoot.getElementById('pane')
    const splitPaneWidth = pane.clientWidth * 100 / this.paneWidth // get splitpane total width
    
    const deltaX = e.clientX - this._startingX
    const newWidth = this.paneWidth - (deltaX * 100 / splitPaneWidth) // curent % - increment %
    
    this.paneWidth = this._clipPaneWidth(newWidth)  
    this._startingX = e.clientX
    this.onResize(this.paneWidth) // callback
    this.requestUpdate('paneWidth')
  }

  //clean up event listener
  handleMouseUp() {
    document.removeEventListener('mousemove', this.mouseMoveListener)
    document.removeEventListener('mouseup', this.mouseUpListener)
  }

  _clipPaneWidth(width) {
    if (width < MIN_PANE_WIDTH) {
      return MIN_PANE_WIDTH  
    }
    else if (width > 100 - MIN_PANE_WIDTH) {
      return 100 - MIN_PANE_WIDTH
    }
    else {
      return width  
    }
  }

  render() {
    const {
      show,
      closeButton,
      onClose,
      paneWidth
    } = this
    return html`
      <div class="wrapper">
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="scroller">
          <div class="main" style="width: ${show? stretch(paneWidth) : "100"}%;">
            <slot name="main"></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <div id="pane" class="pane ${!show ? 'hide' : ''}" style="width: ${paneWidth}%;">
        <div
          class="resize-handle"
          @mousedown="${this.handleMouseDown}"
        ></div>
        ${!!closeButton ?
          html`
            <unity-button
              centerIcon="close"
              @click=${onClose}
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
          box-sizing: border-box;
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
        .resize-handle{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 8px;
          cursor: col-resize;
          z-index: 2;
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
