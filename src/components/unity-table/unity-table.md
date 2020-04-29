# unity-table

## Changelog:

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