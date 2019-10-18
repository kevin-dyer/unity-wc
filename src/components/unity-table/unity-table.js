import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles.js'
import './unity-table-cell.js'


/**
 * Displays table of data.
 * @name UnityTable
 * @param {[]} data, array of objects
 * @param {[]} columns, array of objects, relates to data's object keys
 * @param {bool} headless
 * @param {bool} selectable
 * @param {bool} isLoading
 * @param {string} emptyDisplay
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table
 *    ?headless="${false}"
 *    ?isLoading="${false}"
 *    emptyDisplay="No information found."
 *    .data="${[
 *      {
 *        column1: 'item 1 col1',
 *        column2: 'item 1 col2',
 *        column3: 'item 1 col3',
 *        columnN: 'item 1 colN',
 *        icon: 'iron-iconName'
 *      },
 *      {
 *        column1: 'item 2 col1',
 *        column2: 'item 2 col2',
 *        column3: 'item 2 col3',
 *        columnN: 'item 2 colN',
 *        icon: 'iron-iconName'
 *      },
 *      {
 *        column1: 'item n col1',
 *        column2: 'item n col2',
 *        column3: 'item n col3',
 *        columnN: 'item n colN',
 *        icon: 'iron-iconName'
 *      }
 *    ]}"
 *    .columns="${[
 *      {
 *        key: 'column2',
 *        label: 'Column #2'
 *      },
 *      {
 *        key: 'columnN',
 *        label: 'Column #N'
 *      },
 *      {
 *        key: 'column1',
 *        label: 'Column #1'
 *      }
 *    ]}"
 *    ?selectable="${true}"
 *    .onSelectionChange="${selected => console.log('These elements are selected: ', selected')}"
 *  />
 *
 *  Table, at minimum, takes an array of the data being passed in. Each data index
 *  should be an object with uniform keys. Actions are handled outside of table,
 *  but are dependant on what's selected. As such, if outside source wants access
 *  to the selected elements, a function should be passed in to process the
 *  selected data. In addition, a predefined column array can be passed in to
 *  determine order and size of columns in the table. If not passed in, then a
 *  default will be made from each key on the data object.
 *
 *  data:                   array of datum objects, non-uniform shape
 *  columns:                array of column objects, {key (related to datum keys), label (label rendered) width}
 *  headless:               bool to control head render, include to have no table header
 *  selectable:             bool to control if rows should be selectable
 *  onSelectionChange:      callback function, recieves selected array when it changes
 *  emptyDisplay:           String to display when data array is empty
 *  isLoading:              Boolean to show spinner instead of table
 *
 *  Internals for creating/editing
 *  _data:                  data marked w/ tableId for uniq references
 *  _selected:              array of elements that are selected, sent to onSelectionChange
 *  _sortBy:                object with column to sort by and direction, default to first
 *                          and descending? What counts as no sort?
 *  _filter:                string to find in any column
 *  _filteredList:          filtered list of indicies from _data
 *  _sortedList:            sorted version of _filteredList, this is what the displayed table is built from
 *
 *  Features to be implemented
 *  controls:               determines use of internal filter and sort, exclude if using internal sort/filter
 *  onSearchFilter:         function to be called when filter changes if controls are EXT
 *                          sends in string to filter by
 *  filterDebounceTimeout:  TBD
 *  filterThrottleTimeout:  TBD
 *  onColumnSort:           function to be called when sortBy changes if controls are EXT
 *                          sends string of column name and string for ascending or descending
 *  onColumnChange:         Callback to update changes to the rendered columns
 *  onEndReached:           function to be called to request more pages to support infiniscroll
 *                          only works with controls set to EXT
 *  onEndReachedThreshold:  TBD
 */

// This component will render a table
// It will display a table header (optional), colums (defined by developer or dataset), rows (defined by data), and icons (defined by data). The data can be sorted by the user and be selectable (optional).

const ASC = 'Ascending'
const DES = 'Descending'
const UNS = 'Unsorted'

