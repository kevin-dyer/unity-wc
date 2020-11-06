/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-stepper/unity-stepper'

describe ('unity-stepper', () => {
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
    console.log('el', el)
    console.log('el.shadowRooot', el.shadowRoot)
    expect(el).shadowDom.to.equal(`<div class="stepper"><div class="active step"><div class="bubble"><unity-typography>0</unity-typography></div><unity-typography>Step 1</unity-typography></div></div><unity-button disabled="" label="Finish"></unity-button>`)
  })
})

/*

it('should ', async () => {
  const el = await fixture(html`<unity-stepper></unity-stepper>`)

})

*/
