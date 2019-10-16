import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/iron-icons/image-icons.js'
import '@polymer/iron-icons/social-icons.js'

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
        ${this.selectable ? html`<paper-checkbox .checked="${this.selected}" noink @click="${this._handleSelect}" />`: null}
        ${!!imgUrl ? html`<iron-icon icon="image:broken-image"></iron-icon>` :
          !!icon ? html`<iron-icon icon="${icon}"></iron-icon>` : null }
        <span class="text">${this.label}</span>
      </div>
    `
  }

  static get styles() {
    return [
      // imported css styles go here
      // figure out this variable shite
      // can add class to custom component to control styles?
      css`
        paper-checkbox {
          padding: calc((38px - 14px) / 2) 0;
          --paper-checkbox-size: 14px;
          --paper-checkbox-unchecked-color: #d4d9db;
          --paper-checkbox-unchecked-ink-color: rgba(0,0,0,0);
          --paper-checkbox-checked-color: rgb(58, 188, 225);
          --paper-checkbox-checked-ink-color: rgba(0,0,0,0);
        }
        .cell {
          padding: 0 13px;
        }
        .text {
          color: #000;
          font-family: Avenir;
          size: 11pt;
          position: relative;
          top: 1px;
          line-height: 38px;
        }
        iron-icon {
          color: #464E57;

        }
      `
    ]
  }
}

customElements.define('unity-table-cell', UnityTableCell)
