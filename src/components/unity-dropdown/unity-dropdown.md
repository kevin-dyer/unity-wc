# unity-dropdown

## Changelog:

### v1.5.5
- fixed options list max height when dropdown type is menu

### v1.5.3
- Now passing `selected` property to the child `unity-select-menu` as `highlighted`. The selected element(s) will now also be highlighted.
- Added css vars `--highlighted-option-color` and `--highlighted-option-hover-color`

### v1.5.1
- Filter visible dropdown options by search text in options setter. This keeps search filter applied after an option is selected.

### v1.5.0
- Allow setting options list max height using the CSS variable `--dropdown-options-list-max-height` 

### v1.4.5
- removed top margin from dropdown label

### v1.4.4
- unity-select-menu v1.4.1

### v1.4.3
- Added showCheckboxes attribute
- Fixed multiselect bug introduces in 1.4.1

### v1.4.2
- Updated dependency for unity-select-menu 1.4.0

### v1.4.1
- fixed checkbox being out of sync with multi-select options

### v1.4.0
- Updated properties to conform to unity-select-menu v1.4.0

### v1.3.3
- Minor code improvements

### v1.3.2
- Added expanded and onExpandedChange attributes

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