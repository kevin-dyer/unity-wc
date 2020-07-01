# unity-column-editor

## Changelog:

### v1.1.1
- set max height of modal content to 300px and enabled scrolling to display list of many columns.

### v1.1.0
- added buttonProps property to define properties of unity-button used to toggle the Column Editor modal. Can define all unity-button properties except for the @click property.
Ex: <unity-column-editor .buttonProps=${{label: 'Edit Columns', leftIcon: 'settings'}} ...></unity-column-editor>

### v1.0.0
- Moved all @bit depedencies to peerDependencies

### v0.0.14
- Updated dependencies

### v0.0.11
- Change unity-modal import to use bit component (bug introduced in v0.0.10).

### v0.0.10
- Fixed buttons to follow last version implementation.
- Updated unity-modal to v0.1.5.

