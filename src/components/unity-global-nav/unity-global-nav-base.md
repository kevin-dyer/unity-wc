# unity-global-nav-base

## Changelog:

### v1.5.0
- Updated `unity-global-nav-top-item` dependency to v1.3.0
- Added `selectFirstChildOnExpand` attribute

### v1.4.1
- Only show `alwaysShowBorders` border when neighbor is not open (prevent double borders)

### v1.4.0
- Added `subHeader` slot and `subHeaderBorder` attribute
- Added `openStates` and `onOpenStateChange` properties
- Added `alwaysShowBordersTop` and `alwaysShowBordersBottom` attributes
- Added `bubbleBottomItems` attribute
- Now passing `borderWhenClosed` attribute to `unity-global-nav-top-item` when it's included in the object for an item in `items`

### v1.3.5
- Added onToggleCollapse callback to unity-global-nav-base. Indicates when the collapsed state has changed, providing the current collapsed value.

### v1.3.3
- Add id to internal nav items

### v1.3.1
- Fixed wrong version of unity-global-nav

### v1.3.0
- Added customExpandedHeader property

### v1.2.0
- Added customHeader property

### v1.1.8
- Added styleToString to add item.styles to top-item, remove selected change on clicking element

### v1.1.6
- Added ignore unity-tags

### v1.1.5
- Fixed peer dependencies issue

### v1.1.4
- Fixed missing right border

### v1.1.3
- Fixed bottom section overlap with top items when global nav was too small

### v1.1.2
- Fixed styles to properly propagate from higher level components, remove duplicates

### v1.1.1
- Fixed logo size in Chrome
- Removed 1px top margin for menu box

### v1.1.0
- Updated to Unity 2020 designs
- Added header, headerImg and grid properties
- Added new css variables

### v1.0.1
- Fixed wrong version of unity-icon-set

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.2.5
- Added `position: relative` to .menu to avoid nav items from stretching across the screen

### v0.2.3
- Updated dependencies

### v0.2.0 (03/18/2020)
- Made menu collapsible
- Updated nav items versions

### v0.1.1
- Basic global navigation menu
