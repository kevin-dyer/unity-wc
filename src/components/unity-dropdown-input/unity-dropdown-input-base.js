/** 
 *  @fileOverview A dropdown select input web component
 * *
 *  @requires     NPM:lit-element
 * 
 *  @example
 *  <unity-dropdown-input-base
 *    .label="${"Label"}">
 *  </unity-dropdown-input-base>
 */

import { LitElement, html, css } from 'lit-element';
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles';
import '@polymer/iron-icon/iron-icon';
import '../unity-icon-set/unity-icon-set';
// import '@bit/smartworks.unity.unity-icon-set';
import '../unity-text-input/unity-text-input';
import '../unity-button/unity-button';

// import '@bit/smartworks.unity.unity-text-input';


/**
 * PENDING:
 * - Dropdown type inline
 * - Dropdown with lateral submenu
 * - Multi input
 * - Multi input with multi select (select all)
 * - Search tags
 * 
 * TODOS:
 * - Collapse menu on click
 * - Match colors to spec
 * - Fix rounding of borders 
 * - Collapse behaviour on click outside
 * - Check sizes - most are pixel, some are em, and some things get ugly when you change browser font size
 * - Check icons size (different size for option listed and selected)
 * - Search box: deactivate hover / focus styles (shadow and border)
 */

