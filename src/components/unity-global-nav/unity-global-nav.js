import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
* Renders a left-bound navigation bar
* @name UnityGlobalNav
* @param {}
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

// usecase description and vars

class UnityGlobalNav extends LitElement {
  // internals
  constructor() {
    super()
    // defaults of inputs

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
