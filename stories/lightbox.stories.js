import { html } from 'lit-element'
import { withKnobs, number } from "@storybook/addon-knobs"
import { action } from '@storybook/addon-actions';
import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-tag'
import '../src/components/unity-lightbox/unity-lightbox'

export default {
  title: 'Lightbox',
  decorators: [withKnobs]
}

export const Standard = () => {
  let showLightbox = false
  const onClose = action(() => {
    console.log(`action called`)
    showLightbox = false
    return 'onClose'  
  })
  const handleDivClick = () => {
    console.log(`div clicked`)
    showLightbox = true
  }
  return html`
    <div
      id='tag-holder'
      onclick=${handleDivClick}  
    >
      ${renderActiveTags()}
      <unity-lightbox
        id='lightbox'
        .show=${showLightbox}
        .onClose=${onClose}
      >
        ${renderInactiveTags()}
      </unity-lightbox>
    </div>
    <style>
      #tag-holder {
        border: 1px solid black;
        box-shadow: 0 0 3px 1px rgba(0,0,0,0.25);
        width: 250px;
        height: 30px;
      }
    </style>
  `
}

// Tag Management
const activeTags = {
  tag1: false,
  tag2: false,
  tag3: false,
}

const addTag = (tagValue) => {
  activeTags[tagValue] = true
}

const removeTag = (tagValue) => {
  activeTags[tagValue] = false
}

const renderActiveTags = () => `
  ${!!activeTags.tag1 ? `<unity-tag
    .value="tag1"
    label="example tag 1"
    withClose
    .onClose=${removeTag}
    style='--tag-color: blue;'
  />` : ''}
  ${!!activeTags.tag2 ? `<unity-tag
    .value="tag2"
    label="example tag 2"
    withClose
    .onClose=${removeTag}
    style='--tag-color: red;'
  />` : ''}
  ${!!activeTags.tag3 ? `<unity-tag
    .value="tag3"
    label="example tag 3"
    withClose
    .onClose=${removeTag}
    style='--tag-color: green;'
  />` : ''}
`
const renderInactiveTags = () => `
  ${!activeTags.tag1 ? `<unity-tag
    .value="tag1"
    label="example tag 1"
    .onClick=${addTag}
    style='--tag-color: blue;'
  />` : ''}
  ${!activeTags.tag2 ? `<unity-tag
    .value="tag2"
    label="example tag 2"
    .onClick=${addTag}
    style='--tag-color: red;'
  />` : ''}
  ${!activeTags.tag3 ? `<unity-tag
    .value="tag3"
    label="example tag 3"
    .onClick=${addTag}
    style='--tag-color: green;'
  />` : ''}
`
