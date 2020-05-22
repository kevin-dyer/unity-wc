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

// import '@bit/smartworks.unity.unity-core/unity-modal'
import './unity-modal/unity-modal'
import '@bit/smartworks.unity.unity-core/unity-table'
import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-typography'

// import './unity-button/unity-button.js'

import { SharedStyles } from './shared-styles.js';

const TYPE = "TYPE"
const OTHER = "OTHER"
const TABLE = "TABLE"

const exampleData = [
  {
    id: 'red',
    name: 'red',
    hex: '#ff0000',
    favorite: true,
    image: 'show image',
    children: [{
        id: 'innerRed1',
        name: 'inner red1',
        hex: '#ff0022',
        favorite: true,
        icon: 'icons:add'
      },
      {
        id: 'innerRed2',
        name: 'inner red2',
        hex: '#ff0066',
        favorite: true,
        icon: 'icons:delete',
        _children: [
          {
            id: 'redGrandchild1',
            name: 'red grandchild',
            hex: '#73a123',
            favorite: false,
            icon: 'icons:bug-report',
            _children: [
              {
                id: 'redGrandchild2',
                name: 'red grandchild2',
                hex: '#73a199',
                favorite: false,
                icon: 'icons:build',
              }
            ]
          }
        ]
      },
      {
        id: 'innerBlue1',
        name: 'inner blue1',
        hex: '#ff0066',
        favorite: true,
        icon: 'icons:delete'
      }],
  },
  {id: 'black', name: 'black', hex: '#000000', favorite: true, icon: 'work'},
  {id: 'yellow', name: 'yellow', hex: '#ffff00', favorite: false, icon: 'social:domain'},
  {id: 'green', name: 'green', hex: '#00ff00', favorite: true, icon: 'work'},
  {id: 'grey', name: 'grey', hex: '#888888', favorite: false, image: 'show image', icon: 'build'},
  {id: 'magenta', name: 'magenta', hex: '#ff00ff', favorite: false, icon: 'social:domain'},
]

const exampleColumns = [
  {
    key: 'hex',
    label: 'Hex value',
    width: 200,
    format: (hex, datum) => html`<span style="color: ${hex}">${hex}</span>`
  },
  {
    key: 'name',
    label: 'Color',
    width: 300,
    format: (name, datum) => !!name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : ''
  },
  {
    key: 'favorite',
    label: 'Favourite?',
    width: 500,
    format: (value, datum) => value ? 'I love it!' : 'passible, I guess'
  }
]

const MODALS = {
  [TYPE]: {
    key: TYPE,
    title: 'Type',
    top: toggle => html`<unity-button slot="top" label="Cancel" outlined @click=${toggle}></unity-button>`,
    body: html`<div slot="body" style="width: 500px; margin: 15px;"><unity-typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</unity-typography</div>`,
    bottom: toggle => html`<unity-button slot="bottom" label="Cancel" outlined @click=${toggle}></unity-button><unity-button slot="bottom" label="Send" gradient @click=${toggle}></unity-button>`
  },
  [OTHER]: {
    key: OTHER,
    // title: 'Other',
    top: ()=>{},
    body: html`<div slot="body"><unity-typography>There's nothing here.</unity-typography></div>`,
    bottom: ()=>{} // toggle => html`<unity-button slot="bottom" label="Cancel" outlined @click=${toggle}></unity-button>`
  },
  [TABLE]: {
    key: TABLE,
    title: 'Table',
    top: ()=>{},
    body: html`<unity-table
      slot="body"
      selectable
      .keyExtractor="${(datum, index) => datum.name}"
      .childKeys="${['children']}"
      .data="${exampleData}"
      .columns="${exampleColumns}"
      .onSelectionChange="${selected => console.log('These elements are selected:', selected)}"
      .onClickRow="${(element, event) => console.log('This element was clicked:', element, '\nThis was the clicked event:', event)}"
      .onDisplayColumnsChange="${displayColumns => console.log("displayColumns has changed: ", displayColumns)}"
      .onColumnChange="${columns => console.log("onColumnChange callback cols: ", columns)}"
    >
    </unity-table>`,
    bottom: toggle => html`<unity-button slot="bottom" label="Cancel" outlined @click=${toggle}></unity-button><unity-button slot="bottom" label="Send" gradient @click=${toggle}></unity-button>`
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
        .modal {
          display: flex;
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

  wrappedTM(key) {
    return e => this.toggleModal(key)
  }

  render() {
    const { open, type } = this
    const {
      title,
      top=()=>{},
      body,
      bottom=()=>{}
    } = MODALS[type] || {}

    return html`
      <div class="button-page">
        <h1>Unity Modal Examples</h1>

        ${Object.values(MODALS).map(({key, title}) => html`
          <div class="section">
            <unity-button
              label="Toggle Modal: ${title}"
              gradient
              @click=${() => this.toggleModal(key)}
            ></unity-button>
          </div>
        `)}
        <div class="modal">
          <unity-modal
            ?show="${open}"
            .title="${title}"
            .toggle="${() => this.toggleModal(type)}"
            ?cancelOnOutsideClick="${!title}"
          >
            ${top(() => this.toggleModal(type))}
            ${body}
            ${bottom(() => this.toggleModal(type))}
          </unity-modal>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-modal', MyModal)
