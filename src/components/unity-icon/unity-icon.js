import { LitElement, html, css } from 'lit-element'
import '@polymer/iron-icon/iron-icon.js'
import '@bit/smartworks.unity.unity-icon-set'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'


/**
* Renders an icon
* @name UnityIcon
* @param {string} icon, unity icon or iron icon to display
* @param {string} src, use instead of icon, path to the image to display
* @return {LitElement} returns a class extended from LitElement

* @example
* <unity-icon icon="unity:add"></unity-icon>
* <unity-icon src="./star.png"></unity-icon>

 * CSS Vars:
 *   --unity-icon-height: height of the icon, defaults to 16px
 *   --unity-icon-width: width of the icon, defaults to 16px
**/

class UnityIcon extends LitElement {
  constructor() {
    super()
    this.icon = ''
    this.src = ''
  }

  static get properties() {
    return {
      icon: { type: String },
      src: { type: String }
    }
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          display: inline-block;
          --unity-icon-height: 16px;
          --unity-icon-width: 16px;
        }
        iron-icon {
          --iron-icon-height: var(--unity-icon-height);
          --iron-icon-width: var(--unity-icon-width);
        }
      `
    ]
  }

  render() {
    return html`
      <iron-icon
        icon=${this.icon}
        src=${this.src}
      ></iron-icon>    
    `
  }
}

window.customElements.define('unity-icon', UnityIcon);
