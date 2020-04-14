import { fixture, expect, oneEvent } from '@open-wc/testing';
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-layout/unity-split-pane';

describe('split pane test', () => {
  const makeOnChange = injector => value => {
    injector.value = value
  }

  it('renders close button in pane when closeButton property is set', async () => {
    const el = await fixture('<unity-split-pane show closeButton></unity-split-pane>')
    const closeButton = el.shadowRoot.querySelector('.close-button')
    expect(closeButton).to.exist
  });

  it('renders collapse button in header when collapseButton property is set', async () => {
    const el = await fixture('<unity-split-pane show collapseButton></unity-split-pane>')
    const collapseButton = el.shadowRoot.querySelector('.collapse-button')
    expect(collapseButton).to.exist
  });

  it('renders collapse button only when pane is shown', async () => {
    const paneHidden = await fixture('<unity-split-pane collapseButton></unity-split-pane>')
    let collapseButton = paneHidden.shadowRoot.querySelector('.collapse-button')
    expect(collapseButton).to.be.null

    const paneShown = await fixture('<unity-split-pane show collapseButton></unity-split-pane>')
    collapseButton = paneShown.shadowRoot.querySelector('.collapse-button')
    expect(collapseButton).to.exist
  });

  it('renders collapsed bar when collapse button is clicked', async () => {
    const el = await fixture('<unity-split-pane show collapseButton></unity-split-pane>')
    const collapseButton = el.shadowRoot.querySelector('.collapse-button')
    let splitPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    let collapsedBar = el.shadowRoot.querySelector('.bar')
    const listener = oneEvent(el, 'click')
    expect(splitPaneWrapper).not.to.have.class('hide')
    expect(collapsedBar).to.be.null

    collapseButton.click()
    await listener
    collapsedBar = el.shadowRoot.querySelector('.bar')
    expect(splitPaneWrapper).to.have.class('hide')
    expect(collapsedBar).to.exist
  });

  it('should only collapse when pane is showing', async () => {
    let el = await fixture('<unity-split-pane collapsed></unity-split-pane>')
    let collapsedBar = el.shadowRoot.querySelector('.bar')
    let splitPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(collapsedBar).to.not.exist
    expect(splitPaneWrapper).to.not.have.class('hide')

    el = await fixture('<unity-split-pane collapsed show></unity-split-pane>')
    collapsedBar = el.shadowRoot.querySelector('.bar')
    splitPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(collapsedBar).to.exist
    expect(splitPaneWrapper).to.have.class('hide')
  });

  it('expands main pane when collapsed bar is clicked', async () => {
    const el = await fixture('<unity-split-pane collapsed show></unity-split-pane>')
    const listener = oneEvent(el, 'click')
    let collapsedBar = el.shadowRoot.querySelector('.bar')
    let splitPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(collapsedBar).to.exist
    expect(splitPaneWrapper).to.have.class('hide')

    collapsedBar.click()
    await listener
    collapsedBar = el.shadowRoot.querySelector('.bar')
    expect(splitPaneWrapper).not.to.have.class('hide')
    expect(collapsedBar).to.be.null

  });

  it('expands main pane when close pane button is clicked', async () => {
    const el = await fixture('<unity-split-pane show collapsed closeButton></unity-split-pane>')
    const listener = oneEvent(el, 'click')
    const closeButton = el.shadowRoot.querySelector('.close-button')
    let splitPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(splitPaneWrapper).to.have.class('hide')
    closeButton.click()
    await listener
    expect(splitPaneWrapper).not.to.have.class('hide')
  });

  it('mousedown handler should set starting position properly', async () => {
    const el = await fixture('<unity-split-pane show></unity-split-pane>')
    el.handleMouseDown({clientX: 500})
    expect(el._startingX).to.equal(500)
  });

  it('mousemove handler should set pane width properly', async () => {
    const el = await fixture('<unity-split-pane style="width:1000px;" panewidth=50 show></unity-split-pane>')
    el._startingX = 500
    el.handleMouseMove({clientX: 450})
    expect(Math.round(el.paneWidth)).to.equal(55)
  });

  it('clip pane function should keep value in the 20-80 range', async () => {
    const el = await fixture('<unity-split-pane></unity-split-pane>')
    expect(el._clipPaneWidth(90)).to.equal(80)
    expect(el._clipPaneWidth(10)).to.equal(20)
    expect(el._clipPaneWidth(50)).to.equal(50)
  });

  // onClose and onCollapseChange tests
  it(`should call onClose when the pane is closed`, async () => {
    let ref = {}
    const onClose = makeOnChange(ref)

    const el = await fixture(html`<unity-split-pane show collapsed closeButton .onClose="${onClose}"></unity-split-pane>`)
    const listener = oneEvent(el, 'click')
    const closeButton = el.shadowRoot.querySelector('.close-button')

    closeButton.click()
    await listener
    expect(ref.value).to.equal(50)
  })

  it(`should call onCollapseToggle when the main area is collapse or expanded`, async () => {
    let ref = {}
    const onCollapseChange = makeOnChange(ref)

    const el = await fixture(html`<unity-split-pane show collapseButton .onCollapseChange="${onCollapseChange}"></unity-split-pane>`)
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
});
