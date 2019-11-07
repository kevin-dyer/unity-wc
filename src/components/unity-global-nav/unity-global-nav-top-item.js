import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icons/iron-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavTopItem
* @param {bool} short, bool to control if element is short or tall
* @param {bool} selected, whether item shows primary-brand-color, ignored if children are passed in
* @param {func} onSelect, action handler for clicking the element, sends (key, label), ignored if children are passed in
* @param {''} icon, string iron-icon name, optional
* @param {''} key, string key for referencing
* @param {''} label, string label to render for item
* @param {[]} children, TO BE IMPLEMENTED, list of child item elements, could be slots
* @param {css} --global-nav-background-color, css var used for coloring the component
* @param {css} --global-nav-expanded-color, css var used for coloring the component
* @param {css} --primary-brand-color, var, css var used for coloring the component
* @param {css} --global-nav-border-color, css var used for coloring the component
* @param {css} --global-nav-text-color, css var used for coloring the component
* @param {css} --font-family, css var used for font
* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-global-nav gutter>
*   <img src="/path/to/logo" slot="logo" alt="Company Inc.">
*   <unity-global-nav-top-item
*     slot="top"
*     label="Top Item #1">
*     icon="iron-icon-name"
*   </unity-global-nav-top-item>
*   <unity-global-nav-top-item
*     slot="top"
*     label="Top Item #2">
*   </unity-global-nav-top-item>
*   <unity-global-nav-top-item
*     slot="top"
*     label="Top Item #3">
*   </unity-global-nav-top-item>
*   <unity-global-nav-top-item
*     short
*     slot="bottom"
*     label="Bottom Item #1"
*     selected>
*   </unity-global-nav-top-item>
*   <unity-global-nav-top-item
*     short
*     slot="bottom"
*     label="Bottom Item #2">
*   </unity-global-nav-top-item>
* </unity-global-nav>
**/

// Left-mounted Global Navigation Bar, only internal variable is bool 'gutter'
// Has slots for top and bottom aligned items. They will be top or bottom mounted, but render in top-down order
// To be used with 'unity-nav-top-item's. Others may be used, but may not have intended results.

// <iron-icon icon="expand-less"></iron-icon>
// <iron-icon icon="expand-more"></iron-icon>

class UnityGlobalNavTopItem extends LitElement {
  constructor() {
    super()

    this.selected = false
    this.short = false
    this.label = ''
    this.key = ''
    this.icon = ''
    this.onSelect = ()=>{}
    // this.children = []

    // internals
    // this._expanded = false
  }

  static get properties() {
    return {
      short: { type: Boolean },
      selected: { type: Boolean },
      onSelect: { type: Function },
      label: { type: String },
      key: { type: String },
      icon: { type: String },
      children: { type: Array },

      // internals
      // _expanded: { type: Boolean },
    }
  }

  // either uses passed in onSelect, or toggles _expanded to show/hide children
  _onSelect() {
    // if (this.children.length > 0) {
      // this._expanded = !this._expanded
    // } else {
      this.onSelect(this.key, this.label)
    // }
  }

  render() {
    const {
      short,
      selected,
      _onSelect,
      key='',
      label=key,
      icon='',
      // children=[],
      // _expanded: open=false
    } = this

    return html`
      <div
        class="container ${short ? 'short' : ''} ${selected ? 'selected' : ''}"
        @click=${_onSelect}
      >
        <div class="label ${short ? 'short-label' : ''}">
          ${!!icon && icon !== 'undefined' ? html`<iron-icon icon="${icon}"></iron-icon>` : ''}
          <span class="text">${label}</span>
        </div>
        <!-- Children items go here -->
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
          --border-breakers: var(--global-nav-border-color, var(--default-global-nav-border-color));
          --tall-height: 52px;
          --short-height: 32px;
          --label-padding: 16px;
          border-collapse: collapse;
          user-select: none;
        }
        .container {
          border-collapse: collapse;
          height: var(--tall-height);
          width: 100%;
          background-color: var(--primary-menu-color);
          border-top: 1px solid var(--border-breakers);
          cursor: pointer;
          box-sizing: border-box;
        }
        .short {
          height: var(--short-height);
        }
        .selected {
          background-color: var(--selected-color);
        }
        .label {
          position: relative;
          top: calc(var(--tall-height) / 2);
          padding-left: var(--label-padding);
          padding-right: var(--label-padding);
          font-weight: 500;
          transform: translateY(-50%);
        }
        .short-label {
          top: calc(var(--short-height) / 2);
          line-height: var(--short-height);
        }
        .text {
          font-size: 14pt;
          color: var(--text-color)
          line-height: var(--tall-height);
        }
        iron-icon {
          top: -2px;
          padding-right: 12px;
          color: var(--text-color);
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-top-item', UnityGlobalNavTopItem)
