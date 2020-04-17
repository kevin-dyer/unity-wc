import { LitElement, html } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js'
import '@bit/smartworks.unity.unity-icon-set'


class UnityIcon extends LitElement {
  constructor() {
    super()
    this.icon = ''
  }

  static get properties() {
    return {
      icon: { type: String }
    }
  }

  render() {
    return html`
      <iron-icon
        icon=${this.icon}
      ></iron-icon>    
    `
  }
}

window.customElements.define('unity-icon', UnityIcon);
