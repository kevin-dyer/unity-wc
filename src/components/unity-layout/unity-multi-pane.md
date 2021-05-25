# unity-multi-pane

## Changelog:


### v1.0.11
- Exposed paneWidths as a property for initializing pane widths

### v1.0.10
- Fixed bug with preventDefault call in mousemove listener

### v1.0.9
- Check if e.preventDefault exists on mousemove event to simplify unit tests.

### v1.0.8
- Fixed horizontal scrolling issue with side panel header by hiding panel overflow. Fixed unintentional highlighting when resizing panel by preventing default.

### v1.0.7
- make sure all overflow for header can scroll, to avoid entire pane scroll

### v1.0.6
- don't render pane contents until visible

### v1.0.5
- fix position and sizing issue

### v1.0.3
- revert last change

### v1.0.2
- fix converter issue

### v1.0.1
- add close-button-padding, fix spacing and appearance of collapse button.

### v1.0.0
- Initial release of unity-multi-pane, a multi-pane version of unity-split-pane.
