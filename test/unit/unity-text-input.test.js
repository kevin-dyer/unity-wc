/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-text-input/unity-text-input'

describe('unity-text-input', () => {
  describe('input mode', () => {
    it('should render', async () => {
      const el = await fixture('<unity-text-input value="test"></unity-text-input>')
      expect(el).shadowDom.to.equal('<div><iron-input class="input-wrapper showBorder notRounded valid border-effects" bind-value="test"><input value="{{value::input}}" id="input" type="text" maxlength="null" placeholder="" style="" class=""></iron-input></div>')
    })

    it('should default to text', async () => {
      const el = await fixture('<unity-text-input value="test"></unity-text-input>')
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.type).to.equal('text')
    })

    it('should have no value', async () => {
      const el = await fixture('<unity-text-input></unity-text-input>')
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper')
      expect(ironInput.bindValue).to.equal("")
    })

    it('should have value "test"', async () => {
      const el = await fixture('<unity-text-input value="test"></unity-text-input>')
      const ironInput = el.shadowRoot.querySelector('iron-input')
      expect(ironInput.bindValue).to.equal("test")
    })

    // el.shadowRoot.querySelector('')
    it('should render a label', async () => {
      const el = await fixture('<unity-text-input label="label" value="test"></unity-text-input>')
      const label = el.shadowRoot.querySelector('p.label')
      expect(label).to.exist
      expect(label.className).to.include('label')
      expect(label.innerText).to.include('label')
    })

    it('should have placeholder', async () => {
      const el = await fixture('<unity-text-input placeholder="test"></unity-text-input>')
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.placeholder).to.equal('test')
    })

    it('should have a remark', async () => {
      const el = await fixture('<unity-text-input remark="test"></unity-text-input>')
      const remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark).to.exist
      expect(remark.innerText).to.include('test')
    })

    it('should have a charCount that matches value\'s length', async () => {
      const testText = "test text"
      const el = await fixture(`<unity-text-input value="${testText}" charCount></unity-text-input>`)
      const remark = el.shadowRoot.querySelector('div.bottom span.remark')
      const charCount = el.shadowRoot.querySelector('div.bottom span.charCount')
      expect(remark).to.exist
      expect(charCount).to.exist
      expect(Number(charCount.innerText)).to.equal(testText.length)
    })

    it('should have a character limit', async () => {
      const testInput = "i am greater than twenty characters"
      const maxlength = 20
      const el = await fixture(`<unity-text-input value="${testInput}" maxlength="${maxlength}"></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper')
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.maxLength).to.equal(maxlength)
      expect(ironInput.bindValue.length).to.equal(maxlength)
      expect(ironInput.bindValue).to.not.equal(testInput)
      expect(ironInput.bindValue).to.equal(testInput.slice(0, maxlength))
    })

    it('should show current and max character count', async () => {
      const maxlength = 50
      const lessInput = "i am less than fifty characters"
      const moreInput = "i am most definitely in excess of a number of characters that equals fifty"
      const less = await fixture(`<unity-text-input value="${lessInput}" charCount maxlength="${maxlength}"></unity-text-input>`)
      let charCount = less.shadowRoot.querySelector('div.bottom span.charCount')
      expect(charCount.innerText).to.include(`${lessInput.length}/${maxlength}`)
      const more = await fixture(`<unity-text-input value="${moreInput}" charCount maxlength="${maxlength}"></unity-text-input>`)
      charCount = more.shadowRoot.querySelector('div.bottom span.charCount')
      expect(charCount.innerText).to.not.include(`${moreInput.length}/${maxlength}`)
      expect(charCount.innerText).to.include(`${moreInput.slice(0, maxlength).length}/${maxlength}`)
    })

    it('should have disabled', async () => {
      const el = await fixture('<unity-text-input disabled></unity-text-input>')
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper.disabled')
      const input = el.shadowRoot.querySelector('input#input.disabled')
      expect(ironInput).to.exist
      expect(input).to.exist
      expect(input.disabled).to.be.true
    })

    it('should have units adjacent to input', async () => {
      const testUnits = 'test'
      const el = await fixture(`<unity-text-input units="${testUnits}"></unity-text-input>`)
      const input = el.shadowRoot.querySelector('iron-input.input-wrapper input#input')
      const units = el.shadowRoot.querySelector('iron-input.input-wrapper div.units')
      expect(units).to.exist
      expect(units.innerText).to.include(testUnits)
      expect(units.previousElementSibling).to.equal(input)
    })

    it('should have type time', async () => {
      const el = await fixture(`<unity-text-input time></unity-text-input>`)
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.type).to.equal('time')
    })

    it('should should have type password and icon', async () => {
      const el = await fixture(`<unity-text-input password></unity-text-input>`)
      const input = el.shadowRoot.querySelector('input#input')
      const iconWrapper = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-right-wrapper')
      const icon = iconWrapper.querySelector('iron-icon.inner-icon.password')
      expect(input.type).to.equal('password')
      expect(iconWrapper.previousElementSibling).to.equal(input)
      expect(icon).to.exist
      expect(icon.icon).to.equal('unity:show')
    })

    it('should toggle type and icon when icon is clicked', async () => {
      const el = await fixture(`<unity-text-input password></unity-text-input>`)
      let input = el.shadowRoot.querySelector('input#input')
      let icon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-right-wrapper iron-icon.inner-icon.password')
      const listener = oneEvent(el, 'click')
      expect(input.type).to.equal('password')
      expect(icon.icon).to.equal('unity:show')
      icon.click()
      await listener
      expect(input.type).to.equal('text')
      expect(icon.icon).to.equal('unity:hide')
      icon.click()
      await listener
      expect(input.type).to.equal('password')
      expect(icon.icon).to.equal('unity:show')
    })

    it('should overwrite remark with error', async () => {
      const remarkText = "this is a remark"
      const errorText = "this is an error"
      const el = await fixture(`<unity-text-input remark="${remarkText}" error="${errorText}"></unity-text-input>`)
      const remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.not.equal(remarkText)
      expect(remark.innerText).to.equal(errorText)
    })

    it('should show remark when error is string or bool true, or falsey', async () => {
      const remarkText = "this is a remark"
      const errorText = "true"
      const errorBool = true
      const errorEmpty = ''
      const errorFalse = false
      let el = await fixture(`<unity-text-input remark="${remarkText}" error="${errorText}"></unity-text-input>`)
      let remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.not.equal(errorText)
      expect(remark.innerText).to.equal(remarkText)
      el = await fixture(`<unity-text-input remark="${remarkText}" .error="${errorBool}"></unity-text-input>`)
      remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.equal(remarkText)
      el = await fixture(`<unity-text-input remark="${remarkText}" error="${errorEmpty}"></unity-text-input>`)
      remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.equal(remarkText)
      el = await fixture(`<unity-text-input remark="${remarkText}" .error="${errorFalse}"></unity-text-input>`)
      remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.equal(remarkText)
    })

    it('should use validation if passed in', async () => {
      const remarkText = 'this is the remark text'
      const valid = 'valid'
      const notValid = 'not valid'
      const validation = val => val === valid ? true : notValid
      let el = await fixture(html`<unity-text-input .value="${notValid}" .validation="${validation}" .remark="${remarkText}"></unity-text-input>`)
      let remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.not.equal(remarkText)
      expect(remark.innerText).to.equal(notValid)
      el = await fixture(html`<unity-text-input .value="${valid}" .validation="${validation}" .remark="${remarkText}"></unity-text-input>`)
      remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark.innerText).to.equal(remarkText)
      expect(remark.innerText).to.not.equal(notValid)
    })
  })
})


/*
  error
  validation
  showIcon
  rounded
  hideBorder
  borderEffects
  area
  minLines
  maxLines
  innerRightIcon
  innerLeftIcon
  dirty
*/
