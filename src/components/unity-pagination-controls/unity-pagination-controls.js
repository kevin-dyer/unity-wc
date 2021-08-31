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
* @param {Number} [currentPage], page number of current page. If not defined, will not be displayed.
* @param {Number} [pageCount], total number of pages. If currentPage or pageCount is not defined, will not be displayed.
* @param {Boolean} [hasPrevPage], indicates if there is a previous page to fetch
* @param {Boolean} [hasNextPage], indicates if there is a next page to fetch
* @param {Boolean} [showLastPage], indicates if the button to navigate to last page is visible, defaults to false.
* @param {Function} [onFirstPageClick], callback when first page button is clicked. Typically used to trigger an api request.
* @param {Function} [onPrevPageClick], callback when previous page button is clicked. Typically used to trigger an api request.
* @param {Function} [onNextPageClick], callback when next page button is clicked. Typically used to trigger an api request.
* @param {Function} [onLastPageClick], callback when last page button is clicked. Typically used to trigger an api request.
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
    this.showLastPage = false
    this.currentPage = undefined
    this.pageCount = undefined

    //TODO: track pagination cursor
    this.onFirstPageClick = () => {}
    this.onPrevPageClick = () => {}
    this.onNextPageClick = () => {}
    this.onItemsPerPageUpdate = () => {}
    this.onLastPageClick = () => {}

    this._isResultsPerPageExanded = false
  }

  static get properties() {
    return {
      id: { type: String },
      itemsPerPage: { type: Number },
      currentPage: { type: Number },
      pageCount: { type: Number },
      hasPrevPage: { type: Boolean },
      hasNextPage: { type: Boolean },
      showLastPage: { type: Boolean },
      onFirstPageClick: { type: Function},
      onPrevPageClick: { type: Function },
      onNextPageClick: { type: Function },
      onItemsPerPageUpdate: { type: Function },
      onLastPageClick: { type: Function },

      _isResultsPerPageExanded: { type: Boolean }
    }
  }

  handleItemsPerPageSelect(itemsPerPage) {
    const itemsNum = Number(itemsPerPage)
    this.onItemsPerPageUpdate(itemsNum)

    this.itemsPerPage = itemsPerPage
    this._isResultsPerPageExanded = false
  }

  toggleMenuExpand(expanded) {
    this._isResultsPerPageExanded = typeof(expanded) === 'boolean' ? expanded : !this._isResultsPerPageExanded
  }

  handleFirst() {
    if (!this.hasPrevPage) return

    this.onFirstPageClick({itemsPerPage: this.itemsPerPage})
  }

  handlePrev() {
    if (!this.hasPrevPage) return
    this.onPrevPageClick({itemsPerPage: this.itemsPerPage})
  }

  handleNext() {
    if (!this.hasNextPage) return
    this.onNextPageClick({itemsPerPage: this.itemsPerPage})
  }

  handleLast() {
    if (!this.showLastPage || !this.hasNextPage) return
    this.onLastPageClick({itemsPerPage: this.itemsPerPage})
  }

  render() {
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
        ${this.currentPage
          ? html`<unity-typography id="page-number">
              ${this.currentPage} ${this.pageCount ? `/${this.pageCount}` : null}
            </unity-typography>`
          : null
        }
        <unity-button
          id="next-page-button"
          class="pagination-btn"
          title="Next"
          centerIcon="chevron-right"
          type="borderless"
          ?disabled="${!this.hasNextPage}"
          @click=${this.handleNext}
        ></unity-button>
        ${this.showLastPage
          ? html`<unity-button
              id="last-page-button"
              class="pagination-btn"
              title="Last"
              centerIcon="icons:last-page"
              type="borderless"
              ?disabled="${!this.hasNextPage}"
              @click=${this.handleLast}
            ></unity-button>`
          : null
        }
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
        #page-number {
          height: 30px;
          line-height: 30px;
          margin-right: 12px;
        }
      `
    ];
  }
}

window.customElements.define('unity-pagination-controls', UnityPaginationControls)
