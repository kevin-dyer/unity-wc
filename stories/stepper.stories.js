// import '@bit/smartworks.unity.unity-stepper'
import '../src/components/unity-stepper/unity-stepper'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, number, text, object} from '@storybook/addon-knobs'

export default {
  title: 'Stepper',
  decorators: [withKnobs]
}

const stepList = [
  'Step 0',
  {
    name: "Step 1"
  },
  {
    name: "Step 2",
    key: "step2"
  },
  {
    name: "Step 3",
    key: "step3",
    buttonName: "Finalize"
  }
]

export const Standard = () => {
  const steps = object("Step List", stepList)
  const valid = boolean("Step Valid", false)
  const hideButton = boolean("Hide Button", false)
  const backtrack = boolean("Allow Backtrack", false)
  const currentStep = number("Step Override", null)

  return html`
    <unity-stepper
      .steps="${steps}"
      .valid="${valid}"
      .hideButton="${hideButton}"
      .backtrack="${backtrack}"
      .currentStep="${currentStep}"
      .onChangeStep="${action("step changed")}"
    ></unity-stepper>
  `
}
