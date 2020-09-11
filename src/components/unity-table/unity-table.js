import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
import '@polymer/paper-spinner/paper-spinner-lite.js'
import '@polymer/iron-scroll-threshold/iron-scroll-threshold.js'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-table-cell'
import '@bit/smartworks.unity.table-cell-base'
import './filter-dropdown'

import {
  filterData,
  sortData
} from './table-utils.js'

/**
 * Displays table of data.
 * @name UnityTable
 * @param {[]} data, array of objects
 * @param {[]} columns, array of objects, relates to data's object keys
 * @param {[]} selected, array of strings, each a cell identifier to be selected ('this.selected' is only set in table when attribute changes)
 * @param {[]} columnFilters, array of filters for columns, each one with the scructure {column: string, values: string[], include:bool}
 * @param {func} keyExtractor, func with row datum and row index as arguments. Retuns unique row identifier.
 * @param {func} slotIdExtractor, func with row datum and column datum as arguments. Returns unique cell identifier.
 * @param {bool} headless, controls if the table has a header row
 * @param {bool} compact, controls if the rows should be shorter
 * @param {bool} startExpanded, controls if the table data begins as expanded (true) or collapsed (false / default)
 * @param {bool} selectable, controls if rows are selectable
 * @param {bool} isLoading, shows spinner instead of table
 * @param {string} emptyDisplay, string to show when table is empty
 * @param {string} highlightedRow, id of row to highlight
 * @param {number} endReachedThreshold, number of px before scroll boundary to update this._rowOffset
 * @param {func} onClickRow, func that is sent the data of the element clicked, the key of the row as defined by keyExtractor, and the event of the click
 * @param {func} onHighlight, func that is sent the data of the highlighted element if it is found
 * @param {func} onSelectionChange, func that is sent the currently selected elements as an array
 * @param {func} onEndReached, func that is fired when bottom of table has been reached. useful for external pagination.
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table
 *    ?headless="${false}"
 *    ?startExpanded="${false}"
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
*         formatLabel: (colValue, datum) => `Building: ${colValue}`
 *      },
 *      {
 *        key: 'columnN',
 *        label: 'Column #N'
 *        formatLabel: (colValue, datum) => colValue
 *      },
 *      {
 *        key: 'column1',
 *        label: 'Column #1'
 *        formatLabel: column1Handler
 *      }
 *    ]}"
 *    ?selectable="${true}"
 *    .onSelectionChange="${selected => console.log('These elements are selected: ', selected')}"
 *    .columnFilters=${[{column: "name", values: ["Grey"], include: false} ]}

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
//   columns:                array of column objects, can contain formatLabel function (returns string)
//                           {key (related to datum keys), label (label rendered) width, formatLabel (func to format cell label)}
//   selected
//   headless:               bool to control head render, include to have no table header
//   startExpanded:          bool to control whether data starts as expanded or collapsed
//   selectable:             bool to control if rows should be selectable
//   onSelectionChange:      callback function, recieves selected array when it changes
//   emptyDisplay:           String to display when data array is empty
//   isLoading:              Boolean to show spinner instead of table
//   keyExtractor         :  Function to define a unique key on each data element
//   slotIdExtractor      :  Function to define a unique slot name for each table cell. Used for adding custom content to specific table cells.
//   childKeys            :  Array of attribute names that contain list of child nodes, listed in the order that they should be displayed
//   filter               :  String to find in any column, used to set internal _filter
//   endReachedThreshold  :  Number of px before scroll boundary to update this._rowOffset
//   onExpandedChange     :  On Change Callback Function for expanded array
//   onEndReached         :  Callback fired when bottom of table has been reached. useful for external pagination.
//   columnFilter:           array of column filters. Each filter has the structure: {column: <columnKey>, values: [<value1>, <value2>], include: true|false}
//
//   Internals for creating/editing
//   _data:                  data marked w/ rowId for uniq references
//   _selected:              Set of keys of elements that are selected, sent to onSelectionChange
//   _sortBy:                object with column to sort by and direction, default all unsorted
//                           sorting is done off of data's values, which can cause disconnect if format changes rendered values too much
//   _filter:                string to find in any column
//   _filteredList:          filtered list of indicies from _data
//   _sortedList:            sorted version of _filteredList, this is what the displayed table is built from
//   _tableId:               Unique identifier for table instance, defined via Date.now()
//   _visibleRowCount      :  Maximum number of rows to render at once


//   Features to be implemented
//   controls:               determines use of internal filter and sort, exclude if using internal sort/filter
//   onSearchFilter:         function to be called when filter changes if controls are EXT
//                           sends in string to filter by
//   filterDebounceTimeout:  TBD
//   filterThrottleTimeout:  TBD
//   onColumnSort:           function to be called when sortBy changes if controls are EXT
//                           sends string of column name and string for ascending or descending
//   onColumnChange:         Callback to update changes to the rendered columns
//   onEndReached:           Callback fired when Scroll to within threshold of lower bound.
//                           Useful for server side pagination to support infiniscroll
//                           Only call when reached the end of the input data array
const ASC = 'Ascending'
const DES = 'Descending'
const UNS = 'Unsorted'
const MIN_CELL_WIDTH = 60 //minimum pixel width of each table cell
const MOUSE_MOVE_THRESHOLD = 5 //pixels mouse is able to move horizontally before rowClick is cancelled
const ROW_HEIGHT = 40 //used to set scroll offset
const THRESHOLD_TIMEOUT = 60 //Timeout after scroll boundry is reached before callback can be fired again
const END_REACHED_TIMEOUT = 2000 //Timeout after true end is reached before callback can be fired again
const MIN_VISIBLE_ROWS = 50 //Minimum number of rows to render at once
const CELL_PLACEHOLDER = "-" //Consider adding this as a table property

const getSortedIcon = direction => {
  switch(direction) {
    case ASC: return 'unity:up'
    case DES: return 'unity:down'
    default:  return 'unity:sort'
  }
}

class UnityTable extends LitElement {
  // internals
  constructor() {
    super()
    // defaults of input
    this._data = []
    this.columns = []
    this.selected = []
    this.selectable = false
    this.headless = false
    this.compact = false
    this.startExpanded = false
    this.isLoading = false
    this.emptyDisplay = 'No information found.'
    this.childKeys = ['children']
    this.filter = ''
    this.columnFilter = []
    this.endReachedThreshold = 200 //distance in px to fire onEndReached before getting to bottom
    this.slotIdExtractor = (row={}, column={}) => `${row._rowId}-${column.key}`

    this._highlightedRow = ''

    // action handlers
    this.onClickRow = null
    this.onSelectionChange = ()=>{}
    this.onExpandedChange = ()=>{}
    this.onDisplayColumnsChange = ()=>{}
    this.onFilterChange = () => {}
    this.onHighlight = ()=>{}

    // action handlers, to be implemented later
    // this.controls = false
    // this.onSearchFilter = ()=>{}
    // this.onColumnSort = ()=>{}
    this.onEndReached = ()=>{}
    this.onColumnChange = ()=>{}

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
    this._rowOffset = 0 //used to track for infinite scroll
    this._tableId = Date.now()//unique identifier for table element
    this._visibleRowCount = MIN_VISIBLE_ROWS
    this.dropdownValueChange = key => (values, selected) => this.filterColumn(key, values, selected)
    this.isFlat = true
    this.hasIcons = false
  }


  filterColumn(key, values, selected){
    const {columnFilter=[]} = this
    //TODO: very inefficient, review
    for(const value of values) {
      let currentColumn = columnFilter.find(f => f.column === key);
      if (!!currentColumn) {
        const currentColumnFilter = currentColumn.values;

        // if exclude all, delete * and change to include
        if(currentColumnFilter[0] === '*') {
          currentColumnFilter.splice(0,1)
          currentColumn.include = true
        }

        // add/remove value from filter
        if (currentColumnFilter.includes(value)) {
          currentColumnFilter.splice(currentColumnFilter.indexOf(value), 1)
        }
        else {
            currentColumnFilter.push(value);
        }

        // change exclude/include filter depending on size
        if(currentColumnFilter.length > this._columnValues[key].length/2) {
          currentColumn.include = !currentColumn.include
          currentColumn.values = this._columnValues[key].filter(option => !currentColumnFilter.includes(option))
        }

        // // remove filter if list is empty
        if (currentColumnFilter.length === 0) {
          // if include is empty, change to exclude all (*)
          if(currentColumn.include) {
            currentColumn.values = ['*']
            currentColumn.include = false
          }
          else {
            this.columnFilter.splice(this.columnFilter.indexOf(currentColumn))
          }
        }

      }
      else {
        //add new filter for this column
        this.columnFilter.push({column: key, values: [value], include: selected });
      }
    }
    this._flattenedData = this.removeCollapsedChildren(this.getFilteredData())
    this._expandAll()
    this.onFilterChange(this.columnFilter);
    // this.requestUpdate();
  }

  // inputs
  static get properties() {
    return {
      keyExtractor: { type: Function },
      slotIdExtractor: { type: Function },
      data: { type: Array },
      columns: { type: Array },
      headless: { type: Boolean },
      compact: { type: Boolean },
      selectable: { type: Boolean },
      isLoading: { type: Boolean },
      emptyDisplay: { type: String },
      childKeys: { type: Array },
      filter: { type: String },
      onSelectionChange: { type: Function },
      selected: { type: Array },
      onClickRow: { type: Function },
      onExpandedChange: { type: Function },
      onDisplayColumnsChange: { type: Function},
      onHighlight: { type: Function },
      highlightedRow: { type: String },
      startExpanded: { type: Boolean },
      // internals, tracking for change
      _allSelected: { type: Boolean },
      _rowOffset: { type: Number },
      columnFilter: { type: Array },
      isFlat: { type: false },
      hasIcons: { type: false },

      // TBI
      // controls: { type: Boolean },
      // onSearchFilter: { type: Function },
      // onColumnSort: { type: Function },
      onEndReached: { type: Function },
      onColumnChange: { type: Function },

      //Expose this internal variable as a property for the table csv downloader to access
      _flattenedData: {type: Array}
    }
  }

  //NOTE: #unity-table-container element is not mounted in intial connectedCallback, only after firstUpdated
  firstUpdated(changedProperties) {
    this.initTableRef()
    this._setVisibleRowsArray()
    this.updateComplete.then(() => {
      this.scrollToHighlightedRow.bind(this)
    })
  }

  updated(changedProps) {
    // TODO: This should also apply to columnFiltering and column sorting
    if (changedProps.has('filter') && !!this.tableRef) {
      this.tableRef.scrollTop = 0
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.initTableRef()
  }

  disconnectedCallback() {
    if (!!this.tableRef) {
      this.tableRef.removeEventListener('lower-threshold', this.boundLowerHandle)
      this.tableRef.removeEventListener('upper-threshold', this.boundUpperHandle)
      this.tableRef = undefined
    }
    super.disconnectedCallback();
  }

  initTableRef() {
    //Only define tableRef and its boundary threshold events if not already defined.
    if (!this.tableRef) {
      this.tableRef = this.shadowRoot.getElementById(`unity-table-${this._tableId}`)

      if (!!this.tableRef) {
        this.tableRef.upperThreshold = this.endReachedThreshold
        this.tableRef.lowerThreshold = this.endReachedThreshold
        this.boundLowerHandle = this.handleLowerThreshold.bind(this)
        this.boundUpperHandle = this.handleUpperThreshold.bind(this)

        this.tableRef.addEventListener('lower-threshold', this.boundLowerHandle);
        this.tableRef.addEventListener('upper-threshold', this.boundUpperHandle);

        //Automatically set this._visibleRowCount to fill 200% of container height, or MIN_VISIBLE_ROWS rows, which ever is greater
        this._visibleRowCount = Math.max(Math.ceil(this.tableRef.offsetHeight / ROW_HEIGHT) * 2, MIN_VISIBLE_ROWS)
      }
    }
  }

  handleLowerThreshold(e) {
    const dataLength = this._flattenedData.length
    const maxOffset = Math.max((dataLength - this._visibleRowCount), 0) //Ensure that this is never negative, even if dataLength < this.visibleRowCount
    const nextOffset = this._rowOffset + this._visibleRowCount

    this._rowOffset = Math.min(maxOffset, nextOffset)

    if ((nextOffset + this._visibleRowCount) >= dataLength && typeof this.onEndReached === 'function') {
      //NOTE: this is throttled via END_REACHED_TIMEOUT
      this.onEndReached()

      setTimeout(() => {
        this.tableRef && this.tableRef.clearTriggers()
      }, END_REACHED_TIMEOUT)
    } else {
      setTimeout(() => {
        this.tableRef && this.tableRef.clearTriggers()
      }, THRESHOLD_TIMEOUT);
    }
  }

  //NOTE: this should only be fired when at the very top
  handleUpperThreshold(e) {
    this._rowOffset = 0

    setTimeout(() => {
      this.tableRef && this.tableRef.clearTriggers()
    }, THRESHOLD_TIMEOUT);
  }

  //TODO: move into table utils
  //depth first search of hieararchy node, apply callback to each node
  //NOTE: callback called with node, tabIndex, and childCount
  dfsTraverse ({
    node={},
    callback=(node, tabIndex, childCount, parents)=>{},
    tabIndex=0, //this is internally managed
    parents=[]
  }) {
    //If node is an array, loop over it
    if (tabIndex > 0) this.isFlat = false
    if (Array.isArray(node)) {
      node.forEach(nodeElement => {
        this.dfsTraverse({
          node: nodeElement,
          callback,
          tabIndex,
          parents
        })
      })
    } else {
      const rowId = this.keyExtractor(node, tabIndex)
      const nextTabIndex = tabIndex + 1
      let childCount = 0
      let childNodes = []
      if (!!node.icon) this.hasIcons = true

      this.childKeys.forEach(childKey => {
        const children = node[childKey]

        if (Array.isArray(children)) {
          childCount += children.length
          childNodes = [...childNodes, ...children]
        }
      })

      //NOTE: this may need to be called before iterating down children
      callback(node, tabIndex, childCount, parents)
      childNodes.forEach(child => {
        this.dfsTraverse({
          node: child,
          callback,
          tabIndex: nextTabIndex,
          parents: [...parents, rowId]
        })
      })
    }
  }

  // Data passed in as array
  // Also updates this._dataMap, and this._selected
  set data(value) {
    const oldValue = this._data
    const columns = this.columns
    const childKeys = this.childKeys || []
    const originalDataMap = this._dataMap

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

    this._data = value
    this.setDataMap(value)

    //Update this.selectied.
    //Add new children of selected nodes to this.selected
    //Remove nodes from that are no longer present
    this.updateSelected(originalDataMap)

    // Expand all nodes if the User has indicated to do so, but not if changes to the expansion of nodes have already been made
    // NOTE: this assumes this.expanded is undefined initially
    if (this.startExpanded && (!this.expanded || this.expanded.size === 0)) this._expandAll()

    this._process()
    this._columnValues = this.getColumnValues(value);
    this.requestUpdate('data', oldValue)
  }

  get data() { return this._data }

  set columns(cols) {
    const oldVal = this._columns

    this._columns = cols

    if (!!this.onColumnChange) {
      this.onColumnChange(cols)
    }
    this._columnValues = this.getColumnValues(this.data);
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
    this._setVisibleRowsArray()
    this.requestUpdate('sortBy', oldValue)
  }

  get sortBy() { return this._sortBy }

  set selected(selectedSet) {
    const oldValue = this._selected
    // this._selected
    const newValue = new Set(selectedSet) // ensure that value is an iterable array of keys
    // checks if sets are equal
    if (!!oldValue && oldValue.size === newValue.size && [...newValue].every(id => oldValue.has(id))) return
    this._selected = newValue

    // Array of selected data elements
    const selectedData = Array.from(this._selected).reduce((out, id='') => {
      const newVal = this._dataMap.get(id.toString())
      if (newVal !== undefined) out.push(newVal)
      return out
    }, [])

    if (!!this.onSelectionChange) this.onSelectionChange(selectedData)
    if (selectedData.length === 0) {
      this._allSelected = false
    } else {
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
    const originalDataMap = this._dataMap || new Map()

    // // Update the selection to include children
    // const originalSelected = this._selected
    // const nextSelected = new Set(originalSelected)
    // let selectionHasChanged = false
    //
    // this.dfsTraverse({
    //   node: this.data,
    //   callback: (node, tabIndex, childCount, parents=[]) => {
    //     const key = this.keyExtractor(node, tabIndex)
    //     if (this.includesSelectedNode(parents)) {
    //       nextSelected.add(key)
    //       selectionHasChanged = true
    //     }
    //   }
    // })
    //
    // if (selectionHasChanged) {
    //   this._selected = nextSelected
    // }
    // // end
    //


    this.requestUpdate('selected', oldValue)
  }

  get selected() { return this._selected }

  //NOTE: if setting from attribute, may need to pass in as Array
  set expanded(expandedSet) {
    const oldValue = this._expanded
    this._expanded = new Set(expandedSet)

    //Notify user expanded has changed
    if (!!this.onExpandedChange) {
      const expandedNodes = Array.from(this._expanded).map((rowId='') => {
        return this._dataMap.get(rowId.toString())
      })

      this.onExpandedChange(expandedNodes)
    }

    this._setVisibleRowsArray()
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

  // when the highlightedRow changes, run onHighlight
  set highlightedRow(value) {
    const oldHighlight = this._highlightedRow
    this._highlightedRow = value

    this.requestUpdate('highlightedRow', oldHighlight)
    // this is to make sure that updates happen at a pace to trigger
    // proper outer updates. without this, the pane would be one update
    // behind or the pane's wrapper would have to have it
    this.updateComplete.then(()=>this._findHighlight(value.toString()))
  }

  get highlightedRow() {
    return this._highlightedRow
  }

  setDataMap(value) {
    const dataMap = new Map()

    this.dfsTraverse({
      node: value,
      callback: (node, tabIndex, childCount, parents) => {
        const key = this.keyExtractor(node, tabIndex) || ''
        dataMap.set(key.toString(), {...node, parents})
      }
    })
    this._dataMap = dataMap
  }

  updateSelected(originalDataMap) {
    const originalSelected = this._selected

    this.addSelectedChildren(originalDataMap)
    this.removeDeletedSelections()

    //request update if selected has changed
    if (this._selected !== originalSelected) {
      this.selected = this._selected
    }
  }

  //If datum does not exist in original data map, AND it has a parent that is selected, add to this.selected
  addSelectedChildren(originalDataMap) {
    const originalSelected = this._selected
    const nextSelected = new Set(originalSelected)
    let selectionHasChanged = false

    this.dfsTraverse({
      node: this.data,
      callback: (node, tabIndex, childCount, parents=[]) => {
        const key = this.keyExtractor(node, tabIndex)
        if (!originalDataMap.has(key) && this.includesSelectedNode(parents)) {
          nextSelected.add(key)
          selectionHasChanged = true
        }
      }
    })

    if (selectionHasChanged) {
      this._selected = nextSelected
    }
  }

  //remove rowId's in this.selection that are no longer present in this.dataMap
  removeDeletedSelections() {
    const originalSelected = this._selected
    if (!originalSelected) return
    const nextSelected = new Set(originalSelected)
    let selectionHasChanged = false

    Array.from(this._selected).forEach((rowId='') => {
      if (!this._dataMap.has(rowId.toString())) {
        nextSelected.delete(rowId)
        selectionHasChanged = true
      }
    })

    if (selectionHasChanged) {
      this._selected = nextSelected
    }
  }

  //pass in array of node IDs, returns true if any are selected
  includesSelectedNode(nodeIds) {
    return nodeIds.some(nodeId => {
      return this._selected.has(nodeId)
    })
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

  // If node is selected, all its children are also selected
  // If node is unselected, all its parents are also unselected
  _selectOne(id='') {
    const nextSelected = new Set(this.selected)
    const node = this._dataMap.get(id.toString())
    const nodeAndChildren = this._getAllChildren(node)

    if (nextSelected.has(id)) {
      //Delete node and all its children from nextSelected
      nodeAndChildren.forEach(childId => {
        nextSelected.delete(childId)
      })

      //Unselect parents
      node.parents.forEach(parentId => {
        nextSelected.delete(parentId)
      })

    } else {
      //Add node and all its children to nextSelected
      nodeAndChildren.forEach(childId => {
        nextSelected.add(childId)
      })
    }

    this.selected = nextSelected
  }

  //returns flat list of all children
  _getAllChildren(node) {
    let children = []

    this.dfsTraverse({
      node,
      callback: (node, tabIndex, childCount, parents) => {
        const rowId = this.keyExtractor(node, tabIndex)
        children.push(rowId)
      }
    })

    return children
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

  // sees if the requested highlighted row exists
  // passes highlighted row data if it does, undefined if it doesn't
  _findHighlight(value) {
    const rowObject = this._dataMap.get(value)
    if (!rowObject) return
    if (!this._flattenedData.some(({ id='' }) => id === value)) { // highlighted row is not being shown
      const { parents=[] } = rowObject
      // expand parents
      parents.forEach(parentId => {
        this._toggleExpand(parentId, true)
      })
    }
    this.onHighlight(rowObject)
  }

  //This function flattens hierarchy data, adds internal values such as _rowId and _tabIndex
  //This should also remove children of non-expanded rows
  _setVisibleRowsArray() {
    this._flattenedData = this.removeCollapsedChildren(this.getFilteredData())
    this.requestUpdate()
  }


  _flattenData(data) {
    let flatList = []
    if (!this.keyExtractor) {
      return flatList
    }
    this.dfsTraverse({
      node: data,
      callback: (node, tabIndex, childCount, parents) => {
        flatList.push({
          ...node,
          _tabIndex: tabIndex,
          _rowId: this.keyExtractor(node, tabIndex),
          _childCount: childCount,
          _parents: parents
        })
      }
    })
    return flatList
  }

  removeCollapsedChildren(data) {
    let toRemove = false
    let currentTabIndex = 0
    data = data.filter((node={}) => {
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
    return data

  }

  _process() {
    this._filterData()
    this._sortData()
    this._setVisibleRowsArray()
  }

  _handleHeaderSelect() {
    const _allSelected = this._allSelected
    // if _allSelected, select none
    if (!!_allSelected) this._selectNone()
    // if !_allSelected, select all
    else if (!_allSelected) this._selectAll()
  }

  //shouldExpand - optional boolean argument to explicitly set expanded state of rowId
  _toggleExpand(rowId, shouldExpand) {
    const nextExpanded = new Set(this.expanded)
    const isExpanded = this.expanded.has(rowId)

    if (shouldExpand === true) { //Explicitly set Expanded state
      nextExpanded.add(rowId)
    } else if (shouldExpand === false) {
      nextExpanded.delete(rowId)
    } else if (isExpanded) { //Toggle Expanded state
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
      callback: (node, tabIndex, childCount, parents) => {
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
    const trClass = `sticky-header-row${this.compact ? ' compact': ''}`

    return html`
      <thead>
        <tr class="${trClass}">
          ${columns.map(({
            key,
            label,
            width: rootWidth=0,
            startingWidth,
            xOffset=0
          }, i) => {
            const sortIcon = column === key ? getSortedIcon(direction) : 'unity:sort'

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
                    <div class="header-content">
                      <span class="header-label"><b>${label || name}</b></span>

                      <filter-dropdown
                        .onValueChange="${this.dropdownValueChange(key)}"
                        .options=${this.getDropdownOptions(key)}
                        .selected=${this.getSelected(key)}>
                      </filter-dropdown>

                      <paper-icon-button
                        noink
                        icon="${sortIcon}"
                        title="${direction}"
                        class="header-sort-icon"
                        @click="${()=>{this.sortBy = key}}"
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

  /**
   * Get all possible values for every column.
   */
  getColumnValues(data) {
    let columnValues = {};
    this.columns.map( col => {
      const {
        key,
        formatLabel = (val) => val
      } = col;
      const values = [];
      for (const row of data) {
        values.push(...this.getAllTreeValues(row, key, formatLabel))
      }
      columnValues[key] = [...new Set(values)].sort();
    })
    return columnValues;
  }

  getAllTreeValues(row, key, formatLabel) {
    let value = [this.getFormattedValue(row[key], formatLabel)]
    // if children, get value of every children recursively
    const childKey = this.childKeys.find(key => row[key])
    if (!!childKey){
      for (const child of row[childKey]) {
        value.push(...this.getAllTreeValues(child, key, formatLabel))
      }
    }
    return value
  }

  getFormattedValue(value, formatLabel) {
    let formattedValue
    try {
      try {
        const formatted = formatLabel(value)
        if(typeof(formatted) === 'string') {formattedValue = formatted} else {throw TypeError}
      }
      catch (error){
        formattedValue = value.toString()
      }
      finally {
        if (!formattedValue) throw TypeError
      }
    }
    catch (error){
      formattedValue = CELL_PLACEHOLDER
    }
    return formattedValue
  }

  getDropdownOptions(key) {
    return this._columnValues[key].map(x => ({label: x, id: x}));
  }

  getSelected(key) {
    const {
      columnFilter=[],
      _columnValues: {
        [key]: selectedArray=[]
    }={}} = this

    const currentFilter = columnFilter.find( filter => filter.column === key);
    let selectedValues = selectedArray;
    if (!!currentFilter) {
      if(currentFilter.include || (!currentFilter.include && currentFilter.values[0] === '*')) {
        selectedValues = currentFilter.values;
      }
      else {
        selectedValues = selectedValues.filter(x => !currentFilter.values.includes(x));
      }
    }
    return selectedValues;
  }


  _renderRow(row={}) {
    const {
      _rowId: rowId,
      _tabIndex: tabIndex,
      _childCount: childCount,
      ...datum
    } = row
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

    //NOTE: using == so that rowId can be number or string
    if (rowId == this.highlightedRow) rowClasses.push('highlight')
    if (this.compact) rowClasses.push('compact')
    if (this.onClickRow instanceof Function) rowClasses.push('clickable')
    // if index is 0, add check-all button
    // need to add handler for icon/img and label
    return html`
      <tr
        class="${rowClasses.join(' ')}"
        key="row-${rowId}"
        id="row-${rowId}"
        @mousedown="${e => {
          this.startingX = e.screenX
        }}"
        @click="${e => {
          //Compare screenY on mouseDown and this event. Dont call onlClickRow if dragged
          const deltaX = Math.abs(e.screenX - this.startingX)

          if (deltaX < MOUSE_MOVE_THRESHOLD && this.onClickRow instanceof Function) {
            this.onClickRow(datum, rowId, e)
          }
        }}"
      >

        ${columns.map((column, i) => {
          const {
            key: columnKey,
            formatLabel,
            width
          } = column
          const {[columnKey]: columnValue=''} = datum || {}
          const label = formatLabel instanceof Function
            ? formatLabel(columnValue, datum)
            : columnValue
          const slotId = this.slotIdExtractor(row, column)

          return html`
            <td class="cell" key="${slotId}">
              <unity-table-cell
                .icon="${i === 0 && icon}"
                .image="${i === 0 && image}"
                .id="${rowId}"
                .slotId="${slotId}"
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
                  this._handleColumnResizeStart(columnKey, i)
                }}"
                .onResize="${xOffset => {
                  this._handleColumnResize(columnKey, xOffset)
                }}"
                .onResizeComplete="${xOffset => {
                  this._handleColumnResizeComplete(columnKey)
                }}"
              >
                <slot name="${slotId}" slot="${slotId}">
                  <span class="text">${label}</span>
                </slot>
              </unity-table-cell>
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

  _renderTableData(data) {
    return data.map((datum) => this._renderRow(datum));
  }


  /**
   * Filter data from the full sorted data array. Non-matching parents of matching rows are kept.
   */
  getFilteredData() {
    const {columnFilter=[]} = this
    const fullDataArray = this._flattenData(this._sortedData);
    let filteredData = [...fullDataArray]
    try {
      if(columnFilter.length > 0){
        for(const f of columnFilter) {
          // add / exclude data from table depending on filters
          filteredData = filteredData.filter( (datum) =>
            {
              const {formatLabel} = this.columns.find(col=> col.key === f.column) || {}
              const formattedValue = this.getFormattedValue(datum[f.column], formatLabel);
              if ((f.include) || (!f.include && f.values[0] === '*')) {
                return f.values.includes(formattedValue);
              }
              else {
                return !f.values.includes(formattedValue);
              }
            }
          );
        }
      }
      filteredData = this.addParentRows(filteredData, fullDataArray)
    }
    catch (error) {
    }
    return filteredData
  }

  /**
   * Add missing parent rows in their right position
   * @param {object[]} data
   */
  addParentRows(filteredData, fullDataArray) {
    for(let i = 0; i<filteredData.length; i++) {
      const parents = filteredData[i]._parents
      if(parents.length > 0) {
        const inmediateParent = parents[parents.length - 1]
        // if parent row is not in the array already, insert it
        if(!filteredData.find(d => {
          const rowId = this.keyExtractor(d)
          return rowId === inmediateParent
        })){
          filteredData.splice(i, 0, fullDataArray.find(d => {
            const rowId = this.keyExtractor(d)
            return rowId === inmediateParent
          }))
          i-- // to check added element's parents
        }
      }
    }
    return filteredData
  }

  // this is written as a separate function in the case we want to scroll-to in the future
  scrollToHighlightedRow() {
    const row = this.shadowRoot.querySelector(`#row-${this.highlightedRow}`)
    if (!!row)
      row.scrollIntoView({behavior: "smooth", block: "center"})
  }

  render() {
    const data = this._flattenedData.slice(0, this._rowOffset + this._visibleRowCount) || []
    const hasData = data.length > 0
    const isLoading = this.isLoading
    const fill = isLoading || !hasData
    // if isLoading, show spinner
    // if !hasData, show empty message
    // show data
    return html`
      <iron-scroll-threshold
        id="${`unity-table-${this._tableId}`}"
        class="container"
      >
        <table>
          ${!this.headless ? this._renderTableHeader(this.columns) : null}
          ${fill?
            isLoading?
              html`<paper-spinner-lite active class="spinner center" />`
              : html`<div class="center">${this.emptyDisplay}</div>`
            : this._renderTableData(data)
          }
        </table>
      </iron-scroll-threshold>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          height: 100%;
          width: 100%;
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          color: var(--dark-gray-color, var(--default-dark-gray-color));
          border-collapse: collapse;
          --paper-checkbox-size: 16px;
          --paper-checkbox-unchecked-background-color: var(--white-color, var(--default-white-color));
          --paper-checkbox-unchecked-color: var(--gray-color, var(--default-gray-color));
          --paper-checkbox-checked-color: var(--primary-color, var(--default-primary-color));
          --paper-checkbox-unchecked-ink-color: var(--paper-checkbox-unchecked-background-color);
          --paper-checkbox-checked-ink-color: var(--paper-checkbox-unchecked-background-color);
          --paper-spinner-color: var(--primary-color, var(--default-primary-color));
          --thead-height: 36px;
          --thead-compact-height: 24px;
          --trow-height: 36px;
          --trow-compact-height:  24px;
          --default-hover-color: var(--primary-tint-1-color, var(--default-primary-tint-1-color));
          --default-highlight-color: var(--default-primary-tint-1-color, var(--default-primary-tint-1-color));
          --default-hover-highlight-color: var(--primary-tint-2-color, var(--default-primary-tint-2-color));
          --paper-checkbox-ink-size: 0;
          --paper-icon-button-ink-color: transparent;
          --padding-small: var(--padding-size-sm, var(--default-padding-size-sm));
          --padding-medium: var(--padding-size-md, var(--default-padding-size-md));
          --padding-large: var(--padding-size-lg, var(--default-padding-size-lg));
          --padding-extra-large: var(--padding-size-xl, var(--default-padding-size-xl));
          --margin-medium: var(--margin-size-md, var(--default-margin-size-md));
          --header-text-color: var(--black-color, var(--default-black-color));
          --separator-color: var(--light-gray-1-color, var(--default-light-gray-1-color));
          --filter-button-color: var(--black-color, var(--default-black-color));
          --sort-button-color: var(--black-color, var(--default-black-color));
          display: flex;
          height: 100%;
          flex: 1;
          min-height: 0;
        }
        .container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        table {
          flex: 1;
          min-height: 0;
          width: 100%;
          max-width: 100%;
          table-layout: fixed;
          border-collapse: collapse;
          border-spacing: 0;
          box-sizing: border-box;
          overflow: auto;
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
          z-index: 3;
        }
        th {
          position: sticky;
          top: 0;
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          text-align: left;
          padding: 0;
          margin: 0;
          border-collapse: collapse;
          z-index: 3;
          background-color: inherit;
          color: var(--header-text-color);
        }
        th.cell {
          overflow: visible;
        }
        .header {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          padding-left: 13px;
          box-sizing: border-box;
          border-collapse: collapse;
          border-bottom: 1px solid var(--separator-color);
        }
        tr {
          width: 100%;
          table-layout: fixed;
        }
        td {
          padding: 0;
          border-top: 0;
          border-collapse: collapse;
        }
        .cell {
          border-collapse: collapse;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .text {
          flex: 1;
          overflow: hidden;

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .header-content {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          flex: 1;
        }
        .header-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        paper-checkbox {
          height: var(--paper-checkbox-size);
          width: var(--paper-checkbox-size);
          margin-right: var(--padding-large);
          z-index: 2;
          overflow: hidden;
          flex-shrink: 0;
        }
        paper-icon-button {
          width: 33px;
          height: 33px;
        }
        .flipped {
          transform: rotate(180deg);
        }
        .row {
          height: var(--trow-height);
          line-height: var(--trow-height);
          border-collapse: collapse;
          background-color: var(--background-color, var(--default-background-color));
          border-bottom: 1px solid var(--separator-color);
        }
        .row.clickable {
          cursor: pointer;
        }
        .row.compact {
          height: var(--trow-compact-height);
          line-height: var(--trow-compact-height);
        }
        .row:hover {
          background-color: var(--hover-color, var(--default-hover-color));
        }
        .row.highlight {
          background-color: var(--highlight-color, var(--default-highlight-color));
        }
        .row.highlight:hover {
          background-color: var(--hover-highlight-color, var(--default-hover-highlight-color));
        }
        .sticky-header-row {
          height: var(--thead-height);
          line-height: var(--thead-height);
          border-collapse: collapse;
          cursor: pointer;
          background-color: var(--background-color, var(--default-background-color));
        }
        .sticky-header-row.compact {
          height: var(--thead-compact-height);
          line-height: var(--thead-compact-height);
        }
        paper-icon-button.header-sort-icon {
          position: relative;
          height: 18px;
          width: 18px;
          padding: 0;
          color: var(--sort-button-color);
        }
        .active-filters {
          text-align: right;
          margin-right: 8px;
          overflow: auto;
          min-height: 49px;
          max-height: 49px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .filter-container {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 8px;
        }
      `
    ]
  }
}

window.customElements.define('unity-table', UnityTable)
