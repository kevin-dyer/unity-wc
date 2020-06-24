import '@bit/smartworks.unity.unity-tooltip'
import '@bit/smartworks.unity.unity-button'
import { html } from 'lit-element'
import { withKnobs, text, select, boolean } from "@storybook/addon-knobs";

export default {
  title: 'Tooltips',
  decorators: [withKnobs]
};

const alignmentOptions = {
  Left: 'left',
  Right: 'right',
  Top: 'top',
  Bottom: 'bottom'
}

export const FullExample = () => {
  const label = text("Tooltip text", "I am a tooltip")
  const alignment = select('Alignment', alignmentOptions, 'right' )
  const showArrow = boolean('Show Arrow', true)
  const disabled = boolean("Disabled", false)

  return html`
    <div style="display: flex; flex-direction: column; align-items: center; margin: 30px;">
      <unity-tooltip
        label=${label}
        alignment=${alignment}
        ?showArrow=${showArrow}
        ?disabled=${disabled}
      >
        <unity-button label="Hover me!"></unity-button>
      </unity-tooltip>
    </div>
`;
}
