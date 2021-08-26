import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-popover'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

import './query-filter.js'


const initFilter = {
  operator: undefined,
  value: ''
}

const initOperators = [
  {
    "label": "==",
    "id": "eq"
  },
  {
    "label": "!=",
    "id": "neq"
  },
  {
    "label": ">",
    "id": "gt",
  },
  {
    "label": ">=",
    "id": "gte",
  },
  {
    "label": "<",
    "id": "lt",
  },
  {
    "label": "<=",
    "id": "lte",
  }
]

class QueryFilterDropdown extends LitElement {
  constructor() {
    super()
    this.show = false;
    this.onValueChange = () => {};
    // this.operators = initOperators
    this._filters = [initFilter]
    this._operators = initOperators
  }

  static get properties() {
    return {
      show: { type: Boolean },
      filters: { type: Array },
      onValueChange: { type: Function },
      operators: {type: Array },
      singleFilter: { type: Boolean },
      _filters: { type: Array }
    }
  }

  set filters(filters=[]) {
    this._filters = filters.length > 0 ? filters : [initFilter]
  }

  get filters() {
    return this._filters
  }

  set operators(operators=[]) {
    this._operators = operators.length > 0 ? operators : initOperators
  }

  get operators() {
    return this._operators
  }

  toggleDropdown(show) {
    this.show = typeof show === 'boolean' ? show : !this.show
  }

  handleAddFilter() {
    this.filters = [...this.filters, initFilter]
  }

  handleFilterChange({operator, value}, index) {
    this.filters[index] = {operator, value}
  }

  handleFilterDelete(index) {
    this.filters = [...this.filters.slice(0, index), ...this.filters.slice(index + 1)]
  }

  handleClose() {
    this.toggleDropdown(false)

    const validFilters = this.filters.filter(({operator, value}) => {
      //remove empty queries
      if (!operator) return false

      //remove filters with gt or lt operator and a non-numerical value
      if (/gt|gte|lt|lte/.test(operator)) {
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
              .operator="${filter.operator}"
              .value="${filter.value}"
              .operators="${this.operators}"
              .onValueChange=${filter => this.handleFilterChange(filter, index)}
              .onDelete=${() => this.handleFilterDelete(index)}
            >
            </query-filter>`
          )}

          <div class="controls">
            ${singleFilter ? null :
              html`<unity-button
                centerIcon="unity:add"
                type="borderless"
                @click=${this.handleAddFilter.bind(this)}
                class="add-filter-button"
              >
              </unity-button>`
            }
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
