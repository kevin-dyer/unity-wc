# unity-select-menu

## Changelog:

### v1.4.4
- fixed dropdown close on backdrop click by binding method to component instance.

### v1.4.3
- preventDefault called on menu click to stop progagation of click event.

### v1.4.1
- added `highlighted` attribute
- added css variables to control highlighted styles
- made it so that `options` can be changed and trigger an update


### v1.4.0
- changed "items" property to "options"
- removed box-shadow from borderless select menu

### v1.3.1
- add support for `--tag-hover-text-color` in item's `tagStyles`

### v1.3.0
- add --menu-hover-color CSS variable and update default color to Unity2020 designs
- add unity dependencies to peer dependencies
- fix wrong CSS property name (--tag--text-color)
- set label height

### v1.2.3
- add margin and border to tag style propagation

### v1.2.2
- fix version/changelog

### v1.2.1
- add tag as render option

### v1.0.1
- add ignore unity-tags

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.0.5
- Updated unity-default-theme-styles to 1.0.0

### v0.0.3
- Added option to render recursive submenus.

### v0.0.2
- Removing unnecessary divs + some cleaning.

### v0.0.1
- Basic one level menu.
