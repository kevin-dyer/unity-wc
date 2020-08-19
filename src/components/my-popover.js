
import { html, css } from 'lit-element' // throwing an error for some reason
// import { html, css } from '../../node_modules/lit-element/lit-element'

import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-tag'

import './unity-popover/unity-popover'
import { PageViewElement } from './page-view-element'
import { SharedStyles } from './shared-styles'

const initialTags = {
  tag1: {
    active: true,
    value: `tag1`,
    label: `example tag 1`,
    color: `rgb(132, 199, 255)`
  },
  tag2: {
    active: false,
    value: `tag2`,
    label: `example tag 2`,
    color: `rgb(255, 236, 132)`
  },
  tag3: {
    active: true,
    value: `tag3`,
    label: `example tag 3`,
    color: `rgb(237, 147, 101)`
  },
  tag4: {
    active: false,
    value: `tag4`,
    label: `example tag 4`,
    color: `rgb(83, 209, 179)`
  },
  tag5: {
    active: false,
    value: `tag5`,
    label: `example tag 5`,
    color: `rgb(220, 144, 249)`
  },
}

class MyPopover extends PageViewElement {
  constructor() {
    super()
    this.showPopover1 = false
    this._showPopover1 = false
    this.showPopover2 = false
    this._showPopover2 = false
    this.tags = initialTags
    this._tags = initialTags
    this.boundary1 = null
    this._boundary1 = null
    this.boundary2 = null
    this._boundary2 = null

    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.onClose1 = this.onClose1.bind(this)
    this.onClose2 = this.onClose2.bind(this)
  }

  set showPopover1(value) {
    const oldValue = this._showPopover1
    this._showPopover1 = value
    this.requestUpdate('showPopover1', oldValue)
  }

  get showPopover1() { return this._showPopover1 }

  set showPopover2(value) {
    const oldValue = this._showPopover2
    this._showPopover2 = value
    this.requestUpdate('showPopover2', oldValue)
  }

  get showPopover2() { return this._showPopover2 }

  set tags(value) {
    const oldValue = this._tags
    this._tags = value
    this.requestUpdate('tags', oldValue)
  }

  get tags() { return this._tags }
  
  set boundary1(value) {
    const oldValue = this._boundary1
    this._boundary1 = value
    this.requestUpdate('boundary1', oldValue)
  }

  get boundary1() { return this._boundary1 }
  
  set boundary2(value) {
    const oldValue = this._boundary2
    this._boundary2 = value
    this.requestUpdate('boundary2', oldValue)
  }

  get boundary2() { return this._boundary2 }

  firstUpdated() {
    this.boundary1 = this.shadowRoot.getElementById('overflow-frame-left')
    this.boundary2 = this.shadowRoot.getElementById('overflow-frame-right')
  }

  onClose1() {
    this.showPopover1 = false
  }

  onClose2() {
    this.showPopover2 = false
  }
  
  addTag(e, tagValue) {
    const { tags } = this
    this.tags = {
      ...tags,
      [tagValue]: {
        ...tags[tagValue],
        active: true
      }
    }
  }
  
  removeTag(e, tagValue) {
    const { tags } = this
    this.tags = {
      ...tags,
      [tagValue]: {
        ...tags[tagValue],
        active: false
      }
    }
  }
  
  renderActiveTags() {
    return Object.values(this.tags).map(({ active, value, label, color }) => {
      if (!active) return false
      return html`
        <unity-tag
          .value=${value}
          .label=${label}
          .onClose=${this.removeTag}
          style='--tag-color: ${color};'
          withClose
        />
      `
    }).filter(tagHtml => !!tagHtml)
  }

  renderInactiveTags() {
    return Object.values(this.tags).map(({ active, value, label, color }) => {
      if (!!active) return false
      return html`
        <unity-tag
          .value=${value}
          .label=${label}
          .onClick=${this.addTag}
          style='--tag-color: ${color};'
        />
      `
    }).filter(tagHtml => !!tagHtml)
  }

