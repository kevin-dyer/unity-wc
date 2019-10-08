import { LitElement, html, css } from 'lit-element';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';


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
 *    <div slot="action-content">
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

// These are the shared custom styles to be used as defaults
import { UnityDefaultThemeStyles } from '../unity-default-theme-styles.js';

class UnityPageHeader extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          flex: 1;
          display: flex;
          flex-direction: column;
          font-family: var(--font-family, --default-font-family);
        }

        #header {
          flex: 1;
          height: 52px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--light-grey-text-color, --default-light-grey-text-color);
        }

        #left-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        #title {
          font-size: var(--header1-font-size, --default-header1-font-size);
          font-weight: var(--header1-font-weight, --default-header1-font-weight);
        }

        paper-tabs {
          font-size: var(--small-text-size, --default-small-text-size);
          height: 28px;
          align-self: flex-start;
          --paper-tabs-selection-bar-color: var(--primary-brand-color, --default-primary-brand-color);
        }

      `
    ];
  }

  static get properties() {
    return {
      title: {
        type: String
      },
      showBackBtn: {
        type: Boolean
      },
      tabs: {
        type: Array
      },
      selectedTab: {
        type: Number
      }
    }
  }

  constructor() {
    super()

    this.title=''
    this.showBackBtn=false
    this.tabs=[]
    this.selectedTab=0
  }

  //This may need to be passed in as a property, could replace showBackBtn bool
  handleBack(e) {
    console.log("Go back here!")
    window.history.back()
  }

  render() {
    return html`
      <div id="header">
        <div id="left-container">
          ${this.showBackBtn &&
            html`
              <paper-icon-button
                icon="arrow-back"
                @click=${this.handleBack}
              ></paper-icon-button>

            `
          }
          <span id="title">${this.title}</span>
        </div>
        <slot name="action-content" id="right-container"></slot>
      </div>
      ${this.tabs.length > 0 &&
        html`<paper-tabs selected=${this.selectedTab} id="header-tabs" noink>
          ${this.tabs.map(({label, onClick=()=>{}}) =>
            html`<paper-tab @click=${this.onClick}>
              ${label}
            </paper-tab>`
          )}
        </paper-tabs>`
      }
    `
  }
}

window.customElements.define('unity-page-header', UnityPageHeader);
