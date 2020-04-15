import { LitElement, html, css } from 'lit-element'
import './unity-dropzone/unity-dropzone.js'
import { SharedStyles } from './shared-styles'

class MyDropzone extends LitElement {
  constructor(props) {
    super(props)
  }

  static get properties() {
    return {}
  }

  render() {
    return html`
      <unity-dropzone></unity-dropzone>
    `
  }

  static get styles() {
    return [
      SharedStyles,
      css``
    ]
  }
}

window.customElements.define('my-dropzone', MyDropzone)
