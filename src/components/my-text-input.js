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
// import './unity-text-input/unity-text-input.js'
import '@bit/smartworks.unity.unity-core/unity-text-input'

// import './unity-search-bar/unity-search-bar'
import '@bit/smartworks.unity.unity-core/unity-search-bar'

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
        :host {
          display: flex;
          justify-content: center;
        }
        .example-container {
          position: relative;
          width: 1000px;
          height: 750px;
          top: 75px;
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
          margin: 1em 0;
        }
      `
    ]
  }

  onInputChange(e, value, isValid) {
    console.log('onChange e: ', e)
    console.log('onChange value: ', value)
    console.log('onChange isValid: ', isValid)
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
              dirty
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"Rounded"}"
              .onChange="${this.onInputChange}"
              rounded
              dirty
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}"
              .label="${"Input Area"}"
              .onChange="${this.onInputChange}"
              area
              dirty
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .value="${"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}"
              .label="${"Input Area w/ Character Count Limit"}"
              .onChange="${this.onInputChange}"
              area
              charCount
              .maxLines="${8}"
              .maxlength="${500}"
            ></unity-text-input>
          </div>
        </div>
        <div class="col">
          <div class="input-box">
            <unity-text-input
              disabled
              .label="${"Disabled Input"}"
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
              .units="${"kwh"}"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${"Validation with Remark"}"
              .value="${"Will only be correct if this equals \"valid\"."}"
              .remark="${"This must equal \"valid\"."}"
              .validation="${val => {
                if (val.length === 0) return 'Cannot be empty.'
                if (val !== 'valid') return 'Value must equal "valid".'
                return true
              }}"
              .onChange="${this.onInputChange}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
            .label="${"Inner Icon Right"}"
            .value="${"Input field with icon on right side"}"
            .onChange="${this.onInputChange}"
            .innerRightIcon="${"unity:options"}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
            .label="${"Inner Icon Left"}"
            .value="${"Input field with Icon on left side"}"
            .onChange="${this.onInputChange}"
            .innerLeftIcon="${"unity:search"}"
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
            .label="${"Two Inner Icons"}"
            .value="${"Input field with two icons inside"}"
            .onChange="${this.onInputChange}"
            .innerLeftIcon="${"unity:lock"}"
            .innerRightIcon="${"unity:step_in"}"
            ></unity-text-input>
          </div>
        </div>
        <div class="col">
          <div class="input-box">
            <unity-text-input
              .label="${"Required"}"
              .value="${"This input is required"}"
              .onChange="${this.onInputChange}"
              required
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${"Read Only"}"
              .value="${"This input is read only"}"
              .onChange="${this.onInputChange}"
              readOnly
            ></unity-text-input>
          </div>
          <div class="input-box">
            <unity-text-input
              .label="${"Validation Icon"}"
              .value="${"Will only be correct if this equals \"valid\"."}"
              .remark="${"This must equal \"valid\""}"
              .validation="${val => {
                if (val.length === 0) return 'Cannot be empty.'
                if (val !== 'valid') return 'Value must equal "valid".'
                return true
              }}"
              .onChange="${this.onInputChange}"
              showIcon
              required
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
          <unity-search-bar
            search="search value"
            .tagSeed="${[{ label: "Tag 1", value: "tag 1" }, {value: "tag 1.5", styles: { '--tag-color': 'red'}}, { label: "Tag 2", value:"tag_2" }]}"
            .onChange="${v => console.log('updating search to: ', v)}"
          ></unity-search-bar>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-text-input', MyTextInput)
