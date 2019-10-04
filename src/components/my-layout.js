import { LitElement, html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import './unity-layout/unity-page-header.js'
import './unity-button/unity-button.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyLayout extends LitElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`<unity-page-header
      title="MOCC2 Title"
      ?showBackBtn=${true}
      .tabs=${[
        {
          label: 'Users',
          onClick: (e) => {
            console.log("Users tab clicked")
          }
        },
        {
          label: 'Rules',
          onClick: (e) => {
            console.log("Rules tab clicked")
          }
        },
        {
          label: 'API Keys',
          onClick: (e) => {
            console.log("API Keys tab clicked")
          }
        }
      ]}
      .selectedTab=${1}
    >
      <div slot="action-content">
        <unity-button
          label="my button"
          ?gradient=${true}
          ?disabled=${false}
          @click=${e => console.log("unity-button clicked! e: ", e)}
        />
      </div>
    </unity-page-header>`
  }
}

window.customElements.define('my-layout', MyLayout);
