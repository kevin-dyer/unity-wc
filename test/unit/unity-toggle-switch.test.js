/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-toggle-switch/unity-toggle-switch'

describe ('unity-toggle-switch', () => {
  // testing consts
  const labelText = 'label text'
  const onText = 'on text'
  const offText = 'off text'
  const remarkText = 'remark text'
  const onIcon = 'unity:toggle_on'
  const offIcon = 'unity:toggle_off'
  const makeOnChange = injector => value => {
    injector.value = value
  }

  it('should render', async () => {
    const el = await fixture('<unity-toggle-switch></unity-toggle-switch>')
    expect(el).shadowDom.to.equal('<div class="wrapper"><div class="switch-container"><iron-icon class="switch toggle" icon="unity:toggle_off"></iron-icon></div></div>')
  })

  it('should default to just the icon', async () => {
    const el = await fixture('<unity-toggle-switch></unity-toggle-switch>')
    const wrapper = el.shadowRoot.querySelector('div.wrapper')
    const label = wrapper.querySelector('unity-typography.label')
    const switchContainer = wrapper.querySelector('div.switch-container')
    const offLabel = switchContainer.querySelector('unity-typography.off-label')
    const icon = switchContainer.querySelector('iron-icon.switch.toggle')
    const onLabel = switchContainer.querySelector('unity-typography.on-label')
    const remark = wrapper.querySelector('unity-typography.remark')

    expect(label).to.not.exist
    expect(offLabel).to.not.exist
    expect(icon).to.exist
    expect(onLabel).to.not.exist
    expect(remark).to.not.exist
  })

  it('should have correct value', async () => {
    let el = await fixture(html`<unity-toggle-switch ?value="${true}"></unity-toggle-switch>`)
    let icon = el.shadowRoot.querySelector('div.wrapper div.switch-container iron-icon.switch.toggle')

    expect(icon).to.exist
    expect(icon.icon).to.equal(onIcon)

    el = await fixture(html`<unity-toggle-switch ?value="${false}"></unity-toggle-switch>`)
    icon = el.shadowRoot.querySelector('div.wrapper div.switch-container iron-icon.switch.toggle')

    expect(icon).to.exist
    expect(icon.icon).to.equal(offIcon)
  })

  it('should have a label', async () => {
    const el = await fixture(`<unity-toggle-switch label="${labelText}"></unity-toggle-switch>`)
    const label = el.shadowRoot.querySelector('div.wrapper unity-typography.label')
    expect(label).to.exist
    expect(label.innerText).to.equal(labelText)
  })

  it('should have a remark', async () => {
    const el = await fixture(`<unity-toggle-switch remark="${remarkText}"></unity-toggle-switch>`)
    const remark = el.shadowRoot.querySelector('div.wrapper unity-typography.remark')
    expect(remark).to.exist
    expect(remark.innerText).to.equal(remarkText)
  })

  it('should have an off label', async () => {
    const el = await fixture(`<unity-toggle-switch offLabel="${offText}"></unity-toggle-switch>`)
    const offLabel = el.shadowRoot.querySelector('div.wrapper div.switch-container unity-typography.off-label.switch')
    expect(offLabel).to.exist
    expect(offLabel.innerText).to.equal(offText)
  })

  it('should have an on label', async () => {
    const el = await fixture(`<unity-toggle-switch onLabel="${onText}"></unity-toggle-switch>`)
    const onLabel = el.shadowRoot.querySelector('div.wrapper div.switch-container unity-typography.on-label.switch')
    expect(onLabel).to.exist
    expect(onLabel.innerText).to.equal(onText)
  })

  it('should report new value through onChange', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)

    const el = await fixture(html`<unity-toggle-switch ?value="${true}" .onChange="${onChange}"></unity-toggle-switch>`)
    let icon = el.shadowRoot.querySelector('div.wrapper div.switch-container iron-icon.switch.toggle')

    // making click event
    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(icon, eventName)

    expect(icon).to.exist
    expect(icon.icon).to.equal(onIcon)

    // fire event
    icon.dispatchEvent(event)
    await listener

    expect(icon).to.exist
    expect(icon.icon).to.equal(offIcon)
    expect(ref.value).to.equal(false)

    // fire event
    icon.dispatchEvent(event)
    await listener

    expect(icon).to.exist
    expect(icon.icon).to.equal(onIcon)
    expect(ref.value).to.equal(true)
  })

  it('should be disabled', async () => {
    let ref = {}
    const onChange = makeOnChange(ref)

    const el = await fixture(html`<unity-toggle-switch ?value="${false}" disabled .onChange="${onChange}"></unity-toggle-switch>`)
    const iconCount = el.shadowRoot.querySelectorAll('div.wrapper div.switch-container iron-icon.switch.toggle').length
    let icon = el.shadowRoot.querySelector('div.wrapper div.switch-container iron-icon.switch.toggle.disabled')

    // making click event
    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(icon, eventName)

    expect(icon).to.exist
    expect(iconCount).to.equal(1)
    expect(icon.icon).to.equal(offIcon)

    // fire event
    icon.dispatchEvent(event)
    await listener

    expect(icon).to.exist
    expect(iconCount).to.equal(1)
    expect(icon.icon).to.equal(offIcon)
    expect(ref.value).to.be.undefined
  })
})
