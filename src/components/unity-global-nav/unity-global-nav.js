import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNav
* @param {bool} gutter, show or hide the side gutter
* @return {LitElement} returns a class extended from LitElement
* @example
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
*
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

      // TBI
    }
  }

  // custom setter/getters

  // actions
  render() {
    return html``
  }

  // styles
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {

        }
      `
    ]
  }

}

window.customElements.define('unity-global-nav', UnityGlobalNav)
