/* eslint-disable no-unused-expressions */
import { fixture, expect } from '@open-wc/testing';

import '@bit/smartworks.unity.unity-button'


describe('button test', () => {
  it('has by default an empty string as label', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    expect(el.label).to.equal('');
  });

  it('paper button has class primary when button type is set to primary', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button type="primary"></unity-button>'));
    const paperButton = el.shadowRoot.querySelector('paper-button')
    expect(paperButton.className).to.include('primary');
  });

  it('paper button has class secondary when button type is set to secondary', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button type="secondary"></unity-button>'));
    const paperButton = el.shadowRoot.querySelector('paper-button')
    expect(paperButton.className).to.include('secondary');
  });

  it('paper button has class borderless when button type is set to borderless', async () => {
    const el = /** @type {A11yInput} */ (await fixture('<unity-button type="borderless"></unity-button>'));
    const paperButton = el.shadowRoot.querySelector('paper-button')
    expect(paperButton.className).to.include('borderless');
  });

  it('disable button', async () => {
    const disabledEl = /** @type {A11yInput} */ (await fixture('<unity-button disabled></unity-button>'));
    const notDisabledEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const paperButtonDisabled = disabledEl.shadowRoot.querySelector('paper-button')
    const paperButtonNotDisabled = notDisabledEl.shadowRoot.querySelector('paper-button')
    expect(paperButtonDisabled.disabled).to.equal(true);
    expect(paperButtonNotDisabled.disabled).to.equal(false);
  });

  it('important set properly', async () => {
    const importantEl = /** @type {A11yInput} */ (await fixture('<unity-button important></unity-button>'));
    const notImportantEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const paperButtonImportant = importantEl.shadowRoot.querySelector('paper-button')
    const paperButtonNotImportant = notImportantEl.shadowRoot.querySelector('paper-button')
    expect(paperButtonImportant.className).to.include('important');
    expect(paperButtonNotImportant.className).to.not.include('important');
  });

  it('spinner element is rendered when button set to loading', async () => {
    const loadingEl = /** @type {A11yInput} */ (await fixture('<unity-button loading></unity-button>'));
    const notLoadingEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const spinner = loadingEl.shadowRoot.querySelector('.spinner')
    const noSpinner = notLoadingEl.shadowRoot.querySelector('.spinner')
    expect(spinner).to.exist
    expect(noSpinner).to.be.null
  });

  it('right icon is rendered when property set', async () => {
    const rightIconEl = /** @type {A11yInput} */ (await fixture('<unity-button rightIcon="unity:down"></unity-button>'));
    const noRightIconEl = /** @type {A11yInput} */ (await fixture('<unity-button></unity-button>'));
    const rightIcon = rightIconEl.shadowRoot.querySelector('.right-icon')
    const noRightIcon = noRightIconEl.shadowRoot.querySelector('.right-icon')
    expect(rightIcon).to.exist
    expect(noRightIcon).to.be.null
  });

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
