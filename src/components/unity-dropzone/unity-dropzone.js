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

  _handleUpload(e) {
    const {
      disabled,
      invalid,
      inputRef: {
        files: {
          [0]: selectedFile
        }={}
      }={},
    } = this
    const {
      detail: {
        dataTransfer: {
          files: {
            [0]: droppedFile
          }={}
        }={}
      }={}
    } = e || {}
    const upload = !!e ? droppedFile : selectedFile
    !disabled && !invalid && this.onUpload(upload)
    this._cleanZone()
  }

  _handleAccept(e={}) {
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
    // make this set by a passed in var
    if (filetype !== this.validType) {
      // disabled scroll over changes
      this.invalid = true
    }
  }

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
