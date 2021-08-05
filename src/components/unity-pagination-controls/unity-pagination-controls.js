// === IMPORTS ===
import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-typography'
import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-text-input'
import '@bit/smartworks.unity.unity-popover'

/**
 * @name UnityPaginationControls
* @description Renders a control bar for navigating through a set of paginated results.
* @param {String} [id], id of controls used for accessing in DOM
* @param {Number} [itemsPerPage], number of items to be displayed per page.
* @param {Boolean} [hasPrevPage], indicates if there is a previous page to fetch
* @param {Boolean} [hasNextPage], indicates if there is a next page to fetch
* @param {Function} [onFirstPageClick], callback when first page button is clicked. Typically used to trigger an api request.
* @param {Function} [onPrevPageClick], callback when previous page button is clicked. Typically used to trigger an api request.
* @param {Function} [onNextPageClick], callback when next page button is clicked. Typically used to trigger an api request.
* @param {Function} [onItemsPerPageUpdate], callback when number of items per page is updated.
* @example
* <unity-pagination-controls
*   id="things-list-controls"
*   itemsPerPage="25"
*   hasNextPage
*   .onFirstPageClick="${e => console.log("TODO: fetch first page of results")}"
*   .onPrevPageClick="${e => console.log("TODO: fetch previous page of results")}"
*   .onNextPageClick="${e => console.log("TODO: fetch next page of results")}"
*   .onItemsPerPageUpdate="${itemsPerPage => console.log("Items per page has been updated: ", {itemsPerPage})}"
* >
* </unity-pagination-controls>
**/

// === CONSTANTS ===
const itemsPerPageOptions = [
  {
    label: "15",
    id: "15"
  },
  {
    label: "25",
    id: "25"
  },
  {
    label: "50",
    id: "50"
  },
  {
    label: "100",
    id: "100"
  },
]

// === COMPONENT ===
class UnityPaginationControls extends LitElement {

  constructor() {
    super()

    this.id=""
    this.itemsPerPage=25
    this.hasPrevPage = false
    this.hasNextPage = false

    //TODO: track pagination cursor
    this.onFirstPageClick = () => {}
    this.onPrevPageClick = () => {}
    this.onNextPageClick = () => {}
    this.onItemsPerPageUpdate = () => {}

    this._isResultsPerPageExanded = false
  }

  static get properties() {
    return {
      id: { type: String },
      itemsPerPage: { type: Number },
      hasPrevPage: { type: Boolean },
      hasNextPage: { type: Boolean },
      onFirstPageClick: { type: Function},
      onPrevPageClick: {type: Function},
      onNextPageClick: {type: Function},
      onItemsPerPageUpdate: {type: Function},

      _isResultsPerPageExanded: {type: Boolean}
    }
  }

  handleItemsPerPageSelect(itemsPerPage) {
    console.log("handleItemsPerPageSelect ", {itemsPerPage, 'this.onItemsPerPageUpdate': this.onItemsPerPageUpdate})
    const itemsNum = Number(itemsPerPage)
    this.onItemsPerPageUpdate(itemsNum)

    this.itemsPerPage = itemsPerPage
    this._isResultsPerPageExanded = false
  }

  toggleMenuExpand(expanded) {
    console.log("calling toggleMenuExpand to: ", !this._isResultsPerPageExanded)
    this._isResultsPerPageExanded = typeof(expanded) === 'boolean' ? expanded : !this._isResultsPerPageExanded
  }

  handleFirst() {
    if (!hasPrevPage) return

    this.onFirstPageClick({itemsPerPage: this.itemsPerPage})
  }

  handlePrev() {
    if (!hasPrevPage) return
    this.onPrevPageClick({itemsPerPage: this.itemsPerPage})
  }

  handleNext() {
    if (!hasNextPage) return
  }

  render() {

      // <unity-text-input
      //   slot="on-page-content"
      //   .value="${this.itemsPerPage}"
      //   hideErrors
      //   .innerRightIcon="${"unity:options"}"
      //   @click="${this.toggleMenuExpand}"
      //   @blur="${this.handleInputBlur}"
      // >
      // </unity-text-input>
    // <unity-dropdown
    //         id="results-per-page-dropdown"
    //         inputType="single-select"
    //         .options="${itemsPerPageOptions}"
    //         .selected="[${this.itemsPerPage}]"
    //         ?autoFitOnAttach="${true}"
    //         ?dynamicAlign="${true}"
    //       >

    console.log("this._isResultsPerPageExanded: ", this._isResultsPerPageExanded)
    return html`
      <div id="${this.id}" class="unity-pagination-controls">
        <div id="results-per-page-control">
          <unity-typography id="results-per-page-title">
            Results per page
          </unity-typography>

          <unity-popover
            id="results-per-page-menu"
            closeOnOutsideClick="${true}"
            ?show="${this._isResultsPerPageExanded}"
            .onClose="${e => this.toggleMenuExpand(false)}"
          >

            <unity-button
              slot="on-page-content"
              label="${this.itemsPerPage}"
              rightIcon="unity:up_chevron"
              @click="${this.toggleMenuExpand}"
              type="borderless"
            >
            </unity-button>
            <unity-select-menu
              slot="popover-content"
              .options="${itemsPerPageOptions}"
              .onMenuClick="${this.handleItemsPerPageSelect.bind(this)}"
              .highlighted="${[this.itemsPerPage]}"
              borderless
            >

            </unity-select-menu>
          </unity-popover>

          

          
        </div>

        <unity-button
          id="first-page-button"
          class="pagination-btn"
          title="First page"
          centerIcon="icons:first-page"
          type="borderless"
          ?disabled="${!this.hasPrevPage}"
          @click=${this.handleFirst}
        ></unity-button>
        <unity-button
          id="previous-page-button"
          class="pagination-btn"
          title="Previous"
          centerIcon="chevron-left"
          type="borderless"
          ?disabled="${!this.hasPrevPage}"
          @click=${this.handlePrev}
        ></unity-button>
        <unity-button
          id="next-page-button"
          class="pagination-btn"
          title="Next"
          centerIcon="chevron-right"
          type="borderless"
          ?disabled="${!this.hasNextPage}"
          @click=${this.handleNext}
        ></unity-button>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          /*flex: 0;*/
          width: 100%;
          --popover-padding: 0;
          --popover-z-index: 200;
        }
        .unity-pagination-controls {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: stretch;
        }
        #results-per-page-control {
          display: flex;
          align-items: center;
        }
        #results-per-page-title {
          white-space: nowrap;
        }

        unity-select-menu {
          width: 100%;

        }
        .pagination-btn {
          margin-right: 12px;
        }
      `
    ];
  }
}

window.customElements.define('unity-pagination-controls', UnityPaginationControls)
