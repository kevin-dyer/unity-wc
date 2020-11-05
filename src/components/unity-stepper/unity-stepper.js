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

  // this will create the bubble and the text
  createStep({name, key, pos}) {
    const {
      currentStep
    } = this
    const active = currentStep >= pos
    const icon = currentStep > pos ?
      html`<unity-icon class="icon" icon="unity:check"></unity-icon>` :
      html`<unity-typography>${pos}</unity-typography>`
    console.log('creating step')
    return html`<div class="bubble${active ? " active": ""}">${icon}</div>`
  }

  // this will order the bubbles and make the lines
  orderSteps() {
    const {
      steps,
      currentStep,
      valid
    } = this

    return html``
  }

  render() {
    const {
      steps,
      currentStep,
      valid
    } = this

    const defaultButtonText = currentStep === steps.length-1 ? "Finish" : "Next"
    const buttonText = steps[currentStep].buttonText || defaultButtonText
    return html`
      <div>
        ${this.createStep({...steps[0], pos: 0})}
      </div>
      <unity-button
        ?disabled="${!valid || null}"
        label="${buttonText}"
      ></unity-button>
    `
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
          --default-unity-stepper-step-size: 24px;
          --step-icon-size: calc(var(--default-unity-stepper-step-size, var(--default-unity-stepper-step-size)) * 5 / 6);

          display: flex;
          flex: 1;
          flex-direction: column;
          user-select: none;
        }
        .icon {
          --unity-icon-height: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
          --unity-icon-width: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
        }
        .bubble {
          color: var(--unity-stepper-step-icon-color, var(--default-unity-stepper-step-icon-color));
          background-color: var(--unity-stepper-step-inactive-color, var(--default-unity-stepper-step-inactive-color));
          height: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
          width: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
          border-radius: calc(var(--unity-stepper-step-size, var(--default-unity-stepper-step-size)) / 2);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .bubble.active {
          background-color: var(--unity-stepper-step-active-color, var(--default-unity-stepper-step-active-color))
        }
        .bubble unity-typography {
          --font-color: var(--unity-stepper-step-icon-color, var(--default-unity-stepper-step-icon-color));
          --font-weight: var(--header2-selected-font-weight, var(--default-header2-selected-font-weight));
          flex: 0;
        }
        .bubble unity-icon {
          --unity-icon-height: var(--step-icon-size);
          --unity-icon-width: var(--step-icon-size);
          flex: 0;
        }
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
