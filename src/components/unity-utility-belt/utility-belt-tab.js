import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-typography'


/**
* Renders a utility belt tab for use inside utility belt component
* @name UnityUtilityBelt
* @param {''} name - title of tab
* @param {false} selected - boolean if tab is selected
* @param {0} index - index of tab in utility-belt



* @example
* <utility-belt-tab>
*   name="tab name"
*   id="tabId"
*.  index=0
* ></utility-belt-tab>

css vars
  tab-width
  tab-height
  selected-tab-background
**/


class UtilityBeltTab extends LitElement {
  constructor() {
    super()

    this.name = ''
    this.id = ''
    this.selected = false
    this.icon = ''
    this.index = 0
    this.onClose = () => {}
  }

  static get properties() {
    return {
      name: { type: String },
      id: {type: String},
      selected: {type: Boolean},
      icon: {type: String},
      index: {type: Number},
      onClose: {type: Function}
      // internals
    }
  }

  handleClose(e) {
    //Prevent tab @click event from firing
    e.stopPropagation()
    this.onClose(this.id)
  }

  getTabClasses() {
    const {index, selected} = this
    let tabClasses = 'utility-belt-tab'

    if (selected) {
      tabClasses = `${tabClasses} selected-tab`
    }

    return tabClasses
  }

  render() {
    const {
      name,
      id,
      icon,
    } = this
    const tabClass = this.getTabClasses()

    return html`
      <div class="${tabClass}">
        <div class="title-container">
          ${icon ? html`<unity-icon icon="${icon}"></unity-icon>` : null}
          <unity-typography class="tab-name">${name}</unity-typography>
        </div>
        <unity-button
          title="Close"
          centerIcon="close"
          type="borderless"
          @click=${this.handleClose}
        ></unity-button>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-tab-width: 140px;
          --default-tab-height: 20px;
          --default-selected-tab-background: var(--default-light-gray-1-color);
          --default-tab-border-color: var(--default-dark-gray-2-color);
        }
        .utility-belt-tab {
          width: var(--tab-width, var(--default-tab-width));
          height: var(--tab-height, var(--default-tab-height));
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 0 0 8px;
          border-right: 1px solid var(--tab-border-color, var(--default-tab-border-color));
          overflow: hidden;
          cursor: pointer;
        }
        .selected-tab {
          background-color: var(--selected-tab-background, var(--default-selected-tab-background));
        }
        .title-container {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tab-name {

        }
        unity-button {
          --background-color: none;
        }

      `
    ]
  }
}

window.customElements.define('utility-belt-tab', UtilityBeltTab)
