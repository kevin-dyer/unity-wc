import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'
import { trimWhitespace } from '@bit/smartworks.unity.unity-utils'

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

  resolveOpenChange(e) {
    if (this.show && e.key === "Escape") {
      this.toggle()
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.resolveListener = this.resolveOpenChange.bind(this)
    document.addEventListener("keydown", this.resolveListener)
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this.resolveListener)
    super.disconnectedCallback()
  }

  getSlots() {
    const slots = [...this.shadowRoot.querySelectorAll('slot')]
    const slotContent = slots.map(slot => slot && slot.assignedNodes() || [])
    const [top, body, bottom] = slotContent.map(slot => trimWhitespace(slot))
    return {
      [TOP_SLOT]: top,
      [BODY_SLOT]: body,
      [BOTTOM_SLOT]: bottom
    }
  }

  handleBackdropClick() {
    const {
      cancelOnOutsideClick,
      toggle
    } = this
    if (cancelOnOutsideClick) toggle()
  }
  renderTitle({ [TOP_SLOT]: top=[] }) {
    const {
      title,
    } = this
    const classes = ["modal-title"]
    if (!title && top.length === 0) classes.push('hide')
    return html`
      <div class="${classes.join(' ')}">
        <unity-typography size="header2">${title}</unity-typography>
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
      title
    } = this
    const slots = this.getSlots()
    return html`
      <div
        class="modal-backdrop${show ? '' : ' hide'}"
        @click="${this.handleBackdropClick}"
        tabindex="-1"
      >
        <div class="modal" >

          ${this.renderTitle(slots)}

          <slot name="${BODY_SLOT}"></slot>

          ${this.renderBottom(slots)}
        </div>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          color: var(--black-text-color, var(--default-black-text-color));
        }
        .modal-backdrop {
          z-index: 100;
          background-color: transparent;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        .modal {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }
        .modal-title {
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
        .buttons {
          float: right;
        }
        .hide {
          display: none;
        }
      `
    ]
  }
}
 window.customElements.define('unity-modal', UnityModal)
