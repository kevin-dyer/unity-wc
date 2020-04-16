import { LitElement, html, css } from 'lit-element'
import '@spectrum-web-components/dropzone'
import '@polymer/iron-icons/iron-icons.js'
import '@bit/smartworks.unity.unity-icon-set'
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
    this.removeEventListener('sp-dropzone-drop', this._handleUpload)
    this.removeEventListener('sp-dropzone-should-accept', this._handleAccept)
    this.addEventListener('sp-dropzone-dragleave', this._cleanZone)
    if (!!this.inputRef) {
      this.inputRef.removeEventListener('change', this._handleUpload)
      this.inputRef = undefined
    }
  }

  // these are the events that the dropzone uses
  // sp-dropzone-dragleave
  // sp-dropzone-dragover
  // sp-dropzone-drop
  // sp-dropzone-should-accept
  initDropzoneRef() {
    // bind
    this._handleUpload = this._handleUpload.bind(this)
    this._handleAccept = this._handleAccept.bind(this)
    // add event listeners
    this.addEventListener('sp-dropzone-drop', this._handleUpload)
    this.addEventListener('sp-dropzone-should-accept', this._handleAccept)
    this.addEventListener('sp-dropzone-dragleave', this._cleanZone)

    // get input ref
    if (!this.inputRef) {
      this.inputRef = this.shadowRoot.getElementById('file-input')
      if (!!this.inputRef) {
        window.inputref = this.shadowRoot
        this.inputRef.addEventListener('change', this._handleUpload)
      }
    }
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

  _cleanZone() {
    this.updateComplete.then(() => this.invalid = false)
  }

  _getClasses() {
    const {
      disabled,
      invalid
    } = this

    if (!!disabled) return 'disabled'
    if (!!invalid) return 'invalid'
  }

  render() {
    const {
      validType,
      disabled,
      invalid
    } = this
    return html`
      <sp-dropzone
        id="dropzone"
        tabindex="1"
        dropEffect="copy"
        class="${this._getClasses()}"
      >
        <div>
          <iron-icon icon="unity:file_upload" class="${this._getClasses()}"></iron-icon>
          <slot name="dropText">
            <div>
              Drag and Drop a file here
            </div>
          </slot>
          <label for="file-input">
            <slot name="labelText">
              Or <span class="ul">Select a File</span>
              from your computer
            </slot>
          </label>
            ${!disabled ? html`<input type="file"
              id="file-input"
              .accept="${this.validType}"
              style="display: none"
            />` : null}
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
        label {
          cursor: pointer;
        }
        span.ul {
          text-decoration: underline;
        }
      `
    ]
  }
}

window.customElements.define('unity-dropzone', UnityDropzone)
