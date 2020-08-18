
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
    this.showPopover = false
    this._showPopover = false
    this.tags = initialTags
    this._tags = initialTags

    this.addTag = this.addTag.bind(this)
    this.removeTag = this.removeTag.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  set showPopover(value) {
    const oldValue = this._showPopover
    this._showPopover = value
    this.requestUpdate('showPopover', oldValue)
  }

  get showPopover() { return this._showPopover }

  set tags(value) {
    const oldValue = this._tags
    this._tags = value
    this.requestUpdate('tags', oldValue)
  }

  get tags() { return this._tags }

  onClose() {
    this.showPopover = false
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

  handleDivClick() {
    console.log(`div clicked`)
    this.showPopover = true
  }

  render() {
    console.log(`this.showPopover`, this.showPopover)
    return html`
      <div id='my-popover-container'>
        <h3>Try Scrolling with the Popover Active</h3>
        <div
          id='overflow-frame'
        >
          <unity-popover
            withClose
            .show=${this.showPopover}
            .onClose=${this.onClose}
            placement='bottom'
            id='popover-1'
          >
            <div
              id='tag-holder'
              slot="on-page-content"
              @click=${this.handleDivClick}  
            >
              ${this.renderActiveTags()}
            </div>
            <div
              slot="popover-content"
              style='padding: 12px;'
            >
              <div>Popover Content</div>
              <div id='inactive-tags-container'>
                ${this.renderInactiveTags()}
              </div>
            </div>
          </unity-popover>
        </div>
      </div>
      <style>
        #popover-1 {
          --popover-min-width: 150px;
          --popover-max-width: 250px;
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
          padding: 32px;
        }
        #inactive-tags-container {
          display: flex;
          flex-wrap: wrap;
        }
        #overflow-frame {
          height: 300px;
          width: 350px;
          overflow: scroll;
          border: 1px solid blue;
        }
      </style>
    `
  }

  get styles() {
    // QUESTION: Why is this not working? (tried re-ordering methods to no avail)
    return [
      SharedStyles,
      css`
        #my-popover-container {
          padding: 32px;
        }
        #tag-holder {
          display: flex;
          position: relative;
          overflow-y: visible;
          overflow-x: scroll;
          border: 1px solid black;
          box-shadow: 0 0 3px 1px rgba(0,0,0,0.25);
          width: 250px;
          height: 30px;
        }
      `
    ]
  }
}

window.customElements.define('my-popover', MyPopover)