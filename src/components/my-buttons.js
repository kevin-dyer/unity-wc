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
          flex-wrap: wrap;
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
            label="loading"
            ?gradient=${true}
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="left icon"
            ?gradient=${true}
            leftIcon="add"
          ></unity-button>

          <unity-button
            label="right icon"
            ?gradient=${true}
            rightIcon="expand-more"
          ></unity-button>

          <unity-button
            label="disabled"
            ?gradient=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            ?gradient=${true}
            ?loading=${true}
            ?disabled=${true}
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
            label="icon"
            ?outlined=${true}
            leftIcon="event-seat"
          ></unity-button>

          <unity-button
            label="loading"
            ?outlined=${true}
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="disabled"
            ?outlined=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
          label="loading disabled"
          ?outlined=${true}
          ?loading=${true}
          ?disabled=${true}
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
            label="danger icon"
            ?danger=${true}
            leftIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            ?danger=${true}
            ?loading=${true}
            leftIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            ?danger=${true}
            ?disabled=${true}
          ></unity-button>

          <unity-button
            label="disabled icon"
            ?danger=${true}
            ?disabled=${true}
            leftIcon="error-outline"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            ?danger=${true}
            ?loading=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>

      <div class="section">
        <h4>Small button</h4>

        <div class="button-container">
          <unity-button
            label="Small"
            ?gradient=${true}
            ?small=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="small icon"
            ?gradient=${true}
            ?small=${true}
            leftIcon='image:photo'
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            ?gradient=${true}
            ?small=${true}
            ?loading=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="small danger"
            ?danger=${true}
            ?small=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>

      <div class="section">
        <h4>Icon button</h4>

        <div class="button-container">
          <unity-button
            centerIcon="close"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            centerIcon="close"
            ?loading=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>
    </div>`
  }
}

window.customElements.define('my-buttons', MyButtons);
