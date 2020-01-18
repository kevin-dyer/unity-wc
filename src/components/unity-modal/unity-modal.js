import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-dialog/paper-dialog'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays button which will open column editor modal.
 * @name UnityColumnEditor
 * @param {[]} columns, array of objects - same as what is passed into unity-table
 * @param {[]} selectedColumns, array of column keys from columns that are visible
 * @param {func} onUpdate, callback that is sent an array of sorted visible columns
 * @param {bool} buttonGradient, boolean to style action button with background gradient
 * @param {bool} buttonOutlined, boolean to style action button with border outline
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-column-editor
 *    ?buttonGradient=${true}
 *    ?buttonOutlined=${false}
 *    .columns="${[
 *      {
 *        key: 'column2',
 *        label: 'Column #2'
*         format: (colValue, datum) => `Building: ${colValue}`
 *      },
 *      {
 *        key: 'columnN',
 *        label: 'Column #N'
 *        format: (colValue, datum) => html`<span style="${myStyle}">Room: ${colValue}</span>`
 *      },
 *      {
 *        key: 'column1',
 *        label: 'Column #1'
 *        format: column1Handler
 *      }
 *    ]}"
 *    .selectedColumns="${[column1, column2]}"
 *    .onUpdate="${visibleColumns => console.log('These are the visible sorted columns: ', visibleColumns')}"
 *  />
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
          <h2>${title}</h2>
          <div class="title-options">
            <slot name="top"></slot>
          </div>
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
        .buttons {

        }
      `
    ]
  }
}
 window.customElements.define('unity-modal', UnityModal)
