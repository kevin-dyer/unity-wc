import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNav
* @param {bool} gutter, show or hide the side gutter
* @return {LitElement} returns a class extended from LitElement
* @example
**/

// Left-mounted Global Navigation Bar, only internal variable is bool 'gutter'
// Has slots for top and bottom aligned items. They will be top or bottom mounted, but render in top-down order
// To be used with 'unity-nav-top-item's. Others may be used, but may not have intended results.

class UnityGlobalNav extends LitElement {
  // internals
  constructor() {
    super()
    // defaults of inputs
    this.gutter = false

    // action handlers

    // action handlers, to be implemented later

    // defaults of internal reference
  }

  // inputs
  static get properties() {
    return {
      gutter: { type: Boolean }
      // TBI
    }
  }

  // custom setter/getters

  // actions
  render() {
    const gutter = this.gutter
    return html`
      ${gutter ? html`<div class="gutter">` : ''}
        <div class="menu text">
          <div class="logo-container">
            <div class="logo">
              <slot name="logo"></slot>
            </div>
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
          --secondary-menu-color: var(--global-nav-expanded-color, var(--default-global-nav-expanded-color));
          --selected-color: var(--primary-brand-color, var(--default-primary-brand-color));
          --text-color: var(--global-nav-text-color, var(--default-global-nav-text-color));
          --border-breakers: var(--global-nav-border-color, var(--default-global-nav-border-color));
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
          background-color: var(--selected-color);
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
          border-bottom: 1px solid var(--border-breakers);
          padding-left: var(--logo-padding);
          padding-right: var(--logo-padding);
          box-sizing: border-box;
        }
        .logo {
          position: absolute;
          top: calc(var(--logo-height) / 2);
          transform: translateY(-50%);
        }
        .menu-box {
          position: absolute;
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          top: var(--logo-height);
          bottom: 0;
          width: 100%;
        }
        .top-container {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
          overflow-y: auto;
          border-collapse: collapse;
        }
        .bottom-container {
          bottom: 0;
          height: auto;
          min-height: min-content;
          width: 100%;
          overflow: hidden;
          border-collapse: collapse;
        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav', UnityGlobalNav)
