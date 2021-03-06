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

// import './unity-button/unity-button.js'
import '@bit/smartworks.unity.unity-button';

import './unity-table/unity-table.js'
import '@polymer/paper-input/paper-input.js';

import './unity-layout/unity-page-header.js'
// import './unity-text-input/unity-text-input.js'
import '@bit/smartworks.unity.unity-text-input';

import './unity-layout/unity-split-pane.js'
// import '@bit/smartworks.unity.unity-split-pane'

import '@bit/smartworks.unity.unity-typography';

import './unity-table/unity-column-editor.js'


// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';


//Extra rows of fake data to test infinite scroll
let fillerRows = []

for(let i=0; i<200; i++) {
  fillerRows.push({
    id: `grey-${i}`,
    name: `grey-${i}`,
    hex: `#4545${i % 45}`,
    favorite: false,
    icon: 'icons:add'
  })
}
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


  //TO add extra rows
  ...fillerRows
]

const exampleColumns = [
  {
    key: 'hex',
    label: 'Hex value',
    width: 200,
    format: (hex, datum) => ({label: hex, content: html`<span style="color: ${hex}">${hex}</span>`})
  },
  {
    key: 'name',
    label: 'Color',
    width: 300,
    format: (name, datum) => ({label: !!name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : ''})
  },
  {
    key: 'favorite',
    label: 'Favourite?',
    width: 500,
    format: (value, datum) => ({label: value ? 'I love it!' : 'passible, I guess'})
  }
]

const exampleFilters = [{column: "name", values: ["Grey"], include: false} ]


class MySplitPane extends PageViewElement {
  constructor() {
    super()

    this._searchText = ''

    this.columns = [...exampleColumns] //For Column Editor
    this.collapsed = false // split-pane collapse
    this._visibleColumns = [...exampleColumns] //For Table display
    this._columnFilters = exampleFilters
    this.highlightedRowId = ''
    this.highlightedRow = {}
    this.highlightColor = ''
    this.showDetails = false
  }

  static get properties() {
    return {
      _searchText: { type: String },
      columns: { type: Array },
      collapsed: { type: Boolean },
      _visibleColumns: { type: Array },
      highlightedRowId: { type: String },
      highlightedRow: { type: Object },
      highlightColor: { type: String },
      showDetails: { type: Boolean }
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
        #title {
          margin-left: 16px;
          overflow: var(--left-wrapper-overflow);
          white-space: var(--title-white-space);
        }
        .example-container {
          border: 1px dashed black;
          position: relative;
          top: 50px;
          margin: 0 auto;
          width: 800px;
        }

        .header-container {
          width: 100%;
        }

        .footer-container {
          height: 40px;
          border-top: 2px solid var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          text-align: center;
          padding-top: 10px;
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
        .pane {
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `
    ];
  }

//   handleSearchInput(e={}) {
//     const {target: {value}={}} = e
//
//     this._searchText = value || ''
//   }

  onInputChange(e, value) {
    this._searchText = value || ''
  }

  handleColUpdate(nextColumns) {
    console.log("handleColUpdate nextColumns: ", nextColumns)
    // this.columns = nextColumns
    this._visibleColumns = nextColumns
  }

  handleEditColumns() {
    //TODO: display edit column modal!
    console.log("handleEditColumns called!")
  }

  onFilterChange(filters) {
    this._columnFilters = filters;
  }

  handleClickRow(element, key, event) {
    console.log('This element was clicked:', element)
    console.log('This was the key of the element:', key)
    console.log('This was the clicked event:', event)
    this.highlightedRowId = this.highlightedRowId === key ? '' : key
  }

  handleRowHighlighted(element={}) {
    console.log('This element was highlighted:', element)
    this.highlightColor = element.hex
    this.highlightedRow = element
  }

  toggleDetails() {
    this.highlightedRowId = ''
  }

  toggleCollapse(value=!this.collapsed) {
    this.collapsed = value
  }

  render() {
    console.log('exampleData', exampleData)
    console.log('this.highlightedRow', this.highlightedRow)
    return html`
      <unity-split-pane
        closeButton
        ?show="${!!this.highlightedRowId}"
        ?collapsed="${!!this.collapsed}"
        .onClose="${this.toggleDetails.bind(this)}"
        .onCollapseChange="${this.toggleCollapse.bind(this)}"
      >
        <unity-page-header slot="header" >
          <unity-button
            slot="left-content"
            centerIcon="unity:double_left_chevron"
            @click=${()=>this.toggleCollapse()}
            ?disabled="${!this.highlightedRowId}"
          ></unity-button>
          <unity-typography
            slot="center-content"
            size="header1"
            id="title"
          >
            Unity Table
          </unity-typography>
          <div slot="right-content">
            <unity-text-input
              ?rounded=${true}
              innerLeftIcon="icons:search"
              .value="${this._searchText}"
              placeholder="${"Search input"}"
              .onChange="${this.onInputChange.bind(this)}"
            ></unity-text-input>

            <unity-column-editor
              ?buttonGradient=${false}
              ?buttonOutlined=${true}
              .columns=${this.columns}
              .onUpdate=${this.handleColUpdate.bind(this)}
            ></unity-column-editor>
          </div>
        </unity-page-header>

        <div
          slot="footer"
          class="footer-container"
        >
            <unity-typography size='header2'>Footer</unity-typography>
        </div>

        <unity-table
          noTopBorder
          slot="main"
          selectable
          filter="${this._searchText}"
          .keyExtractor="${(datum, index) => datum.name}"
          .childKeys="${['children']}"
          .data="${exampleData}"
          .columns="${this._visibleColumns}"
          .columnFilter="${this._columnFilters}"
          .onFilterChange="${this.onFilterChange}"
          endReachedThreshold="${200}"
          .onEndReached="${() => {
            console.log("my-table end reached!")
          }}"
          .highlightedRow="${this.highlightedRowId}"
          .onHighlight="${this.handleRowHighlighted.bind(this)}"
          .onSelectionChange="${selected => console.log('These elements are selected:', selected)}"
          .onClickRow="${this.handleClickRow.bind(this)}"
          .onDisplayColumnsChange="${displayColumns => console.log("displayColumns has changed: ", displayColumns)}"
          .onColumnChange="${columns => console.log("onColumnChange callback cols: ", columns)}"

          style="--highlight-color: ${this.highlightColor}"
        >
        </unity-table>
        <div class="pane" slot="pane">
          ${JSON.stringify(this.highlightedRow)}
        </div>
      </unity-split-pane>
    `
  }
}

window.customElements.define('my-split-pane', MySplitPane);
