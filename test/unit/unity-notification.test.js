import { fixture, html, expect, oneEvent } from '@open-wc/testing'
import { spy } from 'sinon'
import '../../src/components/unity-notification/unity-notification'

function cleanHtml(text) {
  text = text.replace(/(\s+$)|(^\s+)|\n|\t|(<!---->)/g, '')
  return text
}

describe('unity-notification', () => {

  it('sets content from text property', async () => {
    const el = await fixture('<unity-notification text="hi"></unity-notification>');
    const text = el.shadowRoot.querySelector('.main-text unity-typography');
    const cleanedText = cleanHtml(text.innerHTML);
    expect(cleanedText).to.equal('hi');
  });

  it('sets content from subtext property', async () => {
    const el = await fixture('<unity-notification subtext="hi"></unity-notification>');
    const text = el.shadowRoot.querySelector('.subtext unity-typography');
    const cleanedText = cleanHtml(text.innerHTML);
    expect(cleanedText).to.equal('hi');
  });

  it('sets content from icon property', async () => {
    const el = await fixture('<unity-notification icon="unity:share"></unity-notification>');
    const icon = el.shadowRoot.querySelector('unity-icon');
    expect(icon.icon).to.equal('unity:share');
  });

  it('calls onClose function when close button is clicked', async () => {
    const handleClose = spy()
    const el = await fixture(html`<unity-notification .onClose=${handleClose}></unity-notification>`);
    el.shadowRoot.querySelector('unity-button').click()
    expect(handleClose).to.have.been.called
  });
})