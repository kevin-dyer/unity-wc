import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-icon'

/**
* Shadowed lightbox/popover with optional close button for holding variable content
* @name UnityLightbox
* @param {string} label, the text of the tooltip
* @param {string} arrow, direction of the tooltip arrow (top, bottom, right or left), optional
* @param {bool} bottomAlign, if the lightbox should be aligned to the bottom of the reference point
* @param {bool} rightAlign, if the tooltip should be aligned to the right of the reference point

* @return {LitElement} returns a class extended from LitElement
* @example
* <unity-lightbox
*   .onClose=${() => { console.log(`lightbox closed`)}}
*   .show=${true}
* ></unity-lightbox>
**/

class UnityLightbox extends LitElement {

  constructor() {
    super()
    this.onClose = () => true
    this._show = false
    this._yOffset = 0
    this._xOffset = 0
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
    this.requestUpdate('show', oldVal)
  }
  
  get show() { return this._show }
  
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-lightbox-min-width: 120px;
          --default-lightbox-max-width: 300px;
          --default-lightbox-min-height: 38px;
          --default-lightbox-max-height: 300px;
          --default-lightbox-shadow: 0 0 3px 2px rgba(0,0,0,0.2)
        }
        #lightbox {
          position: absolute;
          max-width: var(--lightbox-max-width, var(--default-lightbox-max-width));
          min-width: var(--lightbox-min-width, var(--default-lightbox-min-width));
          max-height: var(--lightbox-max-height, var(--default-lightbox-max-height));
          min-height: var(--lightbox-min-height, var(--default-lightbox-min-height));
          background-color: var(--lightbox-background-color, var(--default-white-color));
          box-shadow: var(--lightbox-shadow, var(--default-lightbox-shadow));
          padding: 2px 8px;
          overflow-y: scroll;
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
    const element = this.shadowRoot?.getElementById('lightbox')
    if (!element) throw `Could not find lightbox in shadowroot`
    if (!element.contains(event.target) && !!this.show) this.handleCloseLightbox()
  }

  handleCloseLightbox() {
    const { onClose } = this
    const shouldClose = onClose()
    if (shouldClose) {
      this.show = false
      document.removeEventListener('click', this.outsideClickListener)
    }
  }

  render() {
    const { show, _yOffset, _xOffset } = this
    console.log("UnityLightbox -> render -> this", this)
    console.log(`this.offsetParent`, this.offsetParent)
    console.log(`this.offsetLeft`, this.offsetLeft)
    console.log(`this.offsetTop`, this.offsetTop)
    return html`
      <div id="lb-container"
        <slot name="on-page-content"></slot>
        <div id='lightbox' style="top: ${_yOffset.toString()}px; left: ${_xOffset.toString()}px; display: ${!!show ? 'flex' : 'none'}">
          <unity-button
            id='close-button'
            type='borderless'
            centerIcon='unity:close'
            @click=${this.handleCloseLightbox}
          </unity-button>
          <slot name="lightbox-content"></slot>
        </div>
      </div>
    `
  }
}

window.customElements.define('unity-lightbox', UnityLightbox)
