import { LitElement, html, css } from 'lit-element'
// import { themes } from './path/to/themes'


/*
    Table, at minimum, takes an array of the data being passed in. Each data index
    should be an object with uniform keys. Actions are handled outside of table,
    but are dependant on what's selected. As such, if outside source wants access
    to the selected elements, a function should be passed in to process the
    selected data. In addition, a predefined column array can be passed in to
    determine order and size of columns in the table. If not passed in, then a
    default will be made from each key on the data object.

    data:             array of datum objects, non-uniform shape
    columns:          array of column objects, {name (datum key), width}
    reportSelected:   function to be called with full selected array

    Internals for creating/editing
    data:           data marked w/ tableId for uniq references
    selected:       array of elements that are selected, sent to reportSelected
    sortBy:         object with column to sort by and direction
    filter:         string to find in any column
    processedList:  sorted and filtered _data list, might need to find way to remove
                    as this leads to doubling the list for sake of runtime efficiency
*/

class UnityTable extends LitElement {
  // inputs
  static get properties() {
    return {
      data: { type: Array },
      columns: { type: Array },
      reportSelected: { type: Function }
    }
  }

  set data(value) {
    const oldValue = this._data
    const columns = this._columns
    // default catcher for missing columns
    if (!columns || !columns.length) {
      const newCol = Object.keys(value[0])
      this.columns = newCol.map(name => ({name, width: `${1 / newCol.length * 100}%`}))
    }
    const newValue = value.map((datum, i) => ({...datum, tableId: i}))
    this._data = newValue
    this.requestUpdate('data', oldValue)
  }

  get data() { return this._data }

  // possibly use setters for dynamic sort/filter update?
  /*
    if filter updates when changed, then _data can change
    Will data and filter ever change at the same time?

    actually, should sort after filtering, as sorting takes longer than filtering
    and filtering will remove elements which will make sorting faster
  */

  // internals
  constructor() {
    super()
    this._data = []
    this.columns = []
    this.reportSelected = ()=>{}
    this.selected = {}
    this.filter = ''
    this.sortBy = {column: '', direction: 'ascending'}
    this.proccessedList = []
  }

  // styles
  static get styles() {
    return [
      // imported css styles go here
      css`
        .container {
          width: '100%'
        }
      `
    ]
  }

  // actions
  // resizeColumns() {}
  selectAll() {
    this.selected = data.reduce((mask, data, i) => ({...mask, [i]: data}), {})
  }

  selectNone() {
    this.selected = {}
  }

  selectOne(id) {
    this.selected[id] = this.data[id]
  }

  // changeColumnOrder(column, newIndex) {}
  // addColumn(name) {
  //   this.columns.push({name})
  //   const numCol = this.columns.length
  //   // reduce each column by % based on numCol
  // }
  // removeColumn(name) {
  //   // iterate over columns arr, remove offending column, adjust widths
  // }
  // sortData(column, direction) {
  //   // sort data based on column and direction
  // }
  // filterData(filter) {
  //   // return items only if any prop contains the string
  //   // might instead be based on currently visible columns
  // }
  process() {
    // don't handle id marking here, so that it's only done on data change
    // sortData()
    // filterData()
  }

  render() {
    // table header
    // data.map(renderRow)
    return html`
      <div>
        ${this.tableData.map(datum => html`<p>${JSON.stringify(datum)}</p>`)}
      </div>
    `
  }
}

customElements.define('unity-table', UnityTable)

// rows render columns
// columns render cells
