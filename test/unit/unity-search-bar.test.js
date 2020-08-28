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
  const debouncetime = 300

  const makeOnChange = inj => ({tags, text}) => {
    inj.tags = tags
    inj.text = text
  }

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

})

/*

it("should", async () => {
  const el = await fixture(html`<unity-search-bar></unity-search-bar>`)
})

*/