class UnityDropdownInputBase extends LitElement {
  
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --input-font: var(--font-family, var(--default-font-family));
          --label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --border-color: var(--global-nav-border-color, var(--default-global-nav-border-color));
          font-family: var(--input-font);
          border-collapse: collapse;
          user-select: none;
          display: inline-block;
          width: 100%;
          max-width: 300px;
        }
        p {
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
        }
        .dropdown-menu.expanded {
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);;
        }
        .label {
          padding: 0;
          font-size: var(--text-size);
          color: var(--label-color);
        }
        .list-element-wrapper {
          margin: 0;
        }
        .icon-right-wrapper {
        }
        .icon-left-wrapper {
          padding-right: 6px;
        }
        .inner-icon {
          max-height: 1.8em;
          max-width: 1.8em;
        }
        .selected-icon {
          color: var(--primary-brand-color, var(--default-primary-brand-color));
        }
        .option-label-wrapper {
          display: flex;
          align-items: center;
        }
        .option-label {
          flex: 1;
        }
        .text-box:not(.disabled) .icon-right-wrapper {
          cursor: pointer;
        }
        ul{
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .options-box {
          border: 1px solid gray;
          border-radius: 0 0 2px 2px;
        }
        .list-element {
          margin: 0;
        }
        li {
          font-size: var(--text-size);
          font-family: var(--input-font);
          width: 100%;
        }
        .list-element:hover {
          background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
        }
        .text-box {
          width: auto;
          background-color: var(--background-color, var(--default-background-color));
          padding: 0 8px;
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;          
        }
        .input-box {
          border: 1px solid gray;
          border-radius: 2px 2px 0 0;
        }
        .text-box:hover:not(.disabled){
          cursor:pointer;
        }
        .text-box:focus-within {
          border-color: var(--primary-brand-color, var(--default-primary-brand-color));
          outline: none;
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
        }
        .displayed-wrapper: {
          display: flex;
          flex: 1;
        }
        #displayed {
          padding: 0;
          margin: 0;
          align-self: center;
          flex: 1;
          font-family: var(--input-font);
          font-size: var(--text-size);
          color: rgb(var(--text-color));
          border: 0;
          background-color: transparent;
        }
        .disabled {
          border-color: var(--dark-grey-background, var(--default-dark-grey-background));
          background-color: var(--light-grey-background-color, var(--default-light-grey-background-color));
          color: rgba(var(--text-color), .4);
        }
        .disabled #displayed {
          color: var(--dark-grey-text-color);
        }
        .placeholder {
          color: var(--light-grey-text-color) !important;
        }
        .option-comment {
          font-size: 0.9em;
          line-height: 1.2em;
        }
        .helper-text {
          font-size: 10px;
          text-align: center;
        }
        .search-box {
          margin: 2px;
        }
        .text-highlight {
          background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
        }
        unity-text-input {
          width: 100%;
          --unity-text-input-input-wrapper: {
            margin: 0;
          }
        }
      `
    ];
  }


  constructor() {
    super();
    this.label = "";
    this.type = "menu"; // valid values: "menu" | "single-select" | "search" | "button-gradient" | "button-outlined" | "inline"
    this.placeholder = "";
    this.selected = null;
    this.disabled = false;
    this.dropdown = () => this.toggleCollapse();
    this.changeValue = (index) => () => {this.selected = index;};
    this.onMenuClick = (index) => () => {window.alert(`Clicked option ${index + 1}!`);};
    this.onInputChange = (e) => {this.updateSearchValue(e.target.value)};
    this.collapsed = true;
    this.options = [];
    this.selectIcon = true;
    this.helperText = "";
    this.searchBox = false;
    this._searchValue = "";
  }

  static get properties() {
    return {
      label: { type: String },
      type: { type: String },
      placeholder: { type: String },
      selected: { type: Number },
      disabled: { type: Boolean },
      dropdown: { type: Function },
      collapsed: { type: Boolean },
      options: { type: Array },
      selectIcon: { type: Boolean },
      helperText: { type: String },
      searchBox: { type: Boolean },
      _searchValue: {type: String }
    };
  }

  firstUpdated() {
    this.selected = this.getInitialValue()
  }

  /**
   * Get initial value for input box.
   * @returns {String} Either null or 0. 
   */
  getInitialValue() {
    return !!this.placeholder? null : 0; 
  }


  updateSearchValue(newValue) {
    this._searchValue = newValue;
    // expand options list when some text is written
    if(this.type === "search") {
      this.collapsed = this._searchValue.length > 0 ? false : true;
    }
  }



  toggleCollapse() {
    if(!this.disabled){ 
      this.collapsed = !this.collapsed;
    }
  }

  collapse() {
    this.collapsed = true;
  }

  renderOption(option, index) {
    let label = option.label;
    if (this.type === "menu") {
      return html`<div class="text-box list-element" @click=${this.onMenuClick(index)}>
        <li>
          <div class="option-label-wrapper">
            ${!!option.icon? html`<div class="icon-left-wrapper">
                  <iron-icon class="inner-icon" icon="${option.icon}"}"></iron-icon>
                </div> ` 
              : null }
            <p class="option-label">${label}</p>
          </div>
          ${!!option.comment? html`<p class="option-comment">${option.comment}</p>`: null}
        </li>
      </div>`;
    }

    let start = label.toLowerCase().indexOf(this._searchValue.toLowerCase());
    if (this.searchBox) {
      // let start = label.toLowerCase().indexOf(this._searchValue.toLowerCase());
      let end = start + this._searchValue.length;
      if (start >= 0) {
        label = html`${label.slice(0, start)}<span class="text-highlight">${label.substring(start, end)}</span>${label.slice(end)}`
      }
    }

    if (index === this.selected) {
      label = html`<b>${label}</b>`;
    }
    
    if(this.type === "search") {
      if (start<0) {return null;}
    }
    
    if (this.type === "multi-select") {

    }
    else {
      return html`<div class="text-box list-element" @click=${this.changeValue(index)}>
                    <li>
                      <div class="option-label-wrapper">
                        ${!!option.icon? html`<div class="icon-left-wrapper">
                              <iron-icon class="inner-icon" icon="${option.icon}"}"></iron-icon>
                            </div> ` 
                          : null }
                        <p class="option-label">${label}</p>
                        ${this.selectIcon && (index === this.selected)? html`
                          <div class="icon-right-wrapper selected-icon">
                            <iron-icon class="inner-icon" icon="unity:check"}"></iron-icon>
                          </div>` 
                          : null}
                      </div>
                      ${!!option.comment? html`<p class="option-comment">${option.comment}</p>`: null}
                    </li>
                  </div>`;
    }
  }



  /**
   * TODO: always return a string; manage de <p> tag for single-select dropdown differently
   */
  getSelectedLabel() {
    let initialLabel = this.placeholder? this.placeholder : this.options[0].label;
    if(this.type === "single-select" || (this.type === "menu")) {
      if (this.selected === null && this.placeholder) {
        return html`<p id="displayed" class="placeholder">${initialLabel}</p>`;
      }
      else if (this.selected === null && !this.placeholder) {
        return html`<p id="displayed">${initialLabel}</p>`;
      }

      else {
        return html`<p id="displayed">${this.options[this.selected].label}</p>`;
      }
    }
    else {
      return this.selected === null? initialLabel : this.options[this.selected].label;
    }

  }


  renderSearchBox() {
    return html`
      <div class="search-box">
        <unity-text-input
        .value="${this._searchValue}"
        .onChange="${this.onInputChange}"
        .innerRightIcon="${"unity:search"}"
        ></unity-text-input>
      </div>`
  }

  getInputBox() {
    if (this.type === "single-select" || this.type === "multi-select" || this.type === "menu") {
      return html`
        <div class="text-box input-box ${!!this.disabled ? 'disabled' : ''}" @click="${this.dropdown}">
          <div style="flex: 1;  display:flex" class="displayed-wrapper">
            ${this.selected !== null? !!this.options[this.selected].icon? html`
              <div class="icon-left-wrapper">
                <iron-icon class="inner-icon" icon="${this.options[this.selected].icon}"}"></iron-icon>
              </div> ` 
            : null : null }
            ${this.getSelectedLabel()}
          </div>
          <div class="icon-right-wrapper">
            <iron-icon class="inner-icon" icon="${this.collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
          </div>
        </div>`;
    }
    else if (this.type === "search") {
      return html`
        <div class="${!!this.disabled ? 'disabled' : ''}">
            <unity-text-input
            .value="${this._searchValue}"
            .onChange="${this.onInputChange}"
            .innerRightIcon="${this.collapsed? "unity:down_chevron" : "unity:up_chevron"}"
            placeholder=${this.placeholder}
            >
          </unity-text-input>
        </div>
        `
      ;
    }
    else if (this.type === "button-gradient" || this.type === "button-outlined") {
      return html`
        <unity-button
          label="${this.getSelectedLabel()}"
          rightIcon="${this.collapsed? "unity:down_chevron" : "unity:up_chevron"}"
          ?gradient=${this.type==="button-gradient"? true : false}
          ?outlined=${this.type==="button-outlined"? true : false}
          ?disabled=${this.disabled}
          @click="${this.dropdown}"
        ></unity-button>
      `;
    }
  }

  getMenuClass() {
    let className = "dropdown-menu";
    if(!this.collapsed) {
      className += " expanded";
    }
    return className;
  }

  // noMatchesText() {
  //   return !this.shadowRoot.getElementById("options-list").hasChildNodes()? html`<p class="helper-text">No matches</p>`: null
  // }

  renderList() {
    let optionsList = this.options.map((option, index) => {return this.renderOption(option, index)});
    return optionsList.every(element => element === null)? html`<p class="helper-text">No matches</p>` : html`<ul id="options-list">${optionsList}</ul>`;
  }

  render() {
    return html`
      <div>
        ${!!this.label ?
          html`<p class="label">
            ${this.label}
            </p>`
          : null
        }
        <div class=${this.getMenuClass()}>

          ${this.getInputBox()}
       
          ${!this.collapsed? 
            html`
              <div class="options-box">
                ${this.searchBox? this.renderSearchBox() : null}
                ${this.renderList()}                
                ${!!this.helperText? html`<p class="helper-text">${this.helperText}</p>` :null}
              </div>`
            :null}
        </div>     
      </div>
    `;
  }
}

window.customElements.define('unity-dropdown-input-base', UnityDropdownInputBase);
