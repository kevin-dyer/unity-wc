import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-global-nav-inner-item'
import '@bit/smartworks.unity.unity-tooltip'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-typography'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavTopItem
* @param {bool} short, bool to control if element is short or tall
* @param {bool} selected, whether item shows primary-brand-color, ignored if children are passed in
* @param {func} onSelect, action handler for clicking the element, sends (key, label), ignored if children are passed in
* @param {''} icon, string unity-icon or iron-icon name, optional
* @param {''} key, string key for referencing
* @param {''} label, string label to render for item
* @param {bool} collapsed,
* @param {bool} disabled,
* @param {[]} children, TO BE IMPLEMENTED, list of child item elements, could be slots
* @param {css} --global-nav-background-color, css var used for coloring the component
* @param {css} --global-nav-expanded-color, css var used for coloring the component
* @param {css} --primary-brand-color, var, css var used for coloring the component
* @param {css} --global-nav-border-color, css var used for coloring the component
* @param {css} --global-nav-text-color, css var used for coloring the component
* @param {css} --font-family, css var used for font
* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-global-nav gutter
*   logo="../path/to/hosted/logo"
* >
*   <unity-global-nav-top-item
*     slot="top"
*     key="home"
*     label="Home View">
*     icon="home"
*     .selected="${selectionTracker === 'home'}"
*     .onSelect="${() => select('home')}"
*   </unity-global-nav-top-item>
*   ${menuItems.map(({slot, key, label, short, icon}) => html`
*     <unity-global-nav-top-item
*       slot="${slot}"
*       .key="${key}"
*       .label="${label}">
*       .icon="${icon}"
*       .selected="${selectionTracker === key}"
*       .onSelect="${(key: itemKey, label) => select(itemKey)}"
*     </unity-global-nav-top-item>
*   `)}
* </unity-global-nav>
**/

// Menu items designed to fit inside of left-bound Global Nav
// Has properties for key, label, and icon that are always available.
// Has bool selected and func onSelect, which are disabled when children is passed in (see below).
// Can take array chidlren for sub items, array of objects {key, label, selected, onSelect}
// Disables selected and replaces onSelect with own expand/contract control

