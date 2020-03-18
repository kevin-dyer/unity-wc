import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-global-nav-top-item'
import '@bit/smartworks.unity.unity-icon-set'

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
          <div class="logo-container">
            ${logo ? html`
              <img class="logo" src="${logo}">
            ` : ''}
          </div>
          <div class="menu-box">
            <div class="top-container">
              ${top? this.renderItems(top) : ''}
            </div>
            <div class="bottom-container">
              ${bottom? this.renderItems(bottom) : '' }
              ${collapsible ? html`
                <unity-global-nav-top-item
                  .key="collapse"
                  .onSelect="${() => this._toggleCollapse()}"
                  .icon=${collapsed? "unity:double_right_chevron" : "unity:double_left_chevron"}
                  .short="${false}"
                ></unity-global-nav-top-item>
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
          --primary-menu-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          --gutter-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --logo-height: 52px;
          --logo-padding: 12px;
          border-collapse: collapse;
        }
        .gutter {
          border-right: 5px solid var(--gutter-color);
        }
        .menu {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 191px;
          background-color: var(--primary-menu-color);
        }
        .text {
          color: var(--text-color)
        }
        .collapsed {
          width: 40px;
        }
        .logo-container {
          height: var(--logo-height);
          width: 100%;
          padding-left: var(--logo-padding);
          padding-right: var(--logo-padding);
          overflow: hidden;
        }
        .logo {
          position: absolute;
          height: 18px;
          top: calc(var(--logo-height) / 2);
          transform: translateY(-50%);
        }
        .menu-box {
          position: absolute;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          top: var(--logo-height);
          bottom: 0;
          width: 100%;
        }
        .top-container {
          height: 100%;
          width: 100%;
          min-height: 52px;
          overflow-y: auto;
          border-collapse: collapse;
        }
        .bottom-container {
          bottom: 0;
          min-height: min-content;
          width: 100%;
          border-collapse: collapse;
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-base', UnityGlobalNavBase)
