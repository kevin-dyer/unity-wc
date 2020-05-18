import { LitElement, html, css } from 'lit-element'

import { getParent } from '@bit/smartworks.unity.unity-utils'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * A container that will horizontally or vertically with siblings of the same component
 * Intended to be used nested within eachother to form rows and auto adjusting columns.
 * @name UnitySection
 * @param {bool} nowrap, on row, control if column sections should wrap
 * @param {bool} bordered, on column, control if section pieces should have stacking borders
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
    this.bordered = false
  }

  static get properties() {
    return {
      nowrap: { type: Boolean },
      bordered: { type: Boolean }
    }
  }


  getClasses() {
    const { nowrap, bordered } = this
    let classes = ['section']
    if (!!nowrap) classes.push('no-wrap')
    // parent is a section
    const hasParent = getParent(this).localName === unity_section
    if (hasParent && !!bordered) classes.push('bordered')
    if (!hasParent) classes.push('row')
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
          --section-color: var(--background-color, var(--default-background-color));
          --border-color: var(--medium-grey-background-color, var(--default-medium-grey-background-color));
          --vert-pos: var(--vertical-position, center);
          --horz-pos: var(--horizontal-position, center);
          align-self: stretch;
          flex: 1;
          display: flex;
          overflow: visible;
        }
        .section {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: var(--vert-pos);
          justify-content: var(--horz-pos);
          flex-wrap: wrap;
          background-color: var(--section-color);
        }
        .no-wrap {
          flex-wrap: nowrap;
        }
        .bordered {
          border-top: 1px solid var(--border-color);
          border-right: 1px solid var(--border-color);
        }
        .row {
          margin-right: -1px;
        }
      `
    ]
  }
}

window.customElements.define(unity_section, UnitySection);
