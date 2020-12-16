import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-typography'
import '@bit/smartworks.unity.unity-button'
import '@bit/smartworks.unity.unity-popover'
import '@bit/smartworks.unity.unity-select-menu'

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
 * @param {Boolean} [closeOnMenuClick] close the menu once an option is selected; default: true
 * @param {Array} [menuOptions] options for the menu. See unity-select-menu for structure.
 * @param {Array} [highlightedMenuOptions] sets which options are highlighted. See unity-select-menu for structure.
 * @param {Function} [onMenuClick] callback for selecting a menu option. See unity-select-menu for structure.
 * @param {Function} [onClose] a callback for when the close button is clicked
 * @param {Function} [onClick] a callback for when the card is clicked
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
 * @css --card-border - default value: 1px solid --gray-color
 * @css --card-border-radius - default value: 5px
 * @css --card-menu-border-radius - default value: 0
 * @css --card-hover-border - default value: 1px solid --primary-color
 * @css --card-height - default value: 240px
 * @css --card-width - default value: 180px
 * @css --card-icon-color - default value: --dark-gray-color
 * @css --card-no-image-background - default value: --gray-color
 * @css --card-image-flex - default value: 8
 * @css --card-content-flex - default value: 3
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
    this.closeOnMenuClick = true
    this.menuOptions = []
    this.highlightedMenuOptions = []
    this.onMenuClick = () => {}
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
      closeOnMenuClick: { type: Boolean },
      onMenuClick: { type: Function },
      onClose: { type: Function },
    }
  }

  updated() {
    this._actionButtonRef = this.shadowRoot.querySelector('#action-button-container')
  }

  _openMenu() {
    this.showMenu = true
  }

  _closeMenu() {
    this.showMenu = false
  }

  _handleMenuButtonClick() {
    if (!this.showMenu) {
      this._openMenu()
    } else {
      this._closeMenu()
    }
  }

  _handleMenuItemClick() {
    this.onMenuClick()
    if(this.closeOnMenuClick) this._closeMenu()
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
      showMenu,
      centerContent,
      menuOptions,
      highlightedMenuOptions,
      onClose,
    } = this
    
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
                  @click="${this._handleMenuButtonClick.bind(this)}"
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
          id="popover"
          placement="auto-start"
          .show="${showMenu}"
          .onClose="${this._closeMenu.bind(this)}"
          .referenceElement="${this._actionButtonRef}"
          closeOnOutsideClick
          flip
        >
          <unity-select-menu
            id="menu-content"
            slot="popover-content"
            .options="${menuOptions}"
            .onMenuClick="${this._handleMenuItemClick}"
            .highlighted="${this.highlightedMenuOptions}"
            borderless
          ></unity-select-menu>
        </unity-popover>
      ` : ''}
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-card-border: 1px solid var(--gray-color, var(--default-gray-color));
          --default-card-border-radius: 5px;
          --default-card-menu-border-radius: 0;
          --default-card-hover-border: 1px solid var(--primary-color, var(--default-primary-color));
          --default-card-height: 240px;
          --default-card-width: 180px;
          --default-card-icon-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-card-no-image-background: var(--gray-color, var(--default-gray-color));
          --default-card-image-flex: 8;
          --default-card-content-flex: 3;
        }

        .container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          border: var(--card-border, var(--default-card-border));
          box-shadow: var(--card-box-shadow, var(--default-card-box-shadow));
          border-radius: var(--card-border-radius, var(--default-card-border-radius));
          overflow: hidden;
          width: var(--card-width, var(--default-card-width));
          height: var(--card-height, var(--default-card-height));
        }
        
        .borderless {
          border: none;
          box-shadow: none;
        }
        
        .hoverable:hover {
          border: var(--card-hover-border, var(--default-card-hover-border));
        }

        .content-container {
          flex: var(--card-content-flex, var(--default-card-content-flex));
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 10px;
        }

        .center-content {
          align-items: center;
        }
        
        #image-container {
          background-color: var(--card-no-image-background, var(--default-card-no-image-background));
          position: relative;
          flex: var(--card-image-flex, var(--default-card-image-flex));
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
          --button-color: var(--card-icon-color, var(--default-card-icon-color));
        }

        #title-text {
          margin-bottom: 5px;
        }

        #description-text {

        }

        #popover {
          --popover-min-width: none;
          --popover-min-height: none;
          --popover-padding: 0;
        }

        #menu-content {
          width: 100%;
        }
      `
    ]
  }
}

window.customElements.define('unity-card', UnityCard)
