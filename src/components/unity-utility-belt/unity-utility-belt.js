import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-page-header'

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
    // this.onResizeStart=()=>{}
    // this.onResize=()=>{}
    // this.onResizeComplete=()=>{}

    // internals
    this._selectedTab = ''
    this._panelHeight = Math.floor(window.innerHeight / 3)
    this._originalPaneHeight = this._panelHeight
    this._startingY = 0
  }

  static get properties() {
    return {
      tabs: { type: Array },
      selectedTab: {type: String},
      onTabSelect: {type: Function},
      onTabClose: {type: Function},
      resizable: {type: Boolean},
      _panelHeight: {type: Number},
      // onResizeStart: {type: Function},
      // onResize: {type: Function},
      // onResizeComplete: {type: Function},

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


  handleTabClick(tab) {
    //reset panel height
    this.handleOneThirdOpen()
    //if tab is already selected, unselect
    if (tab.id === this.selectedTab) {
      this.selectedTab = ''
    } else {
      this.selectedTab = tab.id
    }
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



  //TODO: replace with document mouse move event listener
  handleMouseMove(e) {
    const deltaY = e.clientY - this._startingY
    const oldHeight = this._panelHeight
    const MINIMUM_PANEL_HEIGHT = 0 //height of page header
    const MAXIMUM_PANEL_HEIGHT = this._totalHeight - 22 - 32 // subtract header and footer heights
    let nextHeight = this._originalPaneHeight - deltaY

    if (nextHeight < MINIMUM_PANEL_HEIGHT) nextHeight = MINIMUM_PANEL_HEIGHT

    if (nextHeight > MAXIMUM_PANEL_HEIGHT) nextHeight = MAXIMUM_PANEL_HEIGHT

    this._panelHeight = nextHeight
  }

  //clean up event listener
  handleMouseUp(e) {
    this._originalPaneHeight = this._panelHeight

    document.removeEventListener('mousemove', this.mouseMoveListener)
    document.removeEventListener('mouseup', this.mouseUpListener)
  }

  handleExpand() {
    this._panelHeight = this._totalHeight - 22 - 32
  }

  handleOneThirdOpen() {
    this._panelHeight = Math.floor((this._totalHeight - 22 - 32) / 3)
  }

  render() {
    const {
      tabs=[],
      selectedTab='',
      _panelHeight
    } = this
    const selectedTabObj = selectedTab && tabs.find(tab => tab.id === selectedTab)

    return html`
      <div class="unity-utility-toolbelt">
        <div class="main">
          <slot name="main"></slot>
        </div>
        ${selectedTabObj ? html`
          <div id="panel" class="panel">
            <unity-page-header
              header="${selectedTabObj.name}"
              @mousedown="${this.handleMouseDown}"
            >
              <unity-button
                slot="right-action"
                type="borderless"
                label="Expand"
                @click=${this.handleExpand}
              ></unity-button>
              <unity-button
                slot="right-action"
                label="Shrink"
                type="borderless"
                @click=${this.handleOneThirdOpen}
              ></unity-button>
              <unity-button
                slot="right-action"
                centerIcon="close"
                type="borderless"
                @click=${e => this.handleTabClick(selectedTabObj)}
              ></unity-button>
            </unity-page-header>
            <div class="panel-container" style="height: ${_panelHeight}px;">
              <slot name="${selectedTab}" ></slot>
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
                  @click=${e => this.handleTabClick(tab, index)}
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
          /*width: 100%;*/
          /*overflow: hidden;*/
          flex: 1;
          display: flex;
          flex-direction: column;
          min-height: 0;
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
        .footer {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-height: 0;
        }
        .tab-bar {
          display: flex;
          overflow-y: auto;
        }

        unity-page-header {
          border-top: 1px solid var(--default-dark-gray-2-color);
          --page-header-font-size: 12px;
          cursor: ns-resize;
        }
      `
    ]
  }
}

window.customElements.define('unity-utility-belt', UnityUtilityBelt)
