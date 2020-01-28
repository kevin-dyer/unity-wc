import { LitElement, html, css } from 'lit-element'

import { getParent, getNextSibling} from '../unity-utils/unity-utils'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * A container that will horizontally or vertically with siblings of the same component
 * @name UnitySection
 * @param
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *   <unity-section
 *   >
 *     <unity-table ...></unity-table>
 *   </unity-section>
 */

 const unity_section = 'unity-section'

class UnitySection extends LitElement {
  constructor() {
    super()

  }

  static get properties() {
    return {
    }
  }


  getClasses() {
    let classes = ['section']
    // parent is not a section
    if (getParent(this).localName !== unity_section) classes.push('top-border')
    else {
      // nextSibling is a section
      const next = getNextSibling(this)
      if (!!next && next.localName === unity_section) classes.push('inner-border')
    }
    return classes.join(' ')
  }

  render() {
    const classes = this.getClasses()
    return html`
      <div class="${classes}">
        <slot></slot>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --section-color: var(--background-color, var(--default-background-color, white));
          --border-color: var(--section-border-color, var(--default-medium-grey-background-color));
          flex: 1;
        }
        .section {
          background-color: var(--section-color);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        }
        .top-border {
          border-top: 1px solid var(--border-color);
        }
        .inner-border {
          border-right: 1px solid var(--border-color);
        }
      `
    ]
  }
}

window.customElements.define(unity_section, UnitySection);
