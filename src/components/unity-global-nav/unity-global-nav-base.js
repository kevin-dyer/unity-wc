import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import { styleToString } from '@bit/smartworks.unity.unity-utils'
// import '@bit/smartworks.unity.unity-global-nav-top-item'
import './unity-global-nav-top-item'
import '@bit/smartworks.unity.unity-icon-set'
import '@bit/smartworks.unity.unity-typography'
import '@bit/smartworks.unity.unity-icon'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavBase
* @param {bool} [gutter], show or hide the side gutter
* @param {string} [logo], path to hosted logo image. If not specified, the unity:app_menu icon will be used
* @param {string} [header], text to display in the header (e.g., product name). Overwritten by headerImg
* @param {string} [headerImg], image to display in the header (e.g., product name logo) instead of the header text
* @param {bool} [collapsible], render button at the bottom to collapse bar
* @param {bool} [collapsed], if the bar is collapsed or not
* @param {bool} [grid], if clicking the logo should open the grid menu
* @param {Object} items, object containing the menu items
* @param {Function} [onSelect], callback for when a menu item is selected
* @param {Function} [onToggleCollapse], callback for when the Side Nav is collapsed or expanded. Callback argument is the current collapsed state.
* @param {Function} [onOpenStateChange], callback for when item openState(s) are set. Arguments are:
*   - newOpenStates, updated dictionary of open states by key, as in the openStates property
*   - key, the key of the item that changed open state, if applicable
*   - openState, the new open state of the element that changed, if applicable
* @param {object} [openStates], dictionary of item keys with a boolean value for whether that item is "open" (children are visible)
* @param {bool} [alwaysShowBordersTop], if true, top items will have borders even when closed
* @param {bool} [alwaysShowBordersBottom], if true, bottom items will have borders even when closed
* @param {bool} [bubbleBottomItems], if true, bottom items will appear in a "bubble"
* @param {bool} [subHeaderBorder], add a bordered area below the header for the subHeader slot. If no subHeader content, this just doubles the width of the border below the header
* @param {css} --global-nav-background-color, css var used for coloring the component
* @param {css} --global-nav-expanded-color, css var used for coloring the component
* @param {css} --primary-brand-color, var, css var used for coloring the component
* @param {css} --global-nav-text-color, css var used for coloring the component
* @param {css} --global-nav-border-color, css var used for coloring the component
* @param {slot} customHeader, slot for entire header content, intended to be used in lieu of logo and header image
* @param {slot} customExpandedHeader, slot for header content that is visible only when expanded, intended to be used in lieu of header image
* @param {slot} subHeader, slot for content below the header, used in conjunction with subHeaderBorder
* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-global-nav gutter
*   logo="../path/to/hosted/image"
*   header="ProductName"
*   items={{
      top: [
      {
        key: 'item-0',
        label: 'Top Item 0',
        short: false,
        icon: 'account-balance'
      }]
    }}
* >
* </unity-global-nav>
**/

// Left-mounted Global Navigation Bar, only internal variable is bool 'gutter'
// Has slots for top and bottom aligned items. They will be top or bottom mounted, but render in top-down order
// To be used with 'unity-nav-top-item's. Others may be used, but may not have intended results.

class UnityGlobalNavBase extends LitElement {
  constructor() {
    super()

    this.gutter = false
    this.subHeaderBorder = false
    this.logo = ''
    this.collapsible = false
    this.collapsed = false
    this.items = {}
    this.onSelect = () => {}
    this.selected = ''
    this.header = ''
    this.headerImg = ''
    this.grid = false
    this.onToggleCollapse = () => {}
    this.onOpenStateChange = () => {}
    this.openStates = {}
    this.alwaysShowBordersTop = false
    this.alwaysShowBordersBottom = false
    this.bubbleBottomItems = false

    this._itemClicked = (key) => { this._changeSelection(key) }
    this._showGrid = false
    this._openStates = {}
    this._items = {}
  }

  static get properties() {
    return {
      gutter: { type: Boolean },
      subHeaderBorder: { type: Boolean },
      logo: { type: String },
      collapsible: { type: Boolean },
      collapsed: { type: Boolean },
      items: { type: Object },
      onSelect: { type: Function },
      selected: { type: String },
      header: { type: String },
      headerImg: { type: String },
      grid: { type: Boolean },
      onToggleCollapse: { type: Function },
      alwaysShowBordersTop: { type: Boolean },
      alwaysShowBordersBottom: { type: Boolean },
      bubbleBottomItems: { type: Boolean },

      _itemClicked: { type: Function },
      _showGrid: { type: Boolean },
      _openStates: { type: Object }
    }
  }

  get items() {
    return this._items
  }

  set items(value) {
    const oldValue = this._items
    this._items = value
    this.constructOpenStatesDictionary(value)
    this.requestUpdate('items', oldValue)
  }
  
  get openStates() {
    return this._openStates
  }

