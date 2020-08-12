import { LitElement, html, css } from 'lit-element';
import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-tag'
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
        .wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
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

      <div class="wrapper">
        <div class="section">
          <h4>No Type button</h4>

          <div class="button-container">
            <unity-button
              label="primary"
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
          <h4>primary button</h4>

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
              rightIcon="expand-more"
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
          <h4>secondary button</h4>

          <div class="button-container">
            <unity-button
              label="secondary"
              type="secondary"
              ?disabled=${false}
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>

            <unity-button
              label="loading"
              type="secondary"
              ?loading=${true}
            ></unity-button>

            <unity-button
              label="left icon"
              type="secondary"
              leftIcon="add"
            ></unity-button>

            <unity-button
              label="right icon"
              type="secondary"
              rightIcon="expand-more"
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
          <h4>borderless button</h4>

          <div class="button-container">
            <unity-button
              label="borderless"
              type="borderless"
              ?disabled=${false}
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>

            <unity-button
              label="icon"
              type="borderless"
              leftIcon="event-seat"
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
          <h4>important button</h4>

          <div class="button-container">
            <unity-button
              label="important"
              ?important=${true}
              ?disabled=${false}
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>

            <unity-button
              label="important icon"
              ?important=${true}
              leftIcon="warning"
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>

            <unity-button
              label="loading"
              ?important=${true}
              ?loading=${true}
              leftIcon="warning"
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>

            <unity-button
              label="disabled"
              ?important=${true}
              ?disabled=${true}
            ></unity-button>

            <unity-button
              label="disabled icon"
              ?important=${true}
              ?disabled=${true}
              leftIcon="error-outline"
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>

            <unity-button
              label="loading"
              ?important=${true}
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
              label="small important"
              type="borderless"
              ?small=${true}
              ?important=${true}
              @click=${e => console.log("unity-button clicked! e: ", e)}
            ></unity-button>
          </div>
        </div>

        <div class="section">
          <h4>Icon button</h4>

          <div class="button-container">
            <unity-button
              centerIcon="close"
              type="borderless"
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

        <div class="section">
          <h4>Tags</h4>

          <div class="button-container">
            <unity-tag
              value="test-value"
              label="Unity Tag Label"
              .onClick=${(e, v) => console.log("unity-tag clicked! e: ", e, v)}
            ></unity-tag>
            <unity-tag
              value="no-close"
              label="Unity Tag Label"
              withClose
              .onClick=${(e, v) => console.log("unity-tag clicked! but no close, e: ", e, v)}
            ></unity-tag>
            <unity-tag
              value="with-close"
              label="Unity Tag Label"
              withClose
              .onClick=${(e, v) => console.log("unity-tag clicked! with close, e: ", e, v)}
              .onClose=${(e, v) => console.log("unity-tag closed!, e: ", e, v)}
            ></unity-tag>
          </div>
        </div>
      </div>
    </div>`
  }
}

window.customElements.define('my-buttons', MyButtons);
