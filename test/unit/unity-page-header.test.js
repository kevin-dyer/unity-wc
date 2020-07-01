import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-layout/unity-page-header'

describe('page header test', () => {

  const tabLabelOne = "tab label one"
  const tabLabelTwo = "tab label two"
  const tabLabelThree = "tab label three"
  const tabLabelFour = "tab label four"
  const testTabs = [{label: tabLabelOne}, {label: tabLabelTwo}, {label: tabLabelThree}, {label: tabLabelFour}]
  const makeOnClick = injector => value => {
    injector.value = value
  }

  it('should render', async () => {
    const el = await fixture('<unity-page-header></unity-page-header>')
    expect(el).shadowDom.to.equal('<div class="bottom"><div id="header"><div id="left-wrapper"><slot name="left-content" class="left-container"></slot><slot name="center-content" class="center-container"><unity-typography size="header1" id="title"></unity-typography></slot></div><div class="button-container"><slot name="left-action" class="left-action"></slot><iron-icon icon="unity:minus" class="separator hide"></iron-icon><slot name="right-action" class="right-action"></slot></div></div></div>')
  })

  it('should have a title header', async () => {
    const titleText = 'title'
    const el = await fixture(`<unity-page-header header="${titleText}"></unity-page-header>`)
    const title = el.shadowRoot.querySelector('div.bottom div#header div#left-wrapper slot.center-container unity-typography#title')
    expect(title).to.exist
    expect(title.size).to.equal('header1')
    expect(title.innerText).to.equal(titleText)
  })

  it('should have left-content if slotted', async () => {
    const leftText = "Left Text"
    const leftContentHTML = `<div id="left-content" slot="left-content">${leftText}</div>`
    const el = await fixture(`<unity-page-header>${leftContentHTML}</unity-page-header>`)
    const slot = el.shadowRoot.querySelector('slot.left-container')
    const leftContent = slot.assignedElements()[0]
    expect(leftContent).to.exist
    expect(leftContent.slot).to.equal("left-content")
    expect(leftContent.innerText).to.equal(leftText)
  })

  it('should have left-action if slotted', async () => {
    const leftText = "Left Text"
    const leftActionHTML = `<div id="left-action" slot="left-action">${leftText}</div>`
    const el = await fixture(`<unity-page-header>${leftActionHTML}</unity-page-header>`)
    const slot = el.shadowRoot.querySelector('slot.left-action')
    const leftAction = slot.assignedElements()[0]
    expect(leftAction).to.exist
    expect(leftAction.slot).to.equal("left-action")
    expect(leftAction.innerText).to.equal(leftText)
  })

  it('should have right-action if slotted', async () => {
    const rightText = "Right Text"
    const rightActionHTML = `<div id="right-action" slot="right-action">${rightText}</div>`
    const el = await fixture(`<unity-page-header>${rightActionHTML}</unity-page-header>`)
    const slot = el.shadowRoot.querySelector('slot.right-action')
    const rightAction = slot.assignedElements()[0]
    expect(rightAction).to.exist
    expect(rightAction.slot).to.equal("right-action")
    expect(rightAction.innerText).to.equal(rightText)
  })

  it('should have center-content if slotted', async () => {
    const centerText = "Center Text"
    const centerContentHTML = `<div id="center-content" slot="center-content">${centerText}</div>`
    const el = await fixture(`<unity-page-header>${centerContentHTML}</unity-page-header>`)
    const slot = el.shadowRoot.querySelector('slot.center-container')
    const centerContent = slot.assignedElements()[0]
    expect(centerContent).to.exist
    expect(centerContent.slot).to.equal("center-content")
    expect(centerContent.innerText).to.equal(centerText)
  })

  it('should show tabs if given tabs', async () => {
    const el = await fixture(html`<unity-page-header .tabs="${testTabs}"></unity-page-header>`)
    const tabs = el.shadowRoot.querySelector('paper-tabs#header-tabs')
    expect(tabs).to.exist
  })

  it('should render a tab for each given', async () => {
    const el = await fixture(html`<unity-page-header .tabs="${testTabs}"></unity-page-header>`)
    const tabs = el.shadowRoot.querySelector('paper-tabs#header-tabs')
    expect(tabs).to.exist
    expect(tabs.children.length).to.equal(testTabs.length)
    expect(tabs.children[0].innerText).to.equal(tabLabelOne)
    expect(tabs.children[1].innerText).to.equal(tabLabelTwo)
    expect(tabs.children[2].innerText).to.equal(tabLabelThree)
    expect(tabs.children[3].innerText).to.equal(tabLabelFour)
  })

  it('should default selectedTab to tab first tab', async () => {
    const el = await fixture(html`<unity-page-header .tabs="${testTabs}"></unity-page-header>`)
    const tabs = el.shadowRoot.querySelector('paper-tabs#header-tabs')
    expect(tabs).to.exist
    expect(tabs.children.length).to.equal(testTabs.length)
    expect(tabs.children[0].className).to.equal("iron-selected")
    expect(tabs.children[1].className).to.not.equal("iron-selected")
    expect(tabs.children[2].className).to.not.equal("iron-selected")
    expect(tabs.children[3].className).to.not.equal("iron-selected")
  })

  it('should select given selectedTab', async () => {
    const selectedTab = Math.floor(Math.random()*4)
    const el = await fixture(html`<unity-page-header .selectedTab="${selectedTab}" .tabs="${testTabs}"></unity-page-header>`)
    const tabs = el.shadowRoot.querySelector('paper-tabs#header-tabs')
    expect(tabs).to.exist
    expect(tabs.children.length).to.equal(testTabs.length)
    expect(tabs.children[selectedTab].className).to.equal("iron-selected")
  })

  it('should call onTabSelect when tab is clicked', async () => {
    const tabToClick = Math.floor(Math.random()*3) + 1
    let ref = {}
    const onTabSelect = makeOnClick(ref)

    const el = await fixture(html`<unity-page-header .tabs="${testTabs}" .onTabSelect="${onTabSelect}"></unity-page-header>`)
    const tabs = el.shadowRoot.querySelector('paper-tabs#header-tabs')
    const firstTab = tabs.children[0]
    const targetTab = tabs.children[tabToClick]

    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(targetTab, eventName)

    expect(firstTab.className).to.equal("iron-selected")
    expect(targetTab.className).to.not.equal("iron-selected")

    targetTab.dispatchEvent(event)
    await listener

    expect(firstTab.className).to.not.equal("iron-selected")
    expect(targetTab.className).to.equal("iron-selected")
  })

})
