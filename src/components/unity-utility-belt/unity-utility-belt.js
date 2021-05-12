import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-page-header'

import './utility-belt-tab'
// import '@bit/smartworks.unity.unity-icon'

/**
* Renders a utility belt UI for managing persistent tabs
* @name UnityUtilityBelt
* @param {[{name: '', id=''}]} tabs - array of tab config objects
* @param {''} selectedTab - id of selected tab
* @param {Function} onTabSelect - callback for when tab selection changes, selected tab id is argument
* @param {Function} onTabClose - callback for when tab close button is clicked, closed tab id is argument


* @example
* <unity-utility-belt>
*   .tabs="[{name: 'tab 1', id: 'tab1'}, {name: 'tab 2', id: 'tab2'}]"
*   .selectedTab="tab1"
* >
*   <div slot="tab1">Content for tab 1</div>
*   <div slot="tab2">Content for tab 2</div>
*
*   <div slot="right-actions">
*     <unity-button label="Add"><unity-button>
*   </div>
* </unity-text-input>

css vars
  
**/


class UnityUtilityBelt extends LitElement {
  constructor() {
    super()

    this.tabs = []
    this.selectedTab = ''
    this.onTabSelect = () => {}
    this.onTabClose = () => {}

    this.resizable=true

    // internals
    this._selectedTab = ''
    this._panelHeight = Math.floor(window.innerHeight / 3)
    this._originalPaneHeight = this._panelHeight
    this._startingY = 0
    this._headerHeight = 0
    this._footerHeight = 0
  }

  static get properties() {
    return {
      tabs: { type: Array },
      selectedTab: {type: String},
      onTabSelect: {type: Function},
      onTabClose: {type: Function},
      resizable: {type: Boolean},
      _panelHeight: {type: Number},
      // internals
      _selectedTab: {type: String}
    }
  }

  set selectedTab (selectedTab) {
    if (selectedTab !== this._selectedTab) {
      const oldValue = this._selectedTab

      this._selectedTab = selectedTab
      this.requestUpdate('selectedTab', oldValue)

      if (this.onTabSelect) {
        this.onTabSelect(selectedTab)
      }
    }
  }

  get selectedTab () {
    return this._selectedTab
  }

  async connectedCallback() {
    super.connectedCallback()

    await this.updateComplete
    this.startObserver()
  }

  startObserver() {
    this.stopObserver()
    const referenceElement = this.shadowRoot.querySelector('.unity-utility-toolbelt')

    if (!!referenceElement) {
      this._observer = new ResizeObserver(([entry]) => {
        this._totalHeight = referenceElement.offsetHeight
      })
      this._observer.observe(referenceElement)
    }
  }

  stopObserver() {
    if (this._observer) this._observer.disconnect()
  }


  async handleTabClick(tab) {
    //if tab is already selected, unselect
    if (tab.id === this.selectedTab) {
      this.selectedTab = ''
    } else {
      this.selectedTab = tab.id
    }

    await this.updateComplete
    //reset panel height
    this.handleOneThirdOpen()
  }

  handleTabClose(id) {
    if (this.onTabClose) {
      this.onTabClose(id)
    }
  }

  handleMouseDown(e) {
    //Ignore right click
    if (e.button !== 0) return
    this._startingY = e.clientY
    this._originalPaneHeight = this._panelHeight || 0
    this.mouseMoveListener = this.handleMouseMove.bind(this)
    this.mouseUpListener = this.handleMouseUp.bind(this)
    document.addEventListener('mousemove', this.mouseMoveListener)
    document.addEventListener('mouseup', this.mouseUpListener)

  }

  handleMouseMove(e) {
    const deltaY = e.clientY - this._startingY
    const oldHeight = this._panelHeight
    const MINIMUM_PANEL_HEIGHT = 0 //height of page header
    const MAXIMUM_PANEL_HEIGHT = this.getMaxPanelHeight()
    let nextHeight = this._originalPaneHeight - deltaY

    if (nextHeight < MINIMUM_PANEL_HEIGHT) nextHeight = MINIMUM_PANEL_HEIGHT

    if (nextHeight > MAXIMUM_PANEL_HEIGHT) nextHeight = MAXIMUM_PANEL_HEIGHT

    this._panelHeight = nextHeight

    //Prevent text highlighting while dragging
    e.preventDefault()
  }

