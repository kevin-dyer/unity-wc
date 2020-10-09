# unity-dropdown

## Changelog:

### v1.3.1
- update to unity-checkbox

### v1.3.0
- added `autofocus` property to autofocus input on first render (for `boxType='search'` only)

### v1.2.0
- update colors to Unity2020 designs
- add --dropdown-search-input-padding CSS variable to set input padding
- fix hidden expand button for search type when the dropdown width was decreased (requires unity-text-input v1.1.7)
- fix box-shadow when the dropdown is open
- reset visible options list after clearing a search
- check if property values have changed in the properties' setters before applying updates

### v1.1.5
- Added CSS variable for border radius
- Fixed issues related to width. Dropdown width can be controlled using the --dropdown-width variable (defaults to 100%)
- Added slot to render custom bottom content inside the options box
- Enabled search filter for box-type=menu
- For button-type dropdowns, fixed an issue where an open dropdown wouldn't collapse after clicking the button

### v1.1.4
- Fixed peer dependencies issue

### v1.1.3
- Update to use newest unity-button's modes and styles

### v1.1.2
- Use default cursor when dropdown is disabled

### v1.1.1
- update visible options when options is updated

### v1.1.0
- Add rightAlign property to make options box align from the right of the dropdown
- Add css variable to control options box width.
- New custom css variables to use instead of the theme variables (default to theme values).
- Dropdown button color now depends on the --dropdown-color variable.

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.1.27
- Fix options box overflow issue on Edge.

### v0.1.26
- Small changes to fix Edge issues.

### v0.1.14
- Update dependencies.

### v0.1.13
- udpate onValueChange to return current selected on single select, multiselect unchanged
- fix unity-text-input location to center in Search Dropdown
- update Button Dropdowns to use unity-button.type interface
- update element positions to allow for rending menu over hidden overflows
- update selected items to allow for tags or inline on any inputType

### v0.1.10
- allow dropdown option labels to text wrap
