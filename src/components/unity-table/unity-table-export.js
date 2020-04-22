import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'

import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays button which will download a csv file when pressed.
 * @name UnityTableExport
 * @param {ref} tableRef, a reference object to a unity-table element that will define the data to be exported
 * @param {func} onExport, callback that fired with result of export. Returns an object with keys "success," "exportedData," and "clickEvent"
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table-export
 *    .tableRef="${tableRef}"
 *    .onExport="${({ success, exportedData, clickEvent }) => !!success && console.log('CSV Exported Successfully!')}"
 *  />
 */

class UnityTableExport extends LitElement {
  constructor() {
    super()
    this.onExport = ()=>{}
    this.tableRef = null

    this._headers = []

    this.handleClick = this.handleClick.bind(this)
    this.downloadFile = this.downloadFile.bind(this)
    this.buildDataToExport = this.buildDataToExport.bind(this)
    this.makeRow = this.makeRow.bind(this)
    this.addHeaders = this.addHeaders.bind(this)
  }

  // inputs
  static get properties() {
    return {
      tableRef: { type: Object },
      onExport: { type: Function },
    }
  }

  set tableRef(ref) {
    const oldRef = this._tableRef
    this._tableRef = ref

    this.requestUpdate('tableRef', oldRef)
  }

  get tableRef() {
    return this._tableRef
  }

  handleClick(e) {
    const data = this.buildDataToExport()
    const csvData = data.map(row => row.map(cell => `\"${cell.toString()}\"`).join(", ")).join("\n")

    this.onExport({
      success: this.downloadFile(csvData),
      exportedData: data,
      clickEvent: e
    })
  }

  downloadFile(fileData) {
    // Create an invisible <a> element and click it to trigger download
    // QUESTION: Better way to do this?
    const hiddenLink = document.createElement('a')
    hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData)
    hiddenLink.target = '_blank'
    hiddenLink.download = 'export.csv'
    document.body.appendChild(hiddenLink)
    hiddenLink.click()
    document.body.removeChild(hiddenLink)
    // TODO: Detect and handle failed exports and return
    return true
  }

  buildDataToExport() {
    const tableData = this.tableRef._flattenedData || []
    console.log('this.tableRef', this.tableRef)
    console.log('tableData', tableData)
    const rowsData = tableData.map(this.makeRow)
    const headers = this._headers
    return [ headers, ...rowsData]
  }

  makeRow(row) {
    if (Array.isArray(row)) return row
    if (!row || !row instanceof Object) {
      // TODO: Handle this better
      console.error(`invalid row passed to makeRowArrayFromObject: `, row)
      return []
    }
    this.addHeaders(row)
    return this._headers.map(header => row.hasOwnProperty(header) ? row[header].toString() : '')
  }

  addHeaders(row) {
    const oldHeaders = this._headers
    const newHeaders = Object.keys(row).filter(header => !this._headers.includes(header))
    const allHeaders = [ ...oldHeaders, ...newHeaders ]
    this._headers = [ ...oldHeaders, ...newHeaders ]
  }

  render() {
    // TODO: Ingest button styling / icons as attributes || take any child element(s) and wrap them in a slot?
    return html`
      <div
        @click=${this.handleClick}
      >
        <slot></slot>
      </div>
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
        }

        paper-icon-button {
          color: var(--light-grey-text-color, var(--default-light-grey-text-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-table-export', UnityTableExport)