  handleTagHolderClick() {
    this.showPopover1 = true
  }

  handleButtonClick() {
    const { showPopover2 } = this
    this.showPopover2 = !showPopover2
  }

  render() {
    return html`
      <div id='my-popover-container'>
        <h2>Unity Popover</h2>
        <div id='box-container'>

          <div
            id='overflow-frame-left'
            class='overflow-frame'
          >
            <unity-popover
              withClose
              flip
              closeOnOutsideClick
              .show=${this.showPopover1}
              .onClose=${this.onClose1}
              placement='bottom'
              .boundary=${this._boundary1}
              id='popover-1'
            >
              <div
                id='tag-holder'
                slot="on-page-content"
                @click=${this.handleTagHolderClick}  
              >
                ${this.renderActiveTags()}
              </div>
              <div
                slot="popover-content"
                style='padding: 12px;'
              >
                <div>Popover 1 Content</div>
                <div id='inactive-tags-container'>
                  ${this.renderInactiveTags()}
                </div>
              </div>
            </unity-popover>
          </div>

          <div
            id='overflow-frame-right'
            class='overflow-frame'
          >
            <div id='button-container'>
              <unity-popover
                preventOverflow
                closeOnOutsideClick
                .show=${this.showPopover2}
                .onClose=${this.onClose2}
                placement='bottom'
                .boundary=${this._boundary2}
                .distance=${10}
                id='popover-2'
              >
                <div slot='on-page-content'>
                  <unity-button
                    id='button'
                    label='${this.showPopover2 ? 'Close' : 'Open'} Popover'
                    @click=${this.handleButtonClick}  
                  ></unity-button>
                </div>
                <div
                  slot="popover-content"
                  style='padding: 12px;'
                >
                  <div>Popover 2 Content</div>
                  <div id='popover-2-content'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse urna diam, vestibulum in odio ac, blandit egestas justo. Integer id accumsan dolor. Mauris ac diam vestibulum, rhoncus sem quis, eleifend magna. Morbi varius semper ante non iaculis. Aliquam non felis ac magna accumsan gravida a non turpis. Quisque elit quam, blandit a tincidunt vitae, varius nec ante. Duis lacinia velit ut dolor rutrum mattis. Mauris ex magna, viverra porta dictum a, condimentum at enim. Cras ut neque vitae neque pretium eleifend.
                  </div>
                </div>
              </unity-popover>
            </div>
          </div>
        </div>
        <h4>Try Scrolling with the Popover Active</h4>
      </div>
    `
  }

  static get styles() {
    // QUESTION: Why is this not working? (tried re-ordering methods to no avail)
    return [
      SharedStyles,
      css`
      #popover-1 {
        --popover-min-width: 150px;
        --popover-max-width: 250px;
      }
      #popover-2 {
        --popover-max-width: 250px;
        --popover-margin-top: 8px;
      }
      #popover-1::before {
        box-sizing: border-box;
        content: '';
        display: block;
        height: 320px;
        width: 1px;
      }
      #popover-1::after {
        box-sizing: border-box;
        content: '';
        display: block;
        height: 320px;
        width: 1px;
      }
      #box-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
      }
      #tag-holder {
        display: flex;
        position: relative;
        overflow-x: scroll;
        border: 1px solid black;
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.25);
        width: 250px;
        height: 30px;
        margin-left: 50px;
      }
      #my-popover-container {
        width: 100%;
        padding: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      #inactive-tags-container {
        display: flex;
        flex-wrap: wrap;
      }
      .overflow-frame {
        height: 300px;
        width: 350px;
        overflow: scroll;
        border: 2px solid blue;
      }
      #button-container {
        height: 270px;
        width: 800px;
        display: flex;
        justify-content: center;
        padding-top: 30px;
      }
      #popover-2-content {
        font-size: 0.5em;
      }
      `
    ]
  }
}

window.customElements.define('my-popover', MyPopover)