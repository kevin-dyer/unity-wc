import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

// import '@bit/smartworks.unity.unity-table-cell'
import './unity-table-cell.js'
// import '@bit/smartworks.unity.table-cell-base'
import './table-cell-base.js'

import {
  filterData,
  sortData
} from './table-utils.js'

const MIN_CELL_WIDTH = 150
const MOUSE_MOVE_THRESHOLD = 5
/**
 * Displays table of data.
 * @name UnityTable
 * @param {[]} data, array of objects
 * @param {[]} columns, array of objects, relates to data's object keys
 * @param {bool} headless, controls if the table has a header row
 * @param {bool} selectable, controls if rows are selectable
 * @param {bool} isLoading, shows spinner instead of table
 * @param {string} emptyDisplay, string to show when table is empty
 * @param {string} highlightedRow, id of row to highlight
 * @param {func} onClickRow, func that is sent the data of the element clicked, the key of the row as defined by keyExtractor, and the event of the click
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
    this.columns = [] //TODO: convert to object with id as key
    // this.displayColumns = []
    this.selectable = false
    this.headless = false
    this.isLoading = false
    this.emptyDisplay = 'No information found.'
    this.childKeys = ['children']
    this.filter = ''
    this.highlightedRow = ''

    // action handlers
    this.onClickRow = ()=>{}
    this.onSelectionChange = ()=>{}
    this.onExpandedChange = ()=>{}
    this.onDisplayColumnsChange = ()=>{}

    // action handlers, to be implemented later
    // this.controls = false
    // this.onSearchFilter = ()=>{}
    // this.onColumnSort = ()=>{}
    // this.onEndReached = ()=>{}
    this.onColumnChange=()=>{}

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
    this._columns = []
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
      onDisplayColumnsChange: { type: Function},
      highlightedRow: { type: String },
      // internals, tracking for change
      _allSelected: { type: Boolean },
      // selected: { type: Array },

      // TBI
      // controls: { type: Boolean },
      // onSearchFilter: { type: Function },
      // onColumnSort: { type: Function },
      // onEndReached: { type: Function },
      onColumnChange: { type: Function },
    }
  }

  //TODO: move into table utils
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
    const childKeys = this.childKeys || []

    // default catcher for missing columns
    // exclude childKeys from columns list
    if ((!columns || !columns.length) && !!value && value.length > 0) {
      const nextCols = Object.keys(value[0])
      .filter(attrKey =>
        !childKeys.some(childKey => childKey === attrKey)
      ).map(name => ({
        key: name,
        label: name
      }))
      this.columns = nextCols
    }

    // but now to worry about what if datum isn't obj?
    this._data = value
    this.setDataMap(value)
    this._expandAll()
    this._process()
    this.requestUpdate('data', oldValue)
  }

  get data() { return this._data }

  set columns(cols) {
    const oldVal = this._columns

    this._columns = cols

    if (!!this.onColumnChange) {
      this.onColumnChange(cols)
    }

    this.requestUpdate('columns', oldVal)
  }

  get columns() {
    return this._columns
  }

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

  setDataMap(value) {
    const dataMap = new Map()

    this.dfsTraverse({
      node: value,
      callback: (node, tabIndex, childCount) => {
        const key = this.keyExtractor(node, tabIndex)
        dataMap.set(key, node)
      }
    })

    this._dataMap = dataMap
  }

  // possibly use setters for dynamic sort/filter update?
  /*
    if filter updates when changed, then _data can change
    Will data and filter ever change at the same time?

    actually, should sort after filtering, as sorting takes longer than filtering
    and filtering will remove elements which will make sorting faster
  */

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
      columns: this.columns,
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
          ${columns.map(({
            key,
            label,
            width: rootWidth=0,
            startingWidth,
            xOffset=0
          }, i) => {
            const icon = direction !== UNS && column === key
              ? direction === ASC ? 'arrow-upward'
              : 'arrow-downward'
            : ''

            //NOTE: only working with px
            const width = !!startingWidth
              ? `${startingWidth + xOffset}px`
              : !!rootWidth ? `${rootWidth}px` : 'auto'

            return html`
              <th
                class="cell"
                id="col-header-${key}"
                name="header-column-${key}"
                style="width: ${width};"
              >
                <table-cell-base
                  .resizable=${i < columns.length - 1}
                  .onResizeStart="${() => {
                    this._handleColumnResizeStart(key, i)
                  }}"
                  .onResize="${xOffset => {
                    this._handleColumnResize(key, xOffset)
                  }}"
                  .onResizeComplete="${xOffset => {
                    this._handleColumnResizeComplete(key)
                  }}"
                >
                  <div class="header">
                    ${this.selectable && i === 0
                      ? html`
                        <paper-checkbox
                          noink
                          .checked="${this._allSelected}"
                          @click="${this._handleHeaderSelect}"
                        ></paper-checkbox>` : null
                    }
                    <div class="header-content" @click="${()=>{this.sortBy = key}}">
                      <span class="header-label">${label || name}</span>
                      <paper-icon-button
                        noink
                        icon="${icon}"
                        title="${direction}"
                        class="header-sort-icon"
                      ></paper-icon-button>
                    </div>
                  </div>
                </table-cell-base>
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
    // check if highlightedRow matches keyExtractor
    let rowClasses = ['row']
    if (rowId === this.highlightedRow) rowClasses.push('highlight')
    // if index is 0, add check-all button
    // need to add handler for icon/img and label
    return html`
      <tr
        class="${rowClasses.join(' ')}"
        key="row-${rowId}"
        @mousedown="${e => {
          this.startingX = e.screenX
        }}"
        @click="${e => {
          //Compare screenY on mouseDown and this event. Dont call onlClickRow if dragged
          const deltaX = Math.abs(e.screenX - this.startingX)

          if (deltaX < MOUSE_MOVE_THRESHOLD) {
            this.onClickRow(datum, rowId, e)
          }
        }}"
      >
        ${columns.map(({key: column, format, width}, i) => {
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
                .resizable=${i < columns.length - 1}
                .onResizeStart="${() => {
                  this._handleColumnResizeStart(column, i)
                }}"
                .onResize="${xOffset => {
                  this._handleColumnResize(column, xOffset)
                }}"
                .onResizeComplete="${xOffset => {
                  this._handleColumnResizeComplete(column)
                }}"
              />
            </td>`
          })
        }
      </tr>
    `
  }

  _handleColumnResizeStart(colKey, colIndex) {
    this._columns = this._columns.map(col => {
      const cell = this.shadowRoot.getElementById(`col-header-${col.key}`)
      const cellWidth = !!cell ? cell.offsetWidth : 0

      return {...col, startingWidth: cellWidth}
    })
  }

  _handleColumnResize(colKey, xOffset) {
    const oldColumns = this._columns
    const colIndex = oldColumns.findIndex(col => col.key === colKey)
    const nextColumns = [...this._columns]
    const {startingWidth: currentWidth=0} = nextColumns[colIndex]
    const {startingWidth: nextWidth=0} = nextColumns[colIndex + 1]

    //Determine how much to offset column
    const totalOffset = nextWidth - xOffset <= MIN_CELL_WIDTH
      ? nextWidth - MIN_CELL_WIDTH
      : currentWidth + xOffset <= MIN_CELL_WIDTH
        ? MIN_CELL_WIDTH - currentWidth
        : xOffset

    //Update offsets of col to resize, and the following col
    nextColumns[colIndex].xOffset = totalOffset
    nextColumns[colIndex + 1].xOffset = -totalOffset

    this._columns = nextColumns
    this.requestUpdate('columns', oldColumns)
  }

  _handleColumnResizeComplete(colKey) {
    const nextColumns = this._columns.map(col => {

      const nextCol = {
        ...col,
        width: col.startingWidth + (col.xOffset || 0)
      }

      delete nextCol.xOffset
      delete nextCol.startingWidth

      return nextCol
    })

    this.columns = nextColumns
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
          --default-highlight-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
          display: flex;
        }
        .container {
          /*position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;*/
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
        }
        table {
          width: 100%;
          max-width: 100%;
          table-layout: auto; /* NOTE: auto prevents table from overflowing passed 100% */
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
        }
        .header-content {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex: 1;
        }
        .header-label {
          /*flex: 1;*/
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
          background-color: var(--background-color, var(--default-background-color))
        }
        .sticky-header-row {
          background-color: var(--background-color, var(--default-background-color))
        }
        paper-icon-button.header-sort-icon {
          height: 30px;
          width: 30px;
        }
        .highlight {
          background-color: var(--highlight-color, var(--default-highlight-color));
        }
      `
    ]
  }
}

window.customElements.define('unity-table', UnityTable)
