/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing'
import '../../src/components/unity-tooltip/unity-tooltip'

describe('tooltip test', () => {
  it('without arrow', async () => {
    const el = await fixture('<unity-tooltip label="hi" hideArrow><div>Hover</div></unity-tooltip>');
    expect(el).shadowDom.to.equal('<div class="tooltip-container"><slot></slot><span class="right-align tooltip"><unity-typography size="paragraph">hi</unity-typography></span>');
  });
});

describe('tooltip test', () => {
  it('with arrow', async () => {
    const el = await fixture('<unity-tooltip label="hi"></unity-tooltip>');
    const span = el.shadowRoot.querySelector('span')
    expect(span.className).to.include('arrow left-arrow right-align');
  });
});

describe('unity-tooltip', () => {
  it('should have right-align class added', async () => {
    const el = await fixture('<unity-tooltip label="hi" alignment="right"></unity-tooltip>');
    const span = el.shadowRoot.querySelector('span')
    expect(span.className).to.include('right-align');
  });
  it('should have bottom-align class added', async () => {
    const el = await fixture('<unity-tooltip label="hi" alignment="bottom"></unity-tooltip>');
    const span = el.shadowRoot.querySelector('span')
    expect(span.className).to.include('bottom-align');
  });
});