import { LitElement, html, css } from 'lit-element'
import './unity-dropzone/unity-dropzone.js'
import { SharedStyles } from './shared-styles'

class MyDropzone extends LitElement {
  constructor(props) {
    super(props)

    this.filename = ''
    this.filetype = ''
    this.fileContent = ''
  }

  static get properties() {
    return {
      filename: { type: String },
      filetype: { type: String },
      fileContent: { type: String }
    }
  }

  render() {
    const {
      filename,
      filetype,
      fileContent
    } = this
    return html`
      <unity-dropzone
        .onUpload="${async file => {
          this.filename = file.name
          this.filetype = file.type
          this.fileContent = await file.text()
        }}"
      ></unity-dropzone>

      ${!!filename ? html`<div>
        <div>File Name: ${filename}</div>
        <div>File Type: ${filetype}</div>
        <div>Contents: ${fileContent}</div>
      </div>` : null}
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
