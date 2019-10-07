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
    columns:          array of column objects, {key (related to datum keys), label (label rendered) width}
    headless:         bool to control head render, include to have no table header
    selectable:       bool to control if rows should be selectable
    reportSelected:   function to be called with full selected array
    controls:         determines use of internal filter and sort, can be 'internal',
                      'external', or false
    reportFilter:     function to be called when filter changes if controls are EXT
                      sends in string to filter by
    reportSort:       function to be called when sortBy changes if controls are EXT
                      sends string of column name and string for ascending or descending
    reportUpdate:     function to be called to request more pages to support infiniscroll
                      only works with controls set to EXT

    Internals for creating/editing
    data:           data marked w/ tableId for uniq references
    selected:       array of elements that are selected, sent to reportSelected
    sortBy:         object with column to sort by and direction, default to first
                    and descending? What counts as no sort?
    filter:         string to find in any column
    processedList:  sorted and filtered _data list, might need to find way to remove
                    as this leads to doubling the list for sake of runtime efficiency
*/

const ASC = 'ascending'
const DES = 'descending'
const INT = 'internal'
const EXT = 'external'

class UnityTable extends LitElement {
  // inputs
  static get properties() {
    return {
      data: { type: Array },
      columns: { type: Array },
      headless: { type: Boolean },
      selectable: { type: Boolean },
      reportSelected: { type: Function },
      controls: { type: String },
      reportFilter: { type: Function },
      reportSort: { type: Function },
      reportUpdate: { type: Function }
    }
  }

  set data(value) {
    const oldValue = this._data
    const columns = this._columns
    // default catcher for missing columns
    if (!columns || !columns.length) {
      const newCol = Object.keys(value[0])
      this.columns = newCol.map(name => ({key: name, label: name, width: 1 / newCol.length}))
    }
    const newValue = value.map((datum, i) => ({...datum, tableId: i}))
    this._data = newValue
    this.process()
    this.requestUpdate('data', oldValue)
  }

  get data() { return this._data }

  // if column isn't rendered or not passed in, defaults to first rendered column
  // if direction isn't ASC or DES, default to ASC
  set sortBy(value) {
    // should always receive object
    // should save value as expected
    // call process on new values
    // update
    const oldValue = this._sortBy
    let { column, direction } = value
    const columns = this.columns
    // check that column is in list
    const exists = columns.some(({name}) => name === column)
    if (!exists) {
      column = columns[0].name
    }
    // check direction is 'ascending' or 'descending', defaulting the former
    if (direction !== ASC && direction !== DES) {
      direction = ASC
    }
    this._sortBy = {column, direction}
    this.sortData()
    this.requestUpdate('sortBy', oldValue)
  }

  get sortBy() { return this._sortBy }

  set filter(value) {
    const oldValue = this._filter
    this._filter = value
    if (this.controls === EXT) {
      this.filterData()
    } else {
      this.process()
    }
    this.requestUpdate('filter', oldValue)
  }

  get filter() { return this._filter }

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
    // defaults of input
    this._data = []
    this.columns = []
    this.selectable = false
    this.reportSelected = ()=>{}
    this.headless = false
    this.selected = {}
    this.reportFilter = ()=>{}
    this.reportSort = ()=>{}
    this.reportUpdate = ()=>{}

