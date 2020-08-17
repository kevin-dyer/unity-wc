import { html } from 'lit-element'
import { withKnobs, number, boolean } from "@storybook/addon-knobs"
import { action } from '@storybook/addon-actions';
import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-tag'
import '../src/components/unity-popover/unity-popover'

export default {
  title: 'popover',
  decorators: [withKnobs]
}

export const Standard = () => {
  let showpopover = boolean('show', false)
  const uselessBool = boolean('I do not do anything', true)
  const onClose = () => {
    action('onClose')
    return true
  }
  const handleDivClick = () => {
    console.log(`div clicked`)
    showpopover = true
    // Call rerender
  }
  console.log("handleDivClick -> showpopover", showpopover)

  return html`
    <unity-popover
      .show=${showpopover}
      .onClose=${onClose}
    >
      <div
        id='tag-holder'
        slot="on-page-content"
        @click=${handleDivClick}  
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
    <style>
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
    </style>
  `
}

// Tag Management
const tags = [
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
    active: true,
    value: `tag5`,
    label: `example tag 5`,
    color: `cyan`
  },
]

const addTag = (e, tagValue) => {
  const tag = findTagByValue(tagValue)
  tag.active = true
}

const removeTag = (e, tagValue) => {
  const tag = findTagByValue(tagValue)
  tag.active = false
  console.log("removeTag -> tag", tag)
}

const findTagByValue = (tagValue) => {
  const index = tags.findIndex(tag => {
    return tag.value === tagValue;
  })
  return tags[index] || {}
}

const renderActiveTags = () => tags.map(({ active, value, label, color}) => {
  if (!active) return html``;
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
const renderInactiveTags = () => tags.map(({ active, value, label, color}) => {
  if (!!active) return html``;
  return html`
    <unity-tag
      .value=${value}
      .label=${label}
      .onClose=${addTag}
      style='--tag-color: ${color};'
    />
  `
})

console.log(`render inactive `)