import '../src/components/unity-dropzone/unity-dropzone'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from "@storybook/addon-knobs"

export default {
  title: 'Dropzone',
  decorators: [withKnobs]
}

export const Dropzone = () => {
  const accept = text('Accept File Type', 'application/json')
  const dropzoneText = text('Main Dropzone Text', 'Drop a .json file here')
  const invalidText = text('Invalid Dropzone Text', 'Not a .json file')
  const hideIcon = boolean('Hide Icon', false)
  const disabled = boolean('Disabled', false)
  return html`
    <div style="disaplay: flex; flex: 1;">
      <unity-dropzone
        .accept="${accept}"
        .dropzoneText="${dropzoneText}"
        .invalidText="${invalidText}"
        .hideIcon="${hideIcon}"
        .disabled="${disabled}"
        .onUpload="${action('onUpload')}"
      ></unity-dropzone>
    </div>
  `
}
