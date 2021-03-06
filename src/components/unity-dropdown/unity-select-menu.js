import { LitElement, html, css } from 'lit-element';
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles';

/**
* Renders a menu with optional submenus that display on hover.
* @name UnitySelectMenu
* @fileOverview A menu component with optional submenus
* @param {Array} items, the list of menu items
* @param {func} onMenuClick, callback when a menu option is clicked
* @param {bool} borderless, do not render list border, default: true
*
* @example
* <unity-select-menu 
*   .items=${dataMock.submenus}
*   .onMenuClick=${this.onMenuClick}
* >
* </unity-select-menu>
**/


class UnitySelectMenu extends LitElement {

  constructor(){
    super();
    this.items = [];
    this.onMenuClick = () => {};
    this.borderless = false;
  }

  static get properties() {
    return {
      items: { type: Array },
      onMenuClick: { type: Function },
      borderless: { type: Boolean }
    }
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        * {
          box-sizing: border-box;
        }
        :host {
          --input-font: var(--font-family, var(--default-font-family));
          --label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --border-color: var(--global-nav-border-color, var(--default-global-nav-border-color));
          font-family: var(--input-font);
          border-collapse: collapse;
          user-select: none;
          display: flex;
          width: fit-content;
          max-width: 300px;
        }
      .borderless {
        border: 0;
      }
      p {
        margin-block-start: 0.5em;
        margin-block-end: 0.5em;
        padding: 0 8px;
        box-sizing: border-box;
      }
      ul{
        padding: 0;
        margin: 0;
        list-style: none;
        border: 1px solid #9299A4;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
        border-radius: 2px;
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
        position:relative;
      }
      li:hover {
        background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
      }
      li:hover > .submenu {
        display: block;
      }
      .icon-left-wrapper {
        padding-left: 8px;
      }
      .icon-right-wrapper {
        padding-right: 4px;
      }
      .inner-icon {
        max-height: 1.8em;
        max-width: 1.8em;
      }
      .item-label-wrapper {
        display: flex;
        align-items: center;
      }
      .item-label {
        flex: 1;
        align-items: center;
        width: 100%;
      }
      .item-comment {
        font-size: 0.9em;
        line-height: 1.2em;
        margin-top: 0;
      }
      .submenu {
        position: absolute;
        left: 100%;
        width: max-content;
        top: -1px;
        z-index: 101;
        display:none;
      }
      `
    ]
  }

  // Call callback function only when the items has no submenu
  clickedMenu(id, submenu){
    if(!submenu) {
    this.onMenuClick(id);}
  }

  renderItem(item) {
    const {label, icon, comment, submenu, id } = item;
    return html`
      <li @click=${() => this.clickedMenu(id, submenu)}>
        <div class="item-label-wrapper">
          ${!!icon? html`<div class="icon-left-wrapper">
                <iron-icon class="inner-icon" icon="${icon}"}"></iron-icon>
              </div> ` 
            : null }
          <p class="item-label">${label}</p>
          ${!!item.submenu? html`
            <div class="icon-right-wrapper">
              <iron-icon class="inner-icon" icon="unity:right_chevron"></iron-icon>
            </div>` 
          : null }
        </div>
        ${!!comment? html`<p class="item-comment">${comment}</p>`: null}
        ${!!submenu? this.renderSubmenu(submenu) : null}
      </li>
    `;
  }

  // recursively render submenus
  renderSubmenu(submenu) {
    return html`<ul class="submenu">${this.renderList(submenu)}</ul>`;
  }

  renderList(itemsList) {
    return itemsList.map((item) => this.renderItem(item));
  }

  render() {
    const className = this.borderless? "borderless" : null;
    return html`
      <ul class=${className}>
        ${this.renderList(this.items)}
      </ul>`;
  }
}

window.customElements.define('unity-select-menu', UnitySelectMenu);