/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-stepper/unity-stepper'

describe ('unity-stepper', () => {
  const makeOnChange = injector => value => {
    injectfor.value = value
  }
  const makeStep = (name, buttonText, key) => ({name, buttonText, key})
  const stepzero = "Step 0"
  const stepone = "Step 1"
  const steptwo = "Step 2"
  const stepthree = "Step 3"
  const testStepOne = makeStep(stepone)
  const testStepTwo = makeStep(steptwo, steptwo)
  const testStepThree = makeStep(stepthree, stepthree, stepthree)

  it('should render without steps', async () => {
    const el = await fixture('<unity-stepper></unity-stepper>')
    expect(el).to.exist
  })

  it('should render when given steps', async () => {
    console.log('testStepOne', testStepOne)
    const el = await fixture(html`<unity-stepper .steps="${[testStepOne]}"></unity-stepper>`)
    expect(el).shadowDom.to.equal(`<div class="stepper"><div class="active step"><div class="bubble"><unity-typography>0</unity-typography></div><unity-typography class="step-name">Step 1</unity-typography></div></div><unity-button disabled="" label="Finish"></unity-button>`)
  })

  it('should render for steps given', async () => {
    const stepsToTest = [stepzero, testStepOne, testStepTwo, testStepThree]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}"></unity-stepper>`)
    const steps = el.shadowRoot.querySelectorAll("div.stepper div.step")
    expect(steps.length).to.equal(stepsToTest.length)

    let stepName = steps[0].querySelector("div.step unity-typography.step-name")
    expect(stepName.innerText).to.equal(stepzero)
    stepName = steps[1].querySelector("div.step unity-typography.step-name")
    expect(stepName.innerText).to.equal(stepone)
    stepName = steps[2].querySelector("div.step unity-typography.step-name")
    expect(stepName.innerText).to.equal(steptwo)
    stepName = steps[3].querySelector("div.step unity-typography.step-name")
    expect(stepName.innerText).to.equal(stepthree)
  })

  it('should render one less hr than step', async () => {
    const stepsToTest = [stepzero, testStepOne, testStepTwo, testStepThree]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}"></unity-stepper>`)
    const hr = el.shadowRoot.querySelectorAll("div.stepper hr")
    expect(hr.length).to.equal(stepsToTest.length - 1)
  })

  it('should render default button text as "Next"', async () => {
    const stepsToTest = [stepzero, testStepOne, testStepTwo, testStepThree]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}"></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button.label).to.equal("Next")
  })

  it('should render default final button text as "Finish"', async () => {
    const stepsToTest = [stepzero]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}"></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button.label).to.equal("Finish")
  })

  it('should render button text according to step\'s buttonText', async () => {
    const stepsToTest = [testStepTwo]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}"></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button.label).to.equal(steptwo)
  })

  it('should render no button if noButton', async () => {
    const stepsToTest = [stepzero, stepone]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" noButton></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button).to.not.exist
  })
  // button is invalid
  // clicking invalid button does nothing
  // button is valid with valid
  // clicking valid button updates currentStep and reports to function
  // clicking reports whole step
  // backtrack reports step clicked
  // doesn't backtrack current or future steps
  // passing current step updates which step is current



})

/*

it('should ', async () => {
  const el = await fixture(html`<unity-stepper></unity-stepper>`)

})

*/
