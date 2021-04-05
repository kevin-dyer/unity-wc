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
import './unity-stepper/unity-stepper.js'
// import '@bit/smartworks.unity.unity-core/unity-stepper'
// import './unity-button/unity-button.js'
import '@bit/smartworks.unity.unity-core/unity-button'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store

const steps = [
  {
    name: "Step 1",
    key: "step1",
    buttonText: "Authorize"
  },
  {
    name: "Step 2",
    key: "step2"
  },
  {
    name: "Step 3",
    key: "step3",
    buttonText: "Start"
  },
  {
    name: "Step 4",
    key: "step4",
    buttonText: "End"
  }
]

class MyStepper extends PageViewElement {
  constructor() {
    super()

    this.isValid = false
    this.onStepChange = this.onStepChange.bind(this)
  }

  static get properties() {
    return {
      isValid: { attribute: false }
    }
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
          flex-direction: column;
          border-collapse: collapse;
        }
      `
    ]
  }

  onStepChange(key) {
    console.log('step is', key)
    this.changeValid(false)
  }

  changeValid(valid) {
    this.isValid = typeof valid === 'boolean' ? valid : !this.isValid
  }

  render() {
    const { isValid } = this
    return html`
      <div class="example-container">
        <unity-stepper
          .steps="${steps}"
          totalSteps="5"
          .onChangeStep="${this.onStepChange}"
          ?valid="${isValid || null}"
        ></unity-stepper>
        <unity-button
          label="${isValid ? "Invalidate" : "Validate"}"
          @click="${this.changeValid}"
        ></unity-button>
      </div>
    `
  }
}

window.customElements.define('my-stepper', MyStepper)
