import "@bit/smartworks.unity.unity-core/unity-utility-belt"
// import "../src/components/my-utility-belt"
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
      {name: 'tab 5', id: 'tab5'},
      {name: 'tab 6', id: 'tab6'},
      {name: 'tab 7', id: 'tab7'},
      {name: 'tab 8', id: 'tab8'},
      {name: 'tab 9', id: 'tab9'},
      {name: 'tab 10', id: 'tab10'}
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

  render() {
    // const selectedTab = 'tab2'

    // <div slot="right-actions">
    //         <unity-button
    //           centerIcon="add"
    //           type="borderless"
    //         ></unity-button>
    //       </div>

    return html`
      <div class="example-container">
        <unity-utility-belt
          .onTabClose=${this.handleTabClose}
          .tabs=${this.tabs}
        >
          <div slot="main">
            <h2>Example page content</h2>
            <p>Page description here</p>
          </div>
          ${this.tabs.map(tab => {
            return html`<div slot="${tab.id}">${tab.name} Content!</div>`
          })}
        </unity-utility-belt>
      </div>
    `
  }

  static get styles() {
    return [
      // SharedStyles,
      css`
        :host {
          /*display: flex;
          justify-content: center;*/
          /*max-width: 100%;*/
          max-width: 100vw;
          position: relative;
        }
        .example-container {
          flex: 1;
          max-width: 100%;
          min-width: 0;
          /*height: 750px;*/
          /*top: 75px;*/
          border: 1px solid grey;
          /*padding: 20px;*/
          /*margin: 20px;*/
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          border-collapse: collapse;
          height: calc(100vh - 16px);
        }
        .page-content {
          flex: 1;

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
