# unity-global-nav-top-item

## Changelog:

### v1.3.1
- Changelog update (no functionality change)

### v1.3.0
- Now styling top item as selected when it's collapsed and it has a selected child
- Now calling `onOpen` with three parameters: `key`, `openedState`, and `children` (added `children`)

### v1.2.6
- Added `borderWhenClosed` attribute

### v1.2.4
- Use same style for every item, independently from whether the element has children or not.

### v1.2.3

### v1.2.2
- Add id to inner nav items

### v1.2.2
- Made open state of nav-top-item controllable. added props:
  `open` - (bool) open state of top item,
  `onOpen` - (func) callback when top nav item has been opened or closed, and
  `openNeighbor` - (bool) open state of adjacent top nav item (if exists). If true, the bottom border is hidden.

### v1.2.1
- Fixed typo

### v1.2.0
- Added exposed css vars for adjusting icon height and width

### v1.1.5
- Added styleToString to pass item.styles to inner-item

### v1.1.3
- Added ignore unity-tags

### v1.1.2
- Fixed missing default style

### v1.1.1
- Fix styles to properly propagate from higher level components, remove duplicates

### v1.1.0
- Updated to Unity 2020 designs.
- Added disabled property and new css variables.

### v1.0.1
- When only one child, use child's label

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.2.1
- Updated dependencies.

### v0.2.0 (03/18/2020)
- Added tooltips.
- Added collapsed property.
- Updated global-nav-inner-item.

### v0.1.8
- Basic global nav top item.
