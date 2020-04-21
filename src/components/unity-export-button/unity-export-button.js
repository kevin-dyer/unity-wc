import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'

import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays button which will download a csv file when pressed.
 * @name UnityExportButton
 * @param {[]} headers, headers for the columns in your data, should be an array of strings that match the
 * @param {[]} data, data to be exported as csv; should be either an array of arrays that contain strings (won't be sorted) or an array of objects keyed with strings that match 'headers'
 * @param {bool} autoAddColumns, if true, new columns & headers are filled in when new keys (not matching passed-in headers) are found. This only applie when and array of objects is passed for 'data'
 * @param {func} onExport, callback that fired with result of export. Returns an object with keys "success," "exportedData," and "clickEvent"
 * @param {''} buttonType, action button type for styling ('solid', 'gradient', 'outlined'), default ''
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-export-button
 *    buttonType="solid"
 *    .headers="${['Key', 'Label', 'Note']}"
 *    .data="${[
 *      ['row1key','Row 1 Label', 'This is row 1 data'],
 *      ['row2key','Row 2 Label', 'This is row 2 data'],
 *      ['row3key','Row 3 Label', 'This is row 3 data'],
 *    ]}"
 *    .onExport="${({ success, exportedData, clickEvent }) => !!success && console.log('CSV Exported Successfully!')}"
 *  />
 */

class UnityExportButton extends LitElement {
  constructor() {
    super()
    this.headers = []
    this.data = []
    this.autoAddColumns = false
    this.buttonType = ''
    this.tableRef = undefined
    this.onExport = ()=>{}

    this.handleClick = this.handleClick.bind(this)
    this.buildDataToExport = this.buildDataToExport.bind(this)
    this.makeRow = this.makeRow.bind(this)
    this.addHeaders = this.addHeaders.bind(this)
  }

  // inputs
  static get properties() {
    return {
      headers: { type: Array },
      data: { type: Array },
      autoAddColumns: { type: Boolean },
      onExport: { type: Function },
      buttonType: { type: String },
      tableRef: { type: Object}
    }
  }

  set headers(headers) {
    const oldHeaders = this._headers
    this._headers = headers

    this.requestUpdate('headers', headers)
  }

  get headers() {
    return this._headers
  }

  set data(data) {
    const oldData = this._data
    this._data = data

    this.requestUpdate('data', oldData)
  }

  get data() {
    return this._data
  }

  set autoAddColumns(value) {
    const oldVal = this._autoAddColumns
    this._autoAddColumns = value

    this.requestUpdate('autoAddColumns', oldVal)
  }

  get autoAddColumns() {
    return this._autoAddColumns
  }

  handleClick(e) {
    //TODO: use this.tableRef._flattenedData and this.tableRef.columns to populate the csv file
    const data = this.buildDataToExport()
    const csvData = data.map(row => row.map(cell => `\"${cell.toString()}\"`).join(", ")).join("\n")
    // Create an invisible <a> element and click it to trigger download
    // QUESTION: Better way to do this?
    const hiddenLink = document.createElement('a')
    hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData)
    hiddenLink.target = '_blank'
    hiddenLink.download = 'export.csv'
    document.body.appendChild(hiddenLink)
    hiddenLink.click()
    document.body.removeChild(hiddenLink)
    // TODO: Detect and handle failed exports
    this.onExport({
      success: true,
      exportedData: data,
      clickEvent: e
    })
  }

  buildDataToExport() {
    const rowsData = this.data.map(this.makeRow)
    const headers = this.headers
    return [ headers, ...rowsData]
  }

  makeRow(row) {
    if (Array.isArray(row)) return row
    if (!row || !row instanceof Object) {
      // TODO: Handle this better
      console.error(`invalid row passed to makeRowArrayFromObject: `, row)
      return []
    }
    if (!!this.autoAddColumns) this.addHeaders(row)
    return this._headers.map(header => row.hasOwnProperty(header) ? row[header].toString() : '')
  }

  addHeaders(row) {
    // QUESTION: Is it okay to retrieve and set the internal "_headers" here?
    const oldHeaders = this._headers
    const newHeaders = Object.keys(row).filter(header => !this.headers.includes(header))
    const allHeaders = [ ...oldHeaders, ...newHeaders ]
    this._headers = [ ...oldHeaders, ...newHeaders ]
  }

  render() {
    // TODO: Ingest button styling / icons as attributes || take any child element(s) and wrap them in a slot?
    return html`
      <unity-button
        label="Export"
        type=${this.buttonType}
        @click=${this.handleClick}
      >
      </unity-button>
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

window.customElements.define('unity-export-button', UnityExportButton)
