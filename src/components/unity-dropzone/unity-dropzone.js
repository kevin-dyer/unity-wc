import { LitElement, html, css } from 'lit-element'
import '@spectrum-web-components/dropzone'
import '@polymer/iron-icons/iron-icons.js'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Dropzone for uploading files
 * @name UnityDropzone
 * @param {''} validType, filtype string to allow for the upload, default: '*'
 * @param {function} onUpload, callback function that receives the uploaded file
 * @param {bool} disabled, controls if dropzone should be disabled and not upload filed
 *
 *
 *
 *
 *
 *
 *
 */

class UnityDropzone extends LitElement {
  constructor(props) {
    super(props)

    this.validType = '*'
    this.onUpload = () => {}
    this.disabled = false
    this.invalid = false
  }

  static get properties() {
    return {
      validType: { type: String },
      onUpload: { type: Function },
      disabled: { type: Boolean },
      invalid: { type: Boolean }
    }
  }

  firstUpdated() {
    this.initDropzoneRef()
  }

  connectedCallback() {
    super.connectedCallback()

    this.initDropzoneRef()
  }

  disconnectedCallback() {
    this.removeEventListener('sp-dropzone-drop', this._handleDrop)
    this.removeEventListener('sp-dropzone-should-accept', this._shouldAccept)
  }

  // sp-dropzone-dragleave
  // sp-dropzone-dragover
  // sp-dropzone-drop
  // sp-dropzone-should-accept
  initDropzoneRef() {
    // bind
    this._handleDrop = this._handleDrop.bind(this)
    this._shouldAccept = this._shouldAccept.bind(this)
    // add event listeners
    this.addEventListener('sp-dropzone-drop', this._handleDrop)
    this.addEventListener('sp-dropzone-should-accept', this._shouldAccept)
  }

  _handleDrop(e={}) {
    const {
      detail: {
        dataTransfer: {
          files: {
            [0]: file
          }={}
        }={}
      }={}
    } = e

    console.log('file found: ', file)
  }

  _shouldAccept(e={}) {
    const {
      detail: {
        dataTransfer: {
          items: {
            [0]: {
              type: filetype
            }={}
          }={}
        }={}
      }={}
    } = e
    console.log('filetype: ', filetype)
    // make this set by a passed in var
    console.log('filetype === "application/json?"', filetype === 'application/json')
    // disabled scroll over changes
  }

  _checkFiles() {
    // need to hook this to call on file upload
    // need to see what event that is
    const { files } = this.shadowRoot.getElementById('file-input') || {}
    console.log('files', files)
    console.log('this.files', this.files)
    const dropzone = this.shadowRoot.getElementById('dropzone')
    console.log('this.shadowRoot.getElementById("dropzone")', dropzone.files)
    window.testFile = files[0]
    window.dropzone = dropzone
    // pass up to file handler
  }

  render() {
    return html`
      <sp-dropzone
        id="dropzone"
        tabindex="1"
        style="width: 400px; height: 200px"
        dropEffect="copy"
      >
        <div style="color: grey">
            <div>
                <label for="file-input">
                    <sp-link>Select a File</sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
        </div>
      </sp-dropzone>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          display: flex;
          flex-direction: column;
        }
      `
    ]
  }
}

window.customElements.define('unity-dropzone', UnityDropzone)
