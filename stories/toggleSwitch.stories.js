import '@bit/smartworks.unity.unity-core/unity-toggle-switch'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

export default {
  title: 'Toggle Switch',
  decorators: [withKnobs]
};



export const ToggleSwitch = () => {
  const label = text("Label Text", "Label")
  const offLabel = text("Off Label Text", "Left")
  const onLabel = text("On Label Text", "Right")
  const remark = text("Remark Text", "Remark")
  const disabled = boolean("Disabled", false)
  return html`
    <unity-toggle-switch
      label=${label}
      offLabel=${offLabel}
      onLabel=${onLabel}
      remark=${remark}
      ?disabled=${disabled}
      @click=${action("Toggled")}
    ></unity-toggle-switch>
`;}
