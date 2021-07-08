import "@bit/smartworks.unity.unity-core/unity-utility-belt"
import "@bit/smartworks.unity.unity-core/unity-button"
import { LitElement, html, css } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, select, object } from "@storybook/addon-knobs";

export default {
  title: 'Utility Belt',
  decorators: [withKnobs]
};

class UtilityBeltExample extends LitElement {
  constructor() {
    super()

    this.tabs = [
      {name: 'tab 1 with a very long name', id: 'tab1'},
      {name: 'tab 2', id: 'tab2'},
      {name: 'tab 3', id: 'tab3'},
      {name: 'tab 4', id: 'tab4'},
      {name: 'tab 5', id: 'tab5'}
    ]
  }

  static get properties() {
    return {
      tabs: { type: Array }
    }
  }

  handleTabClose(tabId) {
    //remove tab
    this.tabs = this.tabs.filter(tab => tab.id !== tabId)
  }

  handleAddTab() {
    const index = this.tabs.length + 1

    this.tabs = [
      ...this.tabs,
      {
        name: `tab ${index}b`,
        id: `tab${Math.floor(Math.random() * 100)}`
      }
    ]
  }

  render() {
    return html`
      <div class="example-container">
        <unity-utility-belt
          .onTabClose=${this.handleTabClose.bind(this)}
          .tabs=${this.tabs}
        >
          <div slot="main">
            <h2>Example page content</h2>
            <p>Page description here</p>
          </div>
          ${this.tabs.map(tab => {
            return html`<div slot="${tab.id}">${tab.name} Content!</div>`
          })}

          <unity-button
            slot="right-actions"
            class="add-button"
            type="borderless"
            centerIcon="unity:add"
            @click=${this.handleAddTab.bind(this)}
          ></unity-button
        </unity-utility-belt>
      </div>
    `
  }

  static get styles() {
    return [
      css`
        :host {
          max-width: 100vw;
          position: relative;
        }
        .example-container {
          flex: 1;
          max-width: 100%;
          min-width: 0;
          border: 1px solid grey;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          border-collapse: collapse;
          height: calc(100vh - 16px);
        }
        .page-content {
          flex: 1;

        }
        .add-button {
          --icon-button-size: 20px;
        }

      `
    ]
  }
}

window.customElements.define('utility-belt-example', UtilityBeltExample)

export const UtilityBelt = () => {
  return html`<utility-belt-example></utility-belt-example>`
}
// export const UtilityBelt = () => {
//   
//   // let tabs = object("Tab List", tabList)
//   const handleTabClose = (tabId) => {
//     //remove tab
//     tabs = tabs.filter(tab => tab.id !== tabId)
//   }
// 
// //   return html`
// //     <unity-utility-belt
// //       .onTabClose=${handleTabClose}
// //       .tabs="${tabs}"
// //     >
// //       <div slot="main">
// //         <h2>Example page content</h2>
// //         <p>Page description here</p>
// //       </div>
// //       ${tabs.map(tab => {
// //         return html`<div slot="${tab.id}">${tab.name} Content!</div>`
// //       })}
// //     </unity-utility-belt>
// // `;
//   return html`<my-utility-belt></my-utility-belt>`
// }
