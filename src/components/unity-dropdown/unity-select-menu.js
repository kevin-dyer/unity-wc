import { LitElement, html, css } from 'lit-element';
import '@bit/smartworks.unity.unity-tag'
import '@bit/smartworks.unity.unity-icon'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles';

/**
* Renders a menu with optional submenus that display on hover.
* @name UnitySelectMenu
* @fileOverview A menu component with optional submenus
* @param {Array} options, the list of menu options, option properties include: label, icon, comment (subtext), submenu, tag (flag), id (returned to onMenuClick), tagStyles (customizable tag styles only)
* @param {Array} highlighted, an array of ids for the option(s) to highlight
* @param {Function} onMenuClick, callback when a menu option is clicked
* @param {Boolean} borderless, do not render list border or box shadow, default: false
*
* @example
* <unity-select-menu
*   .options=${dataMock.submenus}
*   .onMenuClick=${this.onMenuClick}
*   .highlighted={"1"}
*   borderless
* >
* </unity-select-menu>
**/


class UnitySelectMenu extends LitElement {

  constructor() {
    super()
    this.onMenuClick = () => {}
    this.borderless = false
    
    this._options = []
    this._highlighted = []
  }

  static get properties() {
    return {
      options: { type: Array },
      highlighted: { type: Array },
      onMenuClick: { type: Function },
      borderless: { type: Boolean }
    }
  }

  get highlighted() {
    return this._highlighted
  }

  set highlighted(value) {
    const oldValue = this._highlighted
    this._highlighted = value
    this.requestUpdate('highlighted', oldValue)
  }

  get options() {
    return this._options
  }

  set options(value) {
    const oldValue = this._options
    this._options = value
    this.requestUpdate('options', oldValue)
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
            --highlighted-option-color: var(--primary-tint-2-color, var(--default-primary-tint-2-color));
            --highlighted-option-hover-color: var(--primary-color, var(--default-primary-color));
            --default-menu-hover-color: var(--light-gray-2-color, var(--default-light-gray-2-color));
            --default-menu-options-list-max-height: 330px;
            font-family: var(--input-font);
            border-collapse: collapse;
            user-select: none;
            display: flex;
            width: fit-content;
            max-width: 300px;
            overflow: scroll;
          }
        .borderless {
          border: none;
          box-shadow: none;
        }
        p {
          margin-block-start: 0.5em;
          margin-block-end: 0.5em;
          padding: 0 8px;
          box-sizing: border-box;
        }
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          border: 1px solid #9299A4;
          box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15);
          border-radius: 2px;
          width: 100%;
          max-height: var(--menu-options-list-max-height, var(--default-menu-options-list-max-height));
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
          background-color: var(--menu-hover-color, var(--default-menu-hover-color));
        }
        li:hover > .submenu {
          display: block;
        }
        .highlighted-option {
          background-color: var(--highlighted-option-color);
        }
        .highlighted-option:hover {
          background-color: var(--highlighted-option-hover-color);
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
        .option-label-wrapper {
          display: flex;
          align-items: center;
        }
        .option-label {
          flex: 1;
          align-items: center;
          width: 100%;
        }
        .option-comment {
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

  // Call callback function only when the options has no submenu
  clickedMenu(id, submenu, e){
    e.stopPropagation()
    if(!submenu) {
      this.onMenuClick(id)
    }
  }

  renderOption(option) {
    const {
      label,
      icon,
      comment,
      submenu,
      id,
      tag,
      tagStyles: {
        "--tag-color": tagColor,
        "--tag-text-color": tagTextColor,
        "--tag-font-size": tagFontSize,
        "--tag-padding": tagPadding,
        "--tag-margin": tagMargin,
        "--tag-border": tagBorder,
        "--tag-hover-text-color": tagHoverTextColor
      }={}
    } = option

    // tag height should be 2 * (font size + internal margin)
    let tagStyle = "height: calc( (var(--tag-font-size, var(--default-tag-font-size)) + var(--tag-margin, var(--default-tag-margin)) ) * 2 );"
    if (tag) {
      if (tagColor) tagStyle += `--tag-color: ${tagColor};`
      if (tagTextColor) tagStyle += `--tag-text-color: ${tagTextColor};`
      if (tagFontSize) tagStyle += `--tag-font-size: ${tagFontSize};`
      if (tagPadding) tagStyle += `--tag-padding: ${tagPadding};`
      if (tagMargin) tagStyle += `--tag-margin: ${tagMargin};`
      if (tagBorder) tagStyle += `--tag-border: ${tagBorder};`
      if (tagHoverTextColor) tagStyle += `--tag-hover-text-color: ${tagHoverTextColor};`
    }

    const optionHighlighted = this.highlighted.includes(id)

    return html`
      <li @click=${(e) => this.clickedMenu(id, submenu, e)} class="${optionHighlighted ? 'highlighted-option' : null}">
        ${tag ? html`
          <unity-tag
            .label="${label}"
            style="${tagStyle}"
          ></unity-tag>
        ` : html`
          <div class="option-label-wrapper">
            ${!!icon? html`
              <div class="icon-left-wrapper">
                <unity-icon class="inner-icon" icon="${icon}"}"></unity-icon>
              </div>`
            : null }
            <p class="option-label">${label}</p>
            ${!!option.submenu? html`
              <div class="icon-right-wrapper">
                <unity-icon class="inner-icon" icon="unity:right_chevron"></unity-icon>
              </div>`
            : null }
          </div>
          ${!!comment? html`<p class="option-comment">${comment}</p>`: null}
          ${!!submenu? this.renderSubmenu(submenu) : null}
        `}
      </li>
    `;
  }

  // recursively render submenus
  renderSubmenu(submenu) {
    return html`<ul class="submenu">${this.renderList(submenu)}</ul>`
  }

  renderList(optionsList) {
    return optionsList.map((option) => this.renderOption(option))
  }

  render() {
    const className = this.borderless ? "borderless" : null
    return html`
      <ul class=${className}>
        ${this.renderList(this.options)}
      </ul>`
  }
}

window.customElements.define('unity-select-menu', UnitySelectMenu)
