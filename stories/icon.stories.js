import { html } from 'lit-element'
import { withKnobs, text } from "@storybook/addon-knobs"
import '../src/components/unity-icon/unity-icon'

export default {
  title: 'Icons',
  decorators: [withKnobs]
}

export const Icon = () => {
  const icon = text('Icon', 'unity:download')
  const color = text('Color', 'black')
  return html`
    <unity-icon
      icon=${icon}
      style="color:${color};"
    >
    </unity-icon>
  `
}
