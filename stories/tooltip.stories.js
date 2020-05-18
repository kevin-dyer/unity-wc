import '@bit/smartworks.unity.unity-tooltip'
// import '../src/components/unity-tooltip/unity-tooltip'
import { html } from 'lit-element'
import { withKnobs, text, select } from "@storybook/addon-knobs";

export default {
  title: 'Tooltips',
  decorators: [withKnobs]
};

export const FullExample = () => {
  const label = text("Tooltip text", "I am a tooltip")
  const arrowDir = {
    None: '',
    Left: 'left',
    Right: 'right',
    Top: 'top',
    Bottom: 'bottom'
  }
  const arrow = select("Arrow", arrowDir, '')
  return html`
    <unity-tooltip label=${label} arrow=${arrow}></unity-tooltip>
`;
}
