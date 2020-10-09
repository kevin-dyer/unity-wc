import { LitElement, html, css } from 'lit-element';
import '@polymer/iron-icon/iron-icon';
import "@polymer/paper-dialog";

import '@bit/smartworks.unity.unity-button';
import '@bit/smartworks.unity.unity-checkbox';
import '@bit/smartworks.unity.unity-icon-set';
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles';
import '@bit/smartworks.unity.unity-text-input';
import '@bit/smartworks.unity.unity-select-menu';
import * as strings from './strings'

/**
* Renders a dropdown component that displays a list of options for selection.
* @name UnityDropdown
* @fileOverview A dropdown select input web component
* @param {''} label, floating header label
* @param {''} inputType, type of the list of options that will be displayed. Possible values: menu, single-select or multi-select
* @param {''} boxType, type of the dropdown box. Possible values: fixed, label, search, button-primary, button-secondary, button-borderless, or inline
* @param {bool} important, if the button should follow important styles, only works with buttons
* @param {''} placeholder, initial text to be overwritten
* @param {Array} options, data array with the options that must be displayed
* @param {Array} selected, array of selected elements
* @param {bool} disabled, controls if field is enabled/disabled, defaults: false (enabled)
* @param {func} onMenuClick, callback when a menu option is clicked
* @param {bool} selectIcon, show an icon to the right of the element when selected
* @param {''} helperText, a helper text to show below the options list
* @param {bool} searchBox, when expanded, include a search box that highlights the searched text
* @param {bool} showTags, show tags with selected options (only for multi-select)
* @param {func} onValueChange, callback on clicking a value that returns current seelcted for single select, and option and bool selected when multiselect
* @param {bool} rightAlign, if the dropdown box should be aligned to the right
* @param {bool} autofocus, focus input on load (only for boxType=search)
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

const MENU = "menu"
const SINGLE_SELECT = "single-select"
const MULTI_SELECT = "multi-select"
const LABEL = "label"
const SEARCH = "search"
const PRIMARY = "button-primary"
const SECONDARY = "button-secondary"
const BORDERLESS = "button-borderless"
const IMPORTANT = "important"
const INLINE = "inline"

class UnityDropdown extends LitElement {

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --dropdown-background-color: var(--background-color, var(--default-background-color));
          --dropdown-background-color-disabled: var(--light-grey-background-color, var(--default-light-grey-background-color));
          --dropdown-border-color: var(--gray-color, var(--default-gray-color));
          --dropdown-border-color-disabled: var(--gray-color, var(--default-gray-color));
          --dropdown-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --dropdown-color-dark: var(--primary-brand-color-dark, var(--default-primary-brand-color-dark));
          --dropdown-input-font: var(--font-family, var(--default-font-family));
          --dropdown-color-light: var(--light-gray-2-color, var(--default-light-gray-2-color));
          --dropdown-label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --dropdown-line-height: var(--unity-text-input-height, var(--default-unity-text-input-height));
          --dropdown-text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --dropdown-text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --dropdown-button-color: var(--secondary-color, var(--default-secondary-color));
          --dropdown-button-pressed-color: var(--secondary-tint-color, var(--default-secondary-tint-color));
          --dropdown-button-font-color: var(--background-color, var(--default-background-color));
          --default-dropdown-border-radius: 2px;
          --default-dropdown-width: 100%;
          --default-dropdown-border-hover-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-dropdown-search-input-padding: 0;

          font-family: var(--dropdown-input-font);
          border-collapse: collapse;
          user-select: none;
          display: inline-block;
          width: var(--dropdown-width, var(--default-dropdown-width));
        }
        * {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        unity-checkbox.custom-checkbox {
          --unity-checkbox-size: 14px;
        }
        p {
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
          padding: 0 8px;
          white-space: normal;
        }
        .label {
          padding: 0;
          font-size: var(--dropdown-text-size);
          color: var(--dropdown-label-color);
        }
        .list-element-wrapper {
          margin: 0;
        }
        .icon-right-wrapper {
          display: flex;
          flex: 0;
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
          color: var(--dropdown-color);
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
          overflow-y: auto;
          max-height: 330px;
        }
        #options-dialog {
          border: 1px solid var(--dropdown-border-color);
          border-radius: 0 0 var(--dropdown-border-radius, var(--default-dropdown-border-radius)) var(--dropdown-border-radius, var(--default-dropdown-border-radius));
          background-color: var(--dropdown-background-color);
          z-index: 10;
          position: absolute;
          overflow: hidden;
          width: var(--dropdown-width, var(--default-dropdown-width));
          box-shadow: 0px 2px 4px -1px var(--gray-color);
          border-top: none;
        }
        .right-align {
          right: 0;
        }
        li {
          font-size: var(--dropdown-text-size);
          font-family: var(--dropdown-input-font);
          background-color: var(--dropdown-background-color);
          box-sizing: border-box;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        li:hover {
          background-color: var(--dropdown-color-light);
        }

        li:hover:not(.disabled){
          cursor:pointer;
        }
        .list-element:hover {
          background-color: var(--dropdown-color-light);
        }
        .text-box {
          width: auto;
          background-color: var(--dropdown-background-color);
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          align-items: center;
          font-family: var(--dropdown-input-font);
          font-size: var(--dropdown-text-size);
        }
        .input-box {
          border: 1px solid var(--dropdown-border-color);
          border-radius: var(--dropdown-border-radius, var(--default-dropdown-border-radius));
          height: var(--dropdown-line-height);
          overflow: hidden;
        }
        .dropdown-menu.expanded .input-box{
          border: 1px solid var(--dropdown-border-hover-color, var(--default-dropdown-border-hover-color));
        }
        .input-box:not(.disabled):hover {
          border: 1px solid var(--dropdown-border-hover-color, var(--default-dropdown-border-hover-color));
        }
        .expanded .input-box {
          border-radius: var(--dropdown-border-radius, var(--default-dropdown-border-radius)) var(--dropdown-border-radius, var(--default-dropdown-border-radius)) 0 0;
        }
        .selectable:hover:not(.disabled){
          cursor:pointer;
        }
        .displayed-wrapper {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        #displayed {
          margin: 0;
          align-self: center;
          color: rgb(var(--dropdown-text-color));
          border: 0;
          background-color: transparent;
          white-space: nowrap;
        }
        .disabled {
          border-color: var(--dropdown-border-color-disabled);
          background-color: var(--dropdown-background-color-disabled);
          color: rgba(var(--dropdown-text-color), .4);
        }
        .disabled #displayed {
          color: var(--dark-grey-text-color);
        }
        .disabled .input-label-div {
          cursor: default !important;
        }
        .placeholder {
          color: var(--light-grey-text-color) !important;
        }
        .disabled .placeholder {
          color: var(--dropdown-border-color-disabled) !important;
        }
        .input-box:hover:not(.disabled) .placeholder {
          color: var(--dropdown-border-hover-color, var(--default-dropdown-border-hover-color)) !important;
        }
        .dropdown-menu.expanded .placeholder {
          color: var(--dropdown-border-hover-color, var(--default-dropdown-border-hover-color)) !important;
        }
        .option-comment {
          font-size: 0.9em;
          line-height: 1.2em;
          margin-top: 0;
        }
        .helper-text {
          font-size: 10px;
          text-align: center;
          background-color: var(--dropdown-background-color);
        }
        .search-box {
          margin: 2px;
          padding: 0;
        }
        .text-highlight {
          background-color: var(--dropdown-color-light);
        }
        unity-text-input {
          width: 100%;
        }
        .tag {
          display: flex;
          flex: 0;
          align-items: center;
          background-color: #D8D8D8;
          width: auto;
          border-radius: 2px;
          margin: 2px;
          padding: 0 2px;
        }
        .tag-list {
          display: flex;
          flex: 1;
          flex-basis: auto;
          overflow: hidden;
        }
        .tag-text {
          padding: 0 4px;
          white-space: nowrap;
        }
        .button-options {
          margin-top: 5px;
          margin-left: 10px;
        }
        /* these two styles are required to get proper rendering
           of all tags and multi-select options */
        .input-label-div {
          display: flex;
          flex: 1;
          flex-basis: auto;
        }
        .input-label-div.no-tags {
          width: 100%;
        }
        .inline {
          width: max-content;
          color: var(--dropdown-color);
        }
        .inline:hover {
          color: var(--dropdown-color-dark);
        }
        #select-all {
          border-bottom: 1px solid var(--dropdown-border-color);
          margin: 0;
          padding: 0;
        }
        unity-select-menu {
          width: 100%;
          margin: 0;
          padding: 0;
          max-width: unset;
        }
        paper-dialog {
          display: block;
          margin: 0;
          box-shadow: none;
        }
        unity-button.dropdown-button {
          --button-color: var(--dropdown-button-color);
          --pressed-color: var(--dropdown-button-pressed-color);
          --font-color: var(--dropdown-button-font-color);
        }
        #search-input {
          padding: var(--dropdown-search-input-padding, var(--default-dropdown-search-input-padding));
        }
      `
    ];
  }

  constructor() {
    super();
    this.label = "";
    this.inputType = MENU; // valid values: "menu" | "single-select" | "multi-select"
    this.boxType = LABEL; // valid values: "label" | "search" | "button-primary" | "button-secondary" | "button-borderless" | "inline"
    this.important = false
    this.placeholder = "Choose below";
    this._options = [];
    this._selected = [];
    this.disabled = false;
    this.onMenuClick = () => {}
    this.selectIcon = true;
    this.helperText = "";
    this.searchBox = false;
    this.showTags = false;
    this.onValueChange = () => {};
    this.rightAlign = false;
    this.autofocus = false;
    this._collapsed = true;
    this._dropdown = () => this.toggleCollapse();
    this._changeValue = (id) => () => {this.changeSelected(id)};
    this._onInputSearchChange = (e) => {this.updateSearchValue(e.target.value)};
    this._searchValue = "";
    this._visibleOptions = [];
  }

  clickedMenu(index) {
    this._searchValue = ""
    this.onMenuClick(index);
    this.toggleCollapse();
  }

  static get properties() {
    return {
      label: { type: String },
      inputType: { type: String },
      boxType: { type: String },
      important: { type: Boolean },
      placeholder: { type: String },
      options: { type: Array },
      selected: { type: Array },
      disabled: { type: Boolean },
      onMenuClick: { type: Function },
      selectIcon: { type: Boolean },
      helperText: { type: String },
      searchBox: { type: Boolean },
      showTags: { type: Boolean },
      rightAlign: { type: Boolean },
      autofocus: { type: Boolean },
      _collapsed: { type: Boolean },
      _dropdown: { type: Function },
      _changeValue: { type: Function },
      _onInputSearchChange: { type: Function },
      _searchValue: { type: String }
    };
  }

  set selected(value) {
    if(this._selected !== value) {
      const oldValue = this._selected
      let newSelected = [...value]

      // run parse selection only if there are options
      if (this.options.length > 0) newSelected = this.filterSelection(newSelected)

      this._selected = newSelected
      this.requestUpdate('selected', oldValue)
    }
  }

  get selected() { return this._selected }

  set options(value) {
    if (this._options !== value) {
      const oldValue = this._options
      this._options = value
      this._visibleOptions = value

      // run filterSelection to remove invalid options
      if (value.length > 0) this.selected = this.filterSelection(this.selected)
      this.requestUpdate('options', oldValue)
    }
  }

  get options() { return this._options }

  // takes the list of selected ids and parses out invalids
  // keeps only one if single-select
  filterSelection(selected) {
    const { options, inputType } = this
    const isMulti = inputType === MULTI_SELECT
    return selected.reduce((newSelected, currentId) => {
      // single-select : keep first found
      if (inputType === SINGLE_SELECT && newSelected.length === 1) return newSelected
      // find selection in options
      const found = options.find(({id}) => id === currentId)
      // if valid, keep in selected
      if (!!found) return [...newSelected, currentId]
      // else remove from selected
      return newSelected
    }, [])
  }

  connectedCallback() {
    super.connectedCallback();
    this._visibleOptions = this.options;
    this.addEventListener("iron-overlay-canceled", this._delayClose); // collapse component when clicking outside options box
    window.addEventListener("scroll", this.resizeOptionsBox.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("iron-overlay-canceled", this._delayClose);
    window.removeEventListener("scroll", this.resizeOptionsBox.bind(this));
  }

  _delayClose() {
    setTimeout(() => this.collapse(), 0)
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
    this.selected = (this.inputType === SINGLE_SELECT)? this.handleSingleSelect(value) : this.handleMultiSelect(value);
  }

  /**
   * Substitute array of selected values for array with new value, or empty array if the value was already selected.
   * @param {String} id
   */
  handleSingleSelect(id) {
    this._collapsed = true;
    const newSelected = this.selected[0] === id ? [] : [id]
    this.onValueChange(newSelected[0])
    return newSelected
  }

  /**
   * Update array of selected values by adding / removing the new value from the array.
   * @param {String} id
   */
  handleMultiSelect(id) {
    const selectedIndex = this.selected.indexOf(id)
    const isSelected = selectedIndex > -1? true : false;
    let selected;

    if (isSelected) {
      const nextSelected = [...this.selected];
      nextSelected.splice(selectedIndex, 1);
      selected = nextSelected;
    } else {
      selected = [...this.selected, id];
    }

    this.onValueChange([id], !isSelected);
    return selected;
  }


  updateSearchValue(newValue) {
    this._searchValue = newValue;
    // expand options list when some text is written
    if(this.boxType === SEARCH) {
      this._collapsed = !(this._searchValue.length > 0);
    }
    // match and update visible values
    const searchRegex = new RegExp(this._searchValue, "i")
    this._visibleOptions = this.options.filter(option => searchRegex.test(option.label))
  }


  collapse() {
    this._collapsed = true;
  }

  toggleCollapse() {
    if(!this.disabled){
      this._collapsed = !this._collapsed;
    }
  }


  renderLeftIcon(icon) {
    return html`<div class="icon-left-wrapper">
      ${this.renderIcon(icon)}
    </div> `
  }

  renderIcon(icon) {
    return html`<iron-icon class="inner-icon" icon="${icon}"}"></iron-icon>`
  }

  // TODO: extract the different conditions in another component
  renderOption(option) {
    let label = option.label;
    const start = label.toString().toLowerCase().indexOf(this._searchValue.toLowerCase());

    // highlight searched text
    if (this.searchBox) {
      let end = start + this._searchValue.length;
      if (start >= 0) {
        label = html`${label.slice(0, start)}<span class="text-highlight">${label.substring(start, end)}</span>${label.slice(end)}`
      }
    }

    // emphasize selected option
    // index = this.options.indexOf(label)

    if (this.selected.includes(option.id)) {
      label = html`<b>${label}</b>`;
    }
    if (this.inputType === MULTI_SELECT) {
      const isSelected = this.selected.includes(option.id);
      return html`
        <li class="selectable" @click=${this._changeValue(option.id)}>
          <div class="option-label-wrapper">
            <unity-checkbox class="icon-left-wrapper custom-checkbox"
              id=${option.id}
              ?checked="${isSelected ? true : null}"
            ></unity-checkbox>
            ${!!option.icon? this.renderLeftIcon(option.icon) : null }
            <p>${label}</p>
          </div>
          ${!!option.comment? html`<p class="option-comment">${option.comment}</p>`: null}
        </li>`;
    }

    else {
      return html`<li class="selectable" @click=${this._changeValue(option.id)}>
                    <div class="option-label-wrapper">
                      ${!!option.icon? this.renderLeftIcon(option.icon) : null }
                      <p class="option-label">${label}</p>
                      ${this.selectIcon && (option.id === this.selected[0])? html`
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
   * @return {Object} Current selected value or or values, empty object if none
   */
  getSelectedOptions() {
    const {
      options,
      selected,
      inputType
    } = this
    if (inputType === SINGLE_SELECT) {
      return options.find(({id}) => id === selected[0]) || {}
    }
    if (inputType === MULTI_SELECT) {
      const label = selected.reduce((selectedLabels, selection) => {
        const { label } = options.find(({id}) => id === selection) || {}
        if (!label) return selectedLabels
        if (!selectedLabels) return label
        return `${selectedLabels}, ${label}`
      }, '')
      return {label}
    }
    return {}
  }


  renderSearchBox() {
    return html`
      <div class="search-box">
        <unity-text-input
          value="${this._searchValue}"
          .onChange="${this._onInputSearchChange}"
          .innerLeftIcon="${"unity:search"}"
          .borderEffects=${false}
        ></unity-text-input>
      </div>`
  }

  renderTag(id) {
    const { label='', icon } = this.options.find(option => option.id === id) || {}
    return html`
      <div class="tag">
        ${icon && this.renderIcon(icon)}
        <span class="tag-text">${label}</span>
        <div @click="${()=> this.changeSelected(id)}">
          <iron-icon class="inner-icon selectable" icon="unity:close"></iron-icon>
        </div>
      </div>
    `;
  }

  renderTags() {
    return html`
      <div class="tag-list">
        ${this.selected.map(id => this.renderTag(id))}
      </div>
    `;
  }


  // TODO: possibly needs refactoring
  getInputBox() {
    const {
      boxType,
      important,
      selected,
      disabled,
      showTags,
      placeholder,
      inputType,
      _dropdown,
      _collapsed,
    } = this
    const anySelected = selected.length > 0
    let label, icon
    if (anySelected) {
      const option = this.getSelectedOptions()
      label = option.label
      icon = option.icon
    }
    else {
      label = icon = ""
    }
    const isMulti = inputType === MULTI_SELECT
    const isButton = boxType === PRIMARY || boxType === SECONDARY || boxType === BORDERLESS
    if (boxType === "fixed") {
      return html`
          <div class="text-box input-box ${!!disabled ? 'disabled' : ''}">
          ${(isMulti && showTags)? this.renderTags() : null}
          <div class="input-label-div${!showTags ? " no-tags" : ""}">
            <div class="displayed-wrapper">
                <p id="displayed">
                  <b>${placeholder}</b>
                </p>
            </div>

          </div>
        </div>`;
    }
    if (boxType === LABEL) {
      return html`
        <div class="text-box input-box ${!!disabled ? 'disabled' : ''}">
          ${(anySelected && showTags)? this.renderTags() : null}
          <div class="input-label-div${!showTags ? " no-tags" : ""} selectable" @click="${_dropdown}">
            <div class="displayed-wrapper">
              ${(!showTags && !isMulti && !!icon)
                ? this.renderLeftIcon(icon)
                : null
              }
              ${(showTags && anySelected)? null : html`
                <p id="displayed" class=${(!anySelected && inputType !== MENU)? "placeholder": ""}>
                  ${label || placeholder}
                </p>`}
            </div>
            <div class="icon-right-wrapper chevron">
              <iron-icon class="inner-icon" icon="${_collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
            </div>
          </div>
        </div>`;
    }
    if (boxType === SEARCH) {
      return html`
        <div class="text-box input-box ${!!disabled ? 'disabled' : ''}">
            <unity-text-input
              id="search-input"
              value="${this._searchValue}"
              hideBorder=${true}
              .onChange="${this._onInputSearchChange}"
              placeholder=${placeholder}
              .borderEffects=${false}
              .autofocus=${this.autofocus}
            >
          </unity-text-input>
          <div class="icon-right-wrapper chevron" @click="${_dropdown}">
            <iron-icon class="inner-icon" icon="${_collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
          </div>
        </div>
        `
      ;
    }
    if (isButton) {
      return html`
        <unity-button
          class="dropdown-button"
          label="${label || placeholder}"
          rightIcon="${_collapsed? "unity:down_chevron" : "unity:up_chevron"}"
          type="${boxType.slice(7)}"
          ?important="${important || null}"
          ?disabled=${disabled}
          @click="${_dropdown}"
        ></unity-button>
      `;
    }
    if (boxType === INLINE) {
      return html`
        <div class="selectable text-box inline ${!!disabled ? 'disabled' : ''}" @click="${_dropdown}">
          <div class="displayed-wrapper">
            ${(!isMulti && !!icon)
              ? this.renderLeftIcon(icon)
              : null
            }
            ${label || placeholder}
          </div>
          <div class="icon-right-wrapper chevron">
            <iron-icon class="inner-icon" icon="${_collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
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
    if(!this._collapsed && (this.boxType === LABEL || this.boxType === SEARCH)) {
      className += " expanded"; // for box shadow and border
    }
    return className;
  }

  renderList() {
    const optionsList = this._visibleOptions.map(option => this.renderOption(option));
    return (
      optionsList.every(element => element === null)?
        html`<p class="helper-text">${strings.NO_MATCHES}</p>`
      : (this.inputType === MENU)?
        html`
          <unity-select-menu
            .items=${this._visibleOptions}
            .onMenuClick=${(index) => this.clickedMenu(index)}
            borderless
          >
          </unity-select-menu>`
        : html`<ul id="options-list">${optionsList}</ul>`
    )
  }

  renderSelectAll() {

    const visibleIds = this._visibleOptions.map(x => x.id);
    const select = !visibleIds.every(val => this.selected.includes(val));

    return html`
      <div id="select-all" class="text-box selectable" @click=${()=>this.selectAll(select)}>
        ${this.renderLeftIcon("unity:box_minus")}
        <p>${select? strings.SELECT_VISIBLE : strings.DESELECT_VISIBLE}</p>
      </div>
    `
  }


  /**
   * Check / uncheck all checkboxes and update selected values.
   * @param {bool} select
   */
  selectAll(select) {

    const boxIds = this._visibleOptions.map(option => option.id);
    const selectedSet = new Set(this.selected);
    if (select) {
      boxIds.map(id => selectedSet.add(id));
      const difference = boxIds.filter(x => !this.selected.includes(x));
      this.onValueChange(difference, select);
    }
    else {
      boxIds.map(id => selectedSet.delete(id));
      const intersection = boxIds.filter(x => this.selected.includes(x));
      this.onValueChange(intersection, select);
    }
    this.selected = [...selectedSet]
  }

  // updateComplete() {
  //   super.updateComplete();
  //   this._visibleOptions = [];
  // }

  render() {
    let classes = ''
    if(this.boxType === PRIMARY || this.boxType === SECONDARY || this.boxType === BORDERLESS) classes += ' button-options'
    if(this.rightAlign) classes += ' right-align'
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
                            class=${classes}
                            >
                ${this.searchBox? this.renderSearchBox() : null}
                ${this.inputType === MULTI_SELECT ? this.renderSelectAll() : null}
                ${this.renderList()}
                ${!!this.helperText? html`<p class="helper-text">${this.helperText}</p>` :null}
                <slot name="bottom-content"></slot>
              </paper-dialog>`
            :null}
        </div>
      </div>
    `;
  }
}

window.customElements.define('unity-dropdown', UnityDropdown);
