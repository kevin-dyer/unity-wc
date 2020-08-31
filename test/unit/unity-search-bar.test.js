/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'

import '../../src/components/unity-search-bar/unity-search-bar'
// import '@bit/smartworks.unity.unity-search-bar'

describe('search bar test', () => {
  // defaults
  const search = "search"
  const tagOne = "tag 1"
  const tagTwoLabel = "Tag 2"
  const tagTwoValue = "tag 2"
  const tagSeed = [{
    value: tagOne
  }, {
    label: tagTwoLabel,
    value: tagTwoValue
  }]
  const debounceTime = 100

  const makeOnChange = inj => ({tags, text}) => {
    inj.tags = tags
    inj.text = text
  }

  const first = 'first'
  const second = 'second'
  const third = 'third'

  it("should render", async () => {
    const el = await fixture('<unity-search-bar></unity-search-bar>')
    // for some reason, trying to check the content adds extra div's to the test-defined string.
    expect(el).to.exist
  })

  it("should have properties default correctly", async () => {
    const el = await fixture('<unity-search-bar></unity-search-bar>')
    expect(el.search).to.equal('')
    expect(el.tags).to.be.a('Map')
    expect(el.tags.size).to.equal(0)
    expect(el.tagSeed).to.be.an('Array')
    expect(el.tagSeed.length).to.equal(0)
    // expect(el.textSeed)
    expect(el.debounceTime).to.equal(300)

    expect(el._showOptions).to.be.false
    expect(el._currentOptions).to.be.an('array')
    expect(el._currentOptions.length).to.equal(0)
    expect(el._debouncedOnChange).to.be.a('function')
    expect(el._menuWidth).to.not.equal(0)
    expect(el._showPopover).to.be.false
    expect(el._excludedTags).to.be.an('array')
    expect(el._excludedTags.length).to.equal(0)
    expect(el._availableTags).to.be.a('map')
    expect(el._availableTags.size).to.equal(0)
    expect(el._oversized).to.be.false
    expect(el._ellipsisRight).to.not.equal(0)
  })

  it("should set search and pass to unity-text-input", async () => {
    const el = await fixture(`<unity-search-bar search="${search}"></unity-search-bar>`)
    const input = el.shadowRoot.querySelector('div#search-bar div.input-wrapper unity-text-input.input')
    expect(el.search).to.equal(search)
    expect(input.value).to.equal(search)
  })

  it("should update search when unity-text-input changes", async () => {
    let ref = {}
    const onChange = makeOnChange(ref)
    const el = await fixture(html`<unity-search-bar .search="${first}" .onChange="${onChange}" .debounceTime="${debounceTime}"></unity-search-bar>`)
    const unityTextInput = el.shadowRoot.querySelector('div#search-bar div.input-wrapper unity-text-input.input')
    const ironInput = unityTextInput.shadowRoot.querySelector('iron-input.input-wrapper')
    const input = unityTextInput.shadowRoot.querySelector('input#input')

    const inputEventName = 'input'
    const inputEvent = new Event(inputEventName)
    const listener = oneEvent(el, inputEventName)
    const doneEventName = 'done'
    const doneEvent = new Event(doneEventName)

    expect(el.search).to.equal(first)
    expect(input.value).to.equal(first)
    expect(ironInput.bindValue).to.equal(first)

    ironInput.dispatchEvent(inputEvent)
    input.value = second
    ironInput.dispatchEvent(inputEvent)
    setTimeout(() => el.dispatchEvent(doneEvent), debounceTime)
    await oneEvent(el, doneEventName)

    expect(el.search).to.equal(second)
    expect(ref.text).to.equal(second)
  })

  it("should debounce for the given debounceTime", async () => {
    const longerDebounce = 500
    const ref = {}
    const onChange = makeOnChange(ref)
    const el = await fixture(html`<unity-search-bar search="${first}" debounceTime="${debounceTime}" .onChange="${onChange}"></unity-search-bar>`)
    const unityTextInput = el.shadowRoot.querySelector('div#search-bar div.input-wrapper unity-text-input.input')
    const ironInput = unityTextInput.shadowRoot.querySelector('iron-input.input-wrapper')
    const input = unityTextInput.shadowRoot.querySelector('input#input')

    const inputEventName = 'input'
    const inputEvent = new Event(inputEventName)
    const listener = oneEvent(el, inputEventName)
    const doneEventName = 'done'
    const doneEvent = new Event(doneEventName)

    expect(ref.text).to.be.undefined
    ironInput.dispatchEvent(inputEvent)
    expect(ref.text).to.be.undefined
    setTimeout(() => el.dispatchEvent(doneEvent), debounceTime)
    await oneEvent(el, doneEventName)
    expect(ref.text).to.equal(first)

    el.debounceTime = longerDebounce
    input.value = second
    ironInput.dispatchEvent(inputEvent)
    expect(ref.text).to.equal(first)
    setTimeout(() => el.dispatchEvent(doneEvent), debounceTime)
    await oneEvent(el, doneEventName)
    expect(ref.text).to.equal(first)
    setTimeout(() => el.dispatchEvent(doneEvent), longerDebounce - debounceTime)
    await oneEvent(el, doneEventName)
    expect(ref.text).to.equal(second)
  })

  it("should take tags array and convert to map", async () => {
    const el = await fixture(html`<unity-search-bar .tags="${tagSeed}" ></unity-search-bar>`)
    expect(el.tags.size).to.equal(2)
    expect(el.tags.get(tagOne)).to.deep.equal({value: tagOne})
    expect(el.tags.get(tagTwoValue)).to.deep.equal({value: tagTwoValue, label: tagTwoLabel})
  })

  it("should add tag values and labels to _excludedTags", async () => {
    const el = await fixture(html`<unity-search-bar .tags="${tagSeed}"></unity-search-bar>`)
    expect(el._excludedTags).to.deep.equal([tagOne, tagTwoValue, tagTwoLabel])
  })

  it("should have tagSeed array", async () => {
    const el = await fixture(html`<unity-search-bar .tagSeed="${tagSeed}" ></unity-search-bar>`)
    expect(el.tagSeed).to.deep.equal(tagSeed)
  })

  it("should add tagSeed to _availableTags as map", async () => {
    const el = await fixture(html`<unity-search-bar .tagSeed="${tagSeed}" ></unity-search-bar>`)
    expect(el._availableTags.get(tagOne)).to.deep.equal({ value: tagOne })
    expect(el._availableTags.get(tagTwoValue)).to.deep.equal({value: tagTwoValue, label: tagTwoLabel})
  })

  it("should update _debouncedOnChange when passing onChange", async () => {
    const el = await fixture(html`<unity-search-bar></unity-search-bar>`)
    const orgDebounced = el._debouncedOnChange
    el.onChange = ()=>{}
    expect(el._debouncedOnChange).to.not.equal(orgDebounced)
  })

  it("should update _debouncedOnChange when passing debounceTime", async () => {
    const el = await fixture(html`<unity-search-bar></unity-search-bar>`)
    const orgDebounced = el._debouncedOnChange
    el.debounceTime = 500
    expect(el._debouncedOnChange).to.not.equal(orgDebounced)
  })

  it("should have _excludedTags be array of tags", async() => {
    const el = await fixture(html`<unity-search-bar .tags="${tagSeed}"></unity-search-bar>`)
    expect(el._excludedTags.includes(tagOne)).to.be.true
    expect(el._excludedTags.includes(tagTwoLabel)).to.be.true
    expect(el._excludedTags.includes(tagTwoValue)).to.be.true
  })

  it("should return correct tag option for one match", async () => {
    const el = await fixture(html`<unity-search-bar .tagSeed="${tagSeed}" search="1" ></unity-search-bar>`)
    const tagMatches = el._currentOptions.tags
    expect(tagMatches.length).to.equal(1)
    expect(tagMatches[0].value).to.equal(tagOne)
    expect(tagMatches[0].value).to.not.equal(tagTwoValue)
  })

  it("should return correct tag options for multiple matches", async () => {
    const el = await fixture(html`<unity-search-bar .tagSeed="${tagSeed}" search="t" ></unity-search-bar>`)
    const tagMatches = el._currentOptions.tags
    expect(tagMatches.length).to.equal(2)
    expect(tagMatches[0].value).to.equal(tagOne)
    expect(tagMatches[1].value).to.equal(tagTwoValue)
  })

  it("should return correct tag options for no matches", async () => {
    const el = await fixture(html`<unity-search-bar .tagSeed="${tagSeed}" search="x" ></unity-search-bar>`)
    const tagMatches = el._currentOptions.tags
    expect(tagMatches.length).to.equal(0)
  })
})

/*

it("should", async () => {
  const el = await fixture(html`<unity-search-bar></unity-search-bar>`)
})

*/
