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
          display: flex;
          border-collapse: collapse;
        }
        .col {
          flex: 1;
        }
        .input-box {
          position: relative;
          width: 250px;
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
        <div class="col">
          <div class="input-box">
            <unity-text-input
              .value="${"Plain Input"}"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"With Label"}"
              .onChange="${this.onInputChange}"
              .label="${"Input Label"}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"With Remark"}"
              .remark="${"Input remark."}"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"With Label and Remark"}"
              .remark="${"Demo remark."}"
              .onChange="${this.onInputChange}"
              .label="${"Input Label"}"
            ></unity-text-input>
          </div>
        </div>
        <div class="col">
          <div class="input-box">
            <unity-text-input
              disabled
              .label="Disabled Input"
              .value="${"Can't edit this text."}"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"This one comes with a character count field. This way, you can see how many characters might be filling up a field."}"
              .onChange="${this.onInputChange}"
              .label="${"With Character Count"}"
              charCount
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${"Input with units"}"
              .value="${"17500"}"
              .units="kwh"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${"Validation with Remark"}"
              .value="${"Will only be correct if this equals \"valid\","}"
              .remark="${"This must equal \"valid\"."}"
              .validation="${val => {
                if (val.length === 0) return 'Cannot be empty.'
                if (val !== 'valid') return 'Value must equal "valid".'
                return true
              }}"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
        </div>
        <div class="col">
          <div class="input-box">
            <unity-text-input
              .label="${"Validation Icon"}"
              .value="${"Will only be correct if this equals \"valid\","}"
              .remark="${"This must equal \"valid\""}"
              .validation="${val => {
                if (val.length === 0) return 'Cannot be empty.'
                if (val !== 'valid') return 'Value must equal "valid".'
                return true
              }}"
              .onChange="${this.onInputChange}"
              showIcon
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"Cannotseecuzpazsswerd"}"
              .onChange="${this.onInputChange}"
              .label="${"Password Field"}"
              password
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${'Weak Validation'}"
              .value="${"aweakpass"}"
              .validation="${val=> {
                if (val.length < 8) return 'Password should be at least 8 characters'
                else return 1
              }}"
              .onChange="${this.onInputChange}"
              password
              showIcon
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${'Strong Validation'}"
              .value="${"astrongerpassword"}"
              .validation="${val=> {
                if (val.length < 8) return 'Password should be at least 8 characters'
                else if (val.length < 16) return 1
                else return 2
              }}"
              .onChange="${this.onInputChange}"
              password
              showIcon
            ></unity-text-input>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-text-input', MyTextInput)
