import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-dropdown'
import '@bit/smartworks.unity.unity-button'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'


class FilterDropdown extends LitElement {
  constructor() {
    super()
    this.show = false;
    this.options = [];
    this.selected = [];
    this.onValueChange = () => {};
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
          top: 0;
          right: 0;
          margin: 2px;
          width: 200px;
          max-width: 80%;
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
      onValueChange: { type: Function }
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("iron-overlay-canceled", this.toggleDropdown); // collapse component when clicking outside
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("iron-overlay-canceled", this.toggleDropdown);
  }

  toggleDropdown() {
    this.show = !this.show    
  }

  render() {
    const buttonClass = (this.selected.length < this.options.length)? "active" : ""
    return html`
      ${this.show?
        html`<unity-dropdown
              inputType="multi-select"
              boxType="none"
              placeholder="Filter"
              searchBox=${true}
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