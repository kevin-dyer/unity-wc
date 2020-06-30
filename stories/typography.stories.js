import { html } from 'lit-element'
import { withKnobs, text, select } from "@storybook/addon-knobs"
import '@bit/smartworks.unity.unity-core/unity-typography'

export default {
  title: 'Typography',
  decorators: [withKnobs]
}

const colorKnob = () => select(
  'Color', 
  { 
    dark: 'dark',
    medium: 'medium',
    light: 'light'
  },
  'dark'
)
const sizeKnob = () => select(
  'Size',
  {
    Header1: 'header1', header2: 'header2', paragraph: 'paragraph', medium: 'medium', small: 'small'
  },
  'paragraph'
)
const weightKnob = () => select(
  'Weight',
  {
    Header1: 'header1', header2: 'header2', paragraph: 'paragraph', medium: 'medium', small: 'small'
  },
  'paragraph'
)

export const Regular = () => {
  const t = text('Text', 'When zombies arrive, quickly fax judge Pat.')
  const color = colorKnob()
  const size = sizeKnob()
  const weight = weightKnob()
  return html`
    <unity-typography
      color=${color}
      size=${size}
      weight=${weight}
    >
      ${t}
    </unity-typography>
  `
}

export const Monospace = () => {
  const t = text('Text', 'Quick fox jumps nightly above wizard.')
  const color = colorKnob()
  const size = sizeKnob()
  const weight = weightKnob()
  return html`
  <unity-typography
    monospace
    color=${color}
    size=${size}
    weight=${weight}
  >
    ${t}
    </unity-typography>
`
}

export const StylesOverwrite = () => {
  const t = text('Text', 'Jim quickly realized that the beautiful gowns are expensive.')
  const fontFamily = text('--font-family', 'serif')
  const fontColor = text('--font-color', 'var(--default-secondary-color)')
  const fontSize = text('--font-size', '18px')
  const fontWeight = text('--font-weight', 'bold')
  return html`
    <unity-typography
      style=${`
        --font-family: ${fontFamily};
        --font-color: ${fontColor};
        --font-size: ${fontSize};
        --font-weight: ${fontWeight};`
      }
    >
      ${t}
    </unity-typography>
  `
}