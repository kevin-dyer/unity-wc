# unity-split-pane

## Changelog:

### v1.1.2
- add ignore unity-tags

### v1.1.2
- Remove flex: 0 that was causing issues in Safari

### v1.1.1
- Fixed peer dependencies

### v1.1.0
- Moved collapse button to header
- Added label property to set text to show in the collapsed bar
- Added new CSS variables:
```
  --pane-border-width
  --pane-border-color
  --bar-width
  --header-border
  --collapse-button-padding
```
- Removed `--button-color` CSS variable

### v1.0.5
- Fix split-pane colours

### v1.0.4
- force buttons to borderless with unity-button update

### v1.0.3
- Set position to relative in order to limit modal to rendering inside specific panes

### v1.0.1
- Prevent split panel content from horizontally overflowing outside the panel width.

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.3.0
- add collapseButton to show/hide internal collapse button
- add onCollapseChange to allow for reporter function
- add custom get/set for show to send paneWidth when parent changes show from true to false
- Split Pane can now be fully controlled by parent

### v0.2.7
- update unity-button to v0.1.2

### v0.2.4
- Updated dependencies.

### v0.2.1
- Add '--bar-width' css variable to control width of bar between panes.

### v0.2.0
- Allow main pane to be collapsible.
- Resizable split pane.

### v0.1.6
- Added footer slot.

### v0.1.5
- Made close button optional, controlled by bool.

### v0.1.4
- Fixed border color style var references to allow for proper defaulting.

### v0.1.3
- Removed top and bottom border to allow pane to sit flush with a matching header

### v0.1.2
- Update dependencies.

### v0.1.1
- Update dependencies.

### v0.1.0
- First split-pane, with option to show/hide, close button, and two slots in the main container for shrunk header and full/stretched main info.
