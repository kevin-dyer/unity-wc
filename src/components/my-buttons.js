import { LitElement, html, css } from 'lit-element';
import '@bit/smartworks.unity.unity-core/unity-button'
import { SharedStyles } from './shared-styles.js';

class MyButtons extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        .button-page {
          margin-left: 20px;
        }
        .section {
          padding: 5px 20px;
        }

        .button-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
        }
        unity-button {
          margin: 6px;
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
        <h4>No Type button</h4>

        <div class="button-container">
          <unity-button
            label="solid"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="left icon"
            leftIcon="add"
          ></unity-button>

          <unity-button
            label="right icon"
            rightIcon="expand-more"
          ></unity-button>

          <unity-button
            label="disabled"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            ?loading=${true}
            ?disabled=${true}
          ></unity-button>

        </div>
      </div>

      <div class="section">
        <h4>Solid button</h4>

        <div class="button-container">
          <unity-button
            label="solid"
            type="solid"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="solid"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="left icon"
            type="solid"
            leftIcon="add"
          ></unity-button>

          <unity-button
            label="right icon"
            type="solid"
            rightIcon="expand-more"
          ></unity-button>

          <unity-button
            label="disabled"
            type="solid"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            type="solid"
            ?loading=${true}
            ?disabled=${true}
          ></unity-button>

        </div>
      </div>

      <div class="section">
        <h4>Gradient button</h4>

        <div class="button-container">
          <unity-button
            label="gradient"
            type="gradient"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="gradient"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="left icon"
            type="gradient"
            leftIcon="add"
          ></unity-button>

          <unity-button
            label="right icon"
            type="gradient"
            rightIcon="expand-more"
          ></unity-button>

          <unity-button
            label="disabled"
            type="gradient"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            type="gradient"
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
            type="outlined"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="icon"
            type="outlined"
            leftIcon="event-seat"
          ></unity-button>

          <unity-button
            label="loading"
            type="outlined"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="disabled"
            type="outlined"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
          label="loading disabled"
          type="outlined"
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
            ?small=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="small icon"
            ?small=${true}
            leftIcon='image:photo'
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            ?small=${true}
            ?loading=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="small danger"
            type="outlined"
            ?small=${true}
            ?danger=${true}
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
            style="--button-color: black;"
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
