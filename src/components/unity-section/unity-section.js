import { LitElement, html, css } from 'lit-element'

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
    return classes.join(' ')
  }

  render() {
    const classes = this.getClasses()
    return html`
      <div class="${classes}">
        <slot id="slot"></slot>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --section-color: var(--section-background-color, var(--default-section-background-color, white));
          --border-color: var(--section-border-color, var(--default-section-border-color, black));
          flex: 1;
        }
        .section {
          background-color: var(--section-color);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: row;
        }
        .top-border {
          border-top: 1px solid var(--border-color);
        }
      `
    ]
  }
}

window.customElements.define(unity_section, UnitySection);