  set openStates(value) {
    const oldValue = this._openStates
    this._openStates = value
    this.requestUpdate('openStates', oldValue)
  }

  constructOpenStatesDictionary(items) {
    if (!items) return
    if (!Array.isArray(items)) {
      // We received a top level items object
      this.constructOpenStatesDictionary(items.top)
      this.constructOpenStatesDictionary(items.bottom)
      return
    }
    const newOpenStateDict = items.reduce((openStateDict, item) => {
      const { key } = item
      if (!key) return openStateDict
      return {
        ...openStateDict,
        [key]: false
      }
    }, {})
    this._openStates = {
      ...newOpenStateDict,
      ...this._openStates
    }
    this.onOpenStateChange(this._openStates)
  }

  _changeSelection(key) {
    this.onSelect(key)
  }

  _toggleCollapse() {
    this.collapsed = !this.collapsed
    this.onToggleCollapse(this.collapsed)
  }

  _toggleGrid() {
    this._showGrid = !this._showGrid
  }

  _setOpenState(key, open) {
    this._openStates = {
      ...this._openStates,
      [key]: open
    }
    this.onOpenStateChange(this._openStates, key, open)
  }

  renderItems(items, alwaysShowBorders) {
    return items.map(({ key, label, short, icon, children, disabled, style, borderWhenClosed }, index) => {
      // Determine if next item is open, if so, set openNeighbor to true
      const isLast = index === items.length - 1
      const nextKey = !isLast && items[index + 1].key
      const nextOpenState = !isLast && this._openStates[nextKey]
      const hasOpenNeighbor = !isLast && nextOpenState === undefined || !!nextOpenState

      return html`
        <unity-global-nav-top-item
          id="${key}"
          .key="${key}"
          .onSelect="${this._itemClicked}"
          .label="${label}"
          .icon="${icon}"
          .short="${short}"
          .selected="${this.selected === key}"
          .children="${children && children.map(child => ({
            ...child,
            onSelect: this._itemClicked,
            selected: this.selected === child.key
          }))}"
          ?collapsed=${this.collapsed}
          ?disabled=${disabled}
          ?open=${this._openStates[key]}
          .onOpen=${this._setOpenState.bind(this)}
          ?openNeighbor=${hasOpenNeighbor}
          ?borderWhenClosed=${!isLast && (alwaysShowBorders || borderWhenClosed)}
          style=${styleToString(style)}
        ></unity-global-nav-top-item>
      `
    })
  }

  render() {
    const { gutter, logo, collapsible, collapsed, items, headerImg, header, grid, bubbleBottomItems, subHeaderBorder, _showGrid } = this
    const { bottom, top } = items
    return html`
        <div class="menu text${collapsed ? ' collapsed' : ''}${gutter ? ' gutter' : ''}${_showGrid ? ' shadowless' : ''}">
          <div class="header-container">
            <slot name="customHeader">
              <div class="logo-container flex-center ${grid ? 'clickable': ''}" @click=${grid ? this._toggleGrid : null}>
                <div class="logo">
                  <img src=${logo}>
                </div>
              </div>
              ${!collapsed ?
                headerImg ?
                  html`<img style="padding: 0 var(--global-nav-padding-size-sm, var(--default-global-nav-padding-size-sm));" src=${headerImg}>` :
                  html`<unity-typography class="header" size="header1" weight="header1" color="dark">${header}</unity-typography>`
              : ''}
            </slot> 
             ${!collapsed ? html`<slot name="customExpandedHeader"></slot>` : ''}
          </div>
          ${!collapsed ? html`<slot name="subHeader" class="${subHeaderBorder ? 'header-container' : ''}"></slot>` : ''}

          <div class="menu-box">
            <div class="top-container">
              ${top ? this.renderItems(top, this.alwaysShowBordersTop) : ''}
            </div>
            <div class="bottom-container">
              ${!bubbleBottomItems && bottom ? this.renderItems(bottom, this.alwaysShowBordersBottom) : ''}
            </div>
          </div>
          ${bubbleBottomItems ? html`
            <div class="bubble-items-container">
              ${bottom ? this.renderItems(bottom, this.alwaysShowBordersBottom) : ''}
            </div>
          ` : ''}
          ${collapsible ? html`
            <div>
              <div class="collapse-button flex-center" @click="${this._toggleCollapse}">
                <unity-icon .icon=${collapsed ? "unity:double_right_chevron" : "unity:double_left_chevron"}></unity-icon>
              </div>
            </div>
          `  : ''}
        </div>
      ${grid && _showGrid? html`<div class="grid"></div>` : ''}
    `
  }

