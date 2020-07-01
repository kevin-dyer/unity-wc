import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
import Sortable from 'sortablejs/modular/sortable.core.esm.js' // Core SortableJS (without default plugins)
import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-modal'

/**
 * Displays button which will open column editor modal.
 * @name UnityColumnEditor
 * @param {{}} buttonProps, object defining properties of unity-button used to toggle Column Editor Modal.
 * @param {[]} columns, array of objects - same as what is passed into unity-table
 * @param {[]} selectedColumns, array of column keys from columns that are visible
 * @param {func} onUpdate, callback that is sent an array of sorted visible columns
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-column-editor
 *    .buttonProps="${{
        label: 'Edit Columns',
        leftIcon: 'settings',
        type: 'primary'
      }}"
 *    .columns="${[
 *      {
 *        key: 'column2',
 *        label: 'Column #2',
*         format: (colValue, datum) => `Building: ${colValue}`
 *      },
 *      {
 *        key: 'columnN',
 *        label: 'Column #N',
 *        format: (colValue, datum) => html`<span style="${myStyle}">Room: ${colValue}</span>`
 *      },
 *      {
 *        key: 'column1',,
 *        label: 'Column #1'
 *        format: column1Handler
 *      }
 *    ]}"
 *    .selectedColumns="${[column1, column2]}"
 *    .onUpdate="${visibleColumns => console.log('These are the visible sorted columns: ', visibleColumns)}"
 *  />
 */

//   UnityColumnEditor should be passed at a minimum an array of column data,
//   and an onUpdate callback that will be called on save of the modal


class UnityColumnEditor extends LitElement {
  constructor() {
    super()

    this.columns = []
    this.buttonProps = {label: 'Edit Columns'}
    this.onUpdate = (columns) => {}

    this._dialogVisible = false
    this._sortedColumns = []
    this._sortable
    this._selectedColumns = [] //internal variable to hold selectedColumns
    this._formSelectedColumns = [] //internal varaible to hold selected columns in form (before save)
  }

  // inputs
  static get properties() {
    return {
      columns: {type: Array},
      selectedColumns: {type: Array},
      onUpdate: {type: Function},
      buttonProps: {type: Object},
      _dialogVisible: {type: Boolean},
      _selectedColumns: {type: Array},
      _formSelectedColumns: {type: Array}
    }
  }

  firstUpdated() {
    this.initSortable()
  }

  connectedCallback() {
    super.connectedCallback();
    this.resolveListener = this.resolveOpenChange.bind(this)
    document.addEventListener('iron-overlay-canceled', this.resolveListener);
  }
  disconnectedCallback() {
    document.removeEventListener('iron-overlay-canceled', this.resolveListener);
    super.disconnectedCallback();
  }

  set columns(columns) {
    const oldCols = this.columns
    if (!this.selectedColumns || this.selectedColumns.length === 0) {
      this.selectedColumns = columns.map(col => col.key)
    }

    this._sortedColumns = columns //NOTE: will this work?
    this._columns = columns

    this.requestUpdate('columns', oldCols)
  }

  get columns() {
    return this._columns
  }

  set selectedColumns (selectedColumns) {
    const oldSelected = this._selectedColumns

    this._selectedColumns = selectedColumns

    //Also reset this._formSelectedColumns
    this._formSelectedColumns = selectedColumns
    this.requestUpdate('selectedColumns', oldSelected)
  }

  get selectedColumns() {
    return this._selectedColumns
  }

  initSortable() {
    const listRef = this.shadowRoot.getElementById('column-list')
    this._sortable = new Sortable(listRef, {
      handle: '.drag-handle',
      ghostClass: "sortable-ghost",  // Class name for the drop placeholder
      chosenClass: "sortable-chosen",  // Class name for the chosen item
      dragClass: "sortable-drag",
      onUpdate: this.handleSort.bind(this)
    })
  }

  toggleDialog() {
    this._dialogVisible = !this._dialogVisible
  }

