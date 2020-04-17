import '../src/components/unity-progress/unity-progress'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number, select } from "@storybook/addon-knobs";

export default {
  title: 'Progress',
  decorators: [withKnobs]
};



export const Progress = () => {
  const label = text("Label text", "Label")
  const remark = text("Remark text", "Remark")
  const indeterminate = boolean("Indeterminate", false)
  const max = number("Max", 100)
  const value = number("Value", 50)
  const secondaryValue = number("Secondary value", 80)
  const completionType = select(
    "Completion type", 
    {
      None: '',
      Percentage: 'percentage',
      Ratio: 'ratio'
    },
    'None'
  )

  return html`
    <unity-progress
      style="width: 300px"
      max=${max}
      value=${value}
      secondaryValue=${secondaryValue}
      label=${label}
      remark="${remark}"
      ?indeterminate=${indeterminate}
      completionType=${completionType}
    </unity-progress>
`;}