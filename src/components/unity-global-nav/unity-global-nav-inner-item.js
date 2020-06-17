import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-icon'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-tooltip'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavInnerItem
* @param {bool} selected, whether item shows primary-brand-color, ignored if children are passed in
* @param {func} onSelect, action handler for clicking the element, sends (key, label), ignored if children are passed in
* @param {''} icon, string unity-icon or iron-icon name, optional
* @param {''} key, string key for referencing
* @param {''} label, string label to render for item
* @param {css} --global-nav-background-color, css var used for coloring the component
* @param {css} --global-nav-expanded-color, css var used for coloring the component
* @param {css} --primary-brand-color, var, css var used for coloring the component
* @param {css} --global-nav-border-color, css var used for coloring the component
* @param {css} --global-nav-text-color, css var used for coloring the component
* @param {css} --font-family, css var used for font
* @return {LitElement} returns a class extended from LitElement
* @example
* ${hasChildren && open ? children.map(({key, label, icon, onSelect, selected}) => html`
* <unity-global-nav-inner-item
*   .key="${key}"
*   .onSelect="${onSelect}"
*   .label="${label}"
*   .icon="${icon}"
*   .selected="${selected}"
* ></unity-global-nav-inner-item>
**/

// Left-mounted Global Navigation Bar, only internal variable is bool 'gutter'
// Has slots for top and bottom aligned items. They will be top or bottom mounted, but render in top-down order
// To be used with 'unity-nav-top-item's. Others may be used, but may not have intended results.
// This component is built into the unity-global-nav-top-item, but can be used on it's own

class UnityGlobalNavInnerItem extends LitElement {
  constructor() {
    super()

    this.selected = false
    this.label = ''
    this.key = ''
    this.icon = ''
    this.onSelect = ()=>{}
    this.collapsed = false
  }

  static get properties() {
    return {
      selected: { type: Boolean },
      onSelect: { type: Function },
      label: { type: String },
      key: { type: String },
      icon: { type: String },
      collapsed: { type: Boolean }
    }
  }

  // uses in onSelect
  _onSelect(e) {
    const { onSelect } = this
    e.stopPropagation()
    if (onSelect instanceof Function) {
      onSelect(this.key, this.label)
    }
  }

  render() {
    const {
      selected,
      _onSelect,
      key='',
      label=key,
      icon='',
      collapsed
    } = this

    return html`
      <div class="container ${selected ? 'selected' : ''}" @click=${_onSelect}>
        <div class="label ${collapsed? 'flex-center' : ''}">
          ${!!icon && icon !== 'undefined' ? html`<unity-icon class="icon ${selected? 'selected': ''}" icon="${icon}"></unity-icon>` : null}
          ${!collapsed? html`<unity-typography size="paragraph" class="text">${label}</unity-typography>` 
          : html`<unity-tooltip label=${label}></unity-tooltip>` }
        </div>
      </div>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          --primary-menu-color: var(--white-color, var(--default-white-color));
          --secondary-menu-color: var(--white-color, var(--default-white-color));
          --selected-color: var(--secondary-color, var(--default-secondary-color));
          --text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --item-height: 32px;
          --label-margin: var(--global-nav-margin-size, 12px);
          border-collapse: collapse;
          user-select: none;
        }
        * {
          box-sizing: border-box;
        }
        .container {
          border-collapse: collapse;
          height: var(--item-height);
          width: 100%;
          background-color: var(--secondary-menu-color);
          cursor: pointer;
          position:relative;
        }
        .label:hover {
          background-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
        }
        .selected {
          color: var(--selected-color) !important;
          --font-color: var(--selected-color);
        }
        .label {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          height: 100%;
          padding: 0 calc(var(--label-margin) * 2);

        }
        .selected.container::before {
          content: "";
          padding-right: 2px;
          background: var(--selected-color);
          display: block;
          height: 100%;
          position: absolute;
        }
        .text {
          flex: 1;
          line-height: var(--item-height);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 var(--label-margin);
          --font-size: 12px;
        }
        .icon {
          height: 16px;
          width: 16px;
          color: var(--text-color);
          --layout-inline_-_display: initial;
        }
        unity-tooltip {
          position: absolute;
          left: 90%;
          display: none;
        }
        .label:hover unity-tooltip {
          display: block;
        }
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
        }
        .flex-center .text {
          flex: unset;
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-inner-item', UnityGlobalNavInnerItem)
