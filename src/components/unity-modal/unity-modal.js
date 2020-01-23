import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-dialog-scrollable'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Modal element that can be passed a title, top buttons, body, and bottom buttons
 * @name UnityColumnEditor
 * @param {''} title, string for modal title
 * @param {bool} show, bool to control if modal is open or close
 * @param {func} toggle, callback that controls modals open/close
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-modal
 *    .title="My Modal"
 *    ?show="${open}"
 *    .toggle="${()=> toggleClose()}"
 *  >
 *    <unity-button
 *      slot="top"
 *      label="Close"
 *      outline
 *      @click=${this.handleClose}>
 *    </unity-button>
 *    <div slot="body"/>
 *      This is the body of the modal
 *    </div>
 *    <unity-button
 *      slot="bottom"
 *      label="Clear"
 *      outline
 *      @click=${this.handleClear}>
 *    </unity-button>
 *    <unity-button
 *      slot="bottom"
 *      label="Save"
 *      gradient
 *      @click=${this.handleSave}>
 *    </unity-button>
 *  <unity-modal/>
 */

class UnityModal extends LitElement {
  constructor() {
    super()

    this.show = false
    this.title = ''
    this.toggle = () => this.show = !this.show

    // this will set the opacity of the modal background to transparent
    // the backdrop is attached to the body, so it must be done this way or through the user's app's styles
    document.querySelector('body').style.setProperty('--iron-overlay-backdrop-opacity', 0)
  }

  static get properties() {
     return {
       show: { type: Boolean },
       title: { type: String },
       toggle: { type: Function }
     }
  }

  resolveOpenChange() {
    if (this.show) {
      this.toggle()
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.resolveListener = this.resolveOpenChange.bind(this)
    document.addEventListener('iron-overlay-canceled', this.resolveListener)
  }
  disconnectedCallback() {
    document.removeEventListener('iron-overlay-canceled', this.resolveListener)
    super.disconnectedCallback()
  }

  render() {
    const {
      show,
      title
    } = this
    return html`
      <paper-dialog
        id="modal"
        ?opened="${this.show}"
        .noCancelOnOutsideClick="${true}"
        .withBackdrop="${true}"
      >
        <div class="modal-title">
          <h2 class="title">${title}</h2>
          <slot name="top"></slot>
        </div>

        <paper-dialog-scrollable>
          <slot name="body"></slot>
        </paper-dialog-scrollable>

        <div class="buttons">
          <slot name="bottom"></slot>
        </div>
      </paper-dialog>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          color: var(--black-text-color, var(--default-black-text-color));
        }
        paper-dialog-scrollable {
          margin: 0 -24px;
        }
        .modal-title {
          font-size: var(--header2-selected-font-size, var(--default-header2-selected-font-size));
          font-weight: var(--header2-selected-font-weight, var(--default-header2-selected-font-weight));
          border-bottom: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
          margin-top: 0;
          padding: 0 12px;
          height: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .title {
          display: flex;
          flex: 1;
          margin-right: 12px;
        }
      `
    ]
  }
}
 window.customElements.define('unity-modal', UnityModal)
