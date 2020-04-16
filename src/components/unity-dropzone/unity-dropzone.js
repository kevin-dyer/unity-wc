import { LitElement, html, css } from 'lit-element'
import '@spectrum-web-components/dropzone'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

class UnityDropzone extends LitElement {
  constructor(props) {
    super(props)
  }

  static get properties() {
    return {}
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
        <sp-illustrated-message heading="Drag and Drop Your File">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 150 103"
                width="150"
                height="103"
                viewBox="0 0 150 103"
            >
                <path
                    d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
                ></path>
            </svg>
        </sp-illustrated-message>

        <div style="color: grey">
            <div>
                <label for="file-input">
                    <sp-link>Select a File</sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
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