class UnityTable extends LitElement {
  // internals
  constructor() {
    super()
    // defaults of input
    this._data = []
    this.columns = []
    this.selectable = false
    this.headless = false
    this.isLoading = false
    this.emptyDisplay = 'No information found.'

    // action handlers
    this.onSelectionChange = ()=>{}

    // action handlers, to be implemented later
    // this.controls = false
    // this.onSearchFilter = ()=>{}
    // this.onColumnSort = ()=>{}
    // this.onEndReached = ()=>{}
    // this.onColumnChange = ()=>{}

    // defaults of internal references
    this._filter = ''
    this._sortBy = {column: '', direction: false}
    this._filteredData = []
    this._sortedData = []
    this._allSelected = false
    this._selected = []
  }

  // inputs
  static get properties() {
    return {
      data: { type: Array },
      columns: { type: Array },
      headless: { type: Boolean },
      selectable: { type: Boolean },
      isLoading: { type: Boolean },
      emptyDisplay: { type: String },
      onSelectionChange: { type: Function },

      // internals, tracking for change
      _allSelected: { type: Boolean },
      // selected: { type: Array },

      // TBI
      // controls: { type: Boolean },
      // onSearchFilter: { type: Function },
      // onColumnSort: { type: Function },
      // onEndReached: { type: Function },
      // onColumnChange: { type: Function },
    }
  }

  set data(value) {
    const oldValue = this._data
    const columns = this._columns
    // default catcher for missing columns
    if ((!columns || !columns.length) && !!value && !!value.length) {
      const newCol = Object.keys(value[0])
      this.columns = newCol.map(name => ({key: name, label: name}))
    }
    const newValue = value.map((datum, i) => ({...datum, tableId: i}))
    // add tableId for better reference to source data
    // but now to worry about what if datum isn't obj?
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
    let column, direction
    if (value instanceof Object) {
      column = value.column
      direction = value.direction
    } else {
      column = value
      direction = oldValue.direction
      const changed = oldValue.column !== column
      // check direction is to update to next in cycle
      if (changed || !direction) {
        direction = ASC
      } else if (direction === ASC) {
        direction = DES
      } else if (direction === DES) {
        direction = false
      }
    }
    // check that column is in list
    const columns = this.columns
    const exists = columns.some(({key}) => key === column)
    if (!exists) {
      return false
    }
    this._sortBy = {column, direction}
    this._sortData()
    this.requestUpdate('sortBy', oldValue)
  }

  get sortBy() { return this._sortBy }

  set selected(value) {
    const oldValue = this._selected
    this._selected = value
    const flatSelected = this._flattenSelect(value)
    this.onSelectionChange(flatSelected)
    if (flatSelected.length === 0) this._allSelected = false
    else if (flatSelected.length === this.data.length) this._allSelected = true
    this.requestUpdate('selected', oldValue)
  }

