/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing';

import '../../src/components/unity-icon/unity-icon'

describe('unity-icon', () => {
  it('sets the right icon', async () => {
    const el = await fixture('<unity-icon icon="unity:download"></unity-icon>');
    const ironIcon = el.shadowRoot.querySelector('iron-icon');
    expect(ironIcon.icon).to.equal('unity:download');
  });
});
