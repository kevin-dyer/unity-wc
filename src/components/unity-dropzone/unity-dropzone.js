import { LitElement, html, css } from 'lit-element'
import '@spectrum-web-components/dropzone'
import '@polymer/iron-icons/iron-icons.js'
import '@bit/smartworks.unity.unity-icon-set'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Dropzone for uploading files
 * @name UnityDropzone
 * @param {''} validType, filtype string to allow for the upload, supports regex, should match expected standards for best functionality, default: '.'
 * @param {function} onUpload, callback function that receives the uploaded file
 * @param {bool} disabled, controls if dropzone should be disabled and not upload filed
 * @param {bool} hideIcon, controls if center icon should render, default: false
 * @example
 * <unity-dropzone
 *   .onUpload="${file => async this.handleUpload(file)}"
 *   ?disabled="${zoneDisabled}"
 *   hideIcon
 *   validType="application/json"
 * />
 *
 * CSS Vars:
 *   --dropzone-color: changes the internal element color, uses --success-color for valid and --danger-color for invalid, defaults to dark-grey-text-color
 *   --dropzone-border-color: changes the external border color, uses --success-color for valid and --danger-color for invalid, defaults to dark-grey-background-color
 *   --dropzone-min-width: minimum width of the dropzone, defaults to 300px
 *   --dropzone-min-height maximum width of the dropzone, defaults to 200px
 *   --icon-size: the square size of the icon: defaults to 72px
 */

class UnityDropzone extends LitElement {
  constructor(props) {
    super(props)

    this.validType = '.'
    this.onUpload = () => {}
    this.disabled = false
    this.hideIcon = false
    this.invalid = null
  }

  static get properties() {
    return {
      validType: { type: String },
      onUpload: { type: Function },
      disabled: { type: Boolean },
      hideIcon: { type: Boolean },
      invalid: { attribute: false }
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
    this.removeEventListener('sp-dropzone-dragleave', this._cleanZone)
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
    let {
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
    const upload = droppedFile || selectedFile
    // invalid check for selected file w/ non-standard validType
    if (invalid === null) invalid = !this._checkType(upload.type)
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
    if (!this._checkType(filetype)) {
      // disabled scroll over changes
      this.invalid = true
    } else {
      this.invalid = false
    }
  }

  _checkType(filetype) {
    return filetype.match(new RegExp(this.validType, 'g'))
  }

  _cleanZone() {
    this.updateComplete.then(() => this.invalid = null)
  }

  _getClasses() {
    const {
      disabled,
      invalid
    } = this

    if (!!disabled) return 'disabled'
    if (invalid === true) return 'invalid'
    if (invalid === false) return 'valid'
    return ''
  }

  render() {
    const {
      validType,
      disabled,
      invalid,
      hideIcon
    } = this
    return html`
      <sp-dropzone
        id="dropzone"
        tabindex="1"
        dropEffect="copy"
        class="${this._getClasses()}"
      >
        <div class="drop-area">
          ${ hideIcon ? null :
            html`<iron-icon
              icon="unity:file_upload"
              class="upload-icon ${this._getClasses()}"
            ></iron-icon>
          `}
          ${ invalid === true ? html`
            <unity-typography class="invalid" size="header2">
              Invalid file type.
            </unity-typography>
            `: html`
              <slot name="dropText" class="dropText">
                <unity-typography size="header2" color="${disabled ? 'light' : 'dark'}">
                  Drag and Drop a file here
                </unity-typography>
              </slot>
            `
          }
          <label for="file-input" class="labelText">
            <slot name="labelText">
              <unity-typography size="paragraph" color="${disabled ? 'light' : 'dark'}">
                Or <span class="ul">Select a File</span>
                from your computer
              </unity-typography>
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
          --dropzone-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --dropzone-border-color: var(--dark-grey-background-color, var(--default-dark-grey-background-color));
          --dropzone-min-width: 300px;
          --dropzone-min-height: 200px;
          --icon-size: 72px;
        }
        .invalid {
          --dropzone-color: var(--danger-color, var(--default-danger-color));
          --dropzone-border-color: var(--dropzone-color);
          --font-color: var(--dropzone-color);
        }
        .valid {
          --dropzone-color: var(--success-color, var(--default-success-color));
          --dropzone-border-color: var(--dropzone-color);
          --font-color: var(--dropzone-color);
        }
        .disabled {
          --dropzone-color: var(--light-grey-text-color);
          --dropzone-border-color: var(--light-grey-background-color);
        }
        sp-dropzone {
          border-width: 2px;
          border-style: solid;
          border-color: var(--dropzone-border-color);
          padding: 1em;
          border-radius: 4px;
          box-sizing: border-box;
          min-width: var(--dropzone-min-width);
          min-height: var(--dropzone-min-height);
          flex-direction: column;
        }
        label {
          cursor: pointer;
        }
        span.ul {
          text-decoration: underline;
        }
        div.drop-area {
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          display: flex;
          position: relative;
          height: 100%;
          width: 100%;
        }
        .upload-icon {
          color: var(--dropzone-color);
          margin: 1em;
          flex: 1;
          height: auto;
          width: var(--icon-size);
        }
        .dropText {
          flex: 0;
        }
        .labelText {
          flex: 0;
        }
      `
    ]
  }
}

window.customElements.define('unity-dropzone', UnityDropzone)
