import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'
import '@polymer/iron-icons/hardware-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

// import '@bit/smartworks.unity.table-cell-base'
import './table-cell-base.js'

const TAB_SIZE = 16
/**
 * Displays table of data.
 * @name UnityTableCell
 * @param {string} icon, iron-icon to display in the cell
 * @param {string} id, relational id to the data, used in selection
 * @param {integer} tabIndex, level of indentation required between checkbox and icon
 * @param {bool} selectable
 * @param {bool} selected
 * @param {function} onSelect, action handler on being selected
 * @slot {HTML}, default slot passed in as child, used to display cell content
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table-cell
 *    .icon="${index === 0 && 'work'}"
 *    .id="${1}"
 *    .tabIndex="${0}"
 *    selectable
 *    ?selected="${false}"
 *    .onSelect="${reportSelected}"
 *  >
 *    <slot name="${slotId}">
 *      <span class="text">Cell content</span>
 *    </slot>
 *  </unity-table-cell>
 */

//   Table Cell to be used with Unity Table. Could be used elsewhere, matching styleguides
//
//   icon:        string of the name of the iron-icon to show in the cell
//   id:          the id related to the row/cell/datum being displayed, used with select functions
//   selectable:  bool to control if cell is selectable
//   selected:    bool to render cell as selected
//   onSelect:    callback for selection functions

class UnityTableCell extends LitElement {
  constructor() {
    super()
    this.icon = ''
    this.image = ''
    this.selectable = false
    this.selected = false
    this.id = undefined
    this.tabIndex = 0
    this.expandable = false
    this.expanded = false
    this.resizeable = false

    this.onSelect = ()=>{}
    this.onExpand = ()=>{}
    this.onResizeStart = ()=>{}
    this.onResize = ()=>{}
    this.onResizeComplete = ()=>{}
  }

  static get properties() {
    return {
      // need to separate between img and icon
      icon: { type: String },
      // term with util handler? url to img?
      image: { type: String },
      selectable: { type: Boolean },
      selected: { type: Boolean },
      id: { type: Number },
      tabIndex: { type: Number },
      expandable: { type: Boolean },
      expanded: { type: Boolean },
      resizable: {type: Boolean },
      onSelect: { type: Function },
      onExpand: { type: Function },
      onResizeStart: { type: Function },
      onResize: { type: Function },
      onResizeComplete: { type: Function }
      // hierarchy stuff
    }
  }

  handleExpand(e) {

    e.stopPropagation()
    this.onExpand(e)
  }

  render() {
    // if img > icon > nothing
    const imgUrl = this.image
    const icon = this.icon
    const tabIndex = this.tabIndex
    const expandable = this.expandable
    const expanded = this.expanded

    return html`
      <table-cell-base
        .resizable="${this.resizable}"
        .onResizeStart="${this.onResizeStart.bind(this)}"
        .onResize="${this.onResize.bind(this)}"
        .onResizeComplete="${this.onResizeComplete.bind(this)}"
      >
        <div class="cell">
          ${this.selectable
            ? html`
              <paper-checkbox
                noink
                .checked="${this.selected}"
                @click="${this.onSelect}"
              ></paper-checkbox>`
            : null
          }
          ${tabIndex > 0
            ? html`<div class="tab-indent" style="width:${tabIndex * TAB_SIZE}px"></div>`
            : ''
          }
          ${expandable
            ? html `<paper-icon-button
                class="expand-control ${expanded ? 'expanded' : 'collapsed'}"
                icon="icons:arrow-drop-down"
                @click="${this.handleExpand}"
              ></paper-icon-button>`
            : ''
          }
          ${!!imgUrl
            ? html`<iron-icon icon="image:broken-image"></iron-icon>`
            : !!icon
              ? html`<iron-icon icon="${icon}"></iron-icon>`
              : null
          }

          <slot></slot>
        </div>
      </table-cell-base>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          min-width: 0;
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--paragraph-text-size, var(--default-paragraph-text-size));
          font-weight: var(--small-text-weight, var(--default-small-text-weight));
          color: var(--black-text-color, var(--default-black-text-color));
          --paper-checkbox-size: 14px;
          --paper-checkbox-unchecked-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          --paper-checkbox-checked-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-rgb)));
          --paper-checkbox-unchecked-ink-color: rgba(0,0,0,0);
          --paper-checkbox-checked-ink-color: rgba(0,0,0,0);
        }
        paper-checkbox {
          margin-right: 12px;
          z-index: 2;
          border-radius: 2px;
          overflow: hidden;
        }
        .cell {
          padding: 0 13px;
          border-spacing: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          min-width: 0;
        }
        .text {
          position: relative;
          padding-top: 1px;
          line-height: 38px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        iron-icon {
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
        }
        .tab-indent {
          display: inline-block;
          height: 0;
        }
        .expand-control {
          margin-left: -28px;
          margin-right: -12px;
        }
        .expand-control.collapsed {
          transform: rotate(-90deg);
        }
      `
    ]
  }
}

window.customElements.define('unity-table-cell', UnityTableCell)
