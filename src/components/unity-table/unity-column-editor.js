import { LitElement, html, css } from 'lit-element'
import '@polymer/paper-checkbox/paper-checkbox.js'
import '@polymer/paper-icon-button/paper-icon-button.js'
import '@polymer/iron-icons/iron-icons.js'
// import '@polymer/paper-spinner/paper-spinner-lite.js'


import '@polymer/paper-dialog/paper-dialog';
import '@polymer/paper-dialog-scrollable';

//TODO: Import from bit
import '../unity-button/unity-button.js'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Displays button which will open column editor modal.
 * @name UnityTable
 * @param {[]} data, array of objects
 * @param {[]} columns, array of objects, relates to data's object keys
 * @param {bool} headless
 * @param {bool} selectable
 * @param {bool} isLoading
 * @param {string} emptyDisplay
 * @param {func} onClickRow, func that is sent the data of the element clicked, and the event of the click
 * @param {func} onSelectionChange, func that is sent the currently selected elements as an array
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-table
 *    ?headless="${false}"
 *    ?isLoading="${false}"
 *    emptyDisplay="No information found."
 *    .data="${[
 *      {
 *        column1: 'item 1 col1',
 *        column2: 'item 1 col2',
 *        column3: 'item 1 col3',
 *        columnN: 'item 1 colN',
 *        icon: 'iron-iconName'
 *      },
 *      {
 *        column1: 'item 2 col1',
 *        column2: 'item 2 col2',
 *        column3: 'item 2 col3',
 *        columnN: 'item 2 colN',
 *        icon: 'iron-iconName'
 *      },
 *      {
 *        column1: 'item n col1',
 *        column2: 'item n col2',
 *        column3: 'item n col3',
 *        columnN: 'item n colN',
 *        icon: 'iron-iconName'
 *      }
 *    ]}"
 *    .columns="${[
 *      {
 *        key: 'column2',
 *        label: 'Column #2'
*         format: (colValue, datum) => `Building: ${colValue}`
 *      },
 *      {
 *        key: 'columnN',
 *        label: 'Column #N'
 *        format: (colValue, datum) => html`<span style="${myStyle}">Room: ${colValue}</span>`
 *      },
 *      {
 *        key: 'column1',
 *        label: 'Column #1'
 *        format: column1Handler
 *      }
 *    ]}"
 *    ?selectable="${true}"
 *    .onSelectionChange="${selected => console.log('These elements are selected: ', selected')}"
 *  />
 */

//   Table, at minimum, takes an array of the data being passed in. Each data index
//   should be an object with uniform keys. Actions are handled outside of table,
//   but are dependant on what's selected. As such, if outside source wants access
//   to the selected elements, a function should be passed in to process the
//   selected data. In addition, a predefined column array can be passed in to
//   determine order and size of columns in the table. If not passed in, then a
//   default will be made from each key on the data object.
//
//   data:                   array of datum objects, non-uniform shape
//                           each key is a viable column, with icon available for rendering leading row icon
//   columns:                array of column objects, can contain format function (returns string or Lit HTML string)
//                           {key (related to datum keys), label (label rendered) width, format (func to format cell data)}
//   headless:               bool to control head render, include to have no table header
//   selectable:             bool to control if rows should be selectable
//   onSelectionChange:      callback function, recieves selected array when it changes
//   emptyDisplay:           String to display when data array is empty
//   isLoading:              Boolean to show spinner instead of table
//   keyExtractor         :  Function to define a unique key on each data element
//   childKeys            :  Array of attribute names that contain list of child nodes, listed in the order that they should be displayed
//   filter               :  String to find in any column, used to set internal _filter
//   onExpandedChange     :  On Change Callback Function for expanded array
//
//   Internals for creating/editing
//   _data:                  data marked w/ rowId for uniq references
//   _selected:              Set of keys of elements that are selected, sent to onSelectionChange
//   _sortBy:                object with column to sort by and direction, default all unsorted
//                           sorting is done off of data's values, which can cause disconnect if format changes rendered values too much
//   _filter:                string to find in any column
//   _filteredList:          filtered list of indicies from _data
//   _sortedList:            sorted version of _filteredList, this is what the displayed table is built from
//
//   Features to be implemented
//   controls:               determines use of internal filter and sort, exclude if using internal sort/filter
//   onSearchFilter:         function to be called when filter changes if controls are EXT
//                           sends in string to filter by
//   filterDebounceTimeout:  TBD
//   filterThrottleTimeout:  TBD
//   onColumnSort:           function to be called when sortBy changes if controls are EXT
//                           sends string of column name and string for ascending or descending
//   onColumnChange:         Callback to update changes to the rendered columns
//   onEndReached:           function to be called to request more pages to support infiniscroll
//                           only works with controls set to EXT
//   onEndReachedThreshold:  TBD


