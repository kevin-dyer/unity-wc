import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-text-input'
import '@bit/smartworks.unity.unity-dropdown'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

const expressionOptions = [
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
const defaultExp = expressionOptions[0].id

class QueryFilter extends LitElement {
  constructor() {
    super()
    this.expression = defaultExp
    this.value = ""
    this.onValueChange = () => {};
    this.onDelete = () => {};
    this._valueError = ''
    this._valueTouched = false
  }

  static get properties() {
    return {
      options: { type: Array },
      expression: { type: String },
      value: {type: String},
      _valueError: {type: String},
      onValueChange: { type: Function },
      onDelete: { type: Function },
    }
  }

  onExpressionSelect(expression) {
    this.expression = expression
    this.handleFilterChange()
  }

  handleValueBlur(e) {
    this.value = e.target.value
    this._valueTouched = true

    this.handleFilterChange()
  }

  handleDelete() {
    this.onDelete()
  }

  validate() {
    if (/gt|gte|lt|lte/.test(this.expression)) {

      if (!this.value || isNaN(this.value)) {
        this._valueError = 'Number needed'
        return false
      }
    }

    this._valueError = ''
    return true
  }

  handleFilterChange() {
    //TODO: May need to convert value to number when applicable
    const isValid = this.validate()

    if (isValid) {
      this.onValueChange({
        expression: this.expression || defaultExp,
        value: this.value
      })
    }
  }

  render() {
    const showValueError = this._valueTouched && this._valueError
    const selectedExp = this.expression || defaultExp
    return html`
      <div class="query-filter">
        <unity-dropdown
          class="filter-field${showValueError ? ' field-with-error' : ''}"
          label=""
          inputType="single-select"
          placeholder="Exp"
          .options=${expressionOptions}
          .selected="${[selectedExp]}"
          .onValueChange=${this.onExpressionSelect.bind(this)}
        >
        </unity-dropdown>

        <unity-text-input
          ?hideErrors=${!showValueError}
          class="filter-field"
          placeholder="value"
          value="${this.value}"
          @blur="${this.handleValueBlur}"
          error="${this._valueTouched ? this._valueError : ''}"
        ></unity-text-input>
        <unity-button
          class="filter-delete-button"
          centerIcon="unity:trash_can"
          type="borderless"
          @click="${this.handleDelete}"
        ></unity-button>
      </div>
    `;
  }

    static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          line-height: initial;
        }
        .query-filter {
          width: 100%;
          min-width: 0;
          display: flex;
          align-items: flex-start;
        }

        unity-dropdown {
          --dropdown-width: 50px;
          margin-right:4px;
        }
        unity-text-input {
          width: 80px;
        }
        .filter-field {
          margin-bottom: 4px;
        }
        .filter-delete-button {
          margin-right: -2px;
        }

        .field-with-error {
          padding-bottom: 20px;
        }
      `
    ]
  }
}

  window.customElements.define('query-filter', QueryFilter)
