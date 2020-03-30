import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';

import {UnityDefaultThemeStyles} from '@bit/smartworks.unity.unity-default-theme-styles';
import  '@bit/smartworks.unity.unity-typography';

/**
 * Displays a Top level Page Header.
 * @name UnityPageHeader
 * @param {''} title
 * @param {bool} showBackArrow
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
          font-family: var(--font-family, var(--default-font-family));
          --tab-height: 38px;
          --tab-padding: 0 19px;
          --left-wrapper-overflow: hidden;
          --title-white-space: nowrap;
        }

        #header {
          flex: 1;
          height: 52px;
          min-height: 52px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: stretch;
          border-bottom: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        #left-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          overflow: var(--left-wrapper-overflow);
        }

        #left-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        #right-container::slotted(*) {
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
          font-size: var(--small-text-size, var(--default-small-text-size));
          height: 28px;
          align-self: flex-start;
          --paper-tabs-selection-bar-color: var(--primary-brand-color, var(--default-primary-brand-color));
          height: var(--tab-height);
        }

        ::slotted(*) {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        paper-tab {
          padding: var(--tab-padding);
        }
      `
    ];
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      tabs: {
        type: Array
      },
      selectedTab: {
        type: Number
      },
      onTabSelect: {
        type: Function
      }
    }
  }

  constructor() {
    super()

    this.title=''
    this.tabs=[]
    this.selectedTab=0
    this.onTabSelect=()=>{console.log("onTabSelect default")}
  }

  _handleTabSelect(tab, index) {
    this.onTabSelect(tab, index)
  }

  //This may need to be passed in as a property, could replace showBackBtn bool
  handleBack(e) {
    window.history.back()
  }

  render() {
    return html`
      <div id="header">
        <div id="left-wrapper">
          <slot name="left-content" id="left-container"></slot>
          <unity-typography size="header1" id="title">${this.title}</unity-typography>
        </div>
        <slot name="right-content" id="right-container"></slot>
      </div>
      ${this.tabs.length > 0
        ? html`<paper-tabs selected=${this.selectedTab} id="header-tabs" noink>
            ${this.tabs.map((tab, index) => {
              const {label} = tab

              return html`<paper-tab @click=${e => this._handleTabSelect(tab, index)}>
                ${label}
              </paper-tab>`
            })}
          </paper-tabs>`
        : ''
      }
    `
  }
}

window.customElements.define('unity-page-header', UnityPageHeader);
