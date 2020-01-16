/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { LitElement, html, css } from 'lit-element';

import './unity-modal/unity-modal.js'
// import '@bit/smartworks.unity.unity-modal'

// import './unity-button/unity-button.js'
import '@bit/smartworks.unity.unity-button'

import { SharedStyles } from './shared-styles.js';

const TYPE = "TYPE"

const MODALS = {
  [TYPE]: {
    key: TYPE,
    title: 'Title',
    top: null,
    body: null,
    bottom: null
  }
}

class MyModal extends LitElement {
  constructor() {
    super()
    this.open = false
    this.type = ''
  }

  static get properties() {
    return {
      open: { type: Boolean },
      type: { type: String }
    }
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .button-page {
          margin: 20px;
        }
        .section {
          padding: 20px;
        }
        .button-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
        }
      `
    ]
  }

  toggleModal(key) {
    const { open, type } = this
    if (key === type) {
      this.open = !open
    } else {
      this.open = true
      this.type = key
    }
  }

  render() {
    const { open, type } = this
    const {
      title,
      top,
      body,
      bottom
    } = MODALS[type] || {}

    return html`
      <div class="button-page">
        <h1>Unity Modal Examples</h1>

        ${Object.values(MODALS).map(({key, title}) => html`
          <div class="section">
            <unity-button
              label="Toggle Modal: ${title}"
              gradient
              @click=${e => this.toggleModal(key)}
            ></unity-button>
          </div>
        `)}
        <div class="modal">
          <unity-modal ?show="${this.open}" title="${title}"></unity-modal>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-modal', MyModal)
