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
  {"label": "Option 1", "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"},
  {"label": "Option 2"},
  {"label": "Option 3"}];


/**
 * TODOS:
 * - Match colors to spec
 * - Add shadow to the component on focus
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
          margin: 0;
          padding: 0;
          font-size: var(--text-size);
          color: var(--label-color);
        }
        .list-element-wrapper {
          margin: 0;
        }
        .icon-right-wrapper {
          position: relative;
          left: 6px;
        }
        .text-box:not(.disabled) .icon-right-wrapper {
          cursor: pointer;
        }
        ul{
          padding: 0;
          margin: 0;
          border: 1px solid gray;
          border-radius: 0 0 2px 2px;
          list-style: none;
        }
        .list-element {
          margin: 0;
        }
        li {
          font-size: var(--text-size);
          font-family: var(--input-font);
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
          color: var(--medium-grey-text-color);
        }
        .option-comment {
          font-size: 0.9em;
          line-height: 1.2em;
        }
      `
    ];
  }


  constructor() {
    super();
    this.label = "";
    this.selected = 0;
    this.disabled = false;
    this.dropdown = () => this.toggleCollapse();
    this.changeValue = (index) => (e) => {this.selected = index};
    this.collapsed = true;
    this.options = optionsList;
    
  }

  static get properties() {
    return {
      label: { type: String },
      selected: { type: Number },
      disabled: { type: Boolean },
      dropdown: { type: Function },
      collapsed: { type: Boolean },
      options: { type: Array }
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
                    <p>${label}</p>
                    ${!!option.comment? html`<p class="option-comment">${option.comment}</p>`: null}
                  </li>
                </div>`;
  }

  render() {
    return html`
      <div>
        ${!!this.label ?
          html`<span class="label">
            ${this.label}
            </span>`
          : null
        }
        <div class="dropdown-menu">
          <div class="text-box input-box ${!!this.disabled ? 'disabled' : ''}" @click="${this.dropdown}">
            <div style="flex: 1" class="selected-wrapper">
              <p id="selected">${optionsList[this.selected].label}</p>
            </div>
            <div class="icon-right-wrapper">
              <iron-icon class="inner-icon" icon="${this.collapsed? "unity:down_chevron" : "unity:up_chevron"}"></iron-icon>
            </div>
          </div>
          ${!this.collapsed? 
            html`<ul>
              ${this.options.map((option, index) => {return this.renderOption(option, index)})}
              </ul>`:
            null}
        </div>     
      </div>
    `;
  }
}

window.customElements.define('unity-dropdown-input-base', UnityDropdownInputBase);
