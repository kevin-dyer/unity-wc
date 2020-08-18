import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-icon'

import {createPopper} from '@popperjs/core'

/**
* Shadowed popover/popover with optional close button for holding variable content
* @name UnityPopover
* @param {bool} withClose, determines whether the close button is displayed
* @param {func} onClose, callback fired when the close button is clicked; return true 
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
* @param {bool} flip, determines whether popover will change placement to try to stay in view
* @param {array} fallbackPlacements, if flip is true, this is an array of strings (selected from placement options) for possible placements the Popover will flip to
* @param {bool} preventOveflow, nudge the popover inwards to prevent it escaping the container
* @param {htmlElement} boundary, ref specifying the boundary element for flip and preventOverflow
* @param {number} distance, offset of the popover from the on-page-content, in pixels

* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-popover
*   withClose
*   .onClose=${() => { console.log(`popover closed`); return true; }}
*   .show=${true}
*   placement='bottom'
*   flip
* >
*   <div slot='on-page-content'>Content always visible, to which popover is anchored</div>
*   <div slot='popover-content'>Content to be placed inside the popover</div>
* </unity-popover>
**/

const defaultPlacement = 'bottom'

class UnityPopover extends LitElement {

  constructor() {
    super()
    this.onClose = ()=>{}
    this.withClose = false
    this.show = false
    this.flip = false
    this.preventOverflow = false
    this.fallbackPlacements = []
    this.boundary = null
    this.placement = defaultPlacement
    this.distance = 0
    this._distance = 0
    this._placement = defaultPlacement
    this._show = false
    this._popoverInstance = null

    this.outsideClickListener = this.outsideClickListener.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('click', this.outsideClickListener)
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
      placement: { type: String },
      flip: { type: Boolean },
      fallbackPlacements: { type: Array },
      preventOverflow: { type: Boolean },
      boundary: { type: Object },
      distance: { type: Number }
    }
  }

  set show(val) {
    const oldVal = this._show
    this._show = val
    const popoverElement = this.shadowRoot.querySelector('#up_id4')
    if (!!popoverElement) {
      if (!!val) {
        this.createPopover()
        popoverElement.setAttribute('data-show', '')
      } else {
        this.destroyPopover()
        popoverElement.removeAttribute('data-show')
      }
    }

    this.requestUpdate('show', oldVal)
  }
  
  get show() { return this._show }

  set placement(val) {
    const oldVal = this._placement
    this._placement = val
    this.requestUpdate('placement', oldVal)
  }

  get placement() { return this._placement; }

  set distance(val) {
    const oldVal = this._distance
    this._distance = val
    this.requestUpdate('distance', oldVal)
  }

  get distance() { return this._distance; }

  outsideClickListener({ target }) {
    // REVIEWERS - take a look if you have a minute
    // console.log("UnityPopover -> outsideClickListener -> target", target) // for some reason, this is always evaluating to something way up in the hierarchy (i.e. `my-app`)
    if (!target) return
    // const containerElement = this.shadowRoot.getElementById('up_id1')
    // if (!containerElement.contains(target)) { // this is always evaluating to true due to target issues
    //   event.stopPropagation()
    //   if (!!this.show) this.onClose()
    // } 
  }

  createPopover() {
    const pageContent = this.shadowRoot.getElementById('up_id2')
    const popover = this.shadowRoot.getElementById('up_id4')

    this._popoverInstance = createPopper(pageContent, popover, {
      placement: this.placement,
      modifiers: this.makeModifiers()
    })
  }

  destroyPopover() {
    this._popoverInstance.destroy()
    this._popoverInstance = null
  }

  makeModifiers() {
    const modifiers = []
    if (this.flip) {
      const flipModifier = {
        name: 'flip',
        options: {}
      }
      if (!!this.fallbackPlacements[0]) flipModifier.options.fallbackPlacements = this.fallbackPlacements
      if (!!this.boundary) flipModifier.options.boundary = this.boundary
      modifiers.push(flipModifier)
    }
    if (this.preventOverflow) {
      const preventOverflowModifier = {
        name: 'preventOverflow',
        options: {}
      }
      if (!!this.boundary) preventOverflowModifier.options.boundary = this.boundary
      modifiers.push(preventOverflowModifier)
    }
    if (this.distance) {
      const offsetModifier = {
        name: 'offset',
        options: {
          offset: [0, this.distance],
        }
      }
      modifiers.push(offsetModifier)
    }
    return modifiers
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
        }
        #up_id4 {
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
        #up_id4[data-show] {
          display: block;
        }
        #up_id5 {
          position: absolute;
          top: 5px;
          right: 5px;
          --button-color: var(--default-dark-grey-text-color);
        }
      `
    ]
  }

  render() {
    return html`
      <div id='up_id1'>
        <div id='up_id2'>
          <slot name="on-page-content" id='up_id3'>No On-Page Content</slot>
        </div>
        <div id='up_id4'>
          ${this.withClose ? html`<unity-button
            id='up_id5'
            type='borderless'
            centerIcon='unity:close'
            @click=${this.onClose}
          ></unity-button>` : ``}
          <div id="up_id6">
            <slot name="popover-content">No Popover Content Provided</slot>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('unity-popover', UnityPopover)
