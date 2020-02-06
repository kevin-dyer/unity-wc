import { LitElement, html, css } from 'lit-element'

import { UnitydefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * A container to hold two views:
 *   1) one which will hold main content to always be rendered and fit to the full view
 *   2) and one to act in a modal-like fashion, to hold contextual information, and cause
 *      the other view to shrink in view but not in function
 * @name UnitySplitPane
 * @param {bool} show, controls if the other pane should be visible or not
 * @param {func} onClose, function to call whent he close button is clicked
 * @example
 *   <unity-split-pane
 *     show=${showDetails}
 *     onClose="${toggleShowDetails}"
 *   >
 *     <div slot="main">
 *       Content
 *     </div>
 *     <div slot="pane">
 *       Details
 *     </div>
 *   </unity-split-pane>
 */

class UnitySplitPane extends LitElement {
  constructor() {
    super()

    this.show = false
    this.onClose = ()=>{}
  }

  static get properties() {
    return {
      show: { type: Boolean },
      onClose: { type: onClose }
    }
  }

  render() {
    const {
      show,
      onClose
    } = this
    // need .main to fill the entire space as if .pane didn't exist
    // .main needs to shrink itself when pane is open, but not what's inside of it
    return html`
      <div class="main">
        <slot name="main"></slot>
      </div>
      <div class="pane">
        <!-- ${/*

          X button that calls onClose on click

          <unity-button
            centerIcon="close"
            @click=${onClose}
          ></unity-button>
        */} -->
        <slot name="pane"></slot>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        main {}
        pane {
          display: none;
        }
        show {
          display: show;
        }
      `
    ]
  }
}

window.customElements.define('unity-split-pane', UnitySplitPane)
