import '@bit/smartworks.unity.unity-stepper'
// import '../src/components/unity-stepper/unity-stepper'
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
    key: "step2",
    cancelText: "Back"
  },
  {
    name: "Step 3",
    key: "step3",
    buttonName: "Finalize"
  }
]

export const Standard = () => {
  const steps = object("Step List", stepList)
  const totalSteps = number("Total Steps", 5)
  const valid = boolean("Step Valid", false)
  const hideButton = boolean("Hide Button", false)
  const backtrack = boolean("Allow Backtrack", false)
  const currentStep = number("Step Override", null)
  const cancelButton = boolean("Cancel Button", false)
  const cancelText = text("Cancel Text", "Cancel Text")

  return html`
    <unity-stepper
      .steps="${steps}"
      .totalSteps="${totalSteps}"
      .valid="${valid}"
      .hideButton="${hideButton}"
      .backtrack="${backtrack}"
      .currentStep="${currentStep}"
      .cancelButton="${cancelButton}"
      .cancelText="${cancelText}"
      .onChangeStep="${action("step changed")}"
      .onCancel="${action("stepper canceled")}"
    ></unity-stepper>
  `
}