    // defaults of internal references
    this._filter = ''
    this._sortBy = {column: '', direction: ASC}
    this.proccessedList = []
  }

  // styles
  static get styles() {
    return [
      // imported css styles go here
      css`
        .container {
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `
    ]
  }

  // actions
  // resizeColumns() {}
  selectAll() {
    const newSelected = [...this.data]
    this.selected = newSelected
    this.reportSelected(newSelected)
  }

  selectNone() {
    this.selected = {}
    this.reportSelected({})
  }

  selectOne(id) {
    const newSelected = [...this.selected]
    newSelected[id] = this.data[id]
    this.selected = newSelected
    this.reportSelected(newSelected)
  }

  // takes name of column (or maybe whole column) to move and index to move it to
  // returns false if something went wrong, or new order
  // mutates this.columns if successful
  changeColumnOrder(columnName, newIndex) {
    // get old order and target column
    const oldOrder = [...this.columns]
    // TODO: can remove this step if whole column is passed in
    const targetColumnIndex = oldOrder.findIndex(({name}) => name === columnName)
    if (targetColumnIndex < 0) {
      console.warn(`Column not found or already in index: ${newIndex}`)
      return false
    }
    let newOrder = [...this.columns]
    // remove column at old position
    newOrder.splice(targetColumnIndex, 1)
    // if new index is farther back, have to adjust for having removed element first
    const newPos = targetColumnIndex > newIndex ? newIndex - 1 : newIndex
    newOrder.splice(newPos, 0, oldOrder[targetColumnIndex])
    if (oldOrder.length === newOrder.length) {
      this.columns = newOrder
      return newOrder
    } else {
      console.warn(`There are ${newOrder.length > oldOrder.length ? 'extra' : 'missing'} columns. Old then New order:`, oldOrder, newOrder)
      return false
    }
  }

  // takes name of column to add
  // returns false if column already exists
  // otherwise mutates and returns new columns order
  addColumn(name) {
    // save old length, add new column, and save new length
    let columns = [...this.columns]
    // confirm column isn't already in list
    const exists = columns.some(({name: columnName}) => columnName === name)
    if (exists) {
      console.warn('Column already exists')
      return false
    }
    const oldLength = columns.length
    columns.push({name, width: 1/oldLength})
    const newLength = columns.length
    if (oldLength >= newLength) {
      console.warn('Columns length did not change correctly')
      return false
    }
    const factor = oldLength / newLength
    // iterate over new columns, adjusting for new column count
    columns.forEach(column => column.width = column.width * factor)
    this.columns = columns
    return columns
  }

  removeColumn(name) {
    // iterate over columns arr to make new columns, save target column width
    const oldColumns = [...this.columns]
    let newColumns = []
    let removedColumnWidth
    oldColumns.forEach(column => {
      const {
        name: columnName,
        width
      } = column
      if (columnName === name) removedColumnWidth = width
      else newColumns.push(column)
    })
    if (oldColumns.length <= newColumns.length) {
      return false
    }
    // iterate over new columns increasing width by even portion of removed column
    let factor = removedColumnWidth / newColumns.length
    newColumns.forEach(column => column.width = column.width + factor)
    this.columns = newColumns
    return newColumns
  }

  filterData() {
    const searchFor = this.filter || ''
    // if controls are external, callback and quit
    if (this.controls === EXT) {
      this.reportFilter(searchFor)
      this.processedData = [...this.data]
      return
    }
    // return items only if any prop contains the string
    // might instead be based on currently visible columns
    const columns = [...this.columns]
    if (!!searchFor) {
      let processedData = [...this.data]
      processedData = processedData.filter(datum => {
        // need to consider different value types
        return columns.some(({name: column}) => {
          const point = datum[column]
          // might need to turn below into recursive func if we are expecting data to include obj
          if (typeof point === 'string') {
            return point.includes(searchFor)
          } else if (typeof point === 'number') {
            return point === searchFor
          } else {
            return false
          }
        })
      })
      this.processedData = processedData
    }
  }

  sortData() {
    const {
      column: sortBy,
      direction
    } = this.sortBy
    if (this.controls === EXT) {
      this.reportSort(sortBy, direction)
      this.processedData = [...this.processedData]
      return
    }
    // sort data based on column and direction
    let processedData = [...this.processedData]
    processedData = processedData.sort((first, second) => {
      const a = String(first[sortBy]).toLowerCase()
      const b = String(second[sortBy]).toLowerCase()
      if (a < b) {
        // return < 0, a first
        return direction === DES ? 1 : -1
      } else if (b < a) {
        // return < 0, a first
        return direction === DES ? -1 : 1
      } else {
        return 0
      }
    })
    this.processedData = processedData
  }

  process() {
    this.filterData()
    this.sortData()
  }

  renderTableHeader(columns) {
    const colOrder = columns.map(({name}) => name)
    return html`<p>${colOrder.map((key, i) => html`${key}${i < colOrder.length - 1 ? ' -- ' : ''}`)}</>`
  }

  renderRow(datum) {
    // returns a row element
    const columns = this.columns.map(({name}) => name)
    return html`<p>${columns.map((key, i) => html`${datum[key]}${i < columns.length - 1 ? ' -- ' : ''}`)}</>`
  }

  render() {
    console.log('this.data', this.data)
    console.log('this.columns', this.columns)
    return html`
      <div class="container">
        ${!this.headless ? this.renderTableHeader(this.columns) : null}
        ${this.processedData.map(datum => html`<p>${this.renderRow(datum)}</p>`)}
      </div>
    `
  }
}

customElements.define('unity-table', UnityTable)

// rows render columns
// columns render cells
