/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-text-input/unity-text-input'

describe('unity-text-input', () => {
  // testing consts
  const testText = 'test text'
  const longTestInput = "i am greater than twenty characters"
  const maxlength = 20
  const remarkText = 'this is the remark text'
  const testUnits = 'test units'
  const valid = 'valid'
  const notValid = 'notValid'
  const validation = val => val === valid ? true : notValid
  const innerIcon = 'unity:radar_chart'
  const defaultMinLines = 4
  const defaultMaxLines = 12
  const negativeLines = -2
  const minLinesStyle = "--area-min-lines"
  const maxLinesStyle = "--area-max-lines"
  const makeOnChange = injector => (e, value, isValid) => {
    injector.e = e
    injector.value = value
    injector.isValid = isValid
  }

  describe('input mode', () => {
    it('should render', async () => {
      const el = await fixture('<unity-text-input value="test"></unity-text-input>')
      expect(el).shadowDom.to.equal('<div><iron-input class="input-wrapper showBorder notRounded valid border-effects" bind-value="test"><input value="{{value::input}}" id="input" type="text" maxlength="null" placeholder="" style="" class=""></iron-input></div>')
    })

    it('should default to text', async () => {
      const el = await fixture(`<unity-text-input value="${testText}"></unity-text-input>`)
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.type).to.equal("text")
    })

    it('should have no value', async () => {
      const el = await fixture('<unity-text-input></unity-text-input>')
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper')
      const input = el.shadowRoot.querySelector('iron-input.input-wrapper input#input')
      expect(ironInput.bindValue).to.equal("")
      expect(ironInput.value).to.equal("")
    })

    it(`should have value "${testText}"`, async () => {
      const el = await fixture(`<unity-text-input value="${testText}"></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input')
      const input = el.shadowRoot.querySelector('iron-input.input-wrapper input#input')
      expect(ironInput.bindValue).to.equal(testText)
      expect(ironInput.value).to.equal(testText)
    })

    it('should render a label', async () => {
      const el = await fixture(`<unity-text-input label="label" value="${testText}"></unity-text-input>`)
      const label = el.shadowRoot.querySelector('p.label')
      expect(label).to.exist
      expect(label.className).to.include('label')
      expect(label.innerText).to.include('label')
    })

    it('should have placeholder', async () => {
      const el = await fixture(`<unity-text-input placeholder="${testText}"></unity-text-input>`)
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.placeholder).to.equal(testText)
    })

    it('should have a remark', async () => {
      const el = await fixture(`<unity-text-input remark="${testText}"></unity-text-input>`)
      const remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(remark).to.exist
      expect(remark.innerText).to.include(testText)
    })

    it('should have a charCount that matches value\'s length', async () => {
      const el = await fixture(`<unity-text-input value="${testText}" charCount></unity-text-input>`)
      const remark = el.shadowRoot.querySelector('div.bottom span.remark')
      const charCount = el.shadowRoot.querySelector('div.bottom span.charCount')
      expect(remark).to.exist
      expect(charCount).to.exist
      expect(Number(charCount.innerText)).to.equal(testText.length)
    })

    it('should have a character limit', async () => {
      const el = await fixture(`<unity-text-input value="${longTestInput}" maxlength="${maxlength}"></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper')
      const input = el.shadowRoot.querySelector('input#input')
      expect(input.maxLength).to.equal(maxlength)
      expect(ironInput.bindValue.length).to.equal(maxlength)
      expect(ironInput.bindValue).to.not.equal(longTestInput)
      expect(ironInput.bindValue).to.equal(longTestInput.slice(0, maxlength))
      expect(input.value.length).to.equal(maxlength)
      expect(input.value).to.not.equal(longTestInput)
      expect(input.value).to.equal(longTestInput.slice(0, maxlength))
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
      const errorText = "this is the error text"
      const el = await fixture(`<unity-text-input remark="${remarkText}" error="${errorText}"></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper.invalid')
      const remark = el.shadowRoot.querySelector('div.bottom span.remark')
      expect(ironInput).to.exist
      expect(remark.innerText).to.not.equal(remarkText)
      expect(remark.innerText).to.equal(errorText)
    })

    it('should show remark when error is string or bool true, or falsey', async () => {
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
      let el = await fixture(html`<unity-text-input .value="${notValid}" .validation="${validation}" .remark="${remarkText}"></unity-text-input>`)
      let remark = el.shadowRoot.querySelector('div.bottom span.remark')
      let ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper.invalid')
      expect(remark.innerText).to.not.equal(remarkText)
      expect(remark.innerText).to.equal(notValid)
      expect(ironInput).to.exist
      el = await fixture(html`<unity-text-input .value="${valid}" .validation="${validation}" .remark="${remarkText}"></unity-text-input>`)
      remark = el.shadowRoot.querySelector('div.bottom span.remark')
      ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper.invalid')
      expect(remark.innerText).to.equal(remarkText)
      expect(remark.innerText).to.not.equal(notValid)
      expect(ironInput).to.not.exist
    })

    it('should be rounded', async () => {
      const el = await fixture(`<unity-text-input rounded></unity-text-input>`)
      const roundedIronInput = el.shadowRoot.querySelector('iron-input.input-wrapper.rounded')
      const notRoundedIronInput = el.shadowRoot.querySelector('iron-input.input-wrapper.notRounded')
      expect(roundedIronInput).to.exist
      expect(notRoundedIronInput).to.not.exist
    })

    it('should hide border', async () => {
      const el = await fixture(`<unity-text-input hideBorder></unity-text-input>`)
      const hideBorderIronInput = el.shadowRoot.querySelector('iron-input.input-wrapper.hideBorder')
      const showBorderIronInput = el.shadowRoot.querySelector('iron-input.input-wrapper.showBorder')
      expect(hideBorderIronInput).to.exist
      expect(showBorderIronInput).to.not.exist
    })

    it('should have no border effects', async () => {
      const el = await fixture(html`<unity-text-input .borderEffects="${false}"></unity-text-input>`)
      const borderEffectIronInput = el.shadowRoot.querySelector('iron-input.input-wrapper.border-effects')
      const noBorderEffectIronInput = el.shadowRoot.querySelector('iron-input.input-wrapper')
      expect(borderEffectIronInput).to.not.exist
      expect(noBorderEffectIronInput).to.exist
    })

    it('should show as dirty', async () => {
      const el = await fixture(`<unity-text-input dirty></unity-text-input>`)
      const dirtyBar = el.shadowRoot.querySelector('iron-input.input-wrapper div.dirty')
      expect(dirtyBar).to.exist
    })

    it('should not show icon without showIcon', async () => {
      let el = await fixture(html`<unity-text-input .validation="${validation}" .value="${valid}"></unity-text-input>`)
      let circIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle iron-icon.icon')
      let rectIconText = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.icon-text')
      let rectIconCircles = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper')
      expect(circIcon).to.not.exist
      expect(rectIconText).to.not.exist
      expect(rectIconCircles).to.not.exist
    })

    it('should show valid icon without validation', async () => {
      let el = await fixture(html`<unity-text-input showIcon .value="${valid}"></unity-text-input>`)
      let validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      let invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      let rectIconText = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.icon-text')
      let rectIconCircles = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper')
      expect(invalidCircleIcon).to.not.exist
      expect(rectIconText).to.not.exist
      expect(rectIconCircles).to.not.exist
      expect(validCircleIcon).to.exist
    })

    it('should show correct icon based on validation', async () => {
      let el = await fixture(html`<unity-text-input showIcon .validation="${validation}" .value="${notValid}"></unity-text-input>`)
      let validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      let invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      let rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      expect(validCircleIcon).to.not.exist
      expect(rectIcon).to.not.exist
      expect(invalidCircleIcon).to.exist
      expect(invalidCircleIcon.icon).to.equal('unity:error')
      el = await fixture(html`<unity-text-input showIcon .validation="${validation}" .value="${valid}"></unity-text-input>`)
      validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      expect(invalidCircleIcon).to.not.exist
      expect(rectIcon).to.not.exist
      expect(validCircleIcon).to.exist
      expect(validCircleIcon.icon).to.equal('unity:check')
    })

    it('should show simple icon based on validation when password', async () => {
      let el = await fixture(html`<unity-text-input showIcon password .validation="${validation}" .value="${notValid}"></unity-text-input>`)
      let validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      let invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      let rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      expect(validCircleIcon).to.not.exist
      expect(rectIcon).to.not.exist
      expect(invalidCircleIcon).to.exist
      expect(invalidCircleIcon.icon).to.equal('unity:error')
      el = await fixture(html`<unity-text-input showIcon password .validation="${validation}" .value="${valid}"></unity-text-input>`)
      validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      expect(invalidCircleIcon).to.not.exist
      expect(rectIcon).to.not.exist
      expect(validCircleIcon).to.exist
      expect(validCircleIcon.icon).to.equal('unity:check')
    })

    it('should show complex icon based on validation when password', async () => {
      const strong = 'strong'
      const weak = 'weak'
      const validation = val => {
        if (val === weak) return 1
        if (val === strong) return 2
        return false
      }

      let el = await fixture(html`<unity-text-input showIcon password .validation="${validation}" .value="${notValid}"></unity-text-input>`)
      let validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      let invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      let rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      let rectIconText = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.icon-text')
      let rectIconCircles = el.shadowRoot.querySelectorAll('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper div.password-circle')
      let rectIconGreenCircles = el.shadowRoot.querySelectorAll('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper div.password-circle.green')

      expect(validCircleIcon).to.not.exist
      expect(rectIcon).to.not.exist
      expect(rectIconText).to.not.exist
      expect(rectIconCircles.length).to.equal(0)
      expect(rectIconGreenCircles.length).to.equal(0)
      expect(invalidCircleIcon).to.exist
      expect(invalidCircleIcon.icon).to.equal('unity:error')

      el = await fixture(html`<unity-text-input showIcon password .validation="${validation}" .value="${weak}"></unity-text-input>`)
      validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      rectIconText = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.icon-text')
      rectIconCircles = el.shadowRoot.querySelectorAll('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper div.password-circle')
      rectIconGreenCircles = el.shadowRoot.querySelectorAll('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper div.password-circle.green')

      expect(validCircleIcon).to.not.exist
      expect(invalidCircleIcon).to.not.exist
      expect(rectIcon).to.exist
      expect(rectIconText).to.exist
      expect(rectIconText.innerText).to.equal('Weak')
      expect(rectIconCircles.length).to.equal(5)
      expect(rectIconGreenCircles.length).to.equal(0)

      el = await fixture(html`<unity-text-input showIcon password .validation="${validation}" .value="${strong}"></unity-text-input>`)
      validCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.valid iron-icon.icon.icon-valid')
      invalidCircleIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.circle.invalid iron-icon.icon.icon-error')
      rectIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect')
      rectIconText = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-wrapper.rect div.icon-text')
      rectIconCircles = el.shadowRoot.querySelectorAll('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper div.password-circle')
      rectIconGreenCircles = el.shadowRoot.querySelectorAll('iron-input.input-wrapper div.icon-wrapper.rect div.circles-wrapper div.password-circle.green')

      expect(validCircleIcon).to.not.exist
      expect(invalidCircleIcon).to.not.exist
      expect(rectIcon).to.exist
      expect(rectIconText).to.exist
      expect(rectIconText.innerText).to.equal('Strong')
      expect(rectIconCircles.length).to.equal(5)
      expect(rectIconGreenCircles.length).to.equal(5)
    })

    it('should render inner right icon', async () => {
      const el = await fixture(`<unity-text-input innerRightIcon="${innerIcon}"></unity-text-input>`)
      const rightIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-right-wrapper iron-icon.inner-icon')
      const leftIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-left-wrapper iron-icon.inner-icon')
      expect(rightIcon).to.exist
      expect(leftIcon).to.not.exist
      expect(rightIcon.icon).to.equal(innerIcon)
    })

    it('should override right icon with password icon', async () => {
      const passwordIcon = 'unity:show'
      const el = await fixture(`<unity-text-input password innerRightIcon="${innerIcon}"></unity-text-input>`)
      const rightIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-right-wrapper iron-icon.inner-icon')
      expect(rightIcon).to.exist
      expect(rightIcon.icon).to.not.equal(innerIcon)
      expect(rightIcon.icon).to.equal(passwordIcon)
    })

    it('should render inner left icon', async () => {
      const el = await fixture(`<unity-text-input innerLeftIcon="${innerIcon}"></unity-text-input>`)
      const rightIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-right-wrapper iron-icon.inner-icon')
      const leftIcon = el.shadowRoot.querySelector('iron-input.input-wrapper div.icon-left-wrapper iron-icon.inner-icon')
      expect(leftIcon).to.exist
      expect(rightIcon).to.not.exist
      expect(leftIcon.icon).to.equal(innerIcon)
    })

    it('should report new value through onChange', async () => {
      let ref = {}
      const onChange = makeOnChange(ref)
      const first = 'first'
      const second = 'second'

      const el = await fixture(html`<unity-text-input .value="${first}" .onChange="${onChange}"></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper')
      const input = el.shadowRoot.querySelector('input#input')

      // making input event
      const eventName = 'input'
      const event = new Event(eventName)
      const listener = oneEvent(ironInput, eventName)

      expect(ironInput.bindValue).to.equal(first)
      expect(ironInput.bindValue).to.not.equal(second)
      expect(input.value).to.equal(ironInput.bindValue)

      // changing value and firing event
      input.value = second
      ironInput.dispatchEvent(event)
      await listener

      expect(ironInput.bindValue).to.not.equal(first)
      expect(ironInput.bindValue).to.equal(second)
      expect(ref.value).to.not.equal(first)
      expect(ref.value).to.equal(second)
    })
  })

  describe('area mode', () => {
    it('should render', async () => {
      const el = await fixture('<unity-text-input area value="test"></unity-text-input>')
      expect(el).shadowDom.to.equal('<div><iron-input class="input-wrapper area showBorder notRounded valid border-effects" bind-value="test"><iron-autogrow-textarea id="textarea" value="{{value::iron-autogrow-textarea}}" maxlength="null" class="" placeholder="" style="--area-min-lines: 4; --area-max-lines: 12" aria-disabled="false"></iron-autogrow-textarea></iron-input></div>')
    })

    it('should have no value', async () => {
      const el = await fixture('<unity-text-input area></unity-text-input>')
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper.area')
      const textArea = el.shadowRoot.querySelector('iron-input.input-wrapper.area iron-autogrow-textarea#textarea')
      expect(ironInput.bindValue).to.equal("")
      expect(textArea.value).to.equal("")
    })

    it('should have value "test text"', async () => {
      const el = await fixture(`<unity-text-input area value="${testText}"></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input')
      const textArea = el.shadowRoot.querySelector('iron-input.input-wrapper.area iron-autogrow-textarea#textarea')
      expect(ironInput.bindValue).to.equal(testText)
      expect(textArea.value).to.equal(testText)
    })

    it('should not be affected by password nor time', async () => {
      let el = await fixture(`<unity-text-input area password></unity-text-input>`)
      expect(el).shadowDom.to.equal('<div><iron-input class="input-wrapper area showBorder notRounded valid border-effects" bind-value=""><iron-autogrow-textarea id="textarea" value="{{value::iron-autogrow-textarea}}" maxlength="null" class="" placeholder="" style="--area-min-lines: 4; --area-max-lines: 12" aria-disabled="false"></iron-autogrow-textarea></iron-input></div>')
      el = await fixture(`<unity-text-input area time></unity-text-input>`)
      expect(el).shadowDom.to.equal('<div><iron-input class="input-wrapper area showBorder notRounded valid border-effects" bind-value=""><iron-autogrow-textarea id="textarea" value="{{value::iron-autogrow-textarea}}" maxlength="null" class="" placeholder="" style="--area-min-lines: 4; --area-max-lines: 12" aria-disabled="false"></iron-autogrow-textarea></iron-input></div>')
    })

    it('should not be affected by units, hideBorder, nor rounded', async () => {
      const el = await fixture(`<unity-text-input area value="${testText}" units="${testUnits}" hideBorder rounded></unity-text-input>`)
      const unitsClass = el.shadowRoot.querySelector('iron-input.input-wrapper.area.units')
      const hideBorder = el.shadowRoot.querySelector('iron-input.input-wrapper.area.hideBorder')
      const showBorder = el.shadowRoot.querySelector('iron-input.input-wrapper.area.showBorder')
      const rounded = el.shadowRoot.querySelector('iron-input.input-wrapper.area.rounded')
      const notRounded = el.shadowRoot.querySelector('iron-input.input-wrapper.area.notRounded')

      expect(unitsClass).to.not.exist
      expect(hideBorder).to.not.exist
      expect(showBorder).to.exist
      expect(rounded).to.not.exist
      expect(notRounded).to.exist
    })

    it('should not render left or right icons', async () => {
      const el = await fixture(`<unity-text-input area innerRightIcon="${innerIcon}" innerLeftIcon="${innerIcon}"></unity-text-input>`)
      const rightIcon = el.shadowRoot.querySelector('iron-input.input-wrapper.area div.icon-right-wrapper iron-icon.inner-icon')
      const leftIcon = el.shadowRoot.querySelector('iron-input.input-wrapper.area div.icon-left-wrapper iron-icon.inner-icon')
      expect(rightIcon).to.not.exist
      expect(leftIcon).to.not.exist

    })

    it('should be disabled', async () => {
      const el = await fixture(`<unity-text-input area disabled ></unity-text-input>`)
      const textArea = el.shadowRoot.querySelector('iron-autogrow-textarea#textarea.disabled')
      expect(textArea).to.exist
      expect(textArea.disabled).to.be.true
    })

    it('should have maxlength', async () => {
      const el = await fixture(`<unity-text-input area value="${longTestInput}" maxlength="${maxlength}" ></unity-text-input>`)
      const ironInput = el.shadowRoot.querySelector('iron-input.input-wrapper.area')
      const textArea = el.shadowRoot.querySelector('iron-autogrow-textarea#textarea')
      expect(ironInput.bindValue.length).to.equal(maxlength)
      expect(ironInput.bindValue).to.not.equal(longTestInput)
      expect(ironInput.bindValue).to.equal(longTestInput.slice(0, maxlength))
      expect(textArea.maxlength).to.equal(maxlength)
      expect(textArea.value.length).to.equal(maxlength)
      expect(textArea.value).to.not.equal(longTestInput)
      expect(textArea.value).to.equal(longTestInput.slice(0, maxlength))
    })

    it('should have placeholder', async () => {
      const el = await fixture(`<unity-text-input area placeholder="${testText}" ></unity-text-input>`)
      const textArea = el.shadowRoot.querySelector('iron-autogrow-textarea#textarea')
      expect(textArea.placeholder).to.equal(testText)
    })

    it('should have minLines default to 4 and maxLines default to 12', async () => {
      const el = await fixture(`<unity-text-input area></unity-text-input>`)
      const textArea = el.shadowRoot.querySelector('iron-autogrow-textarea#textarea')
      expect(textArea.style.getPropertyValue(minLinesStyle)).to.include(defaultMinLines)
      expect(textArea.style.getPropertyValue(maxLinesStyle)).to.include(defaultMaxLines)
    })

    it('should have minLines be minimum 1', async () => {
      const el = await fixture(`<unity-text-input area minLines="${negativeLines}"></unity-text-input>`)
      const textArea = el.shadowRoot.querySelector('iron-autogrow-textarea#textarea')
      expect(textArea.style.getPropertyValue(minLinesStyle)).to.not.include(negativeLines)
      expect(textArea.style.getPropertyValue(minLinesStyle)).to.include(1)
    })

    it('should have maxLines be minimum minLines', async () => {
      const el = await fixture(`<unity-text-input area maxLines="${negativeLines}"></unity-text-input>`)
      const textArea = el.shadowRoot.querySelector('iron-autogrow-textarea#textarea')
      expect(textArea.style.getPropertyValue(minLinesStyle)).to.not.include(negativeLines)
      expect(textArea.style.getPropertyValue(minLinesStyle)).to.include(defaultMinLines)
      expect(textArea.style.getPropertyValue(maxLinesStyle)).to.not.include(negativeLines)
      expect(textArea.style.getPropertyValue(maxLinesStyle)).to.not.include(defaultMaxLines)
      expect(textArea.style.getPropertyValue(maxLinesStyle)).to.include(defaultMinLines)
    })

    it('should not show validation/error icon', async () => {
      const el = await fixture(`<unity-text-input area showIcon error="${true}"></unity-text-input>`)
      const iconWrapper = el.shadowRoot.querySelector('div.icon-wrapper')
      expect(iconWrapper).to.not.exist
    })
  })
})
