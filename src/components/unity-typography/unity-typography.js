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
 * There are a number of css vars expose for specific style overrides. These will
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

    this.color = BLACK
    this.size = PARA
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
      case DARK:
        classes.push('color-dark')
        break
      case LIGHT:
        classes.push('color-light')
        break
      case MEDIUM:
        classes.push('color-medium')
        break
      default:
        classes.push('color-black')
    }

    switch(size) {
      case HEADER_ONE:
        classes.push('size-header-1')
        break
      case HEADER_TWO:
        classes.push('size-header-2')
        break
      case MEDIUM:
        classes.push('size-medium')
        break
      case SMALL:
        classes.push('size-small')
        break
      default:
        classes.push('size-paragraph')
    }

    const weight = this.weight || size
    switch(weight) {
      case HEADER_ONE:
        classes.push('weight-header-1')
        break
      case HEADER_TWO:
        classes.push('weight-header-2')
        break
      case MEDIUM:
        classes.push('weight-medium')
        break
      case SMALL:
        classes.push('weight-small')
        break
      default:
        classes.push('weight-paragraph')
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
          --font-color-light: var(--light-grey-text-color, var(--default-light-grey-text-color));
          --font-color-medium: var(--medium-grey-text-color, var(--default-medium-grey-text-color));
          --font-color-dark: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --font-color-black: var(--black-text-color, var(--default-black-text-color));
          --default-header1-size: var(--header1-font-size, var(--default-header1-font-size));
          --default-header2-size: var(--header2-font-size, var(--default-header2-font-size));
          --default-paragraph-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --default-medium-size: var(--medium-text-size, var(--default-medium-text-size));
          --default-small-size: var(--small-text-size, var(--default-));
          --default-header1-weight: var(--header1-font-weight, var(--default-header1-font-weight));
          --default-header2-weight: var(--header2-font-weight, var(--default-header2-font-weight));
          --default-paragraph-weight: var(--paragraph-font-weight, var(--default-paragraph-font-weight));
          --default-medium-weight: var(--medium-text-weight, var(--default-medium-text-weight));
          --default-small-weight: var(--small-text-weight, var(--default-small-text-weight));
        }
        color-light {
          color: var(--font-color, var(--font-color-light));
        }
        color-medium {
          color: var(--font-color, var(--font-color-medium));
        }
        color-dark {
          color: var(--font-color, var(--font-color-dark));
        }
        color-dark {
          color: var(--font-black, var(--font-color-black));
        }
        size-header-1 {
          font-size: var(--font-size, var(--default-header1-size));
        }
        size-header-2 {
          font-size: var(--font-size, var(--default-header2-size));
        }
        size-paragraph {
          font-size: var(--font-size, var(--default-paragraph-size));
        }
        size-medium {
          font-size: var(--font-size, var(--default-medium-size));
        }
        size-small {
          font-size: var(--font-size, var(--default-small-size));
        }
        weight-header-1 {
          font-weight: var(--font-weight, var(--default-header1-weight));
        }
        weight-header-2 {
          font-weight: var(--font-weight, var(--default-header2-weight));
        }
        weight-paragraph {
          font-weight: var(--font-weight, var(--default-paragraph-weight));
        }
        weight-medium {
          font-weight: var(--font-weight, var(--default-medium-weight));
        }
        weight-small {
          font-weight: var(--font-weight, var(--default-small-weight));
        }
      `
    ]
  }
}

window.customElements.define('unity-typography', UnityTypography)
