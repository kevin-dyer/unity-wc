# unity-tooltip

## Changelog:

### v2.0.0
- Refactored tooltip to wrap onHover content in the default slot:
  <unity-tooltip label="my tooltip label">
    <unity-button label="button with tooltip"></unity-button>
  </unity-tooltip>
- Refactored properties to simplify. 'arrow' has been replaced with 'showArrow' boolean. Alignment props have been replaced with the string property 'alignment'. Arrow position is determined by 'alignment'.
- Added 'disabled' boolean property to disable tooltip from showing on hover.

### v1.1.0
- Added rightAlign and bottomAlign properties to change where the tooltip is displayed with respect to the reference point.

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.1.1
- Updated dependencies

### v0.1.0
- Created tooltip component with optional arrow
