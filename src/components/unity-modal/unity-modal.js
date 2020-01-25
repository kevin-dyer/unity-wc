import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-dialog-scrollable'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import { trimSlots } from '../unity-utils/unity-utils'

/**
 * Modal element that can be passed a title, top buttons, body, and bottom buttons
 * @name UnityColumnEditor
 * @param {''} title, string for modal title
 * @param {bool} show, bool to control if modal is open or close
 * @param {func} toggle, callback that controls modals open/close
 * @param {bool} cancelOnOutsideClick, bool to control if clicking outside of modal will call toggle to close
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

 const TOP_SLOT = "top"
 const BODY_SLOT = "body"
 const BOTTOM_SLOT = "bottom"

class UnityModal extends LitElement {
  constructor() {
    super()

    this.show = false
    this.title = ''
    this.toggle = () => this.show = !this.show
    this.cancelOnOutsideClick = false

    // this will set the opacity of the modal background to transparent
    // the backdrop is attached to the body, so it must be done this way or through the user's app's styles
    document.querySelector('body').style.setProperty('--iron-overlay-backdrop-opacity', 0)
  }

  static get properties() {
    return {
      show: { type: Boolean },
      title: { type: String },
      toggle: { type: Function },
      cancelOnOutsideClick: { type: Boolean }
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

  getSlots() {
    const slots = [...this.shadowRoot.querySelectorAll('slot')]
    const slotContent = slots.map(slot => slot && slot.assignedNodes() || [])
    const [top, body, bottom] = slotContent.map(slot => trimSlots(slot))
    return {
      [TOP_SLOT]: top,
      [BODY_SLOT]: body,
      [BOTTOM_SLOT]: bottom
    }
  }

  renderTitle({ [TOP_SLOT]: top=[] }) {
    const {
      title,
    } = this
    const classes = ["modal-title"]
    if (!title && top.length === 0) classes.push('hide')
    return html`
      <div class="${classes.join(' ')}">
        <h2 class="title">${title}</h2>
        <slot name="${TOP_SLOT}"></slot>
      </div>
    `
  }

  renderBottom({ [BOTTOM_SLOT]: bottom=[] }) {
    const classes = ["buttons"]
    if (bottom.length === 0) classes.push('hide')
    return html`
      <div class="${classes.join(' ')}">
        <slot name="${BOTTOM_SLOT}"></slot>
      </div>
    `
  }

  render() {
    const {
      show,
      title,
      cancelOnOutsideClick
    } = this
    const slots = this.getSlots()
    return html`
      <paper-dialog
        id="modal"
        ?opened="${this.show}"
        .noCancelOnOutsideClick="${!cancelOnOutsideClick}"
        .withBackdrop="${true}"
      >

        ${this.renderTitle(slots)}

        <paper-dialog-scrollable>
          <slot name="${BODY_SLOT}"></slot>
        </paper-dialog-scrollable>

        ${this.renderBottom(slots)}
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
        .hide {
          display: none;
        }
      `
    ]
  }
}
 window.customElements.define('unity-modal', UnityModal)
