/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'

import '@bit/smartworks.unity.unity-tag'


describe('tag test', () => {
  const testValue = 'value'
  const makeOnChange = inj => (e, v) => {
    inj.e = e
    inj.v = v
  }

  it('should have empty string as label default', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-tag></unity-tag>'))
    expect(el.label).to.equal('')
  })

  it('should have empty string as value default', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-tag></unity-tag>'))
    expect(el.value).to.equal('')
  })

  it('should have false as withClose default', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-tag></unity-tag>'))
    expect(el.withClose).to.equal(false)
  })

  it('should have false as onClose default', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-tag></unity-tag>'))
    expect(el.onClose).to.equal(false)
  })

  it('should have function as onClick default', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-tag></unity-tag>'))
    expect(el.onClick instanceof Function).to.equal(true)
  })

  it('should have unity-typography for label', async () => {
    const labelText = "label"
    const el = /** @type {A11yInput} */ (await fixture(`<unity-tag label="${labelText}"}></unity-tag>`))
    const label = el.shadowRoot.querySelector('div#tag unity-typography.label')
    expect(label).to.exist
    expect(label.innerText)
  })

  it('should have a unity-icon with withClose', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-tag withClose></unity-tag>'))
    const closeIcon = el.shadowRoot.querySelector('div#tag unity-icon.close')
    expect(closeIcon).to.exist
    expect(closeIcon.icon).to.equal('unity:close')
  })

  it('should call onClick when clicked', async () => {
    let ref = {}
    const onClick = makeOnChange(ref)
    const el = /** @type {A11yInput} */ (await fixture(html`<unity-tag .onClick="${onClick}" .value="${testValue}" ></unity-tag>`))
    const tag = el.shadowRoot.querySelector('div#tag')

    expect(ref.v).to.be.undefined

    tag.click()

    expect(ref.v).to.not.be.undefined
    expect(ref.v).to.equal(testValue)
  })

  it('should call onClose when close is clicked', async () => {
    let ref = {}
    const onClose = makeOnChange(ref)
    const el = /** @type {A11yInput} */ (await fixture(html`<unity-tag .onClose="${onClose}" .value="${testValue}" withClose></unity-tag>`))
    const close = el.shadowRoot.querySelector('div#tag unity-icon.close')

    expect(ref.v).to.be.undefined

    close.click()

    expect(ref.v).to.not.be.undefined
    expect(ref.v).to.equal(testValue)
  })

  it('should call onClick when close is clicked with no onClose', async () => {
    let ref = {}
    const onClick = makeOnChange(ref)
    const el = /** @type {A11yInput} */ (await fixture(html`<unity-tag .onClick="${onClick}" .value="${testValue}" withClose></unity-tag>`))
    const close = el.shadowRoot.querySelector('div#tag unity-icon.close')

    expect(ref.v).to.be.undefined

    close.click()

    expect(ref.v).to.not.be.undefined
    expect(ref.v).to.equal(testValue)
  })
})
