import { fixture, expect, oneEvent } from '@open-wc/testing';
import '../../src/components/unity-layout/unity-split-pane';

describe('split pane test', () => {
  it('renders close button in pane when closeButton property is set', async () => {
    const el = await fixture('<unity-split-pane show closeButton></unity-split-pane>')
    const closeButton = el.shadowRoot.querySelector('.close-button')
    expect(closeButton).to.exist
  });

  it('renders collapse button only when pane is shown', async () => {
    const paneHidden = await fixture('<unity-split-pane></unity-split-pane>')
    let collapseButton = paneHidden.shadowRoot.querySelector('.collapse-button')
    expect(collapseButton).to.be.null

    const paneShown = await fixture('<unity-split-pane show></unity-split-pane>')
    collapseButton = paneShown.shadowRoot.querySelector('.collapse-button') 
    expect(collapseButton).to.exist
  });

  it('renders collapsed bar when collapse button is clicked', async () => {
    const el = await fixture('<unity-split-pane show></unity-split-pane>')
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

  it('expands main pane when collapsed bar is clicked', async () => {
    const el = await fixture('<unity-split-pane collapsed></unity-split-pane>')
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

  it('expands main pane when close button is clicked', async () => {
    const el = await fixture('<unity-split-pane show collapsed closeButton></unity-split-pane>')
    const listener = oneEvent(el, 'click')
    const splitPaneWrapper = el.shadowRoot.querySelector('.wrapper')
    expect(splitPaneWrapper).to.have.class('hide')

    const closeButton = el.shadowRoot.querySelector('.close-button')
    closeButton.click()
    await listener
    expect(splitPaneWrapper).not.to.have.class('hide')

  });
});
