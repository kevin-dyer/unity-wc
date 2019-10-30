import { LitElement, html, css } from 'lit-element';
import './unity-button/unity-button.js'
import { SharedStyles } from './shared-styles.js';

class MyButtons extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        .button-page {
          margin: 20px;
        }
        .section {
          padding: 20px;
        }

        .button-container {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      `
    ];
  }

  render() {
    console.log("Render MyButtons")
    return html`
    <div class="button-page">
      <h1>Unity Buttons</h1>

      <div class="section">
        <h4>Gradient button</h4>

        <div class="button-container">
          <unity-button
            label="gradient"
            ?gradient=${true}
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            ?gradient=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>

      <div class="section">
        <h4>Outlined button</h4>

        <div class="button-container">
          <unity-button
            label="outlined"
            ?outlined=${true}
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            ?outlined=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>

      <div class="section">
        <h4>Danger button</h4>

        <div class="button-container">
          <unity-button
            label="danger"
            ?danger=${true}
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            ?danger=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>
    </div>`
  }
}

window.customElements.define('my-buttons', MyButtons);
