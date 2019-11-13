import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNavBase
* @param {bool} gutter, show or hide the side gutter
* @param {string} logo, path to hosted logo image
* @param {slot} top, nav items to render in top list, scrollable
* @param {slot} bottom, nav items to render in bottom list, has hard limit based on view space
* @param {css} --global-nav-background-color, css var used for coloring the component
* @param {css} --global-nav-expanded-color, css var used for coloring the component
* @param {css} --primary-brand-color, var, css var used for coloring the component
* @param {css} --global-nav-text-color, css var used for coloring the component
* @param {css} --global-nav-border-color, css var used for coloring the component
* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-global-nav gutter
*   logo="../path/to/hosted/image"
* >
*   <div slot="top">Top Item #1</div>
*   <div slot="top">Top Item #2</div>
*   <div slot="top">Top Item #3</div>
*   <div slot="bottom">Bottom Item #1</div>
*   <div slot="bottom">Bottom Item #2</div>
* </unity-global-nav>
**/

// Left-mounted Global Navigation Bar, only internal variable is bool 'gutter'
// Has slots for top and bottom aligned items. They will be top or bottom mounted, but render in top-down order
// To be used with 'unity-nav-top-item's. Others may be used, but may not have intended results.

class UnityGlobalNavBase extends LitElement {
  constructor() {
    super()

    this.gutter = false
    this.logo = ''
  }

  static get properties() {
    return {
      gutter: { type: Boolean },
      logo: { type: String }
    }
  }

  render() {
    const { gutter, logo } = this
    return html`
      ${gutter ? html`<div class="gutter">` : ''}
        <div class="menu text">
          <div class="logo-container">
            ${logo ? html`
              <img class="logo" src="${logo}">
            ` : ''}
          </div>
          <div class="menu-box">
            <div class="top-container">
              <slot name="top"></slot>
            </div>
            <div class="bottom-container">
              <slot name="bottom"></slot>
            </div>
          </div>
        </div>
      ${gutter ? html`</div>` : ''}
    `
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --primary-menu-color: var(--global-nav-background-color, var(--default-global-nav-background-color));
          --gutter-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --logo-height: 52px;
          --logo-padding: 18px;
          border-collapse: collapse;
        }
        .gutter {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 196px;
          background-color: var(--gutter-color);
        }
        .menu {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 191px;
          background-color: var(--primary-menu-color);
        }
        .text {
          color: var(--text-color)
        }
        .logo-container {
          height: var(--logo-height);
          width: 100%;
          padding-left: var(--logo-padding);
          padding-right: var(--logo-padding);
          overflow: hidden;
        }
        .logo {
          position: absolute;
          height: 18px;
          top: calc(var(--logo-height) / 2);
          transform: translateY(-50%);
        }
        .menu-box {
          position: absolute;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          overflow: hidden;
          top: var(--logo-height);
          bottom: 0;
          width: 100%;
        }
        .top-container {
          height: 100%;
          width: 100%;
          min-height: 52px;
          overflow-y: auto;
          border-collapse: collapse;
        }
        .bottom-container {
          bottom: 0;
          min-height: min-content;
          width: 100%;
          border-collapse: collapse;
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav-base', UnityGlobalNavBase)