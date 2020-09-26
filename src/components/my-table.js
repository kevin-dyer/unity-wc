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
import '@polymer/iron-icons/av-icons.js'
import '@polymer/paper-input/paper-input.js';

import '@bit/smartworks.unity.unity-core/unity-page-header'
import '@bit/smartworks.unity.unity-core/unity-button';
// import '@bit/smartworks.unity.unity-core/unity-table'
import './unity-table/unity-table.js'
import '@bit/smartworks.unity.unity-core/unity-text-input';
import '@bit/smartworks.unity.unity-core/unity-column-editor'
import '@bit/smartworks.unity.unity-core/unity-table-export'

import { PageViewElement } from './page-view-element.js';
import { SharedStyles } from './shared-styles.js'; // These are the shared styles needed by this element.
import {devices} from './unity-table/fakeData'
// import {customContentTest as devices} from './unity-table/fakeData'
// import {deviceData} from './unity-table/largeDataSet'



const data = devices.data
const columns = devices.columns
const childKeys = devices.childKeys
const filters = devices.filters

class MyTable extends PageViewElement {
  constructor() {
    super()

    this._searchText = ''

    this.data = [...data]
    // this.data = [...deviceData] //For testing Large Data Set
    this.columns = [...columns] //For Column Editor
    this.childKeys = [...childKeys]
    this._visibleColumns = [...columns] //For Table display
    this._columnFilters = filters
    this.highlightedRow = ''
    this.showDetails = false
    this.tableRef = undefined
    // this.selected = ["abc001"]
    this.selected = []
  }

  static get properties() {
    return {
      _searchText: { type: String },
      columns: { type: Array },
      _visibleColumns: { type: Array },
      highlightedRow: { type: String },
      showDetails: { type: Boolean },
      tableRef: { type: Object },
      showDetails: { type: Boolean },
      selected: { type: Array }
    }
  }
//   handleSearchInput(e={}) {
//     const {target: {value}={}} = e
//
//     this._searchText = value || ''
//   }

  firstUpdated(changedProperties) {
    this.updateComplete.then(() => {
      this.tableRef = this.shadowRoot.getElementById('unity-table')
    })
  }

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

  handleClickRow(element, key, event) {
    console.log('This element was clicked:', element)
    console.log('This was the key of the element:', key)
    console.log('This was the clicked event:', event)
    this.highlightedRow = key
    this.showDetails = true
  }

  onFilterChange(filters) {
    this._columnFilters = filters;
  }

  _keyExtractor(datum, index) {
    // return datum.name
    return datum.id
  }

  _slotIdExtractor(row, column) {
    return `${row._rowId}-${column.key}`
  }

  _renderStatusIcons() {
    const columnKey = 'status'
    let nodes = this.data

    //Breadth First Search traverse to flatten hierarchy
    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      this.childKeys.forEach(childKey => {
        const children = node[childKey]
        if (Array.isArray(children)) {
          nodes = [...nodes, ...children]
        }
      })
    }

    const slots = nodes.filter((row, index) => {
      const status = row[columnKey] || ''

      return /Online|Offline|Not responding|Not Responding|Active|Probable to fail/.test(status)
    }).map((row, index) => {
      const rowId = this._keyExtractor(row, index)
      let color

      switch(row[columnKey]) {
        case 'Active':
          color = 'green'
          break
        case 'Not Responding':
          color = 'red'
          break
        case 'Probable to fail':
          color = 'yellow'
          break

        //From largeDataSet
        case 'Offline':
          color = 'black'
          break
        case 'Not responding':
          color = 'red'
          break
        case 'Online':
          color = 'green'
          break

        default:
          color = 'white'
          break
      }

      return html`<iron-icon
        slot="${rowId}-${columnKey}"
        icon="av:fiber-manual-record"
        style="color: ${color}; flex:1;"
      ></iron-icon>`
    })

    return slots
  }

  _renderRightActions() {
    return html`
      <div class="right-actions-container" slot="right-actions">
        <unity-column-editor
          ?buttonGradient=${false}
          ?buttonOutlined=${true}
          .columns=${this.columns}
          .onUpdate=${this.handleColUpdate.bind(this)}
          .buttonProps=${{centerIcon: 'settings', type: 'borderless'}}
        ></unity-column-editor>
      </div>
    `
  }

  render() {
    return html`
      <div class="example-container">

        <unity-page-header
          header="Unity Table"
        >
          <div slot="right-action">
            <unity-text-input
              ?rounded=${true}
              innerLeftIcon="icons:search"
              .value="${this._searchText}"
              placeholder="${"Search input"}"
              .onChange="${this.onInputChange.bind(this)}"
            ></unity-text-input>

            <unity-table-export .tableRef=${this.tableRef}>
              <unity-typography size="paragraph">
                Export
              </unity-typography>
            </unity-table-export>
          </div>
        </unity-page-header>

        <div class="table-container">
          <unity-table
            noTopBorder
            selectable
            filter="${this._searchText}"
            .keyExtractor="${this._keyExtractor}"
            .slotIdExtractor="${this._slotIdExtractor}"
            .childKeys=${childKeys}
            .data="${this.data}"
            .columns="${this._visibleColumns}"
            .columnFilter="${this._columnFilters}"
            .onFilterChange="${this.onFilterChange}"
            endReachedThreshold="${200}"
            .onEndReached="${() => {
              console.log("my-table end reached!")
            }}"
            .highlightedRow="${this.highlightedRow}"
            .selected="${this.selected}"
            .onSelectionChange="${selected => {
              console.log('These elements are selected:', selected)
              this.selected = selected.map(({id})=>id)
            }}"
            .onClickRow="${this.handleClickRow.bind(this)}"
            .onDisplayColumnsChange="${displayColumns => console.log("displayColumns has changed: ", displayColumns)}"
            .onColumnChange="${columns => console.log("onColumnChange callback cols: ", columns)}"
            id="unity-table"
          >
            ${this._renderRightActions()}
            ${this._renderStatusIcons()}

          </unity-table>
        </div>
      </div>
    `
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
          min-height: 0;
          position: relative;
          display: inline-flex;
          flex-direction: column;
          flex-wrap: nowrap;
        }

        .header-container {
          width: 100%;
          flex: "0 1 auto";
        }

        .table-container {
          flex: 1;
          min-height: 0;
        }

        paper-input {
          margin-right: 20px;
          width: 300px;
        }

        unity-page-header {
          flex: "0 1 auto";
        }
        .table-container {
          position: relative;
          flex: 1
        }
      `
    ];
  }

}

window.customElements.define('my-table', MyTable);
