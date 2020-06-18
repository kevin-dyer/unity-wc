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
    return html`<unity-typography size="paragraph" weight=${hasChildren? "medium": "paragraph"} class="text ${short ? 'short' : ''}">${label}</unity-typography>`
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
          ${short ? 'short' : ''}
          ${hasChildren && open ? 'open' : ''}
          ${!hasChildren && selected ? 'selected' : ''}
          ${disabled? 'disabled' : ''}
        "
        @click=${!disabled? _onSelect : null}
      >
        <div class="label ${short ? 'short' : ''} ${collapsed? 'flex-center' : ''}">
          ${hasIcon ? html`<unity-icon class="icon ${selected? 'selected':''}" icon="${icon}"></unity-icon>` : null}
          ${this.getLabel(hasIcon, hasChildren) }
          ${collapsed && !disabled? html`<unity-tooltip label=${label}></unity-tooltip>` : ''}
          ${!collapsed && hasChildren ? html`<unity-icon class="icon ${short ? 'short-pos' : ''}" icon="${open ? 'unity:down_chevron' : 'unity:right_chevron'}"></unity-icon>` : null}
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
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          --primary-menu-color: var(--white-color, var(--default-white-color));
          --secondary-menu-color: var(--white-color, var(--default-white-color));
          --selected-color: var(--secondary-color, var(--default-secondary-color));
          --text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --border-breakers: var(--global-nav-border-color, var(--default-global-nav-border-color));
          --tall-height: 52px;
          --short-height: 32px;
          --label-margin: var(--global-nav-margin-size, 12px);
          border-collapse: collapse;
          user-select: none;
        }
        * {
          box-sizing: border-box;
        }
        .container {
          border-collapse: collapse;
          height: auto;
          min-height: var(--tall-height);
          width: 100%;
          background-color: var(--primary-menu-color);
          position: relative;
          cursor: pointer;
          --font-color: var(--text-color);
        }
        .container.disabled {
          cursor: default;
          opacity: 0.5;
        }
        .container:not(.disabled) .label:hover {
          background-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
        }
        .selected {
          color: var(--selected-color) !important;
          --font-color: var(--selected-color);
        }
        .selected.container::before {
          content: "";
          padding-right: 1px;
          background: var(--selected-color);
          display: block;
          height: 100%;
          position: absolute;
        }
        .open {
          background-color: var(--secondary-menu-color);
          border-top: 1px solid var(--border-breakers);
          border-bottom: 1px solid var(--border-breakers);

        }
        .label {
          display: flex;
          flex-wrap: nowrap;
          min-height: var(--tall-height);
          font-weight: 500;
          align-items: center;
          height: 100%;
          padding: 0 var(--label-margin);
        }
        .text {
          flex: 1;
          line-height: var(--tall-height);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          --font-size: 12px;
          --medium-weight: bold;
        }
        unity-icon + .text {
          margin: 0 var(--label-margin);
        }
        .icon {
          height: 16px;
          width: 16px;
          color: var(--text-color);
          --layout-inline_-_display: initial;
        }
        .short {
          min-height: var(--short-height);
          line-height: var(--short-height);
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

window.customElements.define('unity-global-nav-top-item', UnityGlobalNavTopItem)
