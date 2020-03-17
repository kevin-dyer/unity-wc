/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing';
import '../../src/components/unity-tooltip/unity-tooltip';

describe('tooltip test', () => {
  it('without arrow', async () => {
    const el = await fixture('<unity-tooltip label="hi"></unity-tooltip>');
    expect(el).shadowDom.to.equal('<span class="tooltip"><unity-typography size="paragraph">hi</unity-typography></span>');
  });
});

describe('tooltip test', () => {
  it('with arrow', async () => {
    const el = await fixture('<unity-tooltip arrow="bottom" label="hi"></unity-tooltip>');
    const span = el.shadowRoot.querySelector('span')
    expect(span.className).to.include('arrow bottom');
  });
});