/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-checkbox'
// import '../../src/components/unity-checkbox/unity-checkbox'

describe ('unity-checkbox', () => {
  // testing consts
  const labelText = 'label text'
  const makeOnChange = injector => (e, value) => {
    injector.value = value
  }

  it('should render', async () => {
    const el = await fixture('<unity-checkbox></unity-checkbox>')
    expect(el).shadowDom.to.equal('<sp-checkbox  class="checkbox"  data-js-focus-visible=""  dir="ltr"  focusable="" onclick="event.stopPropagation()"></sp-checkbox>')
  })

  it('should default to just the checkbox', async () => {
    const el = await fixture('<unity-checkbox></unity-checkbox>')
    const checkbox = el.shadowRoot.querySelector('sp-checkbox')
    const label = checkbox.querySelector('unity-typography')

    expect(checkbox).to.exist
    expect(label).to.not.exist
  })

  it('should have a label', async () => {
    const el = await fixture(`<unity-checkbox label="${labelText}"></unity-checkbox>`)
    const label = el.shadowRoot.querySelector('sp-checkbox unity-typography')
    expect(label).to.exist
    expect(label.innerText).to.equal(labelText)
  })

  it('should have correct value', async () => {
    let el = await fixture(`<unity-checkbox></unity-checkbox>`)
    let checkbox = el.shadowRoot.querySelector('sp-checkbox')

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false
    expect(checkbox.indeterminate).to.be.false

    el = await fixture(html`<unity-checkbox indeterminate></unity-checkbox>`)
    checkbox = el.shadowRoot.querySelector('sp-checkbox')

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false
    expect(checkbox.indeterminate).to.be.true

    el = await fixture(html`<unity-checkbox checked></unity-checkbox>`)
    checkbox = el.shadowRoot.querySelector('sp-checkbox')

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.true
    expect(checkbox.indeterminate).to.be.false
  })

  it('should report new value through onChange', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)

    const el = await fixture(html`<unity-checkbox .onChange="${onChange}"></unity-checkbox>`)
    let checkbox = el.shadowRoot.querySelector('sp-checkbox')
    let input = checkbox.shadowRoot.querySelector('input#input')

    // making click event
    const eventName = 'change'
    const event = new Event(eventName)
    const listener = oneEvent(input, eventName)

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false

    // fire event
    input.dispatchEvent(event)
    await listener

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.true
    expect(ref.value).to.equal(true)

    // fire event
    input.dispatchEvent(event)
    await listener

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false
    expect(ref.value).to.equal(false)
  })

  it('should always go from indeterminate to checked', async () => {
    let el = await fixture(html`<unity-checkbox indeterminate ></unity-checkbox>`)
    let checkbox = el.shadowRoot.querySelector('sp-checkbox')
    let input = checkbox.shadowRoot.querySelector('input#input')

    // making click event
    const eventName = 'change'
    const event = new Event(eventName)
    let listener = oneEvent(input, eventName)

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false
    expect(checkbox.indeterminate).to.be.true

    // fire event
    input.dispatchEvent(event)
    await listener

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.true
    expect(checkbox.indeterminate).to.be.false

    el = await fixture(html`<unity-checkbox checked indeterminate ></unity-checkbox>`)
    checkbox = el.shadowRoot.querySelector('sp-checkbox')
    input = checkbox.shadowRoot.querySelector('input#input')
    listener = oneEvent(input, eventName)

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false
    expect(checkbox.indeterminate).to.be.true

    // fire event
    input.dispatchEvent(event)
    await listener

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.true
    expect(checkbox.indeterminate).to.be.false
  })

  it('should be disabled', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)

    const el = await fixture(html`<unity-checkbox disabled .onChange="${onChange}"></unity-checkbox>`)
    let checkbox = el.shadowRoot.querySelector('sp-checkbox.disabled')

    // making click event
    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(checkbox, eventName)

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false

    // fire event
    checkbox.dispatchEvent(event)
    await listener

    expect(checkbox).to.exist
    expect(checkbox.checked).to.be.false
    expect(ref.value).to.be.undefined
  })
})
