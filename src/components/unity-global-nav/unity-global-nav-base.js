import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import { styleToString } from '@bit/smartworks.unity.unity-utils'
import '@bit/smartworks.unity.unity-global-nav-top-item'
import '@bit/smartworks.unity.unity-icon-set'
import '@bit/smartworks.unity.unity-typography'
import '@bit/smartworks.unity.unity-icon'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavBase
* @param {bool} gutter, show or hide the side gutter
* @param {string} logo, path to hosted logo image. If not specified, the unity:app_menu icon will be used
* @param {string} header, text to display in the header (e.g., product name). Overwritten by headerImg
* @param {string} headerImg, image to display in the header (e.g., product name logo) instead of the header text
* @param {bool} collapsible, render button at the bottom to collapse bar
* @param {bool} collapsed, if the bar is collapsed or not
* @param {bool} grid, if clicking the logo should open the grid menu
* @param {Object} items, object containing the menu items
* @param {Function} onSelect, callback for when a menu item is selected
* @param {css} --global-nav-background-color, css var used for coloring the component
* @param {css} --global-nav-expanded-color, css var used for coloring the component
* @param {css} --primary-brand-color, var, css var used for coloring the component
* @param {css} --global-nav-text-color, css var used for coloring the component
* @param {css} --global-nav-border-color, css var used for coloring the component
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
    this.logo = ''
    this.collapsible = false
    this.collapsed = false
    this.items = {}
    this.onSelect = () => {}
    this.selected = ''
    this.header = ''
    this.headerImg = ''
    this.grid = false

    this._itemClicked = (key) => { this._changeSelection(key)}
    this._showGrid = false
  }

  static get properties() {
    return {
      gutter: { type: Boolean },
      logo: { type: String },
      collapsible: { type: Boolean },
      collapsed: { type: Boolean },
      items: { type: Object },
      onSelect: { type: Function },
      selected: { type: String },
      header: { type: String },
      headerImg: { type: String },
      grid: { type: Boolean },
      _itemClicked: { type: Function },
      _showGrid: { type: Boolean }
    }
  }

  _changeSelection(key) {
    this.onSelect(key)
  }

  _toggleCollapse() {
    this.collapsed = !this.collapsed
  }

  _toggleGrid() {
    this._showGrid = !this._showGrid
  }

  renderItems(items) {
    return items.map(({key, label, short, icon, children, disabled, style}) => html`
      <unity-global-nav-top-item
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
        style=${styleToString(style)}
      ></unity-global-nav-top-item>`)
  }

  render() {
    const { gutter, logo, collapsible, collapsed, items, headerImg, header, grid, _showGrid } = this
    const { bottom, top } = items
    return html`
        <div class="menu text${collapsed?' collapsed':''}${gutter?' gutter':''}${_showGrid? ' shadowless': ''}">
          <div class="header-container">
            <slot name="customHeader">
            </slot>
            <slot>
              <div class="logo-container flex-center ${grid? 'clickable': ''}" @click=${grid? () => this._toggleGrid() : null}>
                <div class="logo">
                ${logo?
                  html`<img src=${logo}>`
                  : ''}
                </div>
              </div>
              ${!collapsed?
                  headerImg?
                    html`<img style="padding: 0 var(--global-nav-padding-size-sm, var(--default-global-nav-padding-size-sm));" src=${headerImg}>` :
                    html`<unity-typography class="header" size="header1" weight="header1" color="dark">${header}</unity-typography>`
                  : ''}
            </slot>
          </div>
          <div class="menu-box">

            <div class="top-container">
              ${top? this.renderItems(top) : ''}
            </div>

            <div class="bottom-container">
              ${bottom? this.renderItems(bottom) : '' }
            </div>

          </div>

          ${collapsible ? html`
          <div>
            <div class="collapse-button flex-center" @click="${() => this._toggleCollapse()}">
              <unity-icon .icon=${collapsed? "unity:double_right_chevron" : "unity:double_left_chevron"}></unity-icon>
            </div>
          </div>
        `  : ''}

        </div>
      ${gutter ? html`</div>` : ''}
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
