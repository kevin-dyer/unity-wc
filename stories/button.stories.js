import '@bit/smartworks.unity.unity-core/unity-button'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

export default {
  title: 'Buttons',
  decorators: [withKnobs]
};

export const Standard = () => {
  const label = text("Button text", "Button")
  const disabled = boolean("Disabled", false)
  const loading = boolean("Loading", false)
  const important = boolean("Important", false)
  const typeOptions = {
    'Primary (default)': 'primary',
    'Secondary': 'secondary',
    'Borderless': 'borderless'
  }
  const type = select("Button Type", typeOptions, 'None')
  return html`
    <unity-button
      label=${label}
      type="${type}"
      ?disabled=${disabled}
      ?loading=${loading}
      ?important=${important}
      @click=${action("clicked")}>
    </unity-button>
  `;
}

export const CenterIcon = () => {
  const centerIcon = text("centerIcon", "unity:add")
  return (
    html`
      <unity-button centerIcon=${centerIcon}></unity-button>
    `
  )
}

export const leftIcon = () => {
  const leftIcon = text("leftIcon", "unity:edit")
  const label = text("label", "Edit")

  return (
    html`
      <unity-button label=${label} leftIcon=${leftIcon}></unity-button>
    `
  )
}

export const rightIcon = () => {
  const rightIcon = text("rightIcon", "unity:down_chevron")
  const label = text("label", "Expand")
  return (
    html`
      <unity-button label=${label} rightIcon=${rightIcon}></unity-button>
    `
  )
}
