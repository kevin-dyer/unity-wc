import { html } from 'lit-element';
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import "@bit/smartworks.unity.unity-core/unity-dropdown"

export default {
  title: 'Dropdown Inputs',
  decorators: [withKnobs]
};



export const SingleInput = () => {
  const disabled = boolean("Disabled", false)
  return html`
    <unity-dropdown
      label="${"Single select"}"
      inputType="single-select"
      .options=${[{label: "Option 1", id: "1"}, {label: "Option 2", id: "2"}]}
      ?disabled=${disabled}
    >
   </unity-dropdown>
  `;
}
