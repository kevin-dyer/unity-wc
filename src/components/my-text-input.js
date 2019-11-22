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
import './unity-text-input/unity-text-input.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store

class MyTextInput extends PageViewElement {
  constructor() {
    super()
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .example-container {
          position: relative;
          width: 1000px;
          height: 750px;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid grey;
          padding: 20px;
          box-sizing: border-box;
        }
        .first-input {
          position: relative;
          width: 200px;
          height: 35px;
        }
      `
    ]
  }

  onInputChange(value) {
    console.log(value)
  }

  render() {
    return html`
      <div class="example-container">
        <div class="first-input">
          <unity-text-input .value="${"BATMAN!"}" .label="${"Demo Label"}" .onChange="${this.onInputChange}"/>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-text-input', MyTextInput)
