import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays table of data.
 * @name UnityTableCell
 * @param {string} label, info to display in the cell
 * @param {string} icon, iron-icon to display in the cell
 * @param {string} id, relational id to the data, used in selection
 * @param {bool} selectable
 * @param {bool} selected
 * @param {function} onSelect, action handler on being selected
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table-cell
 *    label="Cell Content"
 *    .icon="${index === 0 && 'work'}"
 *    .id="${1}"
 *    selectable
 *    ?selected="${false}"
 *    .onSelect="${reportSelected}"
 *  />
 */

//   Table Cell to be used with Unity Table. Could be used elsewhere, matching styleguides
//
//   label:       string of the data to show in the cell
//   icon:        string of the name of the iron-icon to show in the cell
//   id:          the id related to the row/cell/datum being displayed, used with select functions
//   selectable:  bool to control if cell is selectable
//   selected:    bool to render cell as selected
//   onSelect:    callback for selection functions

class UnityTableCell extends LitElement {
  constructor() {
    super()
    this.label = ''
    this.icon = ''
    this.image = ''
    this.selectable = false
    this.selected = false
    this.id = undefined

    this.onSelect = ()=>{}
  }

  static get properties() {
    return {
      label: { type: String },
      // need to separate between img and icon
      icon: { type: String },
      // term with util handler? url to img?
      image: { type: String },
      selectable: { type: Boolean },
      selected: { type: Boolean },
      id: { type: Number },

      onSelect: { type: Function }
      // hierarchy stuff
    }
  }

  render() {
    // if img > icon > nothing
    const imgUrl = this.image
    const icon = this.icon

    return html`
      <div class="cell">
        ${this.selectable
          ? html`
            <paper-checkbox
              noink
              .checked="${this.selected}"
              @click="${this.onSelect}"
            />`
          : null
        }
        ${!!imgUrl
          ? html`<iron-icon icon="image:broken-image"></iron-icon>`
          : !!icon
            ? html`<iron-icon icon="${icon}"></iron-icon>`
            : null
        }
        <span class="text">${this.label}</span>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
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
          padding: calc((38px - 14px) / 2) 0;
        }
        .cell {
          padding: 0 13px;
          border-spacing: 0;
        }
        .text {
          position: relative;
          padding-top: 1px;
          line-height: 38px;
        }
        iron-icon {
          color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-table-cell', UnityTableCell)
