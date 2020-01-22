import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-dialog/paper-dialog'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays button which will open column editor modal.
 * @name UnityColumnEditor
 * @param {''} title, string for modal title
 * @param {bool} show, bool to control if modal is open or close
 * @param {func} toggle, callback that controls modals open/close
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-modal
 *    .title="My Modal"
 *    ?show="${open}"
 *    toggle
 *  >
 *    <div slot="top"/>top</div>
 *    <div slot="body"/>body</div>
 *    <div slot="bottom"/>bottom</div>
 *  <unity-modal/>
 */

class UnityModal extends LitElement {
  constructor() {
    super()

    this.show = false
    this.title = ''
    this.toggle = () => this.show = !this.show
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
        id="dialog"
        ?opened="${this.show}"
        .noCancelOnOutsideClick="${true}"
      >
        <div class="dialog-title">
          <h2 class="title">${title}</h2>
          <slot name="top"></slot>
        </div>

        <slot name="body"></slot>

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
        paper-dialog {
          min-width: 425px;
        }
        .dialog-title {
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
        }
      `
    ]
  }
}
 window.customElements.define('unity-modal', UnityModal)
