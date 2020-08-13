import { LitElement, html, css } from 'lit-element'

import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-core/unity-icon'
import { isVisible } from '../unity-utils/unity-utils'

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
*   .onHide=${() => { console.log(`lightbox closed`)}}
*   .show=${true}
* ></unity-lightbox>
**/

class UnityLightbox extends LitElement {

  constructor() {
    super()
    this.onShow = () => true
    this.onHide = () => true
    this.show = false
  }

  static get properties() {
    return {
      onShow: { type: Function },
      onHide: { type: Function },
      show: { type: Boolean },
    }
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-lightbox-min-width: 120px;
          --default-lightbox-max-width: 300px;
          --default-lightbox-shadow: 0 0 0 10px rgba(0,0,0,1)
        }
        #lightbox {
          position: fixed;
          max-width: var(--lightbox-max-width, var(--default-lightbox-max-width));
          min-width: var(--lightbox-min-width, var(--default-lightbox-min-width));
          background-color: var(--lightbox-background-color, var(--default-white-color));
          box-shadow: var(--lightbox-shadow, var(--default-lightbox-shadow));
          padding: 2px 8px;
          border-radius: 3px;
        }
        #close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          --button-color: var(--default-dark-grey-text-color);
        }
      `
    ]
  }

  outsideClickListener(event) {
    const element = this.shadowRoot.getElementById('lightbox')
    if (!element) throw `Could not find lightbox in shadowroot`
    if (!element.contains(event.target) && !!this.show) this.handleHideLightbox()
  }

  handleShowLightbox() {
    const { onShow } = this
    const shouldShow = onShow()
    if (shouldShow) {
      this.show = true
      document.addEventListener('click', this.outsideClickListener)
    }
  }

  handleHideLightbox() {
    const { onHide } = this
    const shouldHide = onHide()
    if (shouldHide) {
      this.show = false
      document.removeEventListener('click', this.outsideClickListener)
    }
  }

  render() {
    const { show } = this
    return html`
      <div id='lightbox' ${!show ? `style='display: none;'` : ''}>
        <unity-button
          id='close-button'
          type='borderless'
          centerIcon='unity:close'
          @click=${this.handleHideLightbox}
        </unity-button>
        <slot></slot>
      </div>
    `
    return
  }
}

window.customElements.define('unity-lightbox', UnityLightbox)
