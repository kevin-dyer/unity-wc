# unity-table

## Changelog:

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
