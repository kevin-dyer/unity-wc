import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon-set'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

const MIN_PANE_WIDTH = 20 // %
/**
 * A container to hold two views:
 *   1) one which will hold main content to always be rendered and fit to the full view
 *   2) and one to act in a modal-like fashion, to hold contextual information, and cause
 *      the other view to shrink in view but not in function
 * @name UnitySplitPane
 * @param {bool} show, controls if the right pane should be visible or not
 * @param {bool} collapsed, controls if the left pane is collapsed or not
 * @param {bool} closeButton, controls if the overlapping close button is rendered
 * @param {bool} collapseButton, controls of the overlappy collapse button is rendered
 * @param {func} onClose, function to call when the close button is clicked, sends new pane width in %
 * @param {func} onCollapseChange, function to call when the collapse changes, true for collapsed, false for expanded
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

    this._show = false
    this.collapsed = false
    this.closeButton = false
    this.collapseButton = false
    this.onClose = ()=>{}
    this.onCollapseChange = ()=>{}
    this.paneWidth = 50
    this.onResize=()=>{}
    this._startingX = 0
  }

  static get properties() {
    return {
      show: { type: Boolean },
      collapsed: { type: Boolean },
      closeButton: { type: Boolean },
      collapseButton: { type: Boolean },
      onClose: { type: Function },
      onCollapseChange: { type: Function },
      paneWidth: { type: Number },
      onResize: { type: Function }
    }
  }

  set show(value) {
    const newValue = Boolean(value)
    const oldValue = this._show
    if (oldValue === true && newValue === false) this.onClose(this.paneWidth)

    this._show = newValue
    this.requestUpdate('show', newValue)
  }

  get show() { return this._show }


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

  toggleCollapse(value=!this.collapsed) {
    this.collapsed = value
    this.onCollapseChange(value)
  }

  closePane() {
    this.show = false
    this.toggleCollapse(false)
  }

  render() {
    const {
      show,
      closeButton,
      collapseButton,
      collapsed,
      onClose,
      paneWidth
    } = this
    return html`
      ${show && collapsed ? html`<div class="bar" @click=${()=>this.toggleCollapse()}><iron-icon class="show-button" icon="unity:double_right_chevron"></iron-icon></div>` : ''}
      <div class="wrapper ${show && collapsed?'hide':''}">
        ${(collapseButton && show) ? html`<unity-button class="collapse-button" centerIcon="unity:double_left_chevron" @click=${()=>this.toggleCollapse()}></unity-button>`: ''}
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
      <div id="pane" class="pane ${!show ? 'hide' : ''}" style="width: ${collapsed?'100':paneWidth}%;">
        <div
          class="resize-handle"
          @mousedown="${this.handleMouseDown}"
        ></div>
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
          border-left: var(--bar-width, 1px) solid var(--border-color);
          box-sizing: border-box;
        }
        .hide {
          display: none;
        }
        unity-button {
          position: absolute;
          z-index: 10;
        }
        .collapse-button {
          margin-top: 10px;
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
        .resize-handle{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 8px;
          cursor: col-resize;
          z-index: 5;
        }
        .show-button {
          color: var(--button-color, var(--primary-brand-color, var(--default-primary-brand-color)));
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
