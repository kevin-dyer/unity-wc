import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * @name UnityStepper
 * @param {[]} steps, the steps to be tracked, {name, key, buttonText(opt)}, buttonText defaults to Next/Finish
 * @param {bool} valid, if the current step is valid, enables next button
 * @param {func} onChangeStep, the callback to return the current step
 * @param {number} currentStep, override the current step to the one given, should be used carefully
 * @example
 * <unity-stepper
 *   .onChaneStep="${step => reportStep(step)}"
 *   .valid="${formValid}"
 *   .textSeed="${[
 *     {name: 'Step 1', key: 'step1', buttonText: "Authorize"},
 *     {name: 'Step 2', key: 'step2'},
 *     {name: 'Step 3', key: 'step3', buttonText: "Start"}
 *   ]}"
 * />
 *
 * css vars
 *   unity-stepper-step-active-color
 *   unity-stepper-step-inactive-color
 *   unity-stepper-button-color
 *   unity-stepper-button-text-color
 *   unity-stepper-spacer-color
 *   unity-stepper-step-text-color
 *   unity-stepper-step-icon-color
 *   unity-stepper-button-text-color
 *   unity-stepper-step-size
 *   unity-stepper-step-text-size
 *   unity-stepper-button-size
 *   unity-stepper-button-text-size
 **/

class UnityStepper extends LitElement {
  constructor() {
    super()

    this._steps = []
    this.valid = false
    this.onChangeStep = ()=>{}
    this._currentStep = 0

    // internals
    this.lib = {}
  }

  static get properties() {
    return {
      steps: { type: Array },
      valid: { type: Boolean },
      onChangeStep: { type: Function },
      currentStep: { type: Number },

      // lib: {type: false}
    }
  }

  checkCurrentStep(value) {
    const oldValue = this._currentStep
    if (value < 0) this._currentStep = 0
    else if (value >= this.steps.length) this._currentStep = this.steps.length - 1
    else this._currentStep = value
    this.requestUpdate('currentStep', oldValue)
  }

  set currentStep(value) {
    if (this.steps.length > 0) checkCurrentStep(value)
    else this._currentStep = value
  }

  get currentStep() { return this._currentStep }

  set steps(value) {
    const oldValue = this._steps
    this._steps = value
    // check currentStep
    this.checkCurrentStep(this.currentStep)
    // // update lib
    // this.lib = value.reduce((a, step) => {
    //   return {
    //     ...a,
    //     [step.key]: step
    //   }
    // }, {})
    this.requestUpdate('steps', oldValue)
  }

  get steps() { return this._steps }

  render() {
    const {
      steps,
      currentStep
    } = this

    const defaultButtonText = currentStep === steps.length-1 ? "Finish" : "Next"
    const buttonText = steps[currentStep].buttonText || defaultButtonText
    return html`<div>This is the stepper</div><unity-button label="${buttonText}"></unity-button>`
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-unity-stepper-step-active-color: var(--primary-color, var(--default-primary-color));
          --default-unity-stepper-step-inactive-color: var(--dark-gray-2-color, var(--default-dark-gray-2-color));
          --default-unity-stepper-spacer-color: var(--dark-gray-2-color, var(--default-dark-gray-2-color));
          --default-unity-stepper-step-text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-unity-stepper-step-icon-color: var(--white-color, var(--default-white-color));
          --default-unity-stepper-step-size: ;

          display: flex;
        }
        .bubble {}
        .step {}
        .bar{}
        .button-wrapper {
          flex: 0;
        }
        .stepper {
          flex: 1
        }
      `
    ]
  }
}

window.customElements.define('unity-stepper', UnityStepper)
