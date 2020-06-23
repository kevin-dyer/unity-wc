import { html } from 'lit-element'
import { withKnobs, text } from "@storybook/addon-knobs"
import '@bit/smartworks.unity.unity-core/unity-icon'

export default {
  title: 'Icons',
  decorators: [withKnobs]
}

export const UnityIcon = () => {
  const icon = text('Icon', 'unity:download')
  const color = text('Color', 'black')
  const height = text('--unity-icon-height', '24px')
  const width = text('--unity-icon-width', '24px')
  return html`
    <unity-icon
      icon=${icon}
      style="color:${color}; --unity-icon-height: ${height}; --unity-icon-width: ${width};"
    >
    </unity-icon>
  `
}

export const ImageIcon = () => {
  const height = text('--unity-icon-height', 'auto')
  const width = text('--unity-icon-width', 'auto')
  return html`
    <unity-icon
      src="https://www.altair.com/images/icons/Altair.svg"
      style="--unity-icon-height: ${height}; --unity-icon-width: ${width};"
    >
    </unity-icon>
  `
}
