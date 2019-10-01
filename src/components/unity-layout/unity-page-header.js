import { LitElement, html, css } from 'lit-element';

//This component will render a page header
// It will display a Title, a back arrow (optional), and Right aligned action buttons. These action buttons will be added as named splits to the component

// These are the shared styles needed by this element.
import { SharedStyles } from '../shared-styles.js';
import { ThemeStyles } from '../theme-styles.js';

class UnityPageHeader extends LitElement {
  static get styles() {
    return [
      ThemeStyles,
      css`
        :host: {
          flex: 1;
          height: 52px;
          display: 'flex';
          flex-direction: 'row';
          justify-content: 'space-between';
          align-items: 'center';
        }

        #title: {
          font-size: var(--header1-font-size, 24px);
          font-weight: var(--header1-font-weight, 400);
        }

        #left-container: {}
      `
    ];
  }

  static get properties() {
    return {
      title: {
        type: String
      }
    }
  }

  render() {
    console.log("rendering UnityPageHeader")
    return html`
      <div>
        <div id="left-container">
          <span id="title">${this.title}</span>
        </div>
        <div id="right-container">
          right stuff
        </div>

      </div>`
  }
}

window.customElements.define('unity-page-header', UnityPageHeader);
