import '@bit/smartworks.unity.unity-button'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from "@storybook/addon-knobs";

export default {
  title: 'Buttons',
  decorators: [withKnobs]
};



export const Outlined = () => {
  const label = text("Button text", "Button")
  const disabled = boolean("Disabled", false)
  return html`
  <unity-button label=${label} outlined ?disabled=${disabled} @click=${action("clicked")}></unity-button>
`;}


export const Gradient = () => html`
  <unity-button label="Button" ?gradient=${true}></unity-button>
`;


export const Loading = () => html`
  <unity-button label="Button" ?gradient=${true} ?loading=${true}></unity-button>
`;

export const NoOutline = () => html`
  <unity-button label="Button"></unity-button>
`;

export const CenterIcon = () => html`
  <unity-button centerIcon="add" gradient></unity-button>
`;

export const Danger = () => html`
  <unity-button label="Button" outlined danger></unity-button>
`;

export const DangerGradient = () => html`
  <unity-button label="Button" gradient danger></unity-button>
`;

export const Disabled = () => html`
  <unity-button label="Button" outlined disabled></unity-button>
`;

export const GradientDisabled = () => html`
  <unity-button label="Button" outlined disabled></unity-button>
`;
