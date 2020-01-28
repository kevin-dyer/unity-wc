import { LitElement, html, css } from 'lit-element'

import { getParent, getNextSibling} from '../unity-utils/unity-utils'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * A container that will horizontally or vertically with siblings of the same component
 * @name UnitySection
 * @param {bool} nowrap, on row, control if column sections should wrap
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

    this.nowrap = false
  }

  static get properties() {
    return {
      nowrap: { type: Boolean }
    }
  }


  getClasses() {
    const { nowrap } = this
    let classes = ['section']
    if (!!nowrap) classes.push('no-wrap')
    // parent is a section
    if (getParent(this).localName === unity_section) {
      classes.push('top-border')
      // nextSibling is a section
      const next = getNextSibling(this)
      if (!!next && next.localName === unity_section) classes.push('inner-border')
    }
    return classes.join(' ')
  }

  render() {
    const classes = this.getClasses()
    return html`
      <!-- <div class="classes"> -->
        <slot></slot>
      <!-- </div> -->
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --section-color: var(--background-color, var(--default-background-color));
          --border-color: black;
          flex: 1;
          background-color: var(--section-color);
          display: flex;
          flex-direction: row;
          align-items: center;
          align-self: stretch;
          justify-content: center;
          flex-wrap: wrap;
        }
        .section {
        }
        .no-wrap {
          flex-wrap: nowrap;
        }
        .top-border {
          border-top: 1px solid black;
        }
        .inner-border {
          border-right: 1px solid black;
        }
      `
    ]
  }
}

window.customElements.define(unity_section, UnitySection);
