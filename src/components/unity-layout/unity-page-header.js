import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import {UnityDefaultThemeStyles} from '@bit/smartworks.unity.unity-default-theme-styles';
import  '@bit/smartworks.unity.unity-typography';

/**
 * Displays a Top level Page Header.
 * @name UnityPageHeader
 * @param {''} title
 * @param {[]} tabs
 * @param {''} selectedTab
 * @returns {LitElement} returns a a class extended from LitElement
 * @example
 *  <unity-page-header
 *    title="MOCC2 Title"
 *    ?showBackBtn=${true}
 *    .tabs=${[
 *      {
 *        label: 'Users',
 *        onClick: (e) => {
 *          console.log("Users tab clicked")
 *        }
 *      },
 *      {
 *        label: 'Rules',
 *        onClick: (e) => {
 *          console.log("Rules tab clicked")
 *        }
 *      },
 *      {
 *        label: 'API Keys',
 *        onClick: (e) => {
 *          console.log("API Keys tab clicked")
 *        }
 *      }
 *    ]}
 *    .selectedTab=${1}
 *  >
 *    <div slot="right-content">
 *      <unity-button
 *        label="my button"
 *        ?gradient=${true}
 *        ?disabled=${false}
 *        @click=${e => console.log("unity-button clicked! e: ", e)}
 *      />
 *    </div>
 *  </unity-page-header>
 */

//This component will render a page header
// It will display a Title, a back arrow (optional), Right aligned action content (optional), and tabs (optional). These action buttons will be added as named splits to the component

class UnityPageHeader extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          width: 100%;
          display: flex;
          flex-direction: column;
          --header-font-family: var(--font-family, var(--default-font-family));
          font-family: var(--header-font-family);
          --tab-height: 38px;
          --tab-padding: 0 14px;
          --left-wrapper-overflow: hidden;
          --title-white-space: nowrap;
          --tab-color: var(--secondary-color, var(--default-secondary-color));
        }

        #header {
          flex: 1;
          height: 48px;
          min-height: 48px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
        }

        .bottom {
          border-bottom: 1px solid var(--light-gray-1-color, var(--default-light-gray-1-color));
        }

        #left-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          overflow: var(--left-wrapper-overflow);
        }

        .left-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        #title {
          margin-left: 16px;
          overflow: var(--left-wrapper-overflow);
          white-space: var(--title-white-space);
        }

        paper-tabs {
          font-size: 14px; /*var(--paragraph-font-size, var(--default-paragraph-font-size));*/
          height: 28px;
          width: min-content;
          align-self: flex-start;
          --paper-tabs-selection-bar-color: var(--tab-color);
          /*height: var(--tab-height);*/
          font-family: var(--header-font-family);
        }

        .separator {
          --iron-icon-height: var(--unity-button-height, var(--default-unity-button-height));
          --iron-icon-width: var(--unity-button-height, var(--default-unity-button-height));
          transform: rotate(90deg);
          color: var(--gray-color, var(--default-gray-color));
        }

        .button-container, ::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-width: 0;
        }

        .right-actions::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-right: calc(var(--padding-size-sm, var(--default-padding-size-sm))/2);
        }

        .left-actions::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-left: var(--padding-size-sm, var(--default-padding-size-sm));
        }

        paper-tab {
          padding: var(--tab-padding);
        }
      `
    ];
  }

  static get properties() {
    return {
      title: { type: String },
      tabs: { type: Array },
      selectedTab: { type: Number },
      onTabSelect: { type: Function }
    }
  }

  constructor() {
    super()

    this.title=''
    this._tabs=[]
    this._selectedTab=0
    this.onTabSelect=()=>{console.log("onTabSelect default")}
  }

  set tabs(value) {
    const oldValue = this._tabs
    if (value === oldValue) return
    this._findSelectedTab()
    this._tabs = value
    this.requestUpdate('tabs', oldValue)
  }

  get tabs() { return this._tabs }

  // when tabs array changes, make selectedTab be within bounds, NaN goes to 0
    // if no selectedTab set, would still default 0 and be fine
  // when selectedTab changes, make selectedTab be within tabs bounds, NaN goes to 0
    // if no tabs when selectedTab changes, update with no change

  set selectedTab(value) {
    this._findSelectedTab(value)
  }

  get selectedTab() { return this._selectedTab}

  // if newValue exists, then updateing selectedTab
  // otherwise, using oldValue
  _findSelectedTab(newValue) {
    const oldValue = this._selectedTab
    // use newValue as long as not undefine
    let tabToSelect = newValue !== undefined ? newValue : oldValue
    // check tabToSelect to make sure within bounds
    // if tabs not set or empty array, just update selectedTab
    if (Array.isArray(this.tabs) && this.tabs.length > 0) {
      // check tabToSelect within bounds
      if (!tabToSelect || Number(tabToSelect) < 0) tabToSelect = 0
      if (Number(tabToSelect) >= this.tabs.length) tabToSelect = this.tabs.length - 1
    }
    // only update if value actually changes
    this._selectedTab = tabToSelect
    this.requestUpdate('selectedTab', oldValue)
  }

  _handleTabSelect(tab, index) {
    this.onTabSelect(tab, index)
  }

  render() {
    const {
      title,
      tabs=[],
      selectedTab
    } = this
    const hasTabs = tabs.length > 0
    return html`
      <div class="bottom">
        <div id="header">
          <div id="left-wrapper">
            <slot name="left-content" class="left-container"></slot>
            <slot name="center-content" class="center-container">
              <unity-typography size="header1" id="title">${header}</unity-typography>
            </slot>
          </div>
          <div class="button-container">
            <slot name="left-actions" class="left-actions"></slot>
            <iron-icon icon="unity:minus" class="separator"></iron-icon>
            <slot name="right-actions" class="right-actions"></slot>
          </div>
        </div>
        ${hasTabs
          ? html`<paper-tabs selected="${selectedTab}" id="header-tabs" noink>
              ${tabs.map((tab, index) => {
                const {label} = tab

                return html`<paper-tab @click=${e => this._handleTabSelect(tab, index)}>
                  ${label}
                </paper-tab>`
              })}
            </paper-tabs>`
          : ''
        }
      </div>
    `
  }
}

window.customElements.define('unity-page-header', UnityPageHeader);
