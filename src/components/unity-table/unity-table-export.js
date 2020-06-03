import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'

import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays button which will download a csv file when pressed.
 * @name UnityTableExport
 * @param {ref} tableRef, a reference object to a unity-table element that will define the data to be exported
 * @param {func} beforeExport, function called before export. Passed parameter is "tableData" (an array of rows, each being an array of cells). The function, if provided, should return a two dimensional object in the same format (later called in onExport as "exportData")
 * @param {func} onExport, function that is called after export. Passed parameter is an object with properties "success," "tableData," "exportData," "clickEvent," and "error"
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table-export
 *    .tableRef="${tableRef}"
 *    .beforeExport="${(data) => {
 *      console.log(data)
 *      return data 
 *    }}"
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
    this.beforeExport = data=>data
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
      beforeExport: { type: Function },
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

  handleClick(clickEvent) {
    let success
    let csvData = []
    let error = null
    let tableData = null
    let exportData = null
    
    try {
      tableData = this.buildDataToExport()
      exportData = this.beforeExport(tableData)
      csvData = exportData
        .map(row => {
          return row
            .map(cell => {
              return `"${cell.replace(/"/g, '""')}"`
            })
            .join(",")
        })
        .join("\n") || ''
        
      const anchorElement = this.shadowRoot.querySelector('a')
      anchorElement.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURI(csvData))
      console.log("UnityTableExport -> handleClick -> csvData", csvData)
      if (!!exportData && Array.isArray(exportData) && !!csvData && !!anchorElement && anchorElement.hasAttribute('href')) success = true
    } catch (e) {
      success = false
      error = e
    }
    
    this.onExport({ success, tableData, exportData, clickEvent, error })
    return success
  }

  buildDataToExport() {
    const {
      current: {
        _flattenedData: tableData=[]
      }={}
    } = this._tableRef || {}
    if (!Array.isArray(tableData)) throw `ERROR: TableData is not an array (actual type: ${typeof tableData}). Received: ${tableData}`
    const rowsData = tableData.map(this.makeRow)
    const headers = this._headers
    return [ headers, ...rowsData]
  }

  makeRow(row) {
    if (Array.isArray(row)) return row
    if (!row || !(row instanceof Object)) {
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
        @click="${this.handleClick}"
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
      UnityDefaultThemeStyles,
    ]
  }
}

window.customElements.define('unity-table-export', UnityTableExport)
