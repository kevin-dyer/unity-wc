import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavInnerItem
* @param {bool} selected, whether item shows primary-brand-color, ignored if children are passed in
* @param {func} onSelect, action handler for clicking the element, sends (key, label), ignored if children are passed in
* @param {''} icon, string iron-icon name, optional
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
        <div class="label">
          ${!!icon && icon !== 'undefined' ? html`<iron-icon class="icon" icon="${icon}"></iron-icon>` : null}
          ${!collapsed? html`<div class="text">${label}</div>` : '' }
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
          --primary-menu-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          --secondary-menu-color: var(--global-nav-expanded-color, var(--default-global-nav-expanded-color));
          --selected-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --text-color: var(--global-nav-text-color, var(--default-global-nav-text-color));
          --item-height: 32px;
          --label-margin: 12px;
          border-collapse: collapse;
          user-select: none;
        }
        .container {
          border-collapse: collapse;
          height: var(--item-height);
          width: 100%;
          background-color: var(--secondary-menu-color);
          cursor: pointer;
          box-sizing: border-box;
        }
        .selected {
          background-color: var(--primary-brand-color);
        }
        .label {
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
          position: relative;
          height: var(--item-height)
        }
        .text {
          flex: 1;
          font-size: 11px;
          color: var(--text-color);
          line-height: var(--item-height);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 var(--label-margin);

        }
        iron-icon {
          height: 16px;
          width: 16px;
          top: calc(var(--item-height) / 2);
          transform: translateY(-50%);
          color: var(--text-color);
          margin-left: var(--label-margin);
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-inner-item', UnityGlobalNavInnerItem)
