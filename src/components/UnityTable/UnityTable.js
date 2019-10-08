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

    data:                   array of datum objects, non-uniform shape
    columns:                array of column objects, {key (related to datum keys), label (label rendered) width}
    headless:               bool to control head render, include to have no table header
    selectable:             bool to control if rows should be selectable
    onSelectionChange:      function to be called with full selected array
    controls:               determines use of internal filter and sort, exclude if using internal sort/filter
    onSearchFilter:         function to be called when filter changes if controls are EXT
                            sends in string to filter by
    filterDebounceTimeout:  TBD
    filterThrottleTimeout:  TBD
    onColumnChange:         Callback to update changes to the rendered columns
    onColumnSort:           function to be called when sortBy changes if controls are EXT
                            sends string of column name and string for ascending or descending
    onEndReached:           function to be called to request more pages to support infiniscroll
                            only works with controls set to EXT
    onEndReachedThreshold:  TBD

    Internals for creating/editing
    data:           data marked w/ tableId for uniq references
    selected:       array of elements that are selected, sent to onSelectionChange
    sortBy:         object with column to sort by and direction, default to first
                    and descending? What counts as no sort?
    filter:         string to find in any column
    processedList:  sorted and filtered _data list, might need to find way to remove
                    as this leads to doubling the list for sake of runtime efficiency
*/

const ASC = 'ascending'
const DES = 'descending'

class UnityTable extends LitElement {
  // internals
  constructor() {
    super()
    // defaults of input
    this._data = []
    this.columns = []
    this.selectable = false
    this.onSelectionChange = ()=>{}
    this.headless = false
    this.selected = {}
    this.onSearchFilter = ()=>{}
    this.onColumnSort = ()=>{}
    this.onEndReached = ()=>{}
    this.onColumnChange = ()=>{}

    // defaults of internal references
    this._filter = ''
    this._sortBy = {column: '', direction: false}
    this.proccessedList = []
  }

  // inputs
  static get properties() {
    return {
      data: { type: Array },
      columns: { type: Array },
      headless: { type: Boolean },
      selectable: { type: Boolean },
      onSelectionChange: { type: Function },
      controls: { type: Boolean },
      onSearchFilter: { type: Function },
      onColumnSort: { type: Function },
      onEndReached: { type: Function },
      onColumnChange: { type: Function }
    }
  }

  set data(value) {
    const oldValue = this._data
    const columns = this._columns
    // default catcher for missing columns
    if ((!columns || !columns.length) && !!value && !!value.length) {
      const newCol = Object.keys(value[0])
      this.columns = newCol.map(name => ({key: name, label: name, width: 1 / newCol.length}))
    }
    const newValue = value.map((datum, i) => ({...datum, tableId: i}))
    this._data = newValue
    this._process()
    this.requestUpdate('data', oldValue)
  }

  get data() { return this._data }

  // sortBy will be cyclical: UNS -> ASC -> DES -> UNS
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
      return false
    }
    // check direction is to update to next in cycle
    if (direction === ASC) {
      direction = DES
    } else if (direction === DES) {
      direction = false
    } else if (!direction) {
      direction = ASC
    }
    this._sortBy = {column, direction}
    this._sortData()
    this.requestUpdate('sortBy', oldValue)
  }

  get sortBy() { return this._sortBy }

  set filter(value) {
    const oldValue = this._filter
    this._filter = value
    if (this.controls) {
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

  // actions
  // resizeColumns() {}
  _selectAll() {
    const newSelected = [...this.data]
    this.selected = newSelected
    this.onSelectionChange(newSelected)
  }

  _selectNone() {
    this.selected = {}
    this.onSelectionChange({})
  }

  _selectOne(id) {
    const newSelected = [...this.selected]
    newSelected[id] = this.data[id]
    this.selected = newSelected
    this.onSelectionChange(newSelected)
  }

  // takes name of column (or maybe whole column) to move and index to move it to
  // returns false if something went wrong, or new order
  // mutates this.columns if successful
  // changeColumnOrder(columnName, newIndex) {
  //   // get old order and target column
  //   const oldOrder = [...this.columns]
  //   // TODO: can remove this step if whole column is passed in
  //   const targetColumnIndex = oldOrder.findIndex(({name}) => name === columnName)
  //   if (targetColumnIndex < 0) {
  //     console.warn(`Column not found or already in index: ${newIndex}`)
  //     return false
  //   }
  //   let newOrder = [...this.columns]
  //   // remove column at old position
  //   newOrder.splice(targetColumnIndex, 1)
  //   // if new index is farther back, have to adjust for having removed element first
  //   const newPos = targetColumnIndex > newIndex ? newIndex - 1 : newIndex
  //   newOrder.splice(newPos, 0, oldOrder[targetColumnIndex])
  //   if (oldOrder.length === newOrder.length) {
  //     this.columns = newOrder
  //     this.onColumnChange(newOrder)
  //     return newOrder
  //   } else {
  //     console.warn(`There are ${newOrder.length > oldOrder.length ? 'extra' : 'missing'} columns. Old then New order:`, oldOrder, newOrder)
  //     return false
  //   }
  // }

  // takes name of column to add
  // returns false if column already exists
  // otherwise mutates and returns new columns order
  _addColumn(name) {
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
    this.onColumnChange(columns)
    return columns
  }

  _removeColumn(name) {
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
    this.onColumnChange(newColumns)
    return newColumns
  }

  _filterData() {
    const searchFor = this.filter || ''
    // if controls are external, callback and quit
    if (this.controls) {
      this.onSearchFilter(searchFor)
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
    } else {
      this.processedData = [...this.data]
    }
  }

  _sortData() {
    const {
      column: sortBy,
      direction
    } = this.sortBy
    if (this.controls) {
      this.onColumnSort(sortBy, direction)
      this.processedData = [...this.processedData]
      return
    }
    // sort data based on column and direction
    if (!!direction) {
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
  }

  _process() {
    this._filterData()
    this._sortData()
  }

  _renderTableHeader(columns) {
    const colOrder = columns.map(({name}) => name)
    return html`<thead><tr>${colOrder.map((key, i) => html`<th key="col-${key}">${key}</th>`)}</tr></thead>`
  }

  _renderRow(datum) {
    // returns a row element
    const columns = this.columns.map(({name}) => name)
    return html`${columns.map((key, i) => html`<td>${datum[key]}</td>`)}`
  }

  render() {
    console.log('this.data', this.data)
    console.log('this.columns', this.columns)
    return html`
      <table class="container">
        <colgroup>
          ${this.columns.map(({name, label, width}) => html`<col style="width: ${width*100}%">`)}
        </colgroup>
        ${!this.headless ? this._renderTableHeader(this.columns) : null}
        ${this.processedData.length > 0
          ? this.processedData.map(datum => html`<tr>${this._renderRow(datum)}</tr>`)
          : html`<tr><td colspan="${this.columns.length}" rowspan="3" class="empty-table">No information found.</td></tr>`}
      </table>
    `
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
          table-layout: fixed;
        }
        .empty-table {
          text-align: center;
          padding: 33px 0;
          font-family: Avenir;
        }
      `
    ]
  }
}

customElements.define('unity-table', UnityTable)

// rows render columns
// columns render cells