  //clean up event listener
  handleMouseUp(e) {
    this._originalPaneHeight = this._panelHeight

    document.removeEventListener('mousemove', this.mouseMoveListener)
    document.removeEventListener('mouseup', this.mouseUpListener)
  }

  handleExpand() {
    this._panelHeight = this.getMaxPanelHeight()
  }

  handleOneThirdOpen() {
    this._panelHeight = Math.floor((this.getMaxPanelHeight()) / 3)
  }

  setHeaderFooterHeights() {
    const header = this.shadowRoot.querySelector('unity-page-header')
    const footer = this.shadowRoot.querySelector('.footer')

    if (header) this._headerHeight = header.offsetHeight || 32
    if (footer) this._footerHeight = footer.offsetHeight || 22
  }

  getMaxPanelHeight() {
    if (!this._headerHeight || !this._footerHeight) {
      this.setHeaderFooterHeights()
    }
    return this._totalHeight - this._headerHeight - this._footerHeight
  }

  render() {
    const {
      tabs=[],
      selectedTab='',
      _panelHeight
    } = this
    const selectedTabObj = selectedTab && tabs.find(tab => tab.id === selectedTab)
    const isPanelExpanded = this._panelHeight === this.getMaxPanelHeight()

    return html`
      <style>
        .panel-container {
          height: ${_panelHeight}px;
        }
        unity-page-header {
          border-top: ${isPanelExpanded ? 'none' : '1px solid var(--default-dark-gray-2-color)'};
        }
      </style>
      <div class="unity-utility-toolbelt">
        <div class="main">
          <slot name="main"></slot>
        </div>
        ${selectedTabObj ? html`
          <div id="panel" class="panel">
            <unity-page-header
              header="${selectedTabObj.header || ''}"
              @mousedown="${this.handleMouseDown}"
            >
              <slot name="left-content-${selectedTab}" slot="left-content"></slot>
              <slot name="left-action-${selectedTab}" slot="left-action"></slot>
              <unity-button
                title="${isPanelExpanded ? 'Shrink' : 'Expand'}"
                slot="right-action"
                type="borderless"
                centerIcon="${isPanelExpanded ? 'fullscreen-exit' : 'fullscreen'}"
                @click=${isPanelExpanded ? this.handleOneThirdOpen : this.handleExpand}
              ></unity-button>
              <unity-button
                title="Minimize"
                slot="right-action"
                type="borderless"
                centerIcon="remove"
                @click=${e => this.handleTabClick(selectedTabObj)}
              ></unity-button>
              <unity-button
                title="Close"
                slot="right-action"
                centerIcon="close"
                type="borderless"
                @click=${e => this.handleTabClose(selectedTab)}
              ></unity-button>
            </unity-page-header>
            <div class="panel-container">
              <slot name="pane-${selectedTab}"></slot>
            </div>
          </div>`
        : null}

        <div class="footer">
          <div class="tab-bar">
            ${tabs.map((tab, index) => {
              const isSelected = selectedTab === tab.id

              return html`
                <utility-belt-tab
                  name="${tab.name}"
                  id="${tab.id}"
                  index=${index}
                  ?selected=${isSelected}
                  @click=${e => this.handleTabClick(tab)}
                  .onClose=${id => this.handleTabClose(id)}
                ></utility-belt-tab>`
            })}
          </div>

          <slot name="right-actions"></slot>
        </div>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
          height: 100%;
          --default-bar-border-color: var(--default-dark-gray-2-color);
        }
        .unity-utility-toolbelt {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }
        .main {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        .main ::slotted(*) {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        .panel-container {
          overflow-y: auto;
        }
        .footer {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: 0;
          border-top: 1px solid var(--bar-border-color, var(--default-bar-border-color));
        }
        .tab-bar {
          display: flex;
          overflow-y: auto;
          flex: 1;
        }

        unity-page-header {
          --page-header-font-size: 12px;
          cursor: ns-resize;
        }
      `
    ]
  }
}

window.customElements.define('unity-utility-belt', UnityUtilityBelt)
