import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-popover'

/**
 * @name UnityCard
 * @param {String} [title] the card title
 * @param {String} [description] the card description (note that if this attribute is provided, the "description" slot will not be available)
 * @param {String} [image] the source for the image (note that if this attribute is provided, the "image" slot will not be available)
 * @param {Boolean} [menuButton] show a menu button in the top-right corner; default: false
 * @param {Boolean} [closeButton] show a close button in the top-right corner; default: false (Note that this is superseded by `menuButton - both will not show`)
 * @param {Boolean} [hoverAnimation] show an animation on the border when the card is hovered over; default: false
 * @param {Boolean} [borderless] no border or shadow for the card; default: false
 * @param {Boolean} [centerContent] center the title and description in the content region; default: false
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
    this.centerContent = false
    this.showMenu = false
    this.onClose = () => {}

    this._showMenu = false
    this._actionButtonRef = null
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
      centerContent: { type: Boolean },
      showMenu: { type: Boolean },
      onClose: { type: Function },

      _showMenu: { type: Boolean }
    }
  }

  get showMenu() {
    return this._showMenu
  }

  set showMenu(value) {
    console.log(`setting showMenu`)
    const oldValue = this._showMenu
    this._showMenu = value
    this.requestUpdate('showMenu', oldValue)
  }
  
  updated() {
    this._actionButtonRef = this.shadowRoot.querySelector('#action-button-container')

  }

  _openMenu() {
    this.showMenu = true
  }

  _closeMenu() {
    console.log(`here`)
    this.showMenu = false
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
      onClose,
      showMenu,
      centerContent
    } = this
      console.log("🚀 ~ file: unity-card.js ~ line 127 ~ UnityCard ~ render ~ showMenu", showMenu)
    
    return html`
      <div class="container ${borderless ? 'borderless' : hoverAnimation ? 'hoverable' : ''}">
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
                    @click="${onClose}"
                  ></unity-button>
                ` : ''
              )
            }
          </div>
        </div>
        <div class="content-container ${centerContent ? 'center-content' : ''}">
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
      ${menuButton ? html`
        <unity-popover
          placement: "top-start"
          .show="${showMenu}"
          .onClose="${this._closeMenu}"
          .referenceElement="${this._actionButtonRef}"
          withClose
          closeOnOutsideClick
          flip
        >
        <slot name="menu-content"></slot>
        </unity-popover>
      ` : ''}
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
          --card-hover-border: 1px solid var(--primary-tint-2-color, var(--default-primary-tint-2-color));
          --card-height: 240px;
          --card-width: 180px;
          --card-icon-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --card-no-image-background: var(--gray-color, var(--default-gray-color));
          --card-image-flex: 8;
          --card-content-flex: 3;
        }

        .container {
          position: relative;
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

        .content-container {
          flex: var(--card-content-flex);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px;
        }

        .center-content {
          align-items: center;
        }
        
        #image-container {
          background-color: var(--card-no-image-background);
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
          --button-color: var(--card-icon-color);
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