  // styles
  static get styles() {
    // CSS vars using the --global-nav prefix follow the Unity 2020 designs. The rest are kept for backwards compatibility.
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          display: flex;
          height: 100%;
          width: max-content;
          --default-gutter-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --default-global-nav-background-color: var(--white-color, var(--default-white-color));
          --default-global-nav-border-color: var(--gray-color, var(--default-gray-color));
          --default-global-nav-margin-size: var(--margin-size-md, var(--default-margin-size-md, 12px));
          --default-global-nav-padding-size: var(--padding-size-md, var(--default-padding-size-md, 12px));
          --default-global-nav-padding-size-sm: var(--padding-size-sm, var(--default-padding-size-sm, 8px));
          --default-global-nav-highlight-color: var(--secondary-color, var(--default-secondary-color));
          --default-global-nav-hover-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
          --default-global-nav-text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-global-nav-light-text-color: var(--light-gray-1-color, var(--default-light-gray-1-color));
          --default-global-nav-gutter-color: var(--primary-color, var(--default-primary-color));
          --default-global-nav-header-font-size: 14px;
          --default-global-nav-font-size: 12px;
          --default-global-nav-short-row: 32px;
          --default-global-nav-large-row: 40px;
          --default-global-nav-expanded-width: 192px;
          --default-global-nav-collapsed-width: 32px;
          --default-global-nav-logo-size: 12px;
          --default-global-nav-logo-padding: 8px;
          --default-global-nav-menu-shadow: 0 0 4px 0;
        }
        * {
          box-sizing: border-box;
          scrollbar-width: none;
        }
        *::-webkit-scrollbar {
          width: 0px;
        }
        .gutter {
          border-right: 5px solid var(--global-nav-gutter-color, var(--gutter-color));
        }
        .menu {
          display: flex;
          flex-direction: column;
          width: var(--global-nav-expanded-width, var(--default-global-nav-expanded-width));
          height: 100%;
          background-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          box-shadow: var(--global-nav-menu-shadow, var(--default-global-nav-menu-shadow));
          border-right: 1px solid var(--global-nav-border-color, var(--default-global-nav-border-color));
        }
        .menu.shadowless {
          box-shadow: none;
        }
        .text {
          color: var(--global-nav-text-color, var(--default-global-nav-text-color));
        }
        .collapsed {
          width: var(--global-nav-collapsed-width, var(--default-global-nav-collapsed-width));
        }
        .logo-container {
          height: var(--global-nav-short-row, var(--default-global-nav-short-row));
          width: var(--global-nav-short-row, var(--default-global-nav-short-row));
          min-height: var(--global-nav-short-row, var(--default-global-nav-short-row));
          min-width: var(--global-nav-short-row, var(--default-global-nav-short-row));
          border-right: 1px solid var(--global-nav-border-color, var(--default-global-nav-border-color));
          padding: var(--global-nav-logo-padding, var(--default-global-nav-logo-padding));
        }
        .logo-container.clickable {
          cursor: pointer;
        }
        .header-container {
          display: flex;
          border-bottom: 1px solid var(--global-nav-border-color, var(--default-global-nav-border-color));
          align-items: center;
        }
        .logo {
          display: flex;
          color: var(--global-nav-highlight-color, var(--default-global-nav-highlight-color));
          height: var(--global-nav-logo-size, var(--default-global-nav-logo-size));
          width: var(--global-nav-logo-size, var(--default-global-nav-logo-size));
          --layout-inline_-_display: initial;
        }
        .menu-box {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          justify-content: space-between;
          height: 100%;
          width: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
        .top-container {
          width: 100%;
          border-collapse: collapse;
        }
        .bottom-container {
          min-height: min-content;
          width: 100%;
          border-collapse: collapse;
        }
        .bubble-items-container {
          margin: 4px;
          border: 1px solid var(--global-nav-light-text-color, var(--default-global-nav-light-text-color));
          border-radius: 2px;
          min-height: min-content;
        }
        unity-icon {
          color: var(--global-nav-highlight-color, var(--default-global-nav-highlight-color));
          height: var(--global-nav-logo-size, var(--default-global-nav-logo-size));
          width: var(--global-nav-logo-size, var(--default-global-nav-logo-size));
          --layout-inline_-_display: initial;
        }
        .collapse-button {
          height: 24px;
          border: 1px solid var(--global-nav-light-text-color, var(--default-global-nav-light-text-color));
          margin: 4px;
          border-radius: 2px;
          cursor: pointer;
        }
        .collapse-button unity-icon {
          height: 16px;
          width: 16px;
          color: var(--global-nav-text-color, var(--defaultglobal-nav-text-color));
        }
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        unity-typography {
          margin: 0 var(--global-nav-margin-size, var(--default-global-nav-margin-size));
          --header1-font-size: var(--global-nav-header-font-size, --default-global-nav-header-font-size);
          --header1-font-weight: bold;
          --font-color: var(--global-nav-text-color, var(--default-global-nav-text-color));
        }
        .grid{
          height: 100%;
          width: 320px;
          background-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          box-shadow: 0 1px 10px 4px rgba(0, 0, 0, 0.25);
          z-index: -1;
        }
        img {
          min-width: 0;
          flex: 1;
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-base', UnityGlobalNavBase)
