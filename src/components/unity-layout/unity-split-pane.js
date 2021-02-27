import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import { trimWhitespace } from '@bit/smartworks.unity.unity-utils'

const MIN_PANE_WIDTH = 20 // %
/**
 * A container to hold two views:
 *   1) one which will hold main content to always be rendered and fit to the full view
 *   2) and one to act in a modal-like fashion, to hold contextual information, and cause
 *      the other view to shrink in view but not in function
 * @name UnitySplitPane
 * @param {Boolean} show, controls if the right pane should be visible or not
 * @param {Boolean} collapsed, controls if the left pane is collapsed or not
 * @param {Boolean} closeButton, controls if the overlapping close button is rendered
 * @param {Boolean} collapseButton, controls whether the collapse button is rendered
 * @param {String} label, text to show inside the bar when the main pane is collapsed
 * @param {Number} paneWidth, width for the pane in percentage
 * @param {Function} onClose, function to call when the close button is clicked, sends new pane width in %
 * @param {Function} onCollapseChange, function to call when the collapse changes, true for collapsed, false for expanded
 * @param {Function} onResize, function to call when panel is being resized

 * @param {Array} visiblePanes, list of panes to be visible, first pane is always visible
 * @param {Array} collapsedPanes, list of panes to be collapsed

 * @example
 *   <unity-split-pane
 *     closeButton
 *     collapseButton
 *     label="Split Pane"
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
 *
 * CSS variables:
 *   --border-color       -
 *   --bar-border-color
 *   --background
 *   --bar-background
 *   --pane-border-width
 *   --pane-border-color
 *   --pane-z-index
 *   --bar-width
 *   --header-border
 *   --collapse-button-padding
 */

const stretch = overlapPercent => 100 - overlapPercent

const shouldUpdateSet = (one, two) => {
  if (one.size !== two.size) return true
  for (let key of two) {
    if (!one.has(key)) return true
  }
  return false
}

class UnitySplitPane extends LitElement {
  constructor() {
    super()

    this._show = false
    this.label = ''
    this.collapsed = false
    this.closeButton = false
    this.collapseButton = false
    this.onClose = ()=>{}
    this.onCollapseChange = ()=>{}
    this.paneWidth = 50
    this.onResize=()=>{}
    this._startingX = 0

    this._visiblePanes = new Set()
    this._collapsedPanes = new Set()
    this._paneKeys = new Set()
  }

  static get properties() {
    return {
      show: { type: Boolean },
      label: { type: String },
      collapsed: { type: Boolean },
      closeButton: { type: Boolean },
      collapseButton: { type: Boolean },
      onClose: { type: Function },
      onCollapseChange: { type: Function },
      paneWidth: { type: Number },
      onResize: { type: Function },

      visiblePanes: { type: Array },
      collapsedPanes: { type: Array },
      paneKeys: { attribute: false }
    }
  }

  set show(value) {
    const newValue = Boolean(value)
    const oldValue = this._show
    if (oldValue === true && newValue === false) this.onClose(this.paneWidth)

    this._show = newValue
    this.requestUpdate('show', oldValue)
  }

  get show() { return this._show }

  set paneKeys(value) {
    const {
      visiblePanes,
      collapsedPanes,
      _paneKeys: oldValue
    } = this
    this._paneKeys = value
    // make sure to set a default of the first pane if empty
    if (!visiblePanes || Object.entries(visiblePanes).length === 0)
      this.visiblePanes = [value.values().next().value]
    this.requestUpdate('paneKeys', oldValue)
  }

  get paneKeys() { return this._paneKeys }

  set visiblePanes(value) {
    const oldValue = this._visiblePanes
    let newValues = new Set(values)
    // add first paneKey to newValues
    newValues.add(this._pan)

    if (shouldUpdateSet(oldValue, newValues)) {
      this._visiblePanes = newValues
      this.requestUpdate('visiblePanes', oldValue)
    }
  }

  get visiblePanes() { return this._visiblePanes }

  connectedCallback() {
    super.connectedCallback()
    this.shadowRoot.addEventListener('slotchange', event => this.processSlots());
  }

