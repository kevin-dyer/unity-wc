/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing'
import '../../src/components/unity-progress/unity-progress'

function cleanHtml(text) {
  // text = text.replace(/\s|\n|\t/g, '')
  text = text.replace(/(\s+$)|(^\s+)|\n|\t/g, '')
  return text
}
describe('unity-progress', () => {

  describe('completion', () => {
    it('does not render when unset', async () => {
      const el = await fixture('<unity-progress></unity-progress>');
      const completion = el.shadowRoot.querySelector('.completion');
      expect(completion).to.not.exist;
    });
    it('displays right percentage text properly', async () => {
      const el = await fixture('<unity-progress completionType="percentage" value=2 max=4></unity-progress>');
      const percentage = el.shadowRoot.querySelector('.completion-text');
      const cleanedText = cleanHtml(percentage.innerHTML);
      expect(cleanedText).to.equal('50 %');
    });
    it('displays right ratio text', async () => {
      const el = await fixture('<unity-progress completionType="ratio" value=2 max=4></unity-progress>');
      const ratio = el.shadowRoot.querySelector('.completion-text');
      const cleanedText = cleanHtml(ratio.innerHTML);
      expect(cleanedText).to.equal('2 / 4');
    });
  }),

  describe('label', () => {
    it('does not render when unset', async () => {
      const el = await fixture('<unity-progress></unity-progress>');
      const label = el.shadowRoot.querySelector('.label');
      expect(label).to.not.exist;
    });
    it('displays right text', async () => {
      const labelText = "Label";
      const el = await fixture(`<unity-progress label=${labelText}></unity-progress>`);
      const label = el.shadowRoot.querySelector('.label');
      const cleanedText = cleanHtml(label.innerHTML);
      expect(cleanedText).to.equal(labelText);
    });
  })

  describe('remark', () => {
    it('does not render when unset', async () => {
      const el = await fixture('<unity-progress></unity-progress>');
      const remark = el.shadowRoot.querySelector('.remark');
      expect(remark).to.not.exist;
    });
    it('displays right text', async () => {
      const remarkText = "Remark";
      const el = await fixture(`<unity-progress remark=${remarkText}></unity-progress>`);
      const remark = el.shadowRoot.querySelector('.remark');
      const cleanedText = cleanHtml(remark.innerHTML);
      expect(cleanedText).to.equal(remarkText);
    });
  })
});
