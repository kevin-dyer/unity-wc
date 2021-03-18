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
 * @name UnityMultiPane
 * @param {Boolean} closeButton, controls if the overlapping close button is rendered
 * @param {Boolean} collapseButton, controls whether the collapse button is rendered
 * @param {Object} labels, text to show inside the bars when the main pane is collapsed, {paneKey: label, ...}
 * @param {Function} onClose, function to call when the close button is clicked
 * @param {Function} onCollapseChange, function to call when the collapse changes, true for collapsed, false for expanded
 * @param {Array} visiblePanes, list of panes to be visible, first pane is always visible
 * @param {Array} collapsedPanes, list of panes to be collapsed

 * @example
 *   <unity-multi-pane
 *     closeButton
 *     collapseButton
 *     labels={main: "Multi Pane"}
 *     show=${showDetails}
 *     onClose="${toggleShowDetails}"
 *   >
 *     <div slot="main">
 *       Content
 *     </div>
 *     <div slot="pane">
 *       Details
 *     </div>
 *   </unity-multi-pane>
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
 *   --close-button-padding
 */

const shouldUpdateSet = (one, two) => {
  if (one.size !== two.size) return true
  for (let key of two) {
    if (!one.has(key)) return true
  }
  return false
}

const clipPaneWidth = width => {
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

class UnityMultiPane extends LitElement {
  constructor() {
    super()

    this._labels = {}
    this.closeButton = false
    this.collapseButton = false
    this._visiblePanes = new Set()
    this._collapsedPanes = new Set()
    this.onClose = ()=>{}
    this.onCollapseChange = ()=>{}

    // internals
    this.paneWidths = {}
    this._startingX = 0
    this._paneKeys = new Set()
  }

  static get properties() {
    return {
      labels: { type: Object },
      closeButton: { type: Boolean },
      collapseButton: { type: Boolean },
      onClose: { type: Function },
      onCollapseChange: { type: Function },
      visiblePanes: { type: Array },
      collapsedPanes: { type: Array },
      paneWidths: { attribute: false },
      paneKeys: { attribute: false }
    }
  }

  // when paneKeys is updated, it will set it's value before checking visiblePanes, labels, or paneWidths,
  // but it won't consider it an update until after the other three have finished
  set paneKeys(value) {
    const {
      visiblePanes,
      collapsedPanes,
      _paneKeys: oldValue,
      labels,
      // paneWidths
    } = this
    this._paneKeys = value

    // trigger set to make sure defaults are set
    this.visiblePanes = visiblePanes
    this.labels = labels
    this.processWidths()

    this.requestUpdate('paneKeys', oldValue)
  }

  get paneKeys() { return this._paneKeys }

  set visiblePanes(value) {
    const {
      visiblePanes: oldValue,
      paneKeys
    } = this
    let unorderedValue = value
    if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Set)) {
      unorderedValue = Object.entries(value).reduce((list, [key, value]) => !!value ? [...list, key] : list, [])
    }
    unorderedValue = new Set(unorderedValue)
    // order values into new set, starting with first value, just use unorderedValue if paneKeys aren't set
    let newValue = paneKeys.size !== 0 ? new Set([paneKeys.values().next().value]) : unorderedValue
    for (let pane of paneKeys) {
      if (unorderedValue.has(pane) && paneKeys.has(pane)) newValue.add(pane)
    }

    if (shouldUpdateSet(oldValue, newValue)) {
      this._visiblePanes = newValue
      this.requestUpdate('visiblePanes', oldValue)
      this.collapsedPanes = this.collapsedPanes
      this.processWidths()
    }
  }

  get visiblePanes() { return this._visiblePanes }

  set collapsedPanes(value) {
    const { visiblePanes } = this
    const oldValue = this.collapsedPanes
    let uncheckedValue = value
    if (typeof value === 'object' && !Array.isArray(value) && !(value instanceof Set)) {
      uncheckedValue = Object.entries(value).reduce((list, [key, value]) => !!value ? [...list, key] : list, [])
    }
    uncheckedValue = new Set(uncheckedValue)

    // check that collapsedPanes are in visiblePanes
    let newValue = new Set()
    for (let pane of uncheckedValue) {
      const isLast = [...visiblePanes][visiblePanes.size - 1] === pane
      if (!isLast && visiblePanes.has(pane)) newValue.add(pane)
      else if (isLast) this.onCollapseChange({ key: pane, collapsed: false })
    }

    if (shouldUpdateSet(oldValue, newValue)) {
      this._collapsedPanes = newValue
      this.requestUpdate('collapsedPanes', oldValue)
      this.processWidths()
    }
  }

  get collapsedPanes() { return this._collapsedPanes }

  set labels(value) {
    const {
      labels: oldValue,
      paneKeys
    } = this

    let newValue = {...value}
    let shouldUpdate = false

    if (paneKeys.size === 0) {
      this._labels = newValue
      this.requestUpdate('labels', oldValue)
      return
    }
    // iterate paneKeys to make sure a default label is set, and check for needed update
    for (let key of paneKeys) {
      if (!newValue[key]) newValue[key] = key
      if (!shouldUpdate && oldValue[key] !== newValue[key]) shouldUpdate = true
    }

    if (shouldUpdate) {
      this._labels = newValue
      this.requestUpdate('labels', oldValue)
    }
  }

  get labels() { return this._labels }

  connectedCallback() {
    super.connectedCallback()
    this.processSlots()
    this.shadowRoot.addEventListener('slotchange', event => this.processSlots(event));
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('slotchange', event => this.processSlots(event));
    super.disconnectedCallback()
  }

  // gets all slots passed into template, processes to get keys to make slots from
  // skips any ending with ::header or ::footer
  processSlots() {
    // get all slots
    const slottedContent = [...this.children]
    // iterate to get the keys of just the panes
    const slotKeys = slottedContent.reduce((keys, slottedNodes) => {
      const node = slottedNodes
      // skip if empty
      if (!node) return keys
      // skip if slot has ::header || ::footer
      if (/(::header$)|(::footer$)/.test(node.slot)) return keys
      keys.push(node.slot)
      return keys
    }, [])
    // make into set
    let newPaneKeys = new Set(slotKeys)
    // compare to current paneKeys to see if update is needed
    const { paneKeys } = this
    if (shouldUpdateSet(paneKeys, newPaneKeys)) this.paneKeys = newPaneKeys
  }

  processWidths() {
    const {
      visiblePanes,
      collapsedPanes
    } = this

    // get number of visible panes
    // remove factor for each collapsed
    const numPanes = visiblePanes.size - collapsedPanes.size
    const evenWidth = 100/numPanes
    let newPaneWidths = {}
    for (let pane of visiblePanes) {
      if (!collapsedPanes.has(pane)) newPaneWidths[pane] = evenWidth > MIN_PANE_WIDTH ? evenWidth : MIN_PANE_WIDTH
    }
    this.paneWidths = newPaneWidths
  }

  handleMouseDown(e, paneKey, nextPaneKey) {
    this._startingX = e.clientX
    this.mouseMoveListener = this.handleMouseMove.bind(this, paneKey, nextPaneKey)
    this.mouseUpListener = this.handleMouseUp.bind(this)
    document.addEventListener('mousemove', this.mouseMoveListener)
    document.addEventListener('mouseup', this.mouseUpListener)
  }

  handleMouseMove(paneKey, nextPaneKey, e) {
    const {
      shadowRoot,
      paneWidths,
      paneWidths: {
        [nextPaneKey]: nextPaneWidth,
        [paneKey]: paneWidth
      }={}
    } = this
    const pane = shadowRoot.getElementById(paneKey)
    const multiPaneWidth = pane.clientWidth * 100 / paneWidth // get multipane total width
    const deltaX = e.clientX - this._startingX
    const newWidth = paneWidth + (deltaX * 100 / multiPaneWidth) // curent % - increment %

    let newPaneWidth = clipPaneWidth(newWidth)
    const newNextPaneWidth = nextPaneWidth + (paneWidth - newPaneWidth)
    if (newNextPaneWidth <= MIN_PANE_WIDTH) newPaneWidth = newPaneWidth - (20 - newNextPaneWidth)
    this.paneWidths = {
      ...paneWidths,
      [nextPaneKey]: clipPaneWidth(newNextPaneWidth),
      [paneKey]: newPaneWidth
    }
    this._startingX = e.clientX
  }

  //clean up event listener
  handleMouseUp() {
    document.removeEventListener('mousemove', this.mouseMoveListener)
    document.removeEventListener('mouseup', this.mouseUpListener)
  }

  toggleCollapse(paneKey='', value=!this.collapsedPanes.has(paneKey)) {
    // create a new set to avoid unwanted mutations
    let newCollapsedPanes = new Set(this.collapsedPanes)
    if (newCollapsedPanes.has(paneKey) || value === false) newCollapsedPanes.delete(paneKey)
    else newCollapsedPanes.add(paneKey)
    this.collapsedPanes = newCollapsedPanes
    this.onCollapseChange({key: paneKey, collapsed: value})
  }

  closePane(e, paneKey) {
    let { paneKeys, visiblePanes } = this
    if(paneKeys.values().next().value !== paneKey) {
      // create a new set to avoid unwanted mutations
      let newVisiblePanes = new Set(visiblePanes)
      newVisiblePanes.delete(paneKey)
      this.visiblePanes = newVisiblePanes
      this.onClose(paneKey)
    }
  }

  handleBarClick(e, paneKey) {
    this.toggleCollapse(paneKey, false)
  }

  renderBar(paneKey) {
    const { labels: { [paneKey]: label } } = this
    return html`
      <unity-typography id="collapse-bar" style="display: flex;">
        <div class="bar" @click=${e=>this.handleBarClick(e, paneKey)}>
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

  renderPane(paneKey, order) {
    const {
      visiblePanes,
      collapsedPanes,
      collapseButton,
      paneKeys,
      paneWidths: {
        [paneKey]: paneWidth
      }={},
      closeButton
    } = this
    const first = order === 0
    const last = (order + 1) === visiblePanes.size
    const show = first || visiblePanes.has(paneKey)
    const collapsed = !last && collapsedPanes.has(paneKey)
    const paneList = [...visiblePanes]
    let nextPaneKey = paneKey
    // iterate over paneKeys, starting at order
    for (let i = order+1; i < paneList.length && nextPaneKey === paneKey; i++) {
      // if not collapsed, that's next pane
      const key = paneList[i]
      if (!collapsedPanes.has(key)) nextPaneKey = key
    }
    if (!show) return null
    return html`
      <div
        class="wrapper"
        id="${paneKey}"
        style="width: ${!!paneWidth ? paneWidth : 'unset'}%;"
      >
        ${show && collapsed ? this.renderBar(paneKey) : ''}
        <div class="content${collapsed ? ' hide' : ''}" >
          ${(collapseButton && order !== paneKeys.size-1) ? html`
            <unity-button
              class="collapse-button"
              centerIcon="unity:compress"
              @click=${() => this.toggleCollapse(paneKey)}
              type="borderless"
              ?disabled="${last}"
              ></unity-button>
              `: ''}
          <div class="header">
            <slot name="${paneKey}::header"></slot>
          </div>
          <div class="scroller">
            <slot name="${paneKey}"></slot>
            ${!first && !!closeButton ?
              html`
              <unity-button
                type="borderless"
                class="close-button"
                centerIcon="close"
                @click=${e=>this.closePane(e, paneKey)}
              ></unity-button>`
              : null
            }
          </div>
          <div class="footer">
            <slot name="${paneKey}::footer"></slot>
          </div>
        </div>
        ${!last ? html`<div
          class="resize-handle"
          @mousedown="${e=>!collapsed && this.handleMouseDown(e, paneKey, nextPaneKey)}"
        ></div>` : null}
      </div>
    `
  }

  render() {
    const { paneKeys } = this
    return html`
      <div class="container">
        ${[...paneKeys].map((key, i) => this.renderPane(key, i))}
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
          --close-button-padding: var(--padding-size-sm, var(--default-padding-size-sm));
          background-color: var(--background);
          display: flex;
          flex-direction: row;
          height: 100%;
          width: 100%;
          position: relative;
        }
        .container {
          display: flex;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          flex-direction: row;
          flex: 1;
        }
        .wrapper {
          display: flex;
          flex-direction: column;
          overflow-y: hidden;
          position: relative;
        }
        .content {
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
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
        slot {
          overflow-wrap: anywhere;
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
        .collapse-button {
          position: absolute;
          z-index: 10;
          top: 0;
          left: 0;
          padding: var(--collapse-button-padding);
          --unity-button-height: 27px;
        }
        unity-button.close-button {
          position: absolute;
          z-index: 10;
          top: 0;
          right: 0;
          padding: var(--collapse-button-padding);
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
          right: 0;
          height: 100%;
          width: 8px;
          cursor: col-resize;
          z-index: 5;
          border-right: var(--pane-border-width) solid var(--pane-border-color);
        }
        unity-icon {
          --unity-icon-height: var(--medium-icon-size, var(--default-medium-icon-size));
          --unity-icon-width: var(--medium-icon-size, var(--default-medium-icon-size));
        }
        #collapse-bar {
          height: 100%;
        }
      `
    ]
  }
}

window.customElements.define('unity-multi-pane', UnityMultiPane)
