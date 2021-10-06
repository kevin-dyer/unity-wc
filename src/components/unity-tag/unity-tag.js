import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-typography'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Tag with configurable styles
 * @name UnityTag
 * @param {string} value, value associated with the tag
 * @param {string} label, tag text
 * @param {boolean} withClose, controls if close button is shown
 * @param {function} onClose, function called on clicking close button, ignored if !withClose
 * @param {function} onClick, function called on clicking tag, non-close button area
 * @example
 * <unity-tag
 *   .value="test-value"
 *   label="example tag"
 *   withClose
 *   .onClose=${removetag}
 *   .onClick=${searchByLabel}
 * />
 * 
 * CSS Variables:
 * --tag-color
 * --tag-text-color
 * --tag-font-size
 * --tag-padding
 * --tag-margin
 * --tag-border
 * --tag-hover-text-color
 */

class UnityTag extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-tag-color: var(--light-gray-1-color, var(--default-light-gray-1-color));
          --default-tag-text-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --default-tag-font-size: var(--small-text-size, var(--default-small-text-size));
          --default-tag-padding: var(--padding-size-sm, var(--default-padding-size-sm));
          --default-tag-margin: 4px;
          --default-tag-border: none;
          --default-tag-hover-text-color: var(--gray-color, var(--default-gray-color));
          --icon-size: calc(var(--tag-font-size, var(--default-tag-font-size)) * 1.4);
          display: flex;
        }
        #tag {
          display: flex;
          align-items: center;
          background-color: var(--tag-color, var(--default-tag-color));
          border: var(--tag-border, var(--default-tag-border));
          border-radius: var(--tag-font-size, var(--default-tag-font-size));
          padding: 2px var(--tag-padding, var(--default-tag-padding));
          white-space: nowrap;
          user-select: none;
          margin: var(--tag-margin, var(--default-tag-margin));
        }
        #tag.clickable {
          cursor: pointer;
        }
        .label {
          display: flex;
          flex: 1;
          justify-content: center;
          --font-color: var(--tag-text-color, var(--default-tag-text-color));
          --font-size: var(--tag-font-size, var(--default-tag-font-size));
        }
        .close {
          display: flex;
          flex: 0;
          color: var(--tag-text-color, var(--default-tag-text-color));
          height: var(--icon-size);
          width: var(--icon-size);
          padding-left: 4px;
          --unity-icon-height: var(--icon-size);
          --unity-icon-width: var(--icon-size);
        }
        .close:hover {
          color: var(--tag-hover-text-color, var(--default-tag-hover-text-color));
          cursor: pointer;
        }
      `
    ]
  }

  static get properties() {
    return {
      value: { type: String },
      label: { type: String },
      withClose: { type: Boolean },
      onClose: { type: Function },
      onClick: { type: Function }
    }
  }

  constructor() {
    super()

    this.value = ''
    this.label = ''
    this.withClose = false
    this.onClose = null
    this.onClick = null
  }

  handleClick(e) {
    if(this.onClick instanceof Function) {
      this.onClick(e, this.value)
    }
  }

  handleClose(e) {
    if (this.onClose instanceof Function) {
      e.stopImmediatePropagation()
      this.onClose(e, this.value)
    }
  }

  render() {
    const {
      label,
      withClose
    } = this

    return html`
      <div class=${this.onClick instanceof Function? 'clickable':''} id="tag" @click="${e => this.handleClick(e)}">
        <unity-typography class="label">${label}</unity-typography>
        ${!!withClose ? html`<unity-icon
            icon="unity:close"
            class="close"
            id="close-tag-button"
            @click="${e => this.handleClose(e)}"
          ></unity-icon>` : null}
      </div>
    `
  }
}

window.customElements.define('unity-tag', UnityTag)
