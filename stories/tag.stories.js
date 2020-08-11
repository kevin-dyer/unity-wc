import '@bit/smartworks.unity.unity-core/unity-tag'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'

export default {
  title: 'Tags',
  decorators: [withKnobs]
}

export const Standard = () => {
  const label = text("Label text", "Tag")
  const value = text("Tag value", "Value")
  const withClose = boolean("Close icon", false)

  return html`
    <unity-tag
      .label="${label}"
      .value="${value}"
      .withClose="${withClose}"
      .onClose"${action("onClose")}
      .onChange"${action("onChange")}
  `
}
