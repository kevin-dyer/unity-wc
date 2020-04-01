/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing';

import '@bit/smartworks.unity.unity-button'


describe('button test', () => {
  it('has by default an empty string as label', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    expect(el.label).to.equal('');
  });
});


describe('button test', () => {
  it('paper button has class solid when button type is set to solid', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button type="solid"></unity-button>'));
    const paperButton = el.shadowRoot.querySelector('paper-button')
    expect(paperButton.className).to.include('solid');
  });
});


describe('button test', () => {
  it('paper button has class gradient when button type is set to gradient', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button type="gradient"></unity-button>'));
    const paperButton = el.shadowRoot.querySelector('paper-button')
    expect(paperButton.className).to.include('gradient');
  });
});

describe('button test', () => {
  it('paper button has class outlined when button type is set to outlined', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button type="outlined"></unity-button>'));
    const paperButton = el.shadowRoot.querySelector('paper-button')
    expect(paperButton.className).to.include('outlined');
  });
});

describe('button test', () => {
  it('disable button', async () => {
    const disabledEl = /** @type {A11yInput} */ (await fixture('<unity-button disabled></unity-button>'));
    const notDisabledEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const paperButtonDisabled = disabledEl.shadowRoot.querySelector('paper-button')
    const paperButtonNotDisabled = notDisabledEl.shadowRoot.querySelector('paper-button')
    expect(paperButtonDisabled.disabled).to.equal(true);
    expect(paperButtonNotDisabled.disabled).to.equal(false);
  });
});

describe('button test', () => {
  it('danger set properly', async () => {
    const dangerEl = /** @type {A11yInput} */ (await fixture('<unity-button danger></unity-button>'));
    const notDangerEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const paperButtonDanger = dangerEl.shadowRoot.querySelector('paper-button')
    const paperButtonNotDanger = notDangerEl.shadowRoot.querySelector('paper-button')
    expect(paperButtonDanger.className).to.include('danger');
    expect(paperButtonNotDanger.className).to.not.include('danger');
  });
});

describe('button test', () => {
  it('small set properly', async () => {
    const smallEl = /** @type {A11yInput} */ (await fixture('<unity-button small></unity-button>'));
    const notSmallEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const paperButtonSmall = smallEl.shadowRoot.querySelector('paper-button')
    const paperButtonNotSmall = notSmallEl.shadowRoot.querySelector('paper-button')
    expect(paperButtonSmall.className).to.include('small');
    expect(paperButtonNotSmall.className).to.not.include('small');
  });
});

describe('button test', () => {
  it('spinner element is rendered when button set to loading', async () => {
    const loadingEl = /** @type {A11yInput} */ (await fixture('<unity-button loading></unity-button>'));
    const notLoadingEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const spinner = loadingEl.shadowRoot.querySelector('.spinner')
    const noSpinner = notLoadingEl.shadowRoot.querySelector('.spinner')
    expect(spinner).to.exist
    expect(noSpinner).to.be.null
  });
});

describe('button test', () => {
  it('right icon is rendered when property set', async () => {
    const rightIconEl = /** @type {A11yInput} */ (await fixture('<unity-button rightIcon="unity:down"></unity-button>'));
    const noRightIconEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const rightIcon = rightIconEl.shadowRoot.querySelector('.right-icon')
    const noRightIcon = noRightIconEl.shadowRoot.querySelector('.right-icon')
    expect(rightIcon).to.exist
    expect(noRightIcon).to.be.null
  });
});

describe('button test', () => {
  it('left icon is rendered when property set and not loading', async () => {
    const leftIconEl = /** @type {A11yInput} */ (await fixture('<unity-button leftIcon="unity:down"></unity-button>'));
    const leftIconLoadingEl = /** @type {A11yInput} */ (await fixture('<unity-button loading leftIcon="unity:down"></unity-button>'));
    const noLeftIconEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const leftIcon = leftIconEl.shadowRoot.querySelector('.left-icon')
    const noLeftIcon = noLeftIconEl.shadowRoot.querySelector('.left-icon')
    const leftIconLoading = leftIconLoadingEl.shadowRoot.querySelector('paper-spinner-lite.left-icon')
    expect(leftIcon).to.exist
    expect(noLeftIcon).to.be.null
    expect(leftIconLoading.className).to.include('spinner')
  });
});

describe('button test', () => {
  it('center icon is rendered when property set and not loading', async () => {
    const centerIconEl = /** @type {A11yInput} */ (await fixture('<unity-button centerIcon="unity:down"></unity-button>'));
    const centerIconLoadingEl = /** @type {A11yInput} */ (await fixture('<unity-button loading centerIcon="unity:down"></unity-button>'));
    const noCenterIconEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const centerIcon = centerIconEl.shadowRoot.querySelector('.center-icon')
    const noCenterIcon = noCenterIconEl.shadowRoot.querySelector('.center-icon')
    const centerIconLoading = centerIconLoadingEl.shadowRoot.querySelector('.center-icon')
    expect(centerIcon).to.exist
    expect(noCenterIcon).to.be.null
    expect(centerIconLoading).to.be.null

  });
});