class UnityColumnEditor extends LitElement {
  // internals
  constructor() {
    super()
    this.dialogVisible = true
    this.columns = [{name: 'fake name'}, {name: 'kevin'}]
  }

  // inputs
  static get properties() {
    return {
      // keyExtractor: {type: Function},
      dialogVisible: {type: Boolean}
    }
  }

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible
    console.log("this.dialogVisible: ", this.dialogVisible)
  }

  handleColumnCheck(colKey) {
    console.log("handleColumnCheck colKey: ", colKey)
  }

  renderRow(col) {
    return html`
      <div class="row">
        <div class="checkbox-container">
          <paper-checkbox
            noink
            .checked="${true}"
            @click="${this.handleColumnCheck}"
          ></paper-checkbox>
        </div>

        <div class="column-content">

          <div class="column-name">
            ${col.name}
          </div>

          <paper-icon-button
            icon="icons:menu"
            @click="${()=>{console.log("menu clicked")}}"
          ></paper-icon-button>
        </div>
      </div>
    `
  }

  render() {

    // if isLoading, show spinner
    // if !hasData, show empty message
    // show data
    return html`
      <unity-button
        label="Edit Columns"
        gradient
        @click=${this.toggleDialog.bind(this)}
      >

      </unity-button>

      <paper-dialog
        id="dialog"
        ?opened="${this.dialogVisible}"
      >
        <h2 class="dialog-title">Edit Columns</h2>

        <paper-dialog-scrollable>
          <div class="list-container">
            ${this.columns.map(this.renderRow.bind(this))}
          </div>
        </paper-dialog-scrollable>
      </paper-dialog>
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          font-family: var(--font-family, var(--default-font-family));
          font-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          font-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          color: var(--black-text-color, var(--default-black-text-color));
          border-collapse: collapse;
          --paper-checkbox-size: 14px;
          --paper-checkbox-unchecked-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          --paper-checkbox-checked-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-rgb)));
          --paper-checkbox-unchecked-ink-color: rgba(0,0,0,0);
          --paper-checkbox-checked-ink-color: rgba(0,0,0,0);
          --paper-spinner-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-gb)));
          --thead-height: 33px;
          --trow-height: 38px;
        }

        paper-dialog {
          min-width: 450px;
        }

        paper-dialog-scrollable {
          margin: 0;
        }

        .dialog-title {
          font-size: var(--header2-selected-font-size, var(--default-header2-selected-font-size));
          font-weight: var(--header2-selected-font-weight, var(--default-header2-selected-font-weight));
          border-bottom: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
          margin-top: 0;
          padding: 0 12px;
          height: 50px;
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .list-container {
          margin: 0 -24px;
        }

        .row {
          height: 40px;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          border-bottom: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        .checkbox-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 12px;
          padding-right: 4px;
          border-right: 1px solid var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        paper-icon-button {
          color: var(--light-grey-text-color, var(--default-light-grey-text-color));
        }

        .column-content {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0 12px;
        }
      `
    ]
  }
}

window.customElements.define('unity-column-editor', UnityColumnEditor)