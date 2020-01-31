import { LitElement, html, css } from 'lit-element';
import '@polymer/iron-icon/iron-icon';
import "@polymer/paper-checkbox";
import "@polymer/paper-dialog";

import '@bit/smartworks.unity.unity-button';
import '@bit/smartworks.unity.unity-icon-set';
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles';
import '@bit/smartworks.unity.unity-text-input';
import '@bit/smartworks.unity.unity-select-menu';


/**
* Renders a dropdown component that displays a list of options for selection.
* @name UnityDropdown
* @fileOverview A dropdown select input web component
* @param {''} label, floating header label
* @param {''} inputType, type of the list of options that will be displayed. Possible values: menu, single-select or multi-select
* @param {''} boxType, type of the dropdown box. Possible values: label, search, button-gradient, button-outlined or inline
* @param {''} placeholder, initial text to be overwritten
* @param {Array} options, data array with the options that must be displayed
* @param {Array} selected, array of selected elements
* @param {bool} disabled, controls if field is enabled/disabled, defaults: false (enabled)
* @param {func} onMenuClick, callback when a menu option is clicked
* @param {bool} selectIcon, show an icon to the right of the element when selected
* @param {''} helperText, a helper text to show below the options list
* @param {bool} searchBox, when expanded, include a search box that highlights the searched text
*
* @example
* <unity-dropdown 
*   label="${"Full example"}"
*   inputType="single-select"
*   placeholder="Choose an option"
*   .options=${dataMock.withEverything}
*   searchBox=${true}
*   helperText="Choose any option"
* >
* </unity-dropdown>
**/


/**
 * TODOS:
 * - Fix button not closing
 * - Match colors to spec
 */

