import { LitElement, html, css } from 'lit-element';
// import '@bit/smartworks.unity.unity-core/unity-button'
import './unity-button/unity-button'
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
            label="no given type"
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
            rightIcon="add"
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
        <h4>Primary button</h4>

        <div class="button-container">
          <unity-button
            label="primary"
            type="primary"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="primary"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="left icon"
            type="primary"
            leftIcon="add"
          ></unity-button>

          <unity-button
            label="right icon"
            type="primary"
            rightIcon="add"
          ></unity-button>

          <unity-button
            label="disabled"
            type="primary"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            type="primary"
            ?loading=${true}
            ?disabled=${true}
          ></unity-button>

        </div>
      </div>

      <div class="section">
        <h4>Secondary button</h4>

        <div class="button-container">
          <unity-button
            label="secondary"
            type="secondary"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="left icon"
            type="secondary"
            leftIcon="event-seat"
          ></unity-button>

          <unity-button
            label="right icon"
            type="secondary"
            rightIcon="event-seat"
          ></unity-button>

          <unity-button
            label="loading"
            type="secondary"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="disabled"
            type="secondary"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            type="secondary"
            ?loading=${true}
            ?disabled=${true}
          ></unity-button>

        </div>
      </div>

      <div class="section">
        <h4>Borderless button</h4>

        <div class="button-container">
          <unity-button
            label="secondary"
            type="borderless"
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="left icon"
            type="borderless"
            leftIcon="event-seat"
          ></unity-button>

          <unity-button
            label="right icon"
            type="borderless"
            rightIcon="event-seat"
          ></unity-button>

          <unity-button
            label="loading"
            type="borderless"
            ?loading=${true}
          ></unity-button>

          <unity-button
            label="disabled"
            type="borderless"
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading disabled"
            type="borderless"
            ?loading=${true}
            ?disabled=${true}
          ></unity-button>

        </div>
      </div>

      <div class="section">
        <h4>Important button</h4>

        <div class="button-container">
          <unity-button
            label="important"
            important
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="important left icon"
            important
            leftIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="important right icon"
            important
            rightIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            important
            ?loading=${true}
            icon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            important
            ?disabled=${true}
          ></unity-button>

          <unity-button
            label="disabled left icon"
            important
            ?disabled=${true}
            leftIcon="error-outline"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            important
            ?loading=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>

      <div class="section">
        <h4>Important Secondary button</h4>

        <div class="button-container">
          <unity-button
            label="important"
            type="secondary"
            important
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="important left icon"
            type="secondary"
            important
            leftIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="important right icon"
            type="secondary"
            important
            rightIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="secondary"
            important
            ?loading=${true}
            icon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            type="secondary"
            important
            ?disabled=${true}
          ></unity-button>

          <unity-button
            label="disabled left icon"
            type="secondary"
            important
            ?disabled=${true}
            leftIcon="error-outline"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="secondary"
            important
            ?loading=${true}
            ?disabled=${true}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>
        </div>
      </div>

      <div class="section">
        <h4>Important Borderless button</h4>

        <div class="button-container">
          <unity-button
            label="important"
            type="borderless"
            important
            ?disabled=${false}
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="important left icon"
            type="borderless"
            important
            leftIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="borderless"
            important
            ?loading=${true}
            leftIcon="warning"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="disabled"
            type="borderless"
            important
            ?disabled=${true}
          ></unity-button>

          <unity-button
            label="disabled left icon"
            type="borderless"
            important
            ?disabled=${true}
            leftIcon="error-outline"
            @click=${e => console.log("unity-button clicked! e: ", e)}
          ></unity-button>

          <unity-button
            label="loading"
            type="borderless"
            important
            ?loading=${true}
            ?disabled=${true}
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
