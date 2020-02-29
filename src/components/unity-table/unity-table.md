# unity-table

## Changelog:

### v0.3.0
- Changed name of column filter function to filterLabel for clarity. If filterLabel is undefined, the raw 'data' value will be displayed. This function is only used to format table cell string labels and the text to search/filter by.

- Added ability to include custom content in table cells via named slots: <unity-table><span slot="uniqueCellId">Custom Cell Content</span></unity-table>. Note that if a cell has slotted content, it will replace the formatted label. Searching/filtering will always use the formatted label value (or raw value if formatLabel function is not defined).
