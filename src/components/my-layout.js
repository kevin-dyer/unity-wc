import { LitElement, html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';

import '@bit/smartworks.unity.unity-core/unity-page-header'
import '@bit/smartworks.unity.unity-core/unity-section'
import '@bit/smartworks.unity.unity-core/unity-button'


// import '../unity-text-input/unity-text-input'
import '@bit/smartworks.unity.unity-text-input'

import './unity-table/unity-table.js'

import '@bit/smartworks.unity.unity-typography'
// import '@bit/smartworks.unity.unity-typography'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

const exampleData = [
  {
    id: 'red',
    name: 'red',
    hex: '#ff0000',
    favorite: true,
    image: 'show image',
    children: [{
        id: 'innerRed1',
        name: 'inner red1',
        hex: '#ff0022',
        favorite: true,
        icon: 'icons:add'
      },
      {
        id: 'innerRed2',
        name: 'inner red2',
        hex: '#ff0066',
        favorite: true,
        icon: 'icons:delete',
        _children: [
          {
            id: 'redGrandchild1',
            name: 'red grandchild',
            hex: '#73a123',
            favorite: false,
            icon: 'icons:bug-report',
            _children: [
              {
                id: 'redGrandchild2',
                name: 'red grandchild2',
                hex: '#73a199',
                favorite: false,
                icon: 'icons:build',
              }
            ]
          }
        ]
      },
      {
        id: 'innerBlue1',
        name: 'inner blue1',
        hex: '#ff0066',
        favorite: true,
        icon: 'icons:delete'
      }],
  },
  {id: 'black', name: 'black', hex: '#000000', favorite: true, icon: 'work'},
  {id: 'yellow', name: 'yellow', hex: '#ffff00', favorite: false, icon: 'social:domain'},
  {id: 'green', name: 'green', hex: '#00ff00', favorite: true, icon: 'work'},
  {id: 'grey', name: 'grey', hex: '#888888', favorite: false, image: 'show image', icon: 'build'},
  {id: 'magenta', name: 'magenta', hex: '#ff00ff', favorite: false, icon: 'social:domain'},
]

const exampleColumns = [
  {
    key: 'hex',
    label: 'Hex value',
    width: 200,
    format: (hex, datum) => html`<span style="color: ${hex}">${hex}</span>`
  },
  {
    key: 'name',
    label: 'Color',
    width: 300,
    format: (name, datum) => !!name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : ''
  },
  {
    key: 'favorite',
    label: 'Favourite?',
    width: 500,
    format: (value, datum) => value ? 'I love it!' : 'passible, I guess'
  }
]

class MyLayout extends LitElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        .container {
          flex: 1;
          flex-direction: column;
          align-items: stretch;
        }
        .header-wrapper {
          /*flex: 0;*/
          width: 100%;
        }
      `
    ];
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('header-tab-selected', this._handleTabSelect)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('header-tab-selected', this._handleTabSelect)
  }

  _handleTabSelect(e) {
    const {detail: {tab, index}={}} = e
    console.log("handleTabSelect called in my-layout, tab: ", tab, ", index: ", index)
  }

  render() {
    return html`<div class="container">
      <div class="header-wrapper">
        <unity-page-header
          title="MOCC2 Title"
          .tabs=${[
            {
              label: 'Users'
            },
            {
              label: 'Rules'
            },
            {
              label: 'API Keys'
            }
          ]}
          .selectedTab=${1}
        >
          <div slot="right-content">
            <unity-button
              label="my button"
              type="solid"
              @click=${e => console.log("unity-button clicked! e: ", e)}
            />
          </div>
        </unity-page-header>
      </div>
      <unity-section>
        <unity-section style="--background-color: #eef4FF;">
          <div style="height: 500px; width: 500px;">
            <unity-text-input
              label="My Input"
              .remark="Input remark."
            ></unity-text-input>
          </div>
        </unity-section>
        <unity-section>
          <div style="height: 250px; width: 250px;">
            <unity-text-input
              .value="${"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}"
              .label="${"Input Area"}"
              area
            ></unity-text-input>
          </div>
        </unity-section>
      </unity-section>
      <unity-section>
        <unity-section bordered>
          <div style="height: 400px; width: 150px">
            <unity-typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </unity-typography>
          </div>
        </unity-section>
        <unity-section bordered style="--background-color: #eef4FF;">
          <div style="height: 500px; width: 500px;">
            <unity-table
              noTopBorder
              selectable
              .keyExtractor="${(datum, index) => datum.name}"
              .childKeys="${['children']}"
              .data="${exampleData}"
              .columns="${[...exampleColumns]}"

              .onSelectionChange="${selected => console.log('These elements are selected:', selected)}"
              .onClickRow="${(element, event) => console.log('This element was clicked:', element, '\nThis was the clicked event:', event)}"
              .onDisplayColumnsChange="${displayColumns => console.log("displayColumns has changed: ", displayColumns)}"
              .onColumnChange="${columns => console.log("onColumnChange callback cols: ", columns)}"
            >
            </unity-table>
          </div>
        </unity-section>
        <unity-section bordered>
          <div style="height: 400px; overflow-y: scroll">
            <unity-typography style="--font-size: 42px; --font-family: Avenir; --font-color: red; --font-weight: 800;" size="header1" color="light">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </unity-typography>
          </div>
        </unity-section>
      </unity-section>
    </div>`
  }
}

window.customElements.define('my-layout', MyLayout);