  get selected() { return this._selected }

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
    // all data are selected, make selected from all data
    const newSelected = [...this.data]
    this.selected = newSelected
  }

  _selectNone() {
    // none selected, so replace with empty
    this.selected = []
  }

  _selectOne(id) {
    // copy selected
    const newSelected = [...this._selected]
    // if not selected, select
    if (!newSelected[id]) newSelected[id] = this.data[id]
    // if selected, delete from arr
    else if (!!newSelected[id]) delete newSelected[id]
    this.selected = newSelected
  }

  _flattenSelect(selected) {
    return selected.filter(v=>!!v)
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
    // this.onColumnChange(columns)
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
    // this.onColumnChange(newColumns)
    return newColumns
  }

  _filterData() {
    const searchFor = this.filter || ''
    // if controls are external, callback and quit
    // if (this.controls) {
    //   this.onSearchFilter(searchFor)
    //   this._filteredData = [...this.data]
    //   return
    // }
    // return items only if any prop contains the string
    // might instead be based on currently visible columns
    const columns = [...this.columns]
    let filteredData = this.data.map((v,i) => i)
    if (!!searchFor) {
      filteredData = filteredData.filter(i => {
        // need to consider different value types
        return columns.some(({name: column}) => {
          const point = this.data[i][column]
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
    }
    this._filteredData = filteredData
  }

  _sortData() {
    const {
      column: sortBy,
      direction
    } = this.sortBy
    // if (this.controls) {
    //   this.onColumnSort(sortBy, direction)
    //   this._sortedData = [...this._filteredData]
    //   return
    // }
    // sort data based on column and direction
    let sortedData = [...this._filteredData]
    if (!!direction) {
      const data = this.data
      sortedData = sortedData.sort((first, second) => {
        const a = String(data[first][sortBy]).toLowerCase()
        const b = String(data[second][sortBy]).toLowerCase()
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
    }
    this._sortedData = sortedData
  }

  _process() {
    this._filterData()
    this._sortData()
  }

  _handleHeaderSelect() {
    const _allSelected = this._allSelected
    // if _allSelected, select none
    if (!!_allSelected) this._selectNone()
    // if !_allSelected, select all
    else if (!_allSelected) this._selectAll()
  }

  _renderTableHeader(columns) {
    const {
      column,
      direction: dir
    } = this._sortBy
    const direction = !!dir ? dir : UNS
    return html`
      <thead>
        <tr class="table-header">
          ${columns.map(({key, label, width: rootWidth}, i) => {
            const icon = direction !== UNS && column === key ? 'filter-list' : 'menu'
            const flip = direction === ASC
            let width = null
            if (typeof rootWidth === 'string') width = rootWidth
            else if (rootWidth < 1) width = `${rootWidth*100}%`
            else width = `${rootWidth}px`
            return html`
              <th
                class="cell"
                name="header-column-${key}"
                style="width: ${width}"
              >
                <div class="header">
                  ${this.selectable && i === 0
                    ? html`
                      <paper-checkbox
                        noink
                        .checked="${this._allSelected}"
                        @click="${this._handleHeaderSelect}"
                      />` : null
                  }
                  <span class="header-label" >${label || name}</span>
                  <paper-icon-button
                    noink
                    icon="${icon}"
                    title="${direction}"
                    class="${flip ? 'flipped' : ''}"
                    @click="${()=>{this.sortBy = key}}"
                  />
                </div>
              </th>
            `
          })}
        </tr>
      </thead>
    `
  }

  _renderRow(index, row) {
    // returns a row element
    const columns = this.columns.map(({key}, i) => key)
    const data = this.data
    const datum = data[index]
    const {
      tableId: id,
      icon,
      image
    } = datum
    // pull out
    // if index is 0, add check-all button
    // have td render unity cell instead
    // need to add handler for icon/img and label
    return html`
      <tr class="row" key="row-${row}">
        ${columns.map((column, i) => {
          return html`
            <td class="cell" key="${row}-${i}">
              <unity-table-cell
                label="${datum[column]}"
                .icon="${i === 0 && icon}"
                .image="${i === 0 && image}"
                .id="${id}"
                ?selectable="${this.selectable && i === 0}"
                ?selected="${this._selected[id]}"
                .onSelect="${id => this._selectOne(id)}"
              />
            </td>`
          })
        }
      </tr>
    `
  }

  render() {
    const data = this._sortedData
    const hasData = data.length > 0
    const isLoading = this.isLoading
    const fill = isLoading || !hasData

    // if isLoading, show spinner
    // if !hasData, show empty message
    // show data
    return html`
      <table class="container ${fill ? 'fullspace' : ''}">
        ${!this.headless ? this._renderTableHeader(this.columns) : null}
        ${fill
          ? html`
              <td colspan="${this.columns.length}" class="fullspace">
                ${isLoading
                  ? html`<paper-spinner-lite active class="spinner center" />`
                  : html`<div class="center">${this.emptyDisplay}</div>`
                }
              </td>
            `
          : data.map((index, row) => this._renderRow(index, row))
        }
      </table>
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
          --paper-spinner-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-gb)));
        }
        .container {
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          table-layout: auto;
          border-collapse: collapse;
          border-spacing: 0;
          box-sizing: border-box;
        }
        .fullspace {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        paper-spinner-lite {
          width: 56px;
          height: 56px;
        }
        .table-header {
          height: 33px;
        }
        th {
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          text-align: left;
          padding: 0 13px;
          line-height: 33px;
          box-sizing: border-box;
        }
        .cell {
          border: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        }
        td {
          padding: 0;
        }
        .header-label {
          flex: 1;
          padding-top: 1px;
        }
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        paper-checkbox {
          padding: calc((33px - 14px) / 2) 0;
        }
        paper-icon-button {
          color: var(--black-text-color, var(--default-black-text-color));
          width: 33px;
          height: 33px;
        }
        .flipped {
          transform: rotate(180deg);
        }
        .row {
          height: 38px;
          border: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-table', UnityTable)
