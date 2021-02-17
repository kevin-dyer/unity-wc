const defaultChildKey = '_rootChildren'
const ASC = 'Ascending'
const DES = 'Descending'
const UNS = 'Unsorted'

//accept data array which may have nested children
//filter nodes that match filter test, while maintaining hierarchy structure
export function filterData({
  filter='',
  data=[],
  columns=[],
  childKeys=['children'], //attribute names containing nested array of nodes
  columnKeys=['name'] //attribute names to apply filter to
}) {
  //Create root node and pass data in as children
  const originalHierarchy = {
    [defaultChildKey]: data
  }

  const filteredHierarchy = _filterHierarchy({
    filter,
    node: originalHierarchy,
    columns,
    path: [],
    filteredHierarchy: {},
    originalHierarchy,
    childKeys: [defaultChildKey, ...childKeys],
    columnKeys
  })

  return !!filteredHierarchy ? filteredHierarchy[defaultChildKey] : []
}

function shouldDisplayNode(node={}, columnKeys=[], searchRegex = new RegExp()) {
  return columnKeys.some(colKey => {
    return searchRegex.test(node[colKey])
  })
}

//Called recursively
function _filterHierarchy({
  filter='',
  node={},
  columns=[],
  path=[],
  filteredHierarchy={},
  originalHierarchy={},
  childKeys=[], //Array of attribute names that hold children
  columnKeys=[] //Array of column keys to sort on
}) {
  //Depth first recursion down node
  childKeys.forEach((childKey, index) => {
    const children = node[childKey]

    if (Array.isArray(children)) {
      children.forEach((child, childIndex) => {
        _filterHierarchy({
          filter,
          node: child,
          columns,
          path: [...path, childKey, childIndex],
          filteredHierarchy,
          originalHierarchy,
          childKeys,
          columnKeys
        })
      })
    }
  })

  //TODO: also build up expanded map
  //Find nodes that match searchText
  if (columnKeys.some((colKey, colIndex) => {
    const {
      key,
      format=val=>val,
      customFilter
    } = columns[colIndex] || {}
    const cellValue = format(node[key], node)

    if (customFilter && typeof customFilter === 'function') {
      return customFilter(filter, cellValue)
    }
    
    const searchRegex = new RegExp(filter, 'i')
    return searchRegex.test(cellValue)
  })) {
    let filterNode = filteredHierarchy
    let originalNode = originalHierarchy

    //build up filteredHierarchy with matching nodes
    path.forEach(pathKey => {
      //If it does not already exist add originalNode to filteredHierarchy, reset childKeys
      if (!filterNode[pathKey]) {
        filterNode[pathKey] = childKeys.includes(pathKey)
          ? []
          : Array.isArray(originalNode[pathKey])
            ? [...originalNode[pathKey]]
            : {...originalNode[pathKey]}

        //reset childKeys to empty array (if they exist in originalNode)
        childKeys.forEach(childKey => {
          if (!!filterNode[pathKey][childKey]) {
            filterNode[pathKey][childKey] = []
          }
        })
      }

      filterNode = filterNode[pathKey]
      originalNode = originalNode[pathKey]
    })
  }

  return filteredHierarchy
}

//accept data array which may have nested children
//Sort nodes at each hierarchy level, preserving hierarchy structure
export function sortData ({
  data=[],
  sortBy='',
  direction=UNS,
  childKeys=[]
}) {
  //traverse hierarchy data
  //sort each set of children
  const originalHierarchy = {
    [defaultChildKey]: data
  }
  const sortedHieararchy = _sortNode({
    node: originalHierarchy,
    sortBy,
    direction,
    childKeys: [defaultChildKey, ...childKeys]
  })

  return !!sortedHieararchy ? sortedHieararchy[defaultChildKey] : []
}

//recursively sort hierarchy
const _sortNode = ({
  node={},
  sortBy='',
  direction=UNS,
  childKeys=[] //Array of attribute names that hold children
}) => {
  const sortedNode = Array.isArray(node) ? [...node] : {...node}

  childKeys.forEach((childKey, index) => {
    const children = sortedNode[childKey]

    if (Array.isArray(children)) {
      sortedNode[childKey] = _sortList(children, sortBy, direction)
      .map((child, childIndex) => {
        return _sortNode({
          node: child,
          sortBy,
          direction,
          childKeys
        })
      })
    }
  })

  return sortedNode
}

//Pass in data array, sortBy key and direction
const _sortList = (data=[], sortBy='', direction=UNS) => {
  return [...data].sort((datum1, datum2) => {
    const a = String(datum1[sortBy]).toLowerCase()
    const b = String(datum2[sortBy]).toLowerCase()
    return compare(a, b, direction)
  })
}

function compare(a, b, direction=UNS) {
  if (a < b) {
    // return < 0, a first
    return direction === DES ? 1 : -1
  } else if (b < a) {
    // return < 0, a first
    return direction === DES ? -1 : 1
  } else {
    return 0
  }
}