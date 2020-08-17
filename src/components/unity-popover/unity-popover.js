import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-icon'

import { createPopper } from '@popperjs/core/lib/popper-lite.js'
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow.js'
import flip from '@popperjs/core/lib/modifiers/flip.js'

/**
* Shadowed popover/popover with optional close button for holding variable content
* @name Unitypopover
* @param {string} label, the text of the tooltip
* @param {string} arrow, direction of the tooltip arrow (top, bottom, right or left), optional
* @param {bool} bottomAlign, if the popover should be aligned to the bottom of the reference point
* @param {bool} rightAlign, if the tooltip should be aligned to the right of the reference point

* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-popover
*   .onClose=${() => { console.log(`popover closed`)}}
*   .show=${true}
* ></unity-popover>
**/

class Unitypopover extends LitElement {

  constructor() {
    super()
    this.onClose = () => true
    this._show = false
    this._popoverInstance = null
  }

  static get properties() {
    return {
      onClose: { type: Function },
      show: { type: Boolean },
    }
  }

  set show(val) {
    const oldVal = this._show
    this._show = val
    if (!!val) document.addEventListener('click', this.outsideClickListener.bind(this))

    const pageContent = this.shadowRoot?.querySelector('#page-content')
    console.log("Unitypopover -> setshow -> button", button)
    const popover = document.querySelector('#popover')
    console.log("Unitypopover -> setshow -> popover", popover)

    this._popoverInstance = createPopper(pageContent, popover, {
      modifiers: [preventOverflow, flip],
    })

    this.requestUpdate('show', oldVal)
  }
  
  get show() { return this._show }
  
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-popover-min-width: 120px;
          --default-popover-max-width: 300px;
          --default-popover-min-height: 38px;
          --default-popover-max-height: 300px;
          --default-popover-shadow: 0 0 3px 2px rgba(0,0,0,0.2);
          --default-popover-left-offset: auto;
        }
        #container {
          position: relative;
        }
        #popover {
          position: absolute;
          max-width: var(--popover-max-width, var(--default-popover-max-width));
          min-width: var(--popover-min-width, var(--default-popover-min-width));
          max-height: var(--popover-max-height, var(--default-popover-max-height));
          min-height: var(--popover-min-height, var(--default-popover-min-height));
          background-color: var(--popover-background-color, var(--default-white-color));
          box-shadow: var(--popover-shadow, var(--default-popover-shadow));
          padding: 2px 8px;
          overflow-y: scroll;
          left: var(--popover-left-offset, var(--default-popover-left-offset));
        }
        #close-button {
          position: absolute;
          top: 5px;
          right: 5px;
          --button-color: var(--default-dark-grey-text-color);
        }
        `
      ]
    }
    
  outsideClickListener(event) {
    const element = this.shadowRoot?.getElementById('popover')
    if (!element) throw `Could not find popover in shadowroot`
    if (!element.contains(event.target) && !!this.show) this.handleClosepopover()
  }

  handleClosepopover() {
    const { onClose } = this
    const shouldClose = onClose()
    if (shouldClose) {
      this.show = false
      this._popoverInstance?.destroy()
      this._popoverInstance = null
      document.removeEventListener('click', this.outsideClickListener)
    }
  }

  render() {
    const { show } = this
    return html`
      <div id="container">spo
        <slot name="on-page-content" id='page-content'></slot>
        <div id='popover' style="display: ${!!show ? 'flex' : 'none'}">
          <unity-button
            id='close-button'
            type='borderless'
            centerIcon='unity:close'
            @click=${this.handleClosepopover}
          ></unity-button>
          <div id="popover-content-container">
            <slot name="popover-content">Not popover Content</slot>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('unity-popover', Unitypopover)
