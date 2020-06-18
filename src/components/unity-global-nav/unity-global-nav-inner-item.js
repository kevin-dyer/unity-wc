import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-icon'
// import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import { UnityDefaultThemeStyles } from '../unity-default-theme-styles/unity-default-theme-styles'
import '@bit/smartworks.unity.unity-tooltip'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavInnerItem
* @param {bool} selected, whether item shows primary-brand-color, ignored if children are passed in
* @param {func} onSelect, action handler for clicking the element, sends (key, label), ignored if children are passed in
* @param {''} icon, string unity-icon or iron-icon name, optional
* @param {''} key, string key for referencing
* @param {''} label, string label to render for item
* @param {bool} collapsed,
* @param {bool} disabled,
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
    this.disabled = false
  }

  static get properties() {
    return {
      selected: { type: Boolean },
      onSelect: { type: Function },
      label: { type: String },
      key: { type: String },
      icon: { type: String },
      collapsed: { type: Boolean },
      disabled: { type: Boolean }
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
      collapsed,
      disabled
    } = this

    return html`
      <div class="container ${selected ? 'selected' : ''}" @click=${!disabled? _onSelect : null}>
        <div class="label ${collapsed? 'flex-center' : ''}">
          ${!!icon && icon !== 'undefined' ? html`<unity-icon class="icon ${selected? 'selected': ''}" icon="${icon}"></unity-icon>` : null}
          ${!collapsed? html`<unity-typography size="paragraph" class="text">${label}</unity-typography>` 
          : !disabled? html`<unity-tooltip label=${label}></unity-tooltip>` : ''}
        </div>
      </div>
    `
  }

  // styles
  static get styles() {
    // CSS vars using the --global-nav-inner-item prefix follow the Unity 2020 designs. The rest are kept for backwards compatibility. 
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
          --global-nav-inner-item-primary-color: var(--global-nav-item-primary-color);
          --global-nav-inner-item-secondary-color: var(--global-nav-item-secondary-color);
          --global-nav-inner-item-highlight-color: var(--global-nav-item-highlight-color);
          --global-nav-inner-item-text-color: var(--global-nav-item-text-color);
          --global-nav-inner-item-font-size: var(--global-nav-item-font-size, 12px);
          --global-nav-inner-item-height: var(--global-nav-item-short-height);
          --global-nav-inner-item-margin-size: var(--global-nav-item-margin-size);
          --global-nav-inner-item-padding-size: var(--global-nav-item-padding-size);
        }
        * {
          box-sizing: border-box;
        }
        .container {
          border-collapse: collapse;
          height: var(--global-nav-inner-item-height, var(--item-height));
          width: 100%;
          background-color: var(--global-nav-inner-item-secondary-color, var(--secondary-menu-color));
          cursor: pointer;
          position: relative;
          --font-color: var(--global-nav-inner-item-text-color, var(--text-color));
        }
        .container.disabled {
          cursor: default;
          opacity: 0.5;
        }
        .container:not(.disabled) .label:hover {
          background-color: var(--global-nav-hover-color);
        }
        .selected {
          color: var(--global-nav-inner-item-highlight-color, var(--selected-color)) !important;
          --font-color: var(--global-nav-inner-item-highlight-color, var(--selected-color));
        }
        .label {
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          height: 100%;
          padding: 0 calc(var(--global-nav-inner-item-padding-size, var(--label-margin)) * 2);
          min-height: var(--global-nav-inner-item-height, var(--item-height));
        }
        .selected.container::before {
          content: "";
          padding-right: 2px;
          background: var(--global-nav-inner-item-highlight-color, var(--selected-color));
          display: block;
          height: 100%;
          position: absolute;
        }
        .text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 var(--global-nav-inner-item-margin-size, var(--label-margin));
          --font-size: var(--global-nav-inner-item-font-size);
        }
        .icon {
          height: 16px;
          width: 16px;
          color: var(--global-nav-inner-item-text-color, var(--text-color));
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