  handleColumnCheck(column) {
    const index = this._formSelectedColumns.findIndex(colKey => colKey === column.key)
    const isSelected = index > -1

    if (isSelected) {
      const nextSelected = [...this._formSelectedColumns]
      nextSelected.splice(index, 1)
      this._formSelectedColumns = nextSelected
    } else {
      this._formSelectedColumns = [...this._formSelectedColumns, column.key]
    }
  }

  handleSort(e) {
    this._sortedColumns = this._sortable.toArray().map(key =>
      this.columns.find(col =>
        col.key === key
      )
    )
  }

  handleCancel(e) {
    //TODO: put list back the way it was - may need to unmount the component when modal is closed
    this._sortedColumns = this.columns

    //Reset this._formSelectedColumns back to original selectedColumns
    this._formSelectedColumns = this.selectedColumns

    this.toggleDialog()
  }

  resolveOpenChange(e) {
    if (this._dialogVisible) {
      this.toggleDialog()
    }
  }

  handleSave(e) {
    const visibleColumns = this._sortedColumns.filter(col =>
      this._formSelectedColumns.some(colKey =>
        colKey === col.key
      )
    )
    //Update internal selected Columns list
    this.selectedColumns = this._formSelectedColumns

    this.onUpdate(visibleColumns)
    this.toggleDialog()
  }

  renderRow(col) {
    const isSelected = this._formSelectedColumns.some(colKey => colKey === col.key)
    return html`
      <div class="row" data-id="${col.key}">
        <div class="checkbox-container">
          <paper-checkbox
            noink
            .checked="${isSelected}"
            @click="${e => this.handleColumnCheck(col)}"
          ></paper-checkbox>
        </div>

        <div class="column-content">

          <div class="column-name">
            ${col.label}
          </div>

          <paper-icon-button
            class="drag-handle"
            icon="icons:menu"
            @click="${()=>{}}"
          ></paper-icon-button>
        </div>
      </div>
    `
  }

  render() {
    const {
      label='',
      leftIcon='',
      rightIcon='',
      centerIcon='',
      type='',
      important,
      loading
    } = this.buttonProps
    return html`
      <unity-button
        label=${label}
        leftIcon=${leftIcon}
        rightIcon=${rightIcon}
        centerIcon=${centerIcon}
        type=${type}
        ?important=${important}
        ?loading=${loading}
        @click=${this.toggleDialog.bind(this)}
      >
      </unity-button>

      <unity-modal
        id="dialog"
        ?opened="${this._dialogVisible}"
        ?show="${this._dialogVisible}"
        .title="${'Edit Columns'}"
        .toggle="${this.toggleDialog.bind(this)}"
      >
        <div class="list-container" id="column-list" slot="body">
          ${this.columns.map(this.renderRow.bind(this))}
        </div>

        <unity-button
          label="Cancel"
          slot="bottom"
          type="secondary"
          @click=${this.handleCancel.bind(this)}
        ></unity-button>
        <unity-button
          label="Save"
          slot="bottom"
          autofocus
          type="primary"
          @click=${this.handleSave.bind(this)}
        ></unity-button>
      </unity-modal>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          color: var(--black-text-color, var(--default-black-text-color));
          --paper-checkbox-size: 14px;
          --paper-checkbox-unchecked-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          --paper-checkbox-checked-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-rgb)));
          --paper-checkbox-unchecked-ink-color: rgba(0,0,0,0);
          --paper-checkbox-checked-ink-color: rgba(0,0,0,0);
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

        .list-container {
          margin: 0;
          height: 100%;
          max-height: 300px;
          overflow-y: auto;
        }

        .row {
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-bottom: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        .checkbox-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 12px;
          padding-right: 4px;
          border-right: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        paper-icon-button {
          color: var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        .column-content {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 12px;
        }

        .sortable-ghost {
          opacity: 0.5;
          background: #C8EBFB;
        }

        .sortable-drag {
          background-color: #FFF;
          opacity: 1;
        }

        .drag-handle {
          cursor: move;
        }
      `
    ]
  }
}

window.customElements.define('unity-column-editor', UnityColumnEditor)