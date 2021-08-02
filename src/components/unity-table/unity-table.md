# unity-table

## Changelog:

### v2.0.2
- Fixed bug with column filter dropdown validation. Now invalid filters are removed when dropdown is closed and are not reported to onColumnFilter callback.

### v2.0.0
- Major change to column filtering. Now only external column filtering is supported. Column filters are now defined with a conditional expression and a value. Ex: {expression: 'eq', value: 'online'}

### v1.3.11
- add showCheckboxes to filter dropdown

### v1.3.9
- fixed bug with setting initial column sorting.

### v1.3.8
- added attribute initialSortBy to initialize table column sorting. Also added onColumnSort callback which is fired when column sorting is updated.

### v1.3.7
- Updated table column sorting algorithm to sort numbers, booleans and strings.

### v1.3.3
- Modified fix from 1.3.1 to work in FF 87 and enable table scrolling.

### v1.3.2
- Modified fix from 1.3.1 to work properly in latest version of FF.

### v1.3.1
- Updated table style to prevent rows from expanding vertically to fill container height.

### v1.3.0
- Added feature to display a checkbox next to the column header if the `selectable` property is set for that column. Added `isSelected`
and `onSelect` properties to columns to manage checkbox selection.

### v1.2.2
- Since table bottom border is visible when the table is empty, updated the border color to match row separator color.

### v1.2.1
- Prevent unnecessary scrollbar from rendering on Chrome.

### v1.2.0
- Allow setting opacity of a row by passing the `rowOpacity` property in the data object.

### v1.1.14
- Added a class to right-actions slot which absolutely positions right actions.

### v1.1.11
- Fixed a bug with special characters in search filter.

### v1.1.10
- Fixed a bug that caused the `hideFilter` property to also hide sort icons.

### v1.1.9
- Fixed selected setter bug causing infinite update loop. Added back the isEqual check and updated addSelectedChildren and removeDeletedSelections to call the selected setter.

### v1.1.8
- Removed an isEqual check in `selected` setter which was preventing the selection from being cleared when selected rows were removed from the table.

### v1.1.7
- Added option to define custom row `backgroundColor` in data attribute.

### v1.1.6
- Fixed bug in sortData table util function.

### v1.1.5
- Added customFilter option for table columns to set custom search behavior

### v1.1.3
- added class name "selection-checkbox" to table row checkbox (used for selecting the row)
- added class name "select-all-checkbox" to table header checkbox (used for selecting All/None)

### v1.1.2
- updated dependency for unity-dropdown v1.4.2

### v1.1.1
- support for using an async function in onEndReached to fetch new data and update table rows

### v1.1.0
- add `disableColumnResize` and `hideFilterIcons` properties
- allow centering a column's header by setting the `centered` property to `true` for that column

### v1.0.19
- update filter button to primary color when not-all options are included

### v1.0.17
- update to unity-checkbox

### v1.0.16
- Added slot named 'right-actions' to top right corner of table.

### v1.0.14
- Remove `overflow: hidden;` from `td` element. The rule is moved to `unity-table-cell`. This allows dropdowns to overflow the cell while preventing other elements from doing so.

### v1.0.13
- Show pointer cursor on row hover only if onRowClick is defined
- Update docs

### v1.0.12
- Update table to track offsets more accurately

### v1.0.11
- Update Table to not use columns to store changing column size, only reporting on finish

### v1.0.10
- Update Unity Table Cell to specify custom content in named slot rather than default slot.

### v1.0.9
- Fix peer dependencies

### v1.0.8
- Fix selected logic to avoid infinite loops when selected is controlled by outside element.

### v1.0.7
- Fix logic to expand all parents of a highlighted row, incase highlighting a nested element.

### v1.0.6
- Fix filter-dropdown buttons to use borderless style

### v1.0.5
- Fix header border and background, fix shrinking

### v1.0.4
- Update Unity Table to new Unity designs

### v1.0.3
- Fix scroll bar appearing when there was no table data.

### v1.0.2
- Fix column filter to not shrink to unreadible levels, align left or right as needed, and render below header to avoid overlap. Introduces new colors to table.

### v1.0.0
- Fixed wrong version of table-cell-base

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.4.20
- Fixes for Edge:
  - Table header widths
  - Display dropdown search box
  - Dropdown options overflow (updated unity-dropdown to v0.1.27)

### v0.4.19
- Updated unity-dropdown to v0.1.26

### v0.4.17
- Bug fixes

### v0.4.9
- Exposed flattenedData internal so that it could be accessed by a ref

### v0.4.6-8
- version control bumps

### v0.4.5
- made it so that the table intelligently expands parents of the highlightedRow if it in not visible on page load

### v0.4.4
- added ability to set selected as an attribute, passing in an array of rowIds
- if the user passes the rowId of a parent element, children aren't automatically selected (they must be passed in explicitly)
- future work: not automatically selecting children might be a good thing if we want to give selection control to the user. We should add a "disableInternalSelection" attribute and allow the user to control everything with the onSelectionChange callback.

### v0.4.2
- remove leftover log

### v0.4.0
- add control prop to hide top border

### v0.3.23
- remove active filter bar
- remove top border to be flush with header

### v0.3.22
-Updated dependencies

### v0.3.20
- Updated for dropdown fixes. Presumably other types of fixes between last changelog update.

### v0.3.11
- Updated checkbox selection logic. If a parent is selected, all children are selected. If any child is unselected, its parent is unselected as well. If table data changes (things are added or removed) the selection map will also update.

### v0.3.9
- updated overflow of table header cells to correctly display filter dropdown menu.

### v0.3.0
- Changed name of column filter function to filterLabel for clarity. If filterLabel is undefined, the raw 'data' value will be displayed. This function is only used to format table cell string labels and the text to search/filter by.

- Added ability to include custom content in table cells via named slots: <unity-table><span slot="uniqueCellId">Custom Cell Content</span></unity-table>. Note that if a cell has slotted content, it will replace the formatted label. Searching/filtering will always use the formatted label value (or raw value if formatLabel function is not defined).
