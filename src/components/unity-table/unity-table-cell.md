# unity-table-cell

## Changelog:

### v1.0.11
- added class name "selection-checkbox" to table row checkbox (used for selecting the row)

### v1.0.9
- fix `resizable` property name

### v1.0.8
- update to unity-checkbox

### v1.0.7
- Moved `overflow: hidden;` from `unity-table` to content wrapper div here. This allows dropdowns to overflow the cell while preventing other elements from doing so.

### v1.0.5
- add ignore unity-tags

### v1.0.4
- Changed default slot to a named slot to ensure correct content is displayed in cell. Seems to fix issues around custom content in hierarchical table in chrome.

### V1.0.3
- Fixed peer dependencies

### V1.0.2
- Remove flex-shrink so cells don't shrink, fix icon size and tabbing

### v1.0.1
- Update to match new Unity designs

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.1.25
- Added border radius to checkbox to prevent white corners on highlight

### v0.1.24
- Updated unity-default-theme-styles to 1.0.0