class UnityGlobalNavTopItem extends LitElement {
  constructor() {
    super()

    this.selected = false
    this.short = false
    this.label = ''
    this.key = ''
    this.icon = ''
    this.onSelect = ()=>{}
    this.children = []
    this.collapsed = false
    this.disabled = false

    // internals
    this._expanded = true
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
      collapsed: { type: Boolean },
      disabled: { type: Boolean },
      // internals
      _expanded: { type: Boolean },
    }
  }

  // either uses passed in onSelect, or toggles _expanded to show/hide children
  _onSelect() {
    const { children, onSelect } = this
    if (Array.isArray(children) && children.length > 1) {
      this._expanded = !this._expanded
    } else if (Array.isArray(children) && children.length === 1) {
      const { onSelect, key, label } = children[0]
      onSelect(key, label)
    } else if (onSelect instanceof Function) {
      onSelect(this.key, this.label)
    }
  }

  getLabel(hasIcon, hasChildren) {
    let {
      collapsed,
      label=this.key,
      short,
      children,
    } = this
    if (!label || collapsed && hasIcon) return ''
    // use child label if only one label
    if (Array.isArray(children) && children.length === 1) label = children[0].label
    if(collapsed && !hasIcon) label = label[0]
    return html`<unity-typography size="paragraph" weight=${hasChildren? "medium": "paragraph"} class="text">${label}</unity-typography>`
  }

  render() {
    let {
      short,
      selected,
      _onSelect,
      key='',
      label=key,
      icon='',
      children=[],
      _expanded: open=false,
      collapsed,
      disabled
    } = this
    let hasChildren = Array.isArray(children) && children.length > 0
    if (hasChildren && children.length === 1) {
      const newItem = children[0]
      selected = newItem.selected
      key = newItem.key
      icon = newItem.icon
      hasChildren = false
    }
    const hasIcon = !!icon && icon !== String(undefined) && icon !== String(NaN) && icon !== String(null)

    return html`
      <div
        class="
          container
          ${hasChildren && open ? 'open' : ''}
          ${!hasChildren && selected ? 'selected' : ''}
          ${disabled? 'disabled' : ''}
        "
        @click=${!disabled? _onSelect : null}
      >
        <div class="label ${short ? 'short' : ''} ${hasChildren && !short? 'tall' : ''} ${collapsed? 'flex-center' : ''}">
          ${hasIcon ? html`<unity-icon class="icon ${selected? 'selected':''}" icon="${icon}"></unity-icon>` : null}
          ${this.getLabel(hasIcon, hasChildren) }
          ${collapsed? html`<unity-tooltip arrow="left" label=${label}></unity-tooltip>` : ''}
          ${!collapsed && hasChildren ? html`<unity-icon class="icon" icon="${open ? 'unity:down_chevron' : 'unity:right_chevron'}"></unity-icon>` : null}
        </div>
        ${hasChildren && open ? children.map(({key, label, icon, onSelect, selected, disabled}) => html`
        <unity-global-nav-inner-item
          .key="${key}"
          .onSelect="${onSelect}"
          .label="${label}"
          .icon="${icon}"
          .selected="${selected}"
          ?collapsed=${collapsed}
          ?disabled=${disabled}
        ></unity-global-nav-inner-item>
        `) : null}
      </div>
    `
  }

  // styles
  static get styles() {
    // CSS vars using the --global-nav-item prefix follow the Unity 2020 designs. The rest are kept for backwards compatibility.
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          --border-breakers: var(--global-nav-border-color, var(--default-global-nav-border-color));
          --tall-height: 40px;
          --short-height: 32px;
          --default-global-nav-item-primary-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          --default-global-nav-item-secondary-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          --default-global-nav-item-highlight-color: var(--global-nav-highlight-color, var(--default-global-nav-highlight-color));
          --default-global-nav-item-text-color: var(--global-nav-text-color, var(--default-global-nav-text-color));
          --default-global-nav-item-border-color: var(--global-nav-border-color, var(--default-global-nav-border-color));
          --default-global-nav-item-tall-height: var(--global-nav-large-row, var(--tall-height));
          --default-global-nav-item-short-height: var(--global-nav-short-row, var(--short-height));
          --default-global-nav-item-margin-size: var(--global-nav-margin-size, var(--default-global-nav-margin-size));
          --default-global-nav-item-font-size: var(--global-nav-font-size, var(--default-global-nav-font-size));
          --default-global-nav-item-padding-size: var(--global-nav-padding-size, var(--default-global-nav-padding-size));
          --default-global-nav-item-padding-size-sm: var(--global-nav-padding-size-sm, var(--default-global-nav-padding-size-sm));
          border-collapse: collapse;
          user-select: none;
        }
        * {
          box-sizing: border-box;
        }
        .container {
          border-collapse: collapse;
          height: auto;
          min-height: var(--global-nav-item-short-height, var(--default-global-nav-item-short-height));
          width: 100%;
          background-color: var(--global-nav-item-primary-color, var(--default-global-nav-item-primary-color));
          position: relative;
          cursor: pointer;
          --font-color: var(--global-nav-item-text-color, var(--default-global-nav-item-text-color));
        }
        .container.disabled {
          cursor: default;
        }
        .container.disabled .label unity-icon, .container.disabled .label unity-typography {
          opacity: 0.5;
        }
        .container:not(.disabled) .label:hover {
          background-color: var(--global-nav-hover-color, var(--default-global-nav-hover-color));
        }
        .selected {
          color: var(--global-nav-item-highlight-color, var(--default-global-nav-item-highlight-color)) !important;
          --font-color: var(--global-nav-item-highlight-color, var(--default-global-nav-item-highlight-color));
        }
        .selected.container::before {
          content: "";
          padding-right: 2px;
          background: var(--global-nav-item-highlight-color, var(--selected-color));
          display: block;
          height: 100%;
          position: absolute;
          z-index: 1;
        }
        .open {
          background-color: var(--global-nav-item-secondary-color, var(--default-global-nav-item-secondary-color));
          border-top: 1px solid var(--global-nav-item-border-color, var(--border-breakers));
          border-bottom: 1px solid var(--global-nav-item-border-color, var(--border-breakers));
          padding-bottom: var(--global-nav-item-padding-size-sm, var(--defauult-global-nav-item-padding-size-sm));
        }
        .label {
          display: flex;
          position: relative;
          flex-wrap: nowrap;
          min-height: var(--global-nav-item-short-height, var(--default-global-nav-item-short-height));
          font-weight: 500;
          align-items: center;
          height: 100%;
          padding: 0 var(--global-nav-item-padding-size, var(--default-global-nav-item-padding-size));
        }
        .open .label {
          min-height: var(--global-nav-item-tall-height, var(--default-global-nav-item-tall-height));
        }
        .text {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          --font-size: var(--global-nav-item-font-size, var(--default-global-nav-item-font-size));
          --medium-weight: bold;
        }
        unity-icon + .text {
          margin: 0 var(--global-nav-item-margin-size, var(--default-global-nav-item-margin-size));
        }
        .icon {
          height: 16px;
          width: 16px;
          color: var(--global-nav-item-text-color, var(--default-global-nav-item-text-color));
          --layout-inline_-_display: initial;
        }
        .short {
          min-height: var(--global-nav-item-short-height, var(--default-global-nav-item-short-height));
        }
        .tall {
          min-height: var(--global-nav-item-tall-height, var(--default-global-nav-item-tall-height));
        }
        unity-tooltip {
          position: absolute;
          display: none;
          right: -6px;
          top: 25%;
          --font-color: var(--global-nav-item-text-color, var(--default-global-nav-item-text-color));
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

window.customElements.define('unity-global-nav-top-item', UnityGlobalNavTopItem)
