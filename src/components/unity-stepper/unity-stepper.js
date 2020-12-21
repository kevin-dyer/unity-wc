import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * @name UnityStepper
 * @param {[]} steps, the steps to be tracked, string of step name to be rendered or obj{name, key(opt), buttonText(opt)}, buttonText defaults to Next/Finish
 * @param {number} totalSteps, total number of steps, not needed if given steps
 * @param {number} currentStep, override the current step to the one given, should be used carefully
 * @param {bool} valid, if the current step is valid, enables next button
 * @param {bool} hideButton, flag for having no button
 * @param {bool} backtrack, controls if the user can backtrack through the steps
 * @param {func} onChangeStep, the callback to return the current step
 * @example
 * <unity-stepper
 *   .onChangeStep="${step => reportStep(step)}"
 *   .valid="${formValid}"
 *   .textSeed="${[
 *     {name: 'Step 1', buttonText: "Authorize"},
 *     'Step 2',
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
    this.totalSteps = 0
    this.valid = false
    this.hideButton = false
    this.backtrack = false
    this.onChangeStep = ()=>{}
    this._currentStep = 1
  }

  static get properties() {
    return {
      steps: { type: Array },
      totalSteps: { type: Number },
      valid: { type: Boolean },
      hideButton: { type: Boolean },
      backtrack: { type: Boolean },
      onChangeStep: { type: Function },
      currentStep: { type: Number },
    }
  }

  checkCurrentStep(value) {
    const oldValue = this._currentStep
    const {
      steps,
      totalSteps: givenSteps
    } = this
    const totalSteps = Math.max(steps.length, givenSteps)
    if (value < 1) this._currentStep = 1
    else if (value > totalSteps) this._currentStep = totalSteps
    else this._currentStep = value
    this.requestUpdate('currentStep', oldValue)
  }

  set currentStep(value) {
    if (this.steps.length > 0) this.checkCurrentStep(value)
    else this._currentStep = value
  }

  get currentStep() { return this._currentStep }

  set steps(value) {
    const oldValue = this._steps
    // check if all steps are valid
    // if step is not a string and not an object with a name field, then it's invalid
    const valid = value.reduce((valid, step) => !valid ? false : typeof step === 'string' || step instanceof Object, true)
    if (valid) {
      this._steps = value
      // check currentStep
      this.checkCurrentStep(this.currentStep)
    } else {
      this._steps = []
    }

    this.requestUpdate('steps', oldValue)
  }

  get steps() { return this._steps }

  // this will create the bubble and the text
  createStep({name, key, pos}) {
    const {
      currentStep,
      backtrack,
      valid
    } = this
    const active = currentStep === pos
    const done = currentStep > pos
    const icon = ((currentStep > pos) || (active && valid)) ?
      html`<unity-icon class="icon" icon="unity:check"></unity-icon>` :
      html`<unity-typography>${pos}</unity-typography>`
    return html`
      <div
        class="step${active ? " active": ""}${done ? " done": ""}${backtrack ? " clickable": ""}"
        @click="${(done && backtrack) ? ()=>this.advance(pos) : ()=>{}}"
      >
        <div class="bubble">${icon}</div>
        ${!name ? null : html`
          <unity-typography class="step-name">
            ${name}
          </unity-typography>
        `}
      </div>
    `
  }

  createBar() {
    return html`<hr>`
  }

  // this will order the bubbles and make the lines
  orderSteps() {
    const {
      steps=[],
      totalSteps: givenSteps,
      currentStep,
      valid
    } = this

    const totalSteps = steps.length < givenSteps ? givenSteps : steps.length
    let renderedSteps = []

    steps.forEach((step, pos, list) => {
      const stepToRender = typeof step === 'string' ? {name: step} : step
      renderedSteps.push(this.createStep({...stepToRender, pos: pos+1}))
      if (pos < totalSteps - 1)
        renderedSteps.push(this.createBar())
    })

    const emptySteps = totalSteps - steps.length

    if (emptySteps > 0) {
      for (let i = 1; i <= emptySteps; i++) {
        renderedSteps.push(this.createStep({pos: steps.length+i}))
        if (i < emptySteps)
          renderedSteps.push(this.createBar())
      }
    }

    return renderedSteps
  }

  advance(targetStep) {
    const {
      steps,
      totalSteps,
      currentStep,
      disabled
    } = this

    if (disabled) return
    this.currentStep = typeof targetStep === 'number' ? targetStep : currentStep + 1
    this.onChangeStep(steps[this.currentStep-1] || currentStep)
  }

  render() {
    const {
      steps=[],
      totalSteps: givenSteps,
      currentStep: currentPos,
      hideButton,
      valid
    } = this

    if (!steps.length && !givenSteps) return

    const totalSteps = Math.max(steps.length, givenSteps)
    const currentStep = steps[currentPos-1] || {}

    const defaultButtonText = currentPos === totalSteps ? "Finish" : "Next"
    const buttonText = currentStep.buttonText || defaultButtonText
    return html`
      <div class="stepper">
        ${this.orderSteps()}
      </div>
      ${hideButton ? null : html`
        <div class="button-box">
          <unity-button
            ?disabled="${!valid || null}"
            label="${buttonText}"
            @click="${this.advance}"
          ></unity-button>
        </div>
      `}
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
          --default-unity-stepper-text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --default-unity-stepper-step-icon-color: var(--white-color, var(--default-white-color));
          --default-unity-stepper-step-size: 24px;
          --default-unity-stepper-button-min-width: 85px;
          --step-icon-size: calc(var(--default-unity-stepper-step-size, var(--default-unity-stepper-step-size)) * 5 / 6);

          --bubble-margin: calc(var(--padding-size-sm, var(--default-padding-size-sm)) / 2);

          display: flex;
          flex: 1;
          width: 100%;
          flex-direction: row;
          user-select: none;
          justify-content: center;
          align-items: center;
          height: calc(var(--unity-stepper-step-size, var(--default-unity-stepper-step-size)) + (2 * var(--bubble-margin)))
        }
        .stepper {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .step {
          flex: 0;
          display: flex;
          flex-direction: row;
          white-space: nowrap;
          justify-content: center;
          align-items: center;
        }
        .step.done.clickable {
          cursor: pointer;
        }
        .step unity-typography.step-name {
          flex: 0;
          --font-size: var(--unity-stepper-text-size, var(--default-unity-stepper-text-size));
        }
        .step.active unity-typography.step-name {
          --font-weight: var(--bold-text-weight, var(--default-bold-text-weight));
          text-align: center;
        }

        .step.active unity-typography.step-name::before {
          display: block;
          content: attr(title);
          font-weight: bold;
          height: 0;
          overflow: hidden;
          visibility: hidden;
          text-align: center;
        }
        .step.active unity-typography.step-name::after {
          display: block;
          content: attr(title);
          font-weight: bold;
          height: 0;
          overflow: hidden;
          visibility: hidden;
          text-align: center;
        }

        .step .bubble {
          color: var(--unity-stepper-step-icon-color, var(--default-unity-stepper-step-icon-color));
          background-color: var(--unity-stepper-step-inactive-color, var(--default-unity-stepper-step-inactive-color));
          height: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
          width: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
          border-radius: calc(var(--unity-stepper-step-size, var(--default-unity-stepper-step-size)) / 2);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: var(--bubble-margin);
        }
        .step.done .bubble, .step.active .bubble {
          background-color: var(--unity-stepper-step-active-color, var(--default-unity-stepper-step-active-color))
        }
        .step .bubble .icon {
          --unity-icon-height: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
          --unity-icon-width: var(--unity-stepper-step-size, var(--default-unity-stepper-step-size));
        }
        .step .bubble unity-typography {
          --font-color: var(--unity-stepper-step-icon-color, var(--default-unity-stepper-step-icon-color));
          --font-weight: var(--header2-selected-font-weight, var(--default-header2-selected-font-weight));
          flex: 0;
        }
        .step .bubble unity-icon {
          --unity-icon-height: var(--step-icon-size);
          --unity-icon-width: var(--step-icon-size);
          flex: 0;
        }
        .bar{}
        div.button-box {
          margin-left: var(--padding-size-xl, var(--default-padding-size-xl));
          min-width: var(--unity-stepper-button-min-width, var(--default-unity-stepper-button-min-width));
          text-align: center;
        }
        unity-button {
          flex: 0;
        }
        hr {
          flex: 1;
          --hr-side-margin: calc(var(--margin-size-md, var(--default-margin-size-md)) / 2);
          margin-right: var(--hr-side-margin);
          margin-left: var(--hr-side-margin);
          margin-bottom: calc(var(--step-icon-size) / 2);
          width: 100%;
          border: none;
          background-color: var(--unity-stepper-spacer-color, var(--default-unity-stepper-spacer-color));
          height: 1px;
        }
      `
    ]
  }
}

window.customElements.define('unity-stepper', UnityStepper)
