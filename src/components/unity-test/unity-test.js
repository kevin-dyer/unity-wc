import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Renders a div/p with text, styled
 * @name UnityTypography
 * @param {''} color, dark, medium, or light, defaults dark
 * @param {''} size, header1, header2, paragraph, medium, small, defaults paragraph
 * @param {''} weight, header1, header2, paragraph, medium, small, defaults to match size
 * @example
 * <unity-typography size="header1" weight="header2">
 *   "And then you can give it any kind of text you want on the inside."
 * </unity-typography>
 *
 * There are a number of css vars expose for specific style overrides. These will override
 * any of the attribute controled styles, allowing the classes matching the attributes
 * to still show, but having the effect of the override.
 * CSS variables:
 *   --font-face   -  font family
 *   --font-size   -  font size
 *   --font-weight -  font weight
 *   --font-color  -  font color
 **/

const BLACK = 'black'
const DARK = 'dark'
const MEDIUM = 'medium'
const LIGHT = 'light'
const SMALL = 'small'
const HEADER_ONE = 'header1'
const HEADER_TWO = 'header2'
const PARA = 'paragraph'

class UnityTypography extends LitElement {
  constructor() {
    super()

    this.color = ''
    this.size = ''
    this.weight = ''
  }

  static get properties() {
    return {
      color: { type: String },
      size: { type: String },
      weight: { type: String }
    }
  }

  getClasses() {
    const { color, size } = this
    let classes = []
    switch(color) {
      case BLACK:
        classes.push('color-black')
        break
      case DARK:
        classes.push('color-dark')
        break
      case MEDIUM:
        classes.push('color-medium')
        break
      case LIGHT:
        classes.push('color-light')
        break
    }

    switch(size) {
      case HEADER_ONE:
        classes.push('size-header-1')
        break
      case HEADER_TWO:
        classes.push('size-header-2')
        break
      case PARA:
        classes.push('size-paragraph')
        break
      case MEDIUM:
        classes.push('size-medium')
        break
      case SMALL:
        classes.push('size-small')
        break
    }

    const weight = this.weight || size
    switch(weight) {
      case HEADER_ONE:
        classes.push('weight-header-1')
        break
      case HEADER_TWO:
        classes.push('weight-header-2')
        break
      case PARA:
        classes.push('weight-paragraph')
        break
      case MEDIUM:
        classes.push('weight-medium')
        break
      case SMALL:
        classes.push('weight-small')
        break
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
          --font-face: var(--font-family, var(--default-font-family));
          --font-color-light: var(--light-grey-text-color, var(--default-light-grey-text-color));
          --font-color-medium: var(--medium-grey-text-color, var(--default-medium-grey-text-color));
          --font-color-dark: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --font-color-black: var(--black-text-color, var(--default-black-text-color));
          --header1-size: var(--header1-font-size, var(--default-header1-font-size));
          --header2-size: var(--header2-font-size, var(--default-header2-font-size));
          --paragraph-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --medium-size: var(--medium-text-size, var(--default-medium-text-size));
          --small-size: var(--small-text-size, var(--default-));
          --header1-weight: var(--header1-font-weight, var(--default-header1-font-weight));
          --header2-weight: var(--header2-font-weight, var(--default-header2-font-weight));
          --paragraph-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          --medium-weight: var(--medium-text-weight, var(--default-medium-text-weight));
          --small-weight: var(--small-text-weight, var(--default-small-text-weight));
          --font-size: var(--font-size, var(--paragraph-size));
        }
        div {
          font-family: var(--font-face, var(--default-font-family));
          font-size: var(--font-size, var(--paragraph-weight));
          font-weight: var(--font-weight, var(--paragraph-weight));
          color: var(--font-color, var(--font-color-black));
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .color-light {
          color: var(--font-color, var(--font-color-light));
        }
        .color-medium {
          color: var(--font-color, var(--font-color-medium));
        }
        .color-dark {
          color: var(--font-color, var(--font-color-dark));
        }
        .color-black {
          color: var(--font-color, var(--font-color-black));
        }
        .size-header-1 {
          font-size: var(--font-size, var(--header1-size));
        }
        .size-header-2 {
          font-size: var(--font-size, var(--header2-size));
        }
        .size-paragraph {
          font-size: var(--font-size, var(--paragraph-size));
        }
        .size-medium {
          font-size: var(--font-size, var(--medium-size));
        }
        .size-small {
          font-size: var(--font-size, var(--small-size));
        }
        .weight-header-1 {
          font-weight: var(--font-weight, var(--header1-weight));
        }
        .weight-header-2 {
          font-weight: var(--font-weight, var(--header2-weight));
        }
        .weight-paragraph {
          font-weight: var(--font-weight, var(--paragraph-weight));
        }
        .weight-medium {
          font-weight: var(--font-weight, var(--medium-weight));
        }
        .weight-small {
          font-weight: var(--font-weight, var(--small-weight));
        }
      `
    ]
  }
}

window.customElements.define('unity-typography', UnityTypography)
