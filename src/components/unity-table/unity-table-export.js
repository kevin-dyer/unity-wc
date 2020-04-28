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
 *  >
 *    <unity-button // or any other element
 *      // whatever unity-button props you require
 *    ></unity-button>
 *  </unity-table-export>
 */

const ignoreHeaders = ['_childCount', '_parents', '_rowId', '_tabIndex']

class UnityTableExport extends LitElement {
  constructor() {
    super()
    this.onExport = ()=>{}
    this.tableRef = null

    this._headers = []

    this.handleClick = this.handleClick.bind(this)
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
    let success = false
    const data = this.buildDataToExport()
    const csvData = data.map(row => row.map(cell => `\"${cell.toString()}\"`).join(", ")).join("\n") || ''

    const anchorElement = document.getElementById('export-wrapper')
    hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData)

    if (!!data && !!csvExport && !!anchorElement && anchorElement.hasAttribute('href')) success = true
    
    this.onExport({
      success,
      exportedData: data,
      clickEvent: e
    })

    return success
  }

  buildDataToExport() {
    const {
      current: {
        _flattenedData: tableData=[]
      }={}
    } = this._tableRef || {}
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
    const newHeaders = Object.keys(row).filter(header => !ignoreHeaders.includes(header) && !this._headers.includes(header))
    const allHeaders = [ ...oldHeaders, ...newHeaders ]
    this._headers = [ ...oldHeaders, ...newHeaders ]
  }

  render() {
    return html`
      <a
        id='export-wrapper'
        onclick=${this.handleClick}
        target='_blank'
        download='export.csv'
      >
        <slot></slot>
      </a>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles
    ]
  }
}

window.customElements.define('unity-table-export', UnityTableExport)
