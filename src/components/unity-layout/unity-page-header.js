import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import {UnityDefaultThemeStyles} from '@bit/smartworks.unity.unity-default-theme-styles';
import  '@bit/smartworks.unity.unity-typography';
import { trimWhitespace } from '@bit/smartworks.unity.unity-utils'

/**
 * Displays a Top level Page Header.
 * @name UnityPageHeader
 * @param {''} header
 * @param {[]} tabs
 * @param {''} selectedTab
 * @param {css} --page-header-font-family, css var used for styling the component
 * @param {css} --page-header-left-wrapper-overflow, css var used for styling the component
 * @param {css} --page-header-title-white-space, css var used for styling the component
 * @param {css} --page-header-padding-size, css var used for styling the component
 * @param {css} --page-header-padding, css var used for styling the component (overrides --page-header-padding-size)
 * @param {css} --page-header-border-color, css var used for styling the component
 * @param {css} --page-header-border-width, css var used for styling the component
 * @param {css} --page-header-border, css var used for styling the component
 * @param {css} --page-header-font-size, css var used for styling the component
 * @param {css} --page-header-font-weight, css var used for styling the component
 * @param {css} --page-header-icon-size, css var used for styling the component
 * @param {css} --page-header-tab-height, css var used for styling the component
 * @param {css} --page-header-tab-color, css var used for styling the component
 * @param {css} --page-header-tab-font-size, css var used for styling the component
 * @param {css} --page-header-tab-padding-size, css var used for styling the component
 * @param {css} --page-header-tab-padding, css var used for styling the component (overrides --page-header-tab-padding-size)
 * @param {css} --page-header-z-index, css var used for styling the component
 * @param {css} --page-header-background-color, css var used for styling the component
 * @param {css} --separator-color, css var used for styling the separator color
 * @param {css} --left-content-flex, css var used for defining flex of left content. Allows left content to expand
 * @param {css} --left-content-min-width, css var used for defining min-width of left content. Allows left content to collapse to 0 width.
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
          --default-page-header-font-family: var(--font-family, var(--default-font-family));
          --default-page-header-left-wrapper-overflow: hidden;
          --default-page-header-title-white-space: nowrap;
          --default-page-header-padding-size: var(--padding-size-md, var(--default-padding-size-md));
          --default-page-header-padding: 0 var(--page-header-padding-size, var(--default-page-header-padding-size));
          --default-page-header-border-color: var(--gray-color, var(--default-gray-color));
          --default-page-header-border-width: 1px;
          --default-page-header-border: var(--page-header-border-width, var(--default-page-header-border-width)) solid var(--default-page-header-border-color);
          --default-page-header-font-size: var(--header1-font-size, var(--default-header1-font-size));
          --default-page-header-font-weight: var(--header1-font-weight, var(--default-header1-font-weight));
          --default-page-header-icon-size: var(--unity-button-height, var(--default-unity-button-height));
          --default-page-header-background-color: inherit;
          --default-page-header-z-index: 4;

          --default-page-header-tab-height: 28px;
          --default-page-header-tab-color: var(--secondary-color, var(--default-secondary-color));
          --default-page-header-tab-font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --default-page-header-tab-padding-size: var(--page-header-padding-size, var(--default-page-header-padding-size));
          --default-page-header-tab-padding: 0 var(--page-header-tab-padding-size, var(--default-page-header-tab-padding-size));
          --default-separator-color: var(--light-gray-1-color, var(--default-light-gray-1-color));
          --default-left-content-flex: unset;
          --default-left-content-min-width: unset;

          width: 100%;
          display: flex;
          flex-direction: column;
          font-family: var(--page-header-font-family, var(--default-page-header-font-family));
        }

        #header {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
          padding: var(--page-header-padding, var(--default-page-header-padding));
        }

        .bottom {
          border-bottom: var(--page-header-border, var(--default-page-header-border));
          z-index: var(--page-header-z-index, var(--default-page-header-z-index));
          background-color: var(--page-header-background-color, var(--default-page-header-background-color));
        }

        #left-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          overflow: var(--page-header-left-wrapper-overflow, var(--default-page-header-left-wrapper-overflow));
          flex: var(--left-content-flex, var(--default-left-content-flex));
          min-width: var(--left-content-min-width, var(--default-left-content-min-width));
        }

        .left-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        #title {
          overflow: var(--page-header-left-wrapper-overflow, var(--default-page-header-left-wrapper-overflow));
          white-space: var(--page-header-title-white-space, var(--default-page-header-title-white-space));
          --header1-size: var(--page-header-font-size, var(--default-page-header-font-size));
          --header1-weight: var(--page-header-font-weight, var(--default-page-header-font-weight));
        }

        paper-tabs {
          font-size: var(--page-header-tab-font-size, var(--default-page-header-tab-font-size));
          height: var(--page-header-tab-height, var(--default-page-header-tab-height));
          width: min-content;
          align-self: flex-start;
          --paper-tabs-selection-bar-color: var(--page-header-tab-color, var(--default-page-header-tab-color));
        }

        paper-tabs paper-tab.iron-selected {
          --font-color: var(--page-header-tab-color, var(--default-page-header-tab-color));
        }

        .separator {
          height: 100%;
          align-self: stretch;
          display: flex;
        }

        .inner-separator {
          flex: 1;
          align-self: center;
          height: 12px;
          border-right: 1px solid var(--separator-color, var(--default-separator-color));
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
          padding: var(--page-header-tab-padding, var(--default-page-header-tab-padding));
          font-family: var(--page-header-font-family, var(--default-page-header-font-family));
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
            <div class="separator${!showSeparator ? ' hide' : ''}">
              <div class="inner-separator"></div>
            </div>
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
