import '@bit/smartworks.unity.unity-core/unity-text-input';
// import '../src/components/unity-text-input/unity-text-input.js'
import { html } from 'lit-element';
import {
  withKnobs,
  text,
  boolean,
  number
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';


export default {
  title: 'Text Inputs',
  decorators: [withKnobs]
};


export const Standard = () => {
  const value = text("Editor text", "");
  const placeholder = text("Placeholder Text", "Write here...")
  const label = text("Label", "")
  const remark = text("Remark", "")
  const charCount = boolean("Character Count", false)
  const maxLength = number("Maximum Length", undefined)
  const units = text("Units", "")
  const hint = text("Tooltip Hint", "")
  const time = boolean("Time Format", false)
  const password = boolean("Password Format", false)
  const error = text("Error text", "")
  const showIcon = boolean("Icon Toggle", false)
  const rounded = boolean("Rounded Input", false)
  const hideBorder = boolean("Borderless Input", false)
  const borderEffects = boolean("Border Hover Effects", true)
  const area = boolean("Text Area Mode", false)
  const minLines = number("Minimum Rendered Lines", 4)
  const maxLines = number("Lines before Scrolling", 12)
  const innerRightIcon = text("Inside Right Icon (iron/unity icon)", "")
  const innerLeftIcon = text("Inside Left Icon (iron/unity icon)", "")
  const dirty = boolean("Dirty Marker", false)
  return html`
    <div style="width: 500px; margin: 50px 100px;">
      <unity-text-input
        .onChange=${action("onChange")}
        .value="${value}"
        ?area="${area}"
        ?charCount="${charCount}"
        ?showIcon="${showIcon}"
        ?rounded="${rounded}"
        ?hideBorder="${hideBorder}"
        ?borderEffects="${borderEffects}"
        ?dirty="${dirty}"
        ?time="${time}"
        ?password="${password}"
        .placeholder="${placeholder}"
        .label="${label}"
        .remark="${remark}"
        .maxLength="${maxLength}"
        .units="${units}"
        .hint="${hint}"
        .error="${error}"
        .minLines="${minLines}"
        .maxLines="${maxLines}"
        .innerRightIcon="${innerRightIcon}"
        .innerLeftIcon="${innerLeftIcon}"
      >
      </unity-text-input>
    </div>
  `;
}

export const Password = () => html`
  <div style="width: 500px; margin: 50px 100px;">
    <unity-text-input label="Password" password></unity-text-input>
  </div>
`;

export const Validation = () => {
  const value = text("Editor text", "");
  const placeholder = text("Placeholder Text", "Will only be valid when value is `valid`")
  const label = text("Label", "")
  const remark = text("Remark", "")
  const error = text("Error text", "")
  const showIcon = boolean("Icon Toggle", false)
  const validation = val => {
    if (val.length === 0) return 'Cannot be empty.'
    if (val !== 'valid') return 'Value must equal "valid".'
    return true
  }
  return html`
    <div style="width: 500px; margin: 50px 100px;">
      <unity-text-input
        .onChange=${action("onChange")}
        .value="${value}"
        ?showIcon="${showIcon}"
        .placeholder="${placeholder}"
        .label="${label}"
        .remark="${remark}"
        .error="${error}"
        .validation="${validation}"
      >
      </unity-text-input>
    </div>
  `;
}
