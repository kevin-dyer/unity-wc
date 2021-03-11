import { fixture, expect, oneEvent } from '@open-wc/testing';
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-layout/unity-multi-pane';

describe('multi pane test', () => {
  const makeOnChange = injector => value => {
    injector.value = value
  }
  const firstKey = "first"
  const secondKey = "second"
  const firstElem = html`<div slot="${firstKey}">${firstKey}</div>`
  const secondElem = html`<div slot="${secondKey}">${secondKey}</div>`

  it('renders close button in pane when closeButton property is set', async () => {
    const el = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey, secondKey]}" closeButton>${firstElem}${secondElem}</unity-multi-pane>`)
    const closeButton = el.shadowRoot.querySelector('.close-button')
    expect(closeButton).to.exist
  });

  it('renders collapse button in header when collapseButton property is set', async () => {
    const el = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey, secondKey]}" collapseButton>${firstElem}${secondElem}</unity-multi-pane>`)
    const collapseButton = el.shadowRoot.querySelector('.collapse-button')
    expect(collapseButton).to.exist
  });

  it('renders collapse button both when pane is shown and when hidden', async () => {
    const paneHidden = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey]}" collapseButton>${firstElem}${secondElem}</unity-multi-pane>`)
    let collapseButton = paneHidden.shadowRoot.querySelector(`#${firstKey} .collapse-button`)
    expect(collapseButton).to.exist

    const paneShown = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey, secondKey]}" collapseButton>${firstElem}${secondElem}</unity-multi-pane>`)
    collapseButton = paneShown.shadowRoot.querySelector(`#${firstKey} .collapse-button`)
    expect(collapseButton).to.exist
  });

  it('renders collapsed bar when collapse button is clicked', async () => {
    const el = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey, secondKey]}" collapseButton>${firstElem}${secondElem}</unity-multi-pane>`)
    const collapseButton = el.shadowRoot.querySelector(`#${firstKey} .collapse-button`)
    let multiPaneContent = el.shadowRoot.querySelector(`#${firstKey} .content`)
    let collapsedBar = el.shadowRoot.querySelector(`#${firstKey} .bar`)
    const listener = oneEvent(el, 'click')
    expect(multiPaneContent).not.to.have.class('hide')
    expect(collapsedBar).to.be.null

    collapseButton.click()
    await listener
    multiPaneContent = el.shadowRoot.querySelector(`#${firstKey} .content`)
    collapsedBar = el.shadowRoot.querySelector(`#${firstKey} .bar`)
    expect(multiPaneContent).to.have.class('hide')
    expect(collapsedBar).to.exist
  });

  it('should only collapse when pane is showing', async () => {
    let el = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey]}" .collapsedPanes="${[firstKey]}" collapseButton>${firstElem}${secondElem}</unity-multi-pane>`)
    let collapsedBar = el.shadowRoot.querySelector('.bar')
    let multiPaneContent = el.shadowRoot.querySelector(`#${firstKey} .content`)
    expect(collapsedBar).to.not.exist
    expect(multiPaneContent).to.not.have.class('hide')

    el = await fixture(html`<unity-multi-pane .visiblePanes="${[firstKey, secondKey]}" .collapsedPanes="${[firstKey]}" collapseButton>${firstElem}${secondElem}</unity-multi-pane>`)
    collapsedBar = el.shadowRoot.querySelector('.bar')
    multiPaneContent = el.shadowRoot.querySelector(`#${firstKey} .content`)
    expect(collapsedBar).to.exist
    expect(multiPaneContent).to.have.class('hide')
  });

  /*
  it('expands main pane when collapsed bar is clicked', async () => {
    const el = await fixture('<unity-multi-pane collapsed show></unity-multi-pane>')
    const listener = oneEvent(el, 'click')
    let collapsedBar = el.shadowRoot.querySelector('.bar')
    let multiPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(collapsedBar).to.exist
    expect(multiPaneWrapper).to.have.class('hide')

    collapsedBar.click()
    await listener
    collapsedBar = el.shadowRoot.querySelector('.bar')
    expect(multiPaneWrapper).not.to.have.class('hide')
    expect(collapsedBar).to.be.null

  });

  it('expands main pane when close pane button is clicked', async () => {
    const el = await fixture('<unity-multi-pane show collapsed closeButton></unity-multi-pane>')
    const listener = oneEvent(el, 'click')
    const closeButton = el.shadowRoot.querySelector('.close-button')
    let multiPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(multiPaneWrapper).to.have.class('hide')
    closeButton.click()
    await listener
    expect(multiPaneWrapper).not.to.have.class('hide')
  });

  it('mousedown handler should set starting position properly', async () => {
    const el = await fixture('<unity-multi-pane show></unity-multi-pane>')
    el.handleMouseDown({clientX: 500})
    expect(el._startingX).to.equal(500)
  });

  it('mousemove handler should set pane width properly', async () => {
    const el = await fixture('<unity-multi-pane style="width:1000px;" panewidth=50 show></unity-multi-pane>')
    el._startingX = 500
    el.handleMouseMove({clientX: 450})
    expect(Math.round(el.paneWidth)).to.equal(55)
  });

  it('clip pane function should keep value in the 20-80 range', async () => {
    const el = await fixture('<unity-multi-pane></unity-multi-pane>')
    expect(el._clipPaneWidth(90)).to.equal(80)
    expect(el._clipPaneWidth(10)).to.equal(20)
    expect(el._clipPaneWidth(50)).to.equal(50)
  });

  // onClose and onCollapseChange tests
  it(`should call onClose when the pane is closed`, async () => {
    let ref = {}
    const onClose = makeOnChange(ref)

    const el = await fixture(html`<unity-multi-pane show collapsed closeButton .onClose="${onClose}"></unity-multi-pane>`)
    const listener = oneEvent(el, 'click')
    const closeButton = el.shadowRoot.querySelector('.close-button')

    closeButton.click()
    await listener
    expect(ref.value).to.equal(50)
  })

  it(`should call onCollapseToggle when the main area is collapse or expanded`, async () => {
    let ref = {}
    const onCollapseChange = makeOnChange(ref)

    const el = await fixture(html`<unity-multi-pane show collapseButton .onCollapseChange="${onCollapseChange}"></unity-multi-pane>`)
    const listener = oneEvent(el, 'click')
    const collapseButton = el.shadowRoot.querySelector('.collapse-button')

    collapseButton.click()
    await listener
    expect(ref.value).to.equal(true)

    const expandBar = el.shadowRoot.querySelector('.bar')
    expandBar.click()
    await listener
    expect(ref.value).to.equal(false)
  })
  */
});