  // gets all slots passed into template, processes to get keys to make slots from
  // skips any ending with ::header or ::footer
  processSlots() {
    // get all slots
    const slots = [...this.shadowRoot.querySelectorAll('slot')]
    // get the assigned nodes and trim any excess whitespace
    const slotContent = slots.map(slot => trimWhitespace(slot && slot.assignedNodes() || []))
    // iterate to get the keys of just the panes
    const slotKeys = slotContent.reduce((keys, slottedNodes) => {
      const node = slottedNodes[0]
      // skip if empty
      if (!node) return keys
      // skip if slot has ::header || ::footer
      if (/(::header$)|(::footer$)/.test(node.slot)) return keys
      keys.add(node.slot)
    }, new Set())
    // make into set
    let newPaneKeys = new Set(slotKeys)
    // compare to current paneKeys to see if update is needed
    const { _paneKeys } = this
    if (shouldUpdateSet(_paneKeys, newPaneKeys)) this._paneKeys = newPaneKeys
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

  toggleCollapse(value=!this.collapsed) {
    this.collapsed = value
    this.onCollapseChange(value)
  }

  closePane() {
    this.show = false
    this.toggleCollapse(false)
  }

  handleBarClick(e) {
    this.toggleCollapse(false)
  }

  renderBar() {
    const { label } = this
    return html`
      <unity-typography style="display: flex;">
        <div class="bar" @click=${this.handleBarClick}>
          <div class="bar-icon-wrapper">
            <unity-icon icon="unity:expand_horizontal"></unity-icon>
          </div>
          <div class="bar-label-wrapper">
            <p class="bar-label">${label}</p>
          </div>
        </div>
      </unity-typography>
    `
  }


  render() {
    const {
      show,
      closeButton,
      collapseButton,
      collapsed,
      paneWidth
    } = this
    return html`
      ${show && collapsed ? this.renderBar() : ''}
      <div class="wrapper ${show && collapsed ? 'hide' : ''}">
        <div class="header">
          <slot name="header"></slot>
          ${(collapseButton) ? html`
            <unity-button
              class="collapse-button"
              centerIcon="unity:compress"
              @click=${() => this.toggleCollapse()}
              type="borderless"
              ?disabled="${!show}"
            ></unity-button>
          `: ''}
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
              type="borderless"
              class="close-button"
              centerIcon="close"
              @click=${this.closePane}
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
          --border-color: var(--gray-color, var(--default-gray-color));
          --bar-border-color: var(--gray-color, var(--default-gray-color));
          --background: var(--white-color, var(--default-white-color));
          --bar-background: var(--background);
          --pane-border-width: 1px;
          --pane-border-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-pane-z-index: 3;
          --bar-width: 40px;
          --header-border: none;
          --collapse-button-padding: var(--padding-size-sm, var(--default-padding-size-sm));
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
          position: relative;
        }
        .wrapper.hide {
          display: none;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: var(--header-border);
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
        .main ::slotted(*) {
          width: 100%;
        }
        .pane {
          position: relative;
          border-left: var(--pane-border-width) solid var(--pane-border-color);
          box-sizing: border-box;
          z-index: var(--pane-z-index, var(--default-pane-z-index));
        }
        .hide {
          display: none;
        }
        unity-button.close-button {
          position: absolute;
          z-index: 10;
          top: 0;
          right: 0;
        }
        .bar {
          width: var(--bar-width);
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          border-right: 1px solid var(--bar-border-color);
          background-color: var(--bar-background);
        }
        .bar-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: var(--bar-width);
          width: var(--bar-width);
        }
        .bar-label-wrapper {
          flex: 1;
          display: flex;
          align-items: flex-start;
          white-space: nowrap;
        }
        .bar-label {
          transform: rotate(-90deg) translate(-50%);
          margin: 0;
        }
        .resize-handle {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 8px;
          cursor: col-resize;
          z-index: 5;
        }
        unity-icon {
          --unity-icon-height: var(--medium-icon-size, var(--default-medium-icon-size));
          --unity-icon-width: var(--medium-icon-size, var(--default-medium-icon-size));
        }
        .collapse-button {
          padding: var(--collapse-button-padding);
          --unity-button-height: 27px;
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
