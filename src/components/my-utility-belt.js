/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

//TODO: replace with bit import
// import './unity-utility-belt/unity-utility-belt'
import "@bit/smartworks.unity.unity-core/unity-utility-belt"

import '@bit/smartworks.unity.unity-core/unity-button'


// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store

class MyUtilityBelt extends PageViewElement {
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
      SharedStyles,
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
          margin: 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          border-collapse: collapse;
        }
        .page-content {
          flex: 1;

        }

      `
    ]
  }
}

window.customElements.define('my-utility-belt', MyUtilityBelt)
