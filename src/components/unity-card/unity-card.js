import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'

/**
 * @name UnityCard
 * @param {String} [title] the card title
 * @param {String} [description] the card description (note that if this attribute is provided, the "description" slot will not be available)
 * @param {String} [image] the source for the image (note that if this attribute is provided, the "image" slot will not be available)
 * @param {Boolean} [menuButton] show a menu button in the top-right corner; default: false
 * @param {Boolean} [closeButton] show a close button in the top-right corner; default: false (Note that this is superseded by `menuButton - both will not show`)
 * @param {Boolean} [hoverAnimation] show an animation when the card is hovered over; default: false
 * @param {Boolean} [borderless] no border or shadow for the card; default: false
 * @param {Boolean} [showMenu] force the menu to show or hide
 * @param {Function} [onClose] a callback for when the close button is clicked
 * @returns {LitElement} returns a class extended from LitElement
 * @example
 *  <unity-card
 *    title="My Card"
 *    description="A very swell card"
 *    image="./path/to/image"
 *    closeButton
 *  >
 *  </unity-card>
 *  <unity-card
 *    title="Card with Slots"
 *    menuButton
 *  >
 *    <div slot="description">
 *      <unity-typography>This card has a button in the bottom</unity-typography>
 *      <unity-button>Click Me</unity-button>
 *    </div>
 *    <img slot="image" src="http://placekitten.com/200/200"
 *    <div slot="menu-content">
 *      <unity-select-menu>
 *        .options="${selectMenuOptions}"
 *      </unity-select-menu>
 *    </div>
 *  </unity-card>
 * 
 *  CSS Vars:
 *    --card-border
 *    --card-hover-border
 *    --card-hover-box-color
 *    --card-hover-box-opacity
 *    --card-height
 *    --card-width
 *    --card-border-radius
 *    --card-menu-border-radius
 *    --card-icon-color
 *    --card-no-image-background
 */


class UnityCard extends LitElement {
  constructor() {
    super()
    this.title = ''
    this.description = ''
    this.image = ''
    this.menuButton = false
    this.closeButton = false
    this.hoverAnimation = false
    this.borderless = false
    this.onClose = () => {}

    this._showMenu = false
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      image: { type: String },
      menuButton: { type: Boolean },
      closeButton: { type: Boolean },
      hoverAnimation: { type: Boolean },
      borderless: { type: Boolean },
      showMenu: { type: Boolean },
      onClose: { type: Function },
    }
  }

  get showMenu() {
    return this._showMenu
  }

  set showMenu(value) {
    const oldValue = this._showMenu
    this._showMenu = value
    this.requestUpdate('showMenu', oldValue)
  }

  _openMenu() {

  }

  render() {
    const {
      title,
      description,
      image,
      menuButton,
      closeButton,
      hoverAnimation,
      borderless,
      onClose
    } = this

    const containerClass = `container ${borderless ? html`borderless` : hoverAnimation ? html`hoverable` : ''}`
    
    return html`
      <div class="${containerClass}">
        ${hoverAnimation ? html`<div id="hover-shade-box"></div>` : ''}
        <div id="image-container">
          ${!!image ?
            html`
              <div id="card-image" style="background-image: url(${image})"></div>
            ` : html`
              <slot name="card-image"></slot>
            `
          }
          <div id="action-button-container">
            ${menuButton ?
              html`
                <unity-button
                  id="action-button"
                  type="borderless"
                  centerIcon="unity:ellipses_vertical"
                  @click="${this._openMenu}"
                ></unity-button>
              ` : (closeButton ?
                html`
                  <unity-button
                    id="action-button"
                    type="borderless"
                    centerIcon="unity:close"
                    @click="${this.onClose}"
                  ></unity-button>
                ` : ''
              )
            }
          </div>
        </div>
        <div id="content-container">
          <unity-typography
            id="title-text"
            size="header2"
            weight="header2"
          >
            ${title}
          </unity-typography>
          ${!!description ?
            html`
              <unity-typography
                id="description-text"
                size="paragraph"
                weight="paragraph"
              >
                ${description}
              </unity-typography>
            ` : html`
              <slot name="description"></slot>
            `
          }
        </div>
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --card-border: 1px solid var(--gray-color, var(--default-gray-color));
          --card-border-radius: 5px;
          --card-menu-border-radius: 0;
          --card-box-shadow: 0 1px 3px 0 var(--gray-color, var(--default-gray-color));
          --card-hover-border: 1px solid var(--primary-tint-2-color, var(--default-primary-tint-2-color));
          --card-hover-box-color: rgb(0,0,0);
          --card-hover-box-opacity: 0;
          --card-height: 240px;
          --card-width: 180px;
          --card-icon-color: var(--primary-color, var(--default-primary-color));
          --card-no-image-background: var(--primary-color, var(--default-primary-color));
          --card-image-flex: 5;
          --card-content-flex: 2;
        }

        .container {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border: var(--card-border);
          box-shadow: var(--card-box-shadow);
          border-radius: var(--card-border-radius);
          overflow: hidden;
          width: var(--card-width);
          height: var(--card-height);
        }

        .borderless {
          border: none;
          box-shadow: none;
        }
        
        .hoverable:hover {
          border: var(--card-hover-border);
        }

        #hover-shade-box {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 10;
          background-color: rgba(0,0,0,0)
        }

        #hover-shade-box:hover {
          background-color: var(--card-hover-box-color);
          opacity: var(--card-hover-box-opacity);
        }

        #image-container {
          position: relative;
          flex: var(--card-image-flex);
          overflow: hidden;
        }

        #card-image {
          position: absolute; 
          background-size: cover;
          background-position: center center;
          width: 100%;
          height: 100%;
        }

        #action-button-container {
          z-index: 5;
          position: absolute;
          top: 5px;
          right: 5px;
        }

        #action-button {
          --background-color: rgba(0,0,0,0);
        }

        #content-container {
          flex: var(--card-content-flex);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px;
        }

        #title-text {
          margin-bottom: 5px;
        }

        #description-text {

        } 
      `
    ]
  }
}

window.customElements.define('unity-card', UnityCard)
