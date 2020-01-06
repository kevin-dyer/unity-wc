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
import './unity-layout/unity-page-header.js'
import './unity-button/unity-button.js'
import './unity-table/unity-table.js'
import '@polymer/paper-input/paper-input.js';

import './unity-layout/unity-page-header.js'
import './unity-text-input/unity-text-input.js'


// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';


// example table data, should eventually turn into controls
// normally this would be taken from the store
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


class MyTable extends PageViewElement {
  constructor() {
    super()

    this.searchText = ''
  }

  static get properties() {
    return {
      searchText: {type: String}
    }
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .example-container {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .header-container {
          width: 100%;
        }

        .table-container {
          flex: 1;
          position: relative;
        }

        unity-table {
        }

        paper-input {
          margin-right: 20px;
          width: 300px;
        }

        unity-page-header {
          flex: 0;
        }
        .table-container {
          position: relative;
          flex: 1
        }
      `
    ];
  }

  handleSearchInput(e={}) {
    const {target: {value}={}} = e

    this.searchText = value || ''
  }

  handleEditColumns() {
    //TODO: display edit column modal!
    console.log("handleEditColumns called!")
  }

  render() {

    console.log("")
    return html`
      <div class="example-container">
        <div class="header-container">
          <unity-page-header
            title="MOCC2 Title2"
          >
            <div slot="right-content">
              <paper-input
                label="Search Input"
                @input="${this.handleSearchInput}"
              ></paper-input>

              <unity-button
                label="Edit Columns"
                ?gradient=${true}
                ?disabled=${false}
                @click=${this.handleEditColumns}
              ></unity-button>
            </div>
          </unity-page-header>
        </div>


        <div class="table-container">
          <unity-table
            selectable
            filter="${this.searchText}"
            .keyExtractor="${(datum, index) => datum.name}"
            .childKeys="${['children']}"
            .data="${exampleData}"
            .columns="${exampleColumns}"

            .onSelectionChange="${selected => console.log('These elements are selected:', selected)}"
            .onClickRow="${(element, event) => console.log('This element was clicked:', element, '\nThis was the clicked event:', event)}"
            .onColumnChange="${columns => console.log("onColumnChange callback cols: ", columns)}"
          ></unity-table>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-table', MyTable);
