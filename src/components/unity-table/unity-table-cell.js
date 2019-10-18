import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles.js'

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

  _handleSelect() {
    this.onSelect(this.id)
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
              @click="${this._handleSelect}"
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
