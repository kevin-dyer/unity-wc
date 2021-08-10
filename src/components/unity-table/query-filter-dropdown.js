import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-popover'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

import './query-filter.js'


const initFilter = {
  operation: undefined,
  value: ''
}

class QueryFilterDropdown extends LitElement {
  constructor() {
    super()
    this.show = false;
    this.onValueChange = () => {};
    this.filters = [initFilter]
  }

  static get properties() {
    return {
      show: { type: Boolean },
      filters: { type: Array },
      onValueChange: { type: Function },

      _filters: { type: Array}
    }
  }

  set filters(filters) {
    if (filters) {
      this._filters = filters
    }
  }

  get filters() {
    return this._filters
  }

  toggleDropdown(show) {
    this.show = typeof show === 'boolean' ? show : !this.show
  }

  handleAddFilter() {
    this.filters = [...this.filters, initFilter]
  }

  handleFilterChange({operation, value}, index) {
    this.filters[index] = {operation, value}
  }

  handleFilterDelete(index) {
    this.filters = [...this.filters.slice(0, index), ...this.filters.slice(index + 1)]
  }

  handleClose() {
    this.toggleDropdown(false)

    const validFilters = this.filters.filter(({operation, value}) => {
      //remove empty queries
      if (!operation) return false

      //remove filters with gt or lt operation and a non-numerical value
      if (/gt|gte|lt|lte/.test(operation)) {
        if (!value || isNaN(value)) {
          return false
        }
      }

      return true
    })

    //remove invalid filters
    this.filters = validFilters.length === 0 ? [initFilter] : validFilters

    //Alert table of filter change
    this.onValueChange(validFilters)
  }

  hasAppliedFilters() {
    const {filters=[]} = this
    if (filters.length > 1) return true
    if (filters.length === 1 && filters[0] !== initFilter) return true
    return false
  }

  render() {
    const {
      filters=[],
    } = this

    return html`<unity-popover
        id="column-filter-query"
        closeOnOutsideClick="${true}"
        ?show="${this.show}"
        .onClose="${this.handleClose.bind(this)}"
        .offsetModifier="${[0, 10]}"
      >
        <unity-button
          slot="on-page-content"
          centerIcon="unity:filter"
          type="borderless"
          @click=${() => this.toggleDropdown()}
          class="${this.hasAppliedFilters() ? "filtered" : ""}"
        ></unity-button>
        </unity-button>
        
        <div
          slot="popover-content"
          id="popover-content"
        >
          <unity-typography>Column Filters</unity-typography>
          ${filters.map((filter, index) => html`<query-filter
              .operation="${filter.operation}"
              .value="${filter.value}"
              .onValueChange=${filter => this.handleFilterChange(filter, index)}
              .onDelete=${() => this.handleFilterDelete(index)}
            >
            </query-filter>`
          )}

          <div class="controls">
            <unity-button
              centerIcon="unity:add"
              type="borderless"
              @click=${this.handleAddFilter.bind(this)}
              class="add-filter-button"
            >
            </unity-button>
          </div>
        </div>


      </unity-popover>      
    `;
  }

    static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        * {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        :host {
          display: flex;
          align-items: center;
          --filter-button-color: var(--black-color, var(--default-black-color));
        }

        unity-button {
          display: flex;
          /*flex: 1;*/
          align-items: center;
          align-self: center;
          height: 22px;
          width: 22px;
          margin-right: 2px;
          --button-color: var(--filter-button-color);
          --paper-button-ink-color: transparent;
        }
        .filtered {
          --button-borderless-text-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --button-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --pressed-color: var(--primary-brand-color, var(--default-primary-brand-color));
        }

        unity-popover {
          --popover-z-index: 200;
          --popover-content-overflow: visible;
        }
        #popover-content {
          cursor: initial;
          position: relative;
          margin-bottom: 4px;
        }
        .controls {
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }
      `
    ]
  }
}

  window.customElements.define('query-filter-dropdown', QueryFilterDropdown)
