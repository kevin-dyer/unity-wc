import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-global-nav-top-item'
import '@bit/smartworks.unity.unity-icon-set'
import '@bit/smartworks.unity.unity-typography'
import '@bit/smartworks.unity.unity-icon'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavBase
* @param {bool} gutter, show or hide the side gutter
* @param {string} logo, path to hosted logo image
* @param {bool} collapsible, render button at the bottom to collapse bar
* @param {bool} collapsed, if the bar is collapsed or not
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

    this._itemClicked = (key) => { this._changeSelection(key)}
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

      _itemClicked: { type: Function }
    }
  }

  firstUpdated() {
    this.className =  this.collapsed? 'collapsed' : ''
  }

  _changeSelection(key) {
    this.selected = key
    this.onSelect(key)
  }

  _toggleCollapse() {
    this.collapsed = !this.collapsed
  }

  renderItems(items) {
    return items.map(({key, label, short, icon, children}) => html`
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
      ></unity-global-nav-top-item>`)
  }

  render() {
    const { gutter, logo, collapsible, collapsed, items } = this
    const { bottom, top } = items
    return html`
        <div class="menu text${collapsed?' collapsed':''}${gutter?' gutter':''}">
          <div class="header-container">
            <div class="logo-container flex-center">
              ${logo ? html`
                <unity-icon class="logo" icon="unity:app_menu"></unity-icon>
              ` : ''}
            </div>
            ${!collapsed? html`<unity-typography>ProductName</unity-typography>` : ''}
          </div>
          <div class="menu-box">
            <div class="top-container">

              ${top? this.renderItems(top) : ''}
            </div>
            <div class="bottom-container">
              ${bottom? this.renderItems(bottom) : '' }
              ${collapsible ? html`
                <div>
                  <div class="collapse-button flex-center" @click="${() => this._toggleCollapse()}">
                    <unity-icon .icon=${collapsed? "unity:double_right_chevron" : "unity:double_left_chevron"}></unity-icon>
                  </div>
                </div>
              `  : ''}
            </div>
          </div>
        </div>
      ${gutter ? html`</div>` : ''}
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --primary-menu-color: var(--white-color, var(--default-white-color));
          --gutter-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --logo-height: 32px;
          --logo-padding: 12px;
          --global-nav-border-color: var(--gray-color, var(--default-gray-color));
          --global-nav-margin-size: var(--margin-size, var(--default-margin-size, 12px));
          border-collapse: collapse;
          box-shadow: 0 0 4px 0;
        }
        * {
          box-sizing: border-box;
        }
        .gutter {
          border-right: 5px solid var(--gutter-color);
        }
        .menu {
          position: relative;
          width: 192px;
          height: 100%;
          background-color: var(--primary-menu-color);
          box-shadow: 0 0 4px 0;
        }
        .text {
          color: var(--text-color)
        }
        .collapsed {
          width: 32px;
        }
        .logo-container {
          height: var(--logo-height);
          width: var(--logo-height);
        }
        :not(.collapsed) .header-container .logo-container {
          border-right: 1px solid var(--gray-color, var(--default-gray-color));
        }
        .header-container {
          display:flex;
          border-bottom: 1px solid var(--gray-color, var(--default-gray-color));
          align-items: center;
        }
        .logo {
          height: 16px;
        }
        .menu-box {
          position: absolute;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          top: var(--logo-height);
          bottom: 0;
          width: 100%;
          margin-top: 1px;
        }
        .top-container {
          height: 100%;
          width: 100%;
          min-height: 52px;
          border-collapse: collapse;
        }
        .bottom-container {
          bottom: 0;
          min-height: min-content;
          width: 100%;
          border-collapse: collapse;
        }
        unity-icon {
          color: var(--secondary-color, var(--default-secondary-color));
          height: 12px;
          width: 12px;
          --layout-inline_-_display: initial;
        }
        .collapse-button {
          height: 24px;
          border: 1px solid #EBEBEB;
          margin: 4px;
          border-radius: 2px;
          cursor: pointer;
        }
        .collapse-button unity-icon {
          height: 16px;
          width: 16px;
          color: var(--dark-gray-color, var(--default-dark-gray-color));
        }
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        unity-typography {
          margin: 0 var(--global-nav-margin-size);
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-base', UnityGlobalNavBase)
