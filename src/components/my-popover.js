
// import { html, css } from 'lit-element' // throwing an error for some reason
import { html, css } from '../../node_modules/lit-element/lit-element'

import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-tag'

import './unity-popover/unity-popover'
import { PageViewElement } from './page-view-element'

class MyPopover extends PageViewElement {
  constructor() {
    super()
    this.showPopover = false
    this.onClose = () => { console.log(`closing popover`) }
  }

  get styles() {
    return css`
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
      .tag {

      }
    `
  }

  tags = [
    {
      active: true,
      value: `tag1`,
      label: `example tag 1`,
      color: `yellow`
    },
    {
      active: false,
      value: `tag2`,
      label: `example tag 2`,
      color: `red`
    },
    {
      active: true,
      value: `tag3`,
      label: `example tag 3`,
      color: `green`
    },
    {
      active: false,
      value: `tag4`,
      label: `example tag 4`,
      color: `orange`
    },
    {
      active: false,
      value: `tag5`,
      label: `example tag 5`,
      color: `cyan`
    },
  ]
  
  addTag(e, tagValue) {
    const tag = findTagByValue(tagValue)
    tag.active = true
  }
  
  removeTag(e, tagValue) {
    const tag = findTagByValue(tagValue)
    tag.active = false
    console.log("removeTag -> tag", tag)
  }
  
  findTagByValue(tagValue) {
    const index = this.tags.findIndex(tag => {
      return tag.value === tagValue;
    })
    return this.tags[index] || {}
  }
  
  renderActiveTags = () => {
    return this.tags.map(({ active, value, label, color }) => {
      if (!active) return html``
      return html`
        <unity-tag
          .value=${value}
          .label=${label}
          .onClose=${removeTag}
          style='--tag-color: ${color};'
          withClose
        />
      `
    })
  }

  renderInactiveTags() {
    return this.tags.map(({ active, value, label, color }) => {
      if (!!active) return html``
      return html`
        <unity-tag
          .value=${value}
          .label=${label}
          .onClose=${addTag}
          style='--tag-color: ${color};'
        />
      `
    })
  }

  handleDivClick() {
    console.log(`div clicked`)
    this.showPopover = true
    // rerender?
  }

  render() {
    return html`
      <unity-popover
        withClose
        .show=${this.showPopover}
        .onClose=${this.onClose}
      >
        <div
          id='tag-holder'
          slot="on-page-content"
          @click=${this.handleDivClick}  
        >
          ${renderActiveTags()}
        </div>
        <div
          slot="popover-content"
        >
          <div>Test Content</div>
          ${renderInactiveTags()}
        </div>
      </unity-popover>
    `
  }
}

window.customElements.define('my-popover', MyPopover)