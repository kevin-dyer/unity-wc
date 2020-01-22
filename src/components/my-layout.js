import { LitElement, html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import './unity-layout/unity-page-header.js'
// import './unity-button/unity-button.js'
import '@bit/smartworks.unity.unity-button'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyLayout extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        .container {
          flex: 1;
          flex-direction: column;
          align-items: stretch;
        }
        .header-wrapper {
          /*flex: 0;*/
          width: 100%;
        }
      `
    ];
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('header-tab-selected', this._handleTabSelect)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('header-tab-selected', this._handleTabSelect)
  }

  _handleTabSelect(e) {
    const {detail: {tab, index}={}} = e
    console.log("handleTabSelect called in my-layout, tab: ", tab, ", index: ", index)
  }

  render() {
    return html`<div class="container">
    <div class="header-wrapper">
      <unity-page-header
        title="MOCC2 Title"
        ?showBackBtn=${true}
        .tabs=${[
          {
            label: 'Users'
          },
          {
            label: 'Rules'
          },
          {
            label: 'API Keys'
          }
        ]}
        .selectedTab=${1}
      >
        <div slot="right-content">
          <unity-button
            label="my button"
            ?gradient=${true}
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          />
        </div>
      </unity-page-header>
    </div>
    </div>`
  }
}

window.customElements.define('my-layout', MyLayout);