class UnityDropdown extends LitElement {
  
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
        * {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        paper-checkbox.custom-checkbox {
          --paper-checkbox-size: 14px;
          --paper-checkbox-border-radius: 0;
          --paper-checkbox-border: 1px solid;
          --paper-checkbox-unchecked-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          --paper-checkbox-checked-color: rgb(var(--primary-brand-rgb, var(--default-primary-brand-rgb)));

          --paper-checkbox-unchecked-ink-color: rgba(0,0,0,0);
          --paper-checkbox-checked-ink-color: rgba(0,0,0,0);
        }
        p {
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
          padding: 0 8px;
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
          padding-right: 8px;
        }
        .icon-right-wrapper.chevron {
          padding-right: 4px;
        }
        .icon-left-wrapper {
          padding-left: 8px;
        }
        .inner-icon {
          max-height: 20px;
          max-width: 20px;
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
          overflow: visible;
          white-space: nowrap;
        }
        .text-box:not(.disabled) .icon-right-wrapper {
          cursor: pointer;
        }
        .selectable {
          cursor: pointer;
        }
        ul{
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .options-box {
          border: 1px solid var(--medium-grey-text-color, var(--default-medium-grey-text-color));
          border-radius: 0 0 2px 2px;
          background-color: var(--background-color, var(--default-background-color));
          position: absolute;
          z-index: 10;
          width: 100%;
        }
        li {
          font-size: var(--text-size);
          font-family: var(--input-font);
          background-color: var(--background-color, var(--default-background-color));
          box-sizing: border-box;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        li:hover {
          background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
        }
  
        li:hover:not(.disabled){
          cursor:pointer;
        }
        .list-element:hover {
          background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
        }
        .text-box {
          width: auto;
          background-color: var(--background-color, var(--default-background-color));
          box-sizing: border-box;
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: var(--input-font);
          font-size: var(--text-size);     
        }
        .input-box {
          border: 1px solid var(--medium-grey-text-color, var(--default-medium-grey-text-color));
          border-radius: 2px;
          height: var(--unity-text-input-height, var(--default-unity-text-input-height));
        }
        .expanded .input-box {
          border-bottom: none;
          border-radius: 2px 2px 0 0;
        }
        .selectable:hover:not(.disabled){
          cursor:pointer;
        }
        
        .displayed-wrapper: {
          display: flex;
          flex: 1;
        }

        #displayed {
          margin: 0;
          align-self: center;
          flex: 1;
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
          margin-top: 0;
        }
        .helper-text {
          font-size: 10px;
          text-align: center;
          background-color: var(--background-color, var(--default-background-color));
        }
        .search-box {
          margin: 2px;
          padding: 0;
        }
        .text-highlight {
          background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
        }
        unity-text-input {
          width: 100%;
          height: var(--unity-text-input-height, var(--default-unity-text-input-height) - 2px);
        }
        .tag {
          display: flex;
          align-items: center;
          background-color: #D8D8D8;
          width: auto;
          border-radius: 2px;
          margin: 2px;
          padding: 0 2px;
        }
        .tag-list {
          display: flex;
        }
        .button-options {
          margin-top: 5px;
          margin-left: 10px;
        }
        .input-label-div {
          display: flex;
          width: auto;
          flex: 1;
        }
        .inline {
          width: max-content;
          color: var(--primary-brand-color, var(--default-primary-brand-color));
        }
        .inline:hover {
          color: var(--primary-brand-color-dark, var(--default-primary-brand-color-dark));
        }
        #select-all {
          border-bottom: 1px solid var(--medium-grey-text-color, var(--default-medium-grey-text-color));
          margin: 0;
          padding: 0;
        }
        unity-select-menu {
          width: 100%;
          margin: 0;
          padding: 0;
        }
        paper-dialog {
          display: block;
          margin: 0;
          box-shadow: none;
        }
      `
    ];
  }


  constructor() {
    super();
    this.label = "";
    this.inputType = "menu"; // valid values: "menu" | "single-select" | "multi-select"
    this.boxType = "label"; // valid values: "label" | "search" | "button-gradient" | "button-outlined" | "inline"
    this.placeholder = "Choose below";
    this.options = [];
    this.selected = [];
    this.disabled = false;
    this.onMenuClick = () => {}
    this.selectIcon = true;
    this.helperText = "";
    this.searchBox = false;
    this._collapsed = true;
    this._dropdown = () => this.toggleCollapse();
    this._changeValue = (index) => () => {this.changeSelected(index)};
    this._onInputSearchChange = (e) => {this.updateSearchValue(e.target.value)};
    this._searchValue = "";
  }

  clickedMenu(index) {
    this.onMenuClick(index);
    this.toggleCollapse();
  }

  static get properties() {
    return {
      label: { type: String },
      inputType: { type: String },
      boxType: { type: String },
      placeholder: { type: String },
      options: { type: Array },
      selected: { type: Array },
      disabled: { type: Boolean },
      onMenuClick: { type: Function },
      selectIcon: { type: Boolean },
      helperText: { type: String },
      searchBox: { type: Boolean },
      _collapsed: { type: Boolean },
      _dropdown: { type: Function },
      _changeValue: { type: Function },
      _onInputSearchChange: { type: Function },
      _searchValue: { type: String }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("iron-overlay-canceled", this.collapse); // collapse component when clicking outside options box
    window.addEventListener("scroll", this.resizeOptionsBox.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("iron-overlay-canceled", this.collapse);
    window.removeEventListener("scroll", this.resizeOptionsBox.bind(this));
  }

  /**
   * Adjust options box size when scrolling
   */
  resizeOptionsBox() {
    const optionsDialog = this.shadowRoot.getElementById("options-dialog");
    if(!!optionsDialog){
      optionsDialog.refit();
    }
  }

  /**
   * Update array of selected values depending on select type.
   * @param {Number} value selected value
   */
  changeSelected(value) {
    this.selected = (this.inputType === "single-select")? this.handleSingleSelect(value) : this.handleMultiSelect(value);
    if (this.boxType === "search") {
      // update text field when you select/deselect an option
      this.shadowRoot.getElementById("search-input").value = (this.selected.length > 0)? this.options[this.selected[0]].label : "";
    }
  }

  /**
   * Substitute array of selected values for array with new value, or empty array if the value was already selected.
   * @param {Number} value 
   */
  handleSingleSelect(value) {
    this._collapsed = true;
    return this.selected[0] === value ? [] : [value]
  }

  /**
   * Update array of selected values by adding / removing the new value from the array.
   * @param {Number} value 
   */
  handleMultiSelect(value) {
    const index = this.selected.indexOf(value);
    const isSelected = index > -1;
    let selected;

    if (isSelected) {
      const nextSelected = [...this.selected];
      nextSelected.splice(index, 1);
      selected = nextSelected;
    } else {
      selected = [...this.selected, value];
    }

    return selected;
  }


  updateSearchValue(newValue) {
    this._searchValue = newValue;
    // expand options list when some text is written
    if(this.boxType === "search") {
      this._collapsed = this._searchValue.length > 0 ? false : true;
    }
  }


  collapse(event) {
    /** only for the button dropdown, when the menu is expanded and you press the button again to close it,
     * both the iron-overlay cancel (click outside) and the button click event are triggered (in that order).
     * The consequence is that the dropdown is closed due to the click outside, then opened again by the mouse click
     * event, making it impossible to close the menu by clicking the button.
     */
    this._collapsed = true;
  }

  toggleCollapse() {
    if(!this.disabled){
      this._collapsed = !this._collapsed;
    }
  }


  renderLeftIcon(icon) {
    return html`<div class="icon-left-wrapper">
      <iron-icon class="inner-icon" icon="${icon}"}"></iron-icon>
    </div> ` 
  }


  // TODO: extract the different conditions in another component
  renderOption(option, index) {

    let label = option.label;
    let start = label.toLowerCase().indexOf(this._searchValue.toLowerCase());

    // highlight searched text
    if (this.searchBox) {
      let end = start + this._searchValue.length;
      if (start >= 0) {
        label = html`${label.slice(0, start)}<span class="text-highlight">${label.substring(start, end)}</span>${label.slice(end)}`
      }
    }

    // emphasize selected option
    if (this.selected.includes(index)) {
      label = html`<b>${label}</b>`;
    }
    
    // do not render option if no match
    if(this.boxType === "search") {
      if (start<0) {return null;}
    }
    
    if (this.inputType === "multi-select") {
      const isSelected = this.selected.includes(index)
      return html`
        <li class="selectable" @click=${this._changeValue(index)}>
          <div class="option-label-wrapper">
              <paper-checkbox class="icon-left-wrapper custom-checkbox"
                noink
                .checked="${isSelected}"
              ></paper-checkbox>
              ${!!option.icon? this.renderLeftIcon(option.icon) : null }
            <p>${label}</p>
          </div>
          ${!!option.comment? html`<p class="option-comment">${option.comment}</p>`: null}
        </li>`;
    }

    else {
      return html`<li class="selectable" @click=${this._changeValue(index)}>
                    <div class="option-label-wrapper">
                      ${!!option.icon? this.renderLeftIcon(option.icon) : null }
                      <p class="option-label">${label}</p>
                      ${this.selectIcon && (index === this.selected[0])? html`
                        <div class="icon-right-wrapper selected-icon">
                          <iron-icon class="inner-icon" icon="unity:check"}"></iron-icon>
                        </div>` 
                        : null}
                    </div>
                    ${!!option.comment? html`<p class="option-comment">${option.comment}</p>`: null}
                  </li>`;
    }
  }


  /**
   * Get label to show in the input box.
   * @return {String} Current selected value or placeholder if none
   */
  getSelectedLabel() {
    return (this.selected.length > 0)? this.options[this.selected[0]].label : this.placeholder;
  }


  renderSearchBox() {
    return html`
      <div class="search-box">
        <unity-text-input
        .value="${this._searchValue}"
        .onChange="${this._onInputSearchChange}"
        .innerRightIcon="${"unity:search"}"
        .borderEffects=${false}
        ></unity-text-input>
      </div>`
  }

  renderTag(label, index) {
    return html`
      <div class="tag">
        ${label}
        <div @click="${()=> this.changeSelected(index)}">
          <iron-icon class="inner-icon selectable" icon="unity:close"></iron-icon>
        </div>
      </div>
    `;
  }

  renderTags() {
    return html`
      <div class="tag-list">
        ${this.selected.map((option)=> {return this.renderTag(this.options[option].label, option)})}
      </div>
    `;
  }


  // TODO: possibly needs refactoring
  getInputBox() {

    if (this.boxType === "label") {
      return html`
        <div class="text-box input-box ${!!this.disabled ? 'disabled' : ''}">
          ${this.inputType === "multi-select"? this.renderTags() : null}
          <div class="input-label-div selectable" @click="${this._dropdown}">
            <div style="flex: 1;  display:flex" class="displayed-wrapper">
              
