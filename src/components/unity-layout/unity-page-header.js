import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import {UnityDefaultThemeStyles} from '@bit/smartworks.unity.unity-default-theme-styles';
import  '@bit/smartworks.unity.unity-icon';
import  '@bit/smartworks.unity.unity-typography';
import { trimWhitespace } from '@bit/smartworks.unity.unity-utils'

/**
 * Displays a Top level Page Header.
 * @name UnityPageHeader
 * @param {''} header
 * @param {[]} tabs
 * @param {''} selectedTab
 * @returns {LitElement} returns a a class extended from LitElement
 * @example
 *  <unity-page-header
 *    header="MOCC2 Title (header)"
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
 * 
 * 
 * Custom CSS variables:
 * --header-font-family
 * --tab-height
 * --tab-padding
 * --left-wrapper-overflow
 * --title-white-space
 * --tab-colora
 * --page-header-padding-size
 * --page-header-padding
 * --page-header-border
 * --page-header-font-size
 * --page-header-font-weight
 * --page-header-tabs-font-size
 * --page-header-icon-size
 * 
 */

//This component will render a page header
// It will display a Title, a back arrow (optional), Right aligned action content (optional), and tabs (optional). These action buttons will be added as named splits to the component

const LEFT_CONTENT = "left-content"
const CENTER_CONTENT = "center-content"
const LEFT_ACTION = "left-action"
const RIGHT_ACTION = "right-action"

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
          --tab-padding: 0 var(--page-header-padding-size);
          --left-wrapper-overflow: hidden;
          --title-white-space: nowrap;
          --tab-color: var(--secondary-color, var(--default-secondary-color));
          --page-header-padding-size: var(--padding-size-md, var(--default-padding-size-md));
          --page-header-padding: var(--page-header-padding-size);
          --page-header-border: 1px solid var(--gray-color, var(--default-gray-color));
          --page-header-font-size: var(--header1-font-size, var(--default-header1-font-size));
          --page-header-font-weight: var(--header1-font-weight, var(--default-header1-font-weight));
          --page-header-tabs-font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --page-header-icon-size: var(--unity-button-height, var(--default-unity-button-height));
        }

        #header {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
          padding: var(--page-header-padding);
        }

        .bottom {
          border-bottom: var(--page-header-border);
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
          overflow: var(--left-wrapper-overflow);
          white-space: var(--title-white-space);
        }

        paper-tabs {
          font-size: var(--page-header-tabs-font-size);
          height: 28px;
          width: min-content;
          align-self: flex-start;
          --paper-tabs-selection-bar-color: var(--tab-color);      
        }

        paper-tabs paper-tab.iron-selected {
          --font-color: var(--tab-color);
        }

        .separator {
          --unity-icon-height: var(--page-header-icon-size);
          --unity-icon-width: var(--page-header-icon-size);
          transform: rotate(90deg);
          color: var(--gray-color, var(--default-gray-color));
        }

        .button-container, ::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .right-action::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .left-action::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        paper-tab {
          padding: var(--tab-padding);
          font-family: var(--header-font-family);
        }

        .hide {
          display: none;
        }
      `
    ];
  }

  static get properties() {
    return {
      header: { type: String },
      tabs: { type: Array },
      selectedTab: { type: Number },
      onTabSelect: { type: Function },
      showSeparator: { type: false }
    }
  }

  constructor() {
    super()

    this.header=''
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

  getActionSlots() {
    const slots = [...this.shadowRoot.querySelectorAll('slot')]
    const slotContent = slots.map(slot => slot && slot.assignedNodes() || [])
    // destructured array is in written order of the component
    const [
      leftContent,
      centerContent,
      leftAction,
      rightAction
    ] = slotContent.map(slot => trimWhitespace(slot))
    return {
      [LEFT_ACTION]: leftAction,
      [RIGHT_ACTION]: rightAction
    }
  }

  updated(oldProps) {
    if (!oldProps.has('showSeparator')) {
      const {
        [LEFT_ACTION]: leftAction=[],
        [RIGHT_ACTION]: rightAction=[]
      } = this.getActionSlots()
      this.showSeparator = leftAction.length > 0 && rightAction.length > 0
    }
  }

  render() {
    const {
      header,
      tabs=[],
      showSeparator,
      selectedTab
    } = this
    const hasTabs = tabs.length > 0
    return html`
      <div class="bottom">
        <div id="header">
          <div id="left-wrapper">
            <slot name="${LEFT_CONTENT}" class="left-container"></slot>
            <slot name="${CENTER_CONTENT}" class="center-container">
              <unity-typography size="header1" id="title">${header}</unity-typography>
            </slot>
          </div>
          <div class="button-container">
            <slot name="${LEFT_ACTION}" class="left-action"></slot>
            <unity-icon icon="unity:minus" class="separator${!showSeparator ? ' hide' : ''}"></unity-icon>
            <slot name="${RIGHT_ACTION}" class="right-action"></slot>
          </div>
        </div>
        ${hasTabs
          ? html`
            <paper-tabs selected="${selectedTab}" id="header-tabs" noink>
              ${tabs.map((tab, index) => {
                const {label} = tab

                return html`
                  <paper-tab @click=${e => this._handleTabSelect(tab, index)}>
                    <unity-typography>${label}</unity-typography>
                  </paper-tab>`
                }
              )}
            </paper-tabs>`
          : ''
        }
      </div>
    `
  }
}

window.customElements.define('unity-page-header', UnityPageHeader);
