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
import '@bit/smartworks.unity.unity-icon-set';

const optionsList = [
  {
    "label": "Option 1", 
    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    "icon": "unity:info_circle"},
  {
    "label": "Option 2",
    "icon": "unity:share"},
  {
    "label": "Option 3",
  }];


/**
 * TODOS:
 * - Match colors to spec
 * - Add shadow to the component on focus
 * - Collapse or not collapse? (when clicking option)
 * - Check sizes - most are pixel, some are em, and some things get ugly when you change browser font size
 * - Check icons size (different size for option listed and selected)
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
        .dropdown-menu:focus {
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
        .selected-wrapper: {
          display: flex;
          flex: 1;
        }
        #selected {
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
        .disabled #selected {
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
      `
    ];
  }


  constructor() {
    super();
    this.label = "";
    this.placeholder = "List Hint";
    this.selected = null;
    this.disabled = false;
    this.dropdown = () => this.toggleCollapse();
    this.changeValue = (index) => (e) => {this.selected = index;};
    this.collapsed = true;
    this.options = optionsList;
    this.selectIcon = true;
    this.helperText = "Choose any option";
    
  }

  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      selected: { type: Number },
      disabled: { type: Boolean },
      dropdown: { type: Function },
      collapsed: { type: Boolean },
      options: { type: Array },
      selectIcon: { type: Boolean },
      helperText: { type: String },
    };
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
    if (index === this.selected) {
      label = html`<b>${label}</b>`;
    }
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

  getSelectedLabel() {
    let initialLabel = this.placeholder? this.placeholder : optionsList[0].label;
    if (this.selected === null) {
      return html`<p id="selected" class="placeholder">${initialLabel}</p>`;
    }
    else {
      return html`<p id="selected">${optionsList[this.selected].label}</p>`;
    }
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
        <div class="dropdown-menu">
          <div class="text-box input-box ${!!this.disabled ? 'disabled' : ''}" @click="${this.dropdown}">
            <div style="flex: 1;  display:flex" class="selected-wrapper">
              ${this.selected !== null? !!optionsList[this.selected].icon? html`
                <div class="icon-left-wrapper">
                  <iron-icon class="inner-icon" icon="${optionsList[this.selected].icon}"}"></iron-icon>
                </div> ` 
              : null : null }
              ${this.getSelectedLabel()}
            </div>
            <div class="icon-right-wrapper">
              <iron-icon class="inner-icon" icon="${this.collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
            </div>
          </div>
          ${!this.collapsed? 
            html`
              <div class="options-box">
                <ul>
                ${this.options.map((option, index) => {return this.renderOption(option, index)})}
                </ul>
                ${!!this.helperText? html`<p class="helper-text">${this.helperText}</p>` :null}
              </div>`
            :null}
        </div>     
      </div>
    `;
  }
}

window.customElements.define('unity-dropdown-input-base', UnityDropdownInputBase);