              ${this.selected.length > 0? 
                !!this.options[this.selected[0]].icon? 
                  this.renderLeftIcon(this.options[this.selected[0]].icon)
              : null
              : null }
              ${(this.inputType === "multi-select" && this.selected.length > 0)? null : html`
                <p id="displayed" class=${(this.selected.length===0 && this.inputType !== "menu")? "placeholder": ""}> 
                  ${this.getSelectedLabel()}
                </p>`}
            </div>
            <div class="icon-right-wrapper chevron">
              <iron-icon class="inner-icon" icon="${this._collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
            </div>
          </div>
        </div>`;
    }
    else if (this.boxType === "search") {
      return html`
        <div class="text-box input-box ${!!this.disabled ? 'disabled' : ''}">
            <unity-text-input id="search-input"
              hideBorder=${true}
              .value="${this._searchValue}"
              .onChange="${this._onInputSearchChange}"
              placeholder=${this.placeholder}
              .borderEffects=${false}
            >
          </unity-text-input>
          <div class="icon-right-wrapper chevron" @click="${this._dropdown}">
            <iron-icon class="inner-icon" icon="${this._collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
          </div>
        </div>
        `
      ;
    }
    else if (this.boxType === "button-gradient" || this.boxType === "button-outlined") {
      return html`
        <unity-button
          label="${this.getSelectedLabel()}"
          rightIcon="${this._collapsed? "unity:down_chevron" : "unity:up_chevron"}"
          ?gradient=${this.boxType==="button-gradient"? true : false}
          ?outlined=${this.boxType==="button-outlined"? true : false}
          ?disabled=${this.disabled}
          @click="${this._dropdown}"
        ></unity-button>
      `;
    }
    else if (this.boxType === "inline") {
      return html`
        <div class="selectable text-box inline ${!!this.disabled ? 'disabled' : ''}" @click="${this._dropdown}">
          <div style="flex: 1;  display:flex" class="displayed-wrapper">
            ${this.selected.length > 0? 
              !!this.options[this.selected[0]].icon? 
                this.renderLeftIcon(this.options[this.selected[0]].icon)
              : null
            : null }
            ${this.placeholder}
          </div>
          <div class="icon-right-wrapper chevron">
            <iron-icon class="inner-icon" icon="${this._collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
          </div>
        </div>`;
    }
  }

  /**
   * Get dropdown div class name.
   * @return {String}
   */
  getMenuClass() {
    let className = "dropdown-menu";
    if(!this._collapsed && (this.boxType === "label" || this.boxType === "search")) {
      className += " expanded"; // for box shadow and border
    }
    return className;
  }

  renderList() {
    let optionsList = this.options.map((option, index) => {return this.renderOption(option, index)});
    return (this.inputType === "menu")?
      html`
        <unity-select-menu 
          .items=${this.options}
          .onMenuClick=${(index) => this.clickedMenu(index)}
          borderless
        >
        </unity-select-menu>` 
      : optionsList.every(element => element === null)? html`<p class="helper-text">No matches</p>` 
                                                         : html`<ul id="options-list">${optionsList}</ul>`;
  }

  renderSelectAll() {
    let select = (this.selected.length === this.options.length)? false : true;
    return html`
      <div id="select-all" class="text-box selectable" @click=${()=>this.selectAll(select)}>
        ${this.renderLeftIcon("unity:box_minus")}
        <p>${select? "Select all" : "Deselect all"}</p>
      </div>
    `
  }


  /**
   * Check / uncheck all checkboxes and update selected values.
   * @param {bool} select 
   */
  selectAll(select) {
    let checkboxes = this.shadowRoot.querySelectorAll("paper-checkbox");
    this.selected = select? [...Array(this.options.length).keys()] : [] ;

    for(let i=0, n=checkboxes.length; i<n; i++) {
      checkboxes[i].checked = select;
    }
  }

  render() {
    const isButton = (this.boxType === "button-outlined" || this.boxType === "button-gradient")? true: false;
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
       
          ${!this._collapsed?
            html`
              <paper-dialog .noAutoFocus="${true}" id="options-dialog" opened
                            class="options-box ${isButton? "button-options": ""}"
                            >
                ${this.searchBox? this.renderSearchBox() : null}
                ${this.inputType === "multi-select" ? this.renderSelectAll() : null}
                ${this.renderList()}                
                ${!!this.helperText? html`<p class="helper-text">${this.helperText}</p>` :null}
              </paper-dialog>`
            :null}
        </div>     
      </div>
    `;
  }
}

window.customElements.define('unity-dropdown', UnityDropdown);
