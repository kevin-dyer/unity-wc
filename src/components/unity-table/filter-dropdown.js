import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-dropdown'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'


class FilterDropdown extends LitElement {
  constructor() {
    super()
    this.show = false;
    this.options = [];
    this.selected = [];
    this.onValueChange = () => {};
    this.dropdownSide = "right"
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
        }
        unity-dropdown {
          position: absolute;
          bottom: -1px;
          margin: 2px;
          min-width: 200px;
          width: 80%;
        }
        .left {
          left: 0;
        }
        .right {
          right: 0;
        }
        unity-button.active {
          color: var(--primary-brand-color, var(--default-primary-brand-color));
        }
      `
    ]
  }

  static get properties() {
    return {
      show: { type: Boolean },
      options: { type: Array },
      selected: { type: Array },
      onValueChange: { type: Function },
      dropdownSide: { type: false }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("iron-overlay-canceled", () => setTimeout(()=>this.toggleDropdown(false),0)); // collapse component when clicking outside
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("iron-overlay-canceled", () => setTimeout(()=>this.toggleDropdown(false),0));
  }

  toggleDropdown(show) {
    this.show = typeof show === 'boolean' ? show : !this.show
  }

  updated() {
    if (this.show) {
      const cell = this.parentElement
      const { [0]: {
        left: cellLeft,
        right: cellRight,
        width: cellWidth
      }} = cell.getClientRects()
      const dropdown = this.shadowRoot.querySelector('unity-dropdown')
      const { [0]: {
        width: dropdownWidth
      }} = dropdown.getClientRects()
      const windowWidth = window.innerWidth

      // if dropdown is wider than cell and wouldn't extend off right, make left
      if (dropdownWidth > cellWidth && (cellLeft + dropdownWidth) < windowWidth) {
        this.dropdownSide = 'left'
      } else {
        this.dropdownSide = 'right'
      }
    }
  }

  render() {
    const buttonClass = (this.selected.length < this.options.length)? "active" : ""
    return html`
      ${this.show?
        html`<unity-dropdown
              class="${this.dropdownSide}"
              inputType="multi-select"
              boxType="none"
              placeholder="Filter"
              .searchBox=${true}
              ._collapsed=${false}
              .onValueChange="${this.onValueChange}"
              .options=${this.options}
              .selected=${this.selected}
          >
        </unity-dropdown>`
        : null}
      <unity-button
        class=${buttonClass}
        centerIcon="unity:filter"
        @click=${() => this.toggleDropdown()}
      ></unity-button>
      `;
  }
}

  window.customElements.define('filter-dropdown', FilterDropdown)
