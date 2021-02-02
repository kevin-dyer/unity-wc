/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-stepper/unity-stepper'

describe ('unity-stepper', () => {
  const makeOnChange = injector => value => {
    injector.value = value
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
    const el = await fixture(html`<unity-stepper .steps="${[testStepOne]}"></unity-stepper>`)
    expect(el).shadowDom.to.equal(`<div class="stepper"><div class="active step"><div class="bubble"><unity-typography>1</unity-typography></div><unity-typography class="step-name">Step 1</unity-typography></div></div><div class="button-box"><unity-button disabled="" label="Finish"></unity-button></div>`)
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

  it('should render for given totalSteps', async () => {
    const totalSteps = 5
    const el = await fixture(html`<unity-stepper .totalSteps="${totalSteps}"></unity-stepper>`)
    const steps = el.shadowRoot.querySelectorAll("div.stepper div.step")
    expect(steps.length).to.equal(totalSteps)
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

  it('should render no button if hideButton', async () => {
    const stepsToTest = [stepzero, stepone]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" hideButton></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button).to.not.exist
  })

  it('should render invalid button as default', async () => {
    const stepsToTest = [stepzero, stepone]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}"></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button.disabled).to.be.true
  })

  it('should render valid button if valid', async () => {
    const stepsToTest = [stepzero, stepone]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" valid></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    expect(button.disabled).to.be.false
  })

  it('should advance the step when button is clicked', async () => {
    const stepsToTest = [stepzero, stepone]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" valid></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")
    let stepper = el.shadowRoot.querySelector("div.stepper")
    let steps = stepper.querySelectorAll("div.step")

    let activeStep = stepper.querySelector('div.step.active')

    expect(el.currentStep).to.equal(1)
    expect(activeStep).to.equal(steps[0])
    expect(activeStep).to.not.equal(steps[1])

    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(button, eventName)

    button.dispatchEvent(event)
    await listener

    stepper = el.shadowRoot.querySelector("div.stepper")
    steps = stepper.querySelectorAll("div.step")

    activeStep = stepper.querySelector('div.step.active')
    let doneStep = stepper.querySelector('div.step.done')

    expect(el.currentStep).to.equal(2)
    expect(activeStep).to.not.equal(steps[0])
    expect(doneStep).to.equal(steps[0])
    expect(activeStep).to.equal(steps[1])
  })

  it('should report step when given onChangeStep', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)
    const stepsToTest = [testStepOne, testStepThree, stepzero]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" valid .onChangeStep="${onChange}"></unity-stepper>`)
    const button = el.shadowRoot.querySelector("unity-button")

    expect(ref.value).to.be.undefined

    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(button, eventName)

    button.dispatchEvent(event)
    await listener

    expect(ref.value).to.equal(testStepThree)

    button.dispatchEvent(event)
    await listener

    expect(ref.value).to.equal(stepzero)
  })

  it('should accept currentStep', async () => {
    const stepsToTest = [testStepOne, testStepThree, stepzero]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" .currentStep="${2}"></unity-stepper>`)

    const stepper = el.shadowRoot.querySelector('div.stepper')
    const steps = stepper.querySelectorAll('div.step')

    const doneStep = stepper.querySelector('div.step.done')
    const check = doneStep.querySelector('div.step.done div.bubble unity-icon.icon')
    const activeStep = stepper.querySelector('div.step.active')
    const position = activeStep.querySelector('div.step.active div.bubble unity-typography')

    expect(steps[0]).to.equal(doneStep)
    expect(check).to.exist
    expect(check.icon).to.equal('unity:check')
    expect(steps[1]).to.equal(activeStep)
    expect(position).to.exist
    expect(position.innerText).to.equal('2')
  })

  it('should backtrack if enabled', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)
    const stepsToTest = [testStepOne, testStepThree, stepzero]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" .currentStep="${2}" .onChangeStep="${onChange}" backtrack valid></unity-stepper>`)
    const doneStep = el.shadowRoot.querySelector('div.stepper div.step.done')

    expect(ref.value).to.be.undefined

    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(doneStep, eventName)

    doneStep.dispatchEvent(event)
    await listener

    expect(ref.value).to.equal(testStepOne)
  })

  it('should not backtrack forwards if enabled', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)
    const stepsToTest = [testStepOne, testStepThree, stepzero]
    const el = await fixture(html`<unity-stepper .steps="${stepsToTest}" .currentStep="${2}" .onChangeStep="${onChange}" backtrack></unity-stepper>`)
    const stepper = el.shadowRoot.querySelector('div.stepper')
    const activeStep = stepper.querySelector('div.step.active')
    const futureStep = stepper.querySelectorAll('div.step')[2]

    expect(ref.value).to.be.undefined

    const eventName = 'click'
    const event = new Event(eventName)
    const activeListener = oneEvent(activeStep, eventName)
    const futureListener = oneEvent(futureStep, eventName)

    activeStep.dispatchEvent(event)
    await activeListener

    expect(ref.value).to.equal(undefined)

    futureStep.dispatchEvent(event)
    await futureListener

    expect(ref.value).to.equal(undefined)
  })

})
