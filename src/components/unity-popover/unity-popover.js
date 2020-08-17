import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-icon'

import {createPopper} from '@popperjs/core'

/**
* Shadowed popover/popover with optional close button for holding variable content
* @name UnityPopover
* @param {bool} withClose, determines whether the close button is displayed
* @param {func} onClose, callback fired when the close button is clicked
* @param {bool} show, determines whether the popover is visible
* @param {string} placement, the position of the popover in reference to the on-page content options are
*  'auto'
*  'auto-start'
*  'auto-end'
*  'top'
*  'top-start'
*  'top-end'
*  'bottom'
*  'bottom-start'
*  'bottom-end'
*  'right'
*  'right-start'
*  'right-end'
*  'left'
*  'left-start'
*  'left-end'

* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-popover
*   withClose
*   .onClose=${() => { console.log(`popover closed`)}}
*   .show=${true}
* >
*   <div slot='on-page-content'>Content always visible, to which popover is anchored</div>
*   <div slot='popover-content'>Content to be placed inside the popover</div>
* </unity-popover>
**/

class UnityPopover extends LitElement {

  constructor() {
    super()
    this.onClose = () => true
    this.withClose = false
    this.show = false
    this.placement = 'bottom'
    this._show = false
    this._popoverInstance = null
    this.outsideClickListener = this.outsideClickListener.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.outsideClickListener)
  }

  firstUpdated() {
    console.log("UnityPopover -> firstUpdated -> this", this)
    console.log("UnityPopover -> firstUpdated -> this.shadowRoot", this.shadowRoot)
    const pageContent = this.shadowRoot.getElementById('page-content')
    console.log("UnityPopover -> firstUpdated -> pageContent", pageContent)
    const popover = this.shadowRoot.querySelector('#popover')
    console.log("UnityPopover -> firstUpdated -> popover", popover)

    this._popoverInstance = createPopper(pageContent, popover, {
      placement: this.placement
    })

  }

  disconnectedCallback() {
    this.destroyPopover()
    document.removeEventListener('click', this.outsideClickListener)
    super.disconnectedCallback()
  }

  static get properties() {
    return {
      withClose: { type: Boolean },
      onClose: { type: Function },
      show: { type: Boolean },
    }
  }

  set show(val) {
    const oldVal = this._show
    this._show = val
    const popoverElement = this.shadowRoot.querySelector('#popover')
    console.log("UnityPopover -> setshow -> popoverElement", popoverElement)
    if (!!popoverElement) {
    console.log("UnityPopover -> setshow -> popoverElement", popoverElement)
      if (!!val) {
        console.log(`showing`)
        popoverElement.setAttribute('data-show', '')
        console.log("UnityPopover -> setshow -> popoverElement", popoverElement)
      } else {
        console.log(`hiding`)
        popoverElement.removeAttribute('data-show')
        console.log("UnityPopover -> setshow -> popoverElement", popoverElement)
      }
    }

    this.requestUpdate('show', oldVal)
  }
  
  get show() { return this._show }

  outsideClickListener(event) {
    return
    // if (!this.shadowRoot.contains(event.target)) { // for some reason, this is always evaluating to true
    //   event.stopPropagation()
    //   console.log(`click outside element`)
    //   if (!!this.show) this.handleClosePopover()
    // } 
  }

  handleClosePopover() {
    console.log(`closing popover`)
    const { onClose } = this
    const shouldClose = onClose()
    if (shouldClose) {
      this.show = false
      // this.destroyPopover()
      document.removeEventListener('click', this.outsideClickListener)
    }
  }

  destroyPopover() {
    this._popoverInstance?.destroy()
    this._popoverInstance = null
  }
  
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
        #page-content {
          
        }
        #popover {
          display: none;
          max-width: var(--popover-max-width, var(--default-popover-max-width));
          min-width: var(--popover-min-width, var(--default-popover-min-width));
          max-height: var(--popover-max-height, var(--default-popover-max-height));
          min-height: var(--popover-min-height, var(--default-popover-min-height));
          background-color: var(--popover-background-color, var(--default-white-color));
          box-shadow: var(--popover-shadow, var(--default-popover-shadow));
          padding: 2px 8px;
          overflow-y: scroll;
        }
        #popover[data-show] {
          display: block;
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

  render() {
    const { show } = this
    return html`
      <div id='main-container'>
        <slot name="on-page-content" id='page-content'>Popover</slot>
        <div id='popover'>
          <unity-button
            id='close-button'
            type='borderless'
            centerIcon='unity:close'
            @click=${this.handleClosePopover}
          ></unity-button>
          <div id="popover-content-container">
            <slot name="popover-content">No Popover Content Provided</slot>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('unity-popover', UnityPopover)
