import { LitElement, html, css } from 'lit-element';
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles';


class UnitySelectMenu extends LitElement {

  constructor(){
    super();
    this.onMenuClick = () => {};
    this.items = [];
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
      }
      li:hover {
        background-color: var(--primary-brand-color-light, var(--default-primary-brand-color-light));
      }
      .list-element-wrapper {
        margin: 0;
      }
      .icon-left-wrapper {
        padding-left: 8px;
      }
      .icon-right-wrapper {
        padding-right: 8px;
      }
      .icon-right-wrapper.chevron {
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

      }
      `
    ]
  }

  clickedMenu(index){
    this.onMenuClick(index);
  }

  renderItem(item, index) {
    const {label, icon, comment, submenu } = item;
    return html`
      <li @click=${() => this.clickedMenu(index)}>
        <div class="item-label-wrapper">
          ${!!icon? html`<div class="icon-left-wrapper">
                <iron-icon class="inner-icon" icon="${icon}"}"></iron-icon>
              </div> ` 
            : null }
          <p class="item-label">${label}</p>
          ${!!item.submenu? html`
            <div class="icon-right-wrapper chevron" @click=${this.openSubmenu(item.submenu)}>
              <iron-icon class="inner-icon" icon="unity:right_chevron"></iron-icon>
            </div>` 
          : null }
        </div>
        ${!!comment? html`<p class="item-comment">${comment}</p>`: null}
      </li>
  
    ${!!submenu? this.renderSubmenu(submenu) : null}
    `;
  }

  //TODO
  openSubmenu(submenu) {
    console.log("submenu clicked")
    // return this.renderList(submenu);
  }

  renderSubmenu(submenu) {
    return html`
      <div class="submenu">
        ${this.renderList(submenu)}
      </div>
    `;
  }
  renderList(itemsList) {
    const className = this.borderless? "borderless" : null;
    return html`
    <ul class=${className}>
      ${itemsList.map((item, index) => {return this.renderItem(item, index)})}
    </ul>`;
  }

  render() {
    return this.renderList(this.items);
  }

}

window.customElements.define('unity-select-menu', UnitySelectMenu);