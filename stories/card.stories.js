import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from "@storybook/addon-knobs"
// import '@bit/smartworks.unity.unity-core/unity-card'
import '../src/components/unity-card/unity-card'

export default {
  title: 'Card',
  decorators: [withKnobs]
}

export const Card = () => {
  const title = text('Title', 'Mallard')
  const description = text('Description', 'Only the males have bright, colorful heads.')
  const imageUrl = text('Image URL', 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/187768561/2400')
  return html`
    <unity-card
      title="${title}"
      description="${description}"
      image="${imageUrl}"
      menuButton
    >
    </unity-card>
  `
}