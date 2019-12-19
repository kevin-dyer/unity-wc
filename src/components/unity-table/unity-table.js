import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-table-cell'
import {
  filterData,
  sortData
} from './table-utils.js'

/**
 * Displays table of data.
 * @name UnityTable
 * @param {[]} data, array of objects
 * @param {[]} columns, array of objects, relates to data's object keys
 * @param {bool} headless
 * @param {bool} selectable
 * @param {bool} isLoading
 * @param {string} emptyDisplay
 * @param {func} onClickRow, func that is sent the data of the element clicked, and the event of the click
 * @param {func} onSelectionChange, func that is sent the currently selected elements as an array
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
 *    ?selectable="${true}"
 *    .onSelectionChange="${selected => console.log('These elements are selected: ', selected')}"
 *  />
 */

//   Table, at minimum, takes an array of the data being passed in. Each data index
//   should be an object with uniform keys. Actions are handled outside of table,
//   but are dependant on what's selected. As such, if outside source wants access
//   to the selected elements, a function should be passed in to process the
//   selected data. In addition, a predefined column array can be passed in to
//   determine order and size of columns in the table. If not passed in, then a
//   default will be made from each key on the data object.
//
//   data:                   array of datum objects, non-uniform shape
//                           each key is a viable column, with icon available for rendering leading row icon
//   columns:                array of column objects, can contain format function (returns string or Lit HTML string)
//                           {key (related to datum keys), label (label rendered) width, format (func to format cell data)}
//   headless:               bool to control head render, include to have no table header
//   selectable:             bool to control if rows should be selectable
//   onSelectionChange:      callback function, recieves selected array when it changes
//   emptyDisplay:           String to display when data array is empty
//   isLoading:              Boolean to show spinner instead of table
//   keyExtractor         :  Function to define a unique key on each data element
//   childKeys            :  Array of attribute names that contain list of child nodes, listed in the order that they should be displayed
//   filter               :  String to find in any column, used to set internal _filter
//   onExpandedChange     :  On Change Callback Function for expanded array
//
//   Internals for creating/editing
//   _data:                  data marked w/ rowId for uniq references
//   _selected:              Set of keys of elements that are selected, sent to onSelectionChange
//   _sortBy:                object with column to sort by and direction, default all unsorted
//                           sorting is done off of data's values, which can cause disconnect if format changes rendered values too much
//   _filter:                string to find in any column
//   _filteredList:          filtered list of indicies from _data
//   _sortedList:            sorted version of _filteredList, this is what the displayed table is built from
//
//   Features to be implemented
//   controls:               determines use of internal filter and sort, exclude if using internal sort/filter
//   onSearchFilter:         function to be called when filter changes if controls are EXT
//                           sends in string to filter by
//   filterDebounceTimeout:  TBD
//   filterThrottleTimeout:  TBD
//   onColumnSort:           function to be called when sortBy changes if controls are EXT
//                           sends string of column name and string for ascending or descending
//   onColumnChange:         Callback to update changes to the rendered columns
//   onEndReached:           function to be called to request more pages to support infiniscroll
//                           only works with controls set to EXT
//   onEndReachedThreshold:  TBD

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
    this.childKeys = ['children']
    this.filter = ''

    // action handlers
    this.onClickRow = ()=>{}
    this.onSelectionChange = ()=>{}
    this.onExpandedChange = ()=>{}

    // action handlers, to be implemented later
    // this.controls = false
    // this.onSearchFilter = ()=>{}
    // this.onColumnSort = ()=>{}
    // this.onEndReached = ()=>{}
    // this.onColumnChange = ()=>{}

    // defaults of internal references
    this._filter = ''
    this._sortBy = {column: '', direction: UNS}
    this._filteredData = []
    this._sortedData = []
    this._flattenedData = []
    this._allSelected = false
    this._dataMap = new Map()
    this._selected = new Set()
    this._expanded = new Set()
    this._keyExtractor = (datum, index)=>index
  }

  // inputs
  static get properties() {
    return {
      keyExtractor: {type: Function},
      data: { type: Array },
      columns: { type: Array },
      headless: { type: Boolean },
      selectable: { type: Boolean },
      isLoading: { type: Boolean },
      emptyDisplay: { type: String },
      childKeys: { type: Array },
      filter: { type: String },
      onSelectionChange: { type: Function },
      onClickRow: { type: Function },
      onExpandedChange: { type: Function },
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

  //depth first search of hieararchy node, apply callback to each node
  //NOTE: callback called with node, tabIndex, and childCount
  dfsTraverse ({
    node={},
    callback=(node, tabIndex, childCount)=>{},
    tabIndex=0 //this is internally managed
  }) {
    //If node is an array, loop over it
    if (Array.isArray(node)) {
      node.forEach(nodeElement => {
        this.dfsTraverse({
          node: nodeElement,
          callback,
          tabIndex
        })
      })
    } else {
      const nextTabIndex = tabIndex + 1
      let childCount = 0
      let childNodes = []

      this.childKeys.forEach(childKey => {
        const children = node[childKey]

        if (Array.isArray(children)) {
          childCount += children.length
          childNodes = [...childNodes, ...children]
        }
      })

      //NOTE: this may need to be called before iterating down children
      callback(node, tabIndex, childCount)

      childNodes.forEach(child => {
        this.dfsTraverse({
          node: child,
          callback,
          tabIndex: nextTabIndex
        })
      })
    }
  }

  // Data passed in as array
  set data(value) {
    const oldValue = this._data
    const columns = this.columns

    // default catcher for missing columns
    if ((!columns || !columns.length) && !!value && value.length > 0) {
      const newCol = Object.keys(value[0])
      this.columns = newCol.map(name => ({key: name, label: name}))
    }

    const dataMap = new Map()

    this.dfsTraverse({
      node: value,
      callback: (node, tabIndex, childCount) => {
        const key = this.keyExtractor(node, tabIndex)
        dataMap.set(key, node)
      }
    })

    // but now to worry about what if datum isn't obj?
    this._data = value
    this._dataMap = dataMap
    this._expandAll()
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
    this._flattenData()
    this.requestUpdate('sortBy', oldValue)
  }

  get sortBy() { return this._sortBy }

  set selected(selectedSet) {
    const oldValue = this._selected
    this._selected = new Set(selectedSet) // ensure that value is an iterable array of keys

    // Array of selected data elements
    const selectedData = Array.from(this._selected).reduce((out, id) => {
      const newVal = this._dataMap.get(id)
      if (newVal !== undefined) out.push(newVal)
      return out
    }, [])

    this.onSelectionChange(selectedData)
    if (selectedData.length === 0) this._allSelected = false
    else {
      //Determine if any table row is unselected
      const unselectedMap = new Set(this._flattenedData.map((datum, index) =>
        datum._rowId
      ))
      this._selected.forEach(id => {
        unselectedMap.delete(id)
      })

      const hasUnselected = unselectedMap.size > 0

      this._allSelected = !hasUnselected
    }
    this.requestUpdate('selected', oldValue)
  }

  get selected() { return this._selected }

  //NOTE: if setting from attribute, may need to pass in as Array
  set expanded(expandedSet) {
    const oldValue = this._expanded
    this._expanded = new Set(expandedSet)

    //Notify user expanded has changed
    if (!!this.onExpandedChange) {
      const expandedNodes = Array.from(this._expanded).map(rowId => {
        return this._dataMap.get(rowId)
      })

      this.onExpandedChange(expandedNodes)
    }

    this._flattenData()
    this.requestUpdate('expanded', oldValue)
  }

  get expanded() {return this._expanded}

  set filter(value) {
    const oldValue = this._filter
    this._filter = value

    this._expandAll()
    this._process()
    this.requestUpdate('filter', oldValue)
  }

  get filter() { return this._filter }

  set keyExtractor(value) {
    const oldExtractor = this._keyExtractor
    this._keyExtractor = value

    this.requestUpdate('keyExtractor', oldExtractor)

    //Update this.data to use new keyExtractor
    this.data = [...this.data]
  }

  get keyExtractor() {
    return this._keyExtractor
  }

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
    // all data are selected, make selected from all visible data

    //NOTE: this is selecting all visible rows - including nested rows
    this.selected = new Set(this._flattenedData.map(datum => datum._rowId))
  }

  _selectNone() {
    // none selected, so replace with empty
    this.selected = new Set()
  }

  //NOTE: this may not trigger an update
  _selectOne(id) {
    const nextSelected = new Set(this.selected)
    if (nextSelected.has(id)) {
      nextSelected.delete(id)
    } else {
      nextSelected.add(id)
    }

    this.selected = nextSelected
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

  //Return filtered hierarchy array - same nested structure as original hierarchy
  //NOTE: this filter goes from the leaf nodes up (that way if a leaf node matches, then its parents are kept too)
  _filterData() {
    const searchFor = this.filter || ''
    // if controls are external, callback and quit
    // if (this.controls) {
    //   this.onSearchFilter(searchFor)
    //   this._filteredData = [...this.data]
    //   return
    // }

    if (!searchFor) {
      this._filteredData = this.data
      return
    }

    const filteredData = filterData({
      filter: searchFor,
      data: this.data,
      childKeys: this.childKeys,
      columnKeys: this.columns.map(col => col.key)
    })

    this._filteredData = filteredData
  }

  _sortData() {
    const {
      column: sortBy='',
      direction=UNS
    } = this.sortBy || {}

    if (!sortBy || direction === UNS) {
      this._sortedData = this._filteredData
      return
    }

    const sortedData = sortData({
      sortBy,
      direction,
      data: this._filteredData,
      childKeys: this.childKeys
    })

    this._sortedData = sortedData
  }

  //This function flattens hierarchy data, adds internal values such as _rowId and _tabIndex
  //This should also remove children of non-expanded rows
  _flattenData() {
    let flatList = []

    if (!this.keyExtractor) {
      return flatList
    }
    this.dfsTraverse({
      node: this._sortedData,
      callback: (node, tabIndex, childCount) => {
        flatList.push({
          ...node,
          _tabIndex: tabIndex,
          _rowId: this.keyExtractor(node, tabIndex),
          _childCount: childCount
        })
      }
    })

    //Remove children of collapsed nodes
    //NOTE: collapsed parent nodes still need an accurate _childCount to show/hide expand control
    let toRemove = false
    let currentTabIndex = 0
    flatList = flatList.filter(node => {
      if (toRemove) {
        if (currentTabIndex < node._tabIndex) {
          return false
        } else {
          toRemove = false
        }
      }
      if (node._childCount > 0 && !this.expanded.has(node._rowId)) {
        toRemove = true
        currentTabIndex = node._tabIndex
      }

      //remove rows with undefined _rowId
      if (node._rowId === undefined) {
        return false
      }

      return true
    })

    this._flattenedData = flatList
  }

  _process() {
    this._filterData()
    this._sortData()
    this._flattenData()
  }

  _handleHeaderSelect() {
    const _allSelected = this._allSelected
    // if _allSelected, select none
    if (!!_allSelected) this._selectNone()
    // if !_allSelected, select all
    else if (!_allSelected) this._selectAll()
  }

  _toggleExpand(rowId) {
    const nextExpanded = new Set(this.expanded)
    const isExpanded = this.expanded.has(rowId)
    if (isExpanded) {
      nextExpanded.delete(rowId)
    } else {
      nextExpanded.add(rowId)
    }

    this.expanded = nextExpanded
  }

  _expandAll() {
    let nextExpanded = new Set()

    this.dfsTraverse({
      node: this._data,
      callback: (node, tabIndex, childCount) => {
        const rowId = this.keyExtractor(node, tabIndex)

        if (childCount > 0) {
          nextExpanded.add(rowId)
        }
      }
    })

    this.expanded = nextExpanded
  }

  _renderTableHeader(columns) {
    const {
      column,
      direction: dir
    } = this._sortBy
    const direction = !!dir ? dir : UNS
    return html`
      <thead>
        <tr class="sticky-header-row">
          ${columns.map(({key, label, width: rootWidth}, i) => {
            const icon = direction !== UNS && column === key ? 'filter-list' : 'menu'
            const flip = direction === ASC
            let width = undefined
            if (typeof rootWidth === 'string') width = rootWidth
            else if (rootWidth < 1) width = `${rootWidth*100}%`
            else if (width !== undefined) width = `${rootWidth}px`
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

  _renderRow({
    _rowId: rowId,
    _tabIndex: tabIndex,
    _childCount: childCount,
    ...datum
  }) {
    // returns a row element
    const columns = this.columns
    const {
      icon,
      image
    } = datum
    const expandable = childCount > 0
    const expanded = this.expanded.has(rowId)

    // if index is 0, add check-all button
    // need to add handler for icon/img and label
    return html`
      <tr class="row" key="row-${rowId}" @click="${e => this.onClickRow(datum, e)}">
        ${columns.map(({key: column, format}, i) => {
          const value = datum[column]
          const label = format instanceof Function ? format(value, datum) : value

          return html`
            <td class="cell" key="${rowId}-${column}">
              <unity-table-cell
                .label="${label}"
                .value="${value}"
                .icon="${i === 0 && icon}"
                .image="${i === 0 && image}"
                .id="${rowId}"
                ?selectable="${this.selectable && i === 0}"
                ?selected="${this.selected.has(rowId)}"
                .tabIndex="${i === 0 ? tabIndex : 0}"
                ?expandable="${i === 0 && expandable}"
                ?expanded="${i === 0 && expanded}"
                .onSelect="${e => {
                  e.stopPropagation()
                  this._selectOne(rowId)
                }}"
                .onExpand="${e => {
                  this._toggleExpand(rowId)
                }}"
              />
            </td>`
          })
        }
      </tr>
    `
  }

  render() {
    const data = this._flattenedData || []
    const hasData = data.length > 0
    const isLoading = this.isLoading
    const fill = isLoading || !hasData

    // if isLoading, show spinner
    // if !hasData, show empty message
    // show data
    return html`
      <div class="container">
        <table class="${fill ? 'fullspace' : ''}">
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
            : data.map((datum) => this._renderRow(datum))
          }
        </table>
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
          border-collapse: collapse;
          --paper-checkbox-size: 14px;
          --paper-checkbox-unchecked-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          --paper-checkbox-checked-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-rgb)));
          --paper-checkbox-unchecked-ink-color: rgba(0,0,0,0);
          --paper-checkbox-checked-ink-color: rgba(0,0,0,0);
          --paper-spinner-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-gb)));
          --thead-height: 33px;
          --trow-height: 38px;
        }
        .container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
        table {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          border-spacing: 0;
          box-sizing: border-box;
          overflow-x: hidden;
          border-right: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          border-bottom: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        }
        .fullspace {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          overflow: hidden;
          bottom: 0;
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
        thead {
          width: 100%;
        }
        th {
          position: sticky;
          top: 0;
          height: var(--thead-height);
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          text-align: left;
          padding: 0;
          maring: 0;
          line-height: var(--thead-height);
          border-collapse: collapse;
          z-index: 1;
        }
        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          padding: 0 13px;
          box-sizing: border-box;
          border-collapse: collapse;
          border-top: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          border-bottom: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          border-left: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
        }
        tr {
          width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
        }
        td {
          padding: 0;
          border: 1px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          border-top: 0;
          border-collapse: collapse;
        }
        .cell {
          border-collapse: collapse;
          background-color: var(--background-color, var(--default-background-color))
        }
        .header-label {
          flex: 1;
          padding-top: 1px;
        }
        paper-checkbox {
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
          height: var(--trow-height);
          border-collapse: collapse;
          cursor: pointer;
        }
      `
    ]
  }
}

window.customElements.define('unity-table', UnityTable)