import { html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-dropdown'
// import './unity-dropdown/unity-dropdown'
import '@bit/smartworks.unity.unity-core/unity-select-menu'
// import './unity-dropdown/unity-select-menu'

import { PageViewElement } from './page-view-element.js'
import { SharedStyles } from './shared-styles.js'


const dataMock = {
  "labelsOnly": [
    {
      "label": "Option 1",
      "id": "1"
    },
    {
      "label": "Option 2",
      "id": "2"
    },
    {
      "label": "Option 3",
      "id": "3",
      "disabled": true // not implemented
    }
  ],
  "submenus": [
    {
      "label": "Option 1",
      "submenu": [
        {
          "label": "Option 1",
          "id": "1_1"
        },
        {
          "label": "Option 2",
          "id": "1_2"
        },
        {
          "label": "Option 3",
          "id": "1_3"
        }
      ]
    },
    {
      "label": "Option 2",
      "submenu": [
        {
          "label": "Option 1",
          "submenu": [
            {
              "label": "Option 1",
              "id": "2_1_1"
            },
            {
              "label": "Option 2",
              "id": "2_1_2"
            }
          ]
        },
        {
          "label": "Option 2",
          "id": "2_2"
        },
        {
          "label": "Option 3",
          "id": "2_3"
        }
      ]
    }
  ],
  "withComments": [
    {
      "label": "Option 1",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "id": "1"
    },
    {
      "label": "Option 2",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "id": "2"
    },
    {
      "label": "Option 3",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "id": "3"
    }
  ],
  "withIcons": [
    {
      "label": "Option 1",
      "icon": "unity:info_circle",
      "id": "1"
    },
    {
      "label": "Option 2",
      "icon": "unity:share",
      "id": "2"
    },
    {
      "label": "Option 3",
      "icon": "unity:download_alt1",
      "id": "3"
    }
  ],
  "withEverything": [
    {
      "label": "Option 1",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "icon": "unity:info_circle",
      "id": "1"
    },
    {
      "label": "Option 2",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "icon": "unity:share",
      "id": "2"
    },
    {
      "label": "Option 3",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "icon": "unity:download_alt1",
      "id": "3"
    }
  ],
  tags: [
    {
      label: "Tag 1",
      tag: true,
      id: "tag-1"
    },
    {
      label: "Tag 2",
      tag: true,
      id: "tag-2",
      tagStyles: {
        "--tag-color": "red"
      }
    }
  ]
}

class MyDropdowns extends PageViewElement {
  constructor() {
    super()
    this._selectedMenuOptions = []
    this._isExpanded = false
  }

  get isExpanded() {
    return this._isExpanded
  }

  set isExpanded(value) {
    const oldValue = this._isExpanded
    this._isExpanded = value
    this.requestUpdate('isExpanded', oldValue)
  }

  get selectedMenuOptions() {
    return this._selectedMenuOptions
  }

  set selectedMenuOptions(value) {
    const oldValue = this._selectedMenuOptions
    this._selectedMenuOptions = value
    this.requestUpdate('selectedMenuOptions', oldValue)
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .example-container {
          height: fit-content;
          position: relative;
          width: 1000px;
          top: 75px;
          left: 50%;
          transform: translateX(-50%);
          border: 1px solid grey;
          padding: 20px;
          box-sizing: border-box;
          display: flex;
          border-collapse: collapse;
        }
        .col {
          flex: 1;
          padding: 0 20px;
        }
        .input-box {
          position: relative;
          display: flex;
          align-items: flex-end;
          width: 250px;
          margin: 1em 0;
        }
        .right-align {
          display: flex;
          justify-content: flex-end;
        }
        .inline {
          width: max-content;
        }
        .label {
          padding: 0;
          font-size: 12px;
          color: rgb(77,77,77);
          margin: 6px 0;
        }
        #size-controlled-container {
          height: 200px;
          width: 120px;
          border: 1px solid black;
          padding: 10px;
        }
        size-controlled-select-menu {
          flex: 1;
          width:
        }
      `
    ]
  }

  onMenuClick(index) {
    window.alert(`Clicked option  with index=${index}`)
  }

  _handleSelectMenuOption(id) {
    if (this.selectedMenuOptions.includes(id)) {
      this.selectedMenuOptions = this.selectedMenuOptions.filter(selectedId => selectedId !== id)
    } else {
      this.selectedMenuOptions = [ ...this.selectedMenuOptions, id]
    }
  }

  render() {
    return html`
      <div class="example-container">
        <div class="col">
          <h4>Dropdowns</h4>
          <div class="input-box">
            <unity-dropdown
              label="${"Menu"}"
              .options=${dataMock.submenus}
              .onMenuClick=${this.onMenuClick}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Single select"}"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Single select, no-unselect"}"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
              ?preventUnselect="${true}"
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Pre-selected option"}"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
              .selected=${["1"]}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Single select disabled"}"
              inputType="single-select"
              disabled
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"With comments"}"
              inputType="single-select"
              .options=${dataMock.withComments}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"With icons"}"
              inputType="single-select"
              .options=${dataMock.withIcons}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"With helper text"}"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
              helperText="Choose any option"
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Inner search box"}"
              inputType="single-select"
              .searchBox=${true}
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Full example"}"
              inputType="single-select"
              placeholder="Choose an option"
              .searchBox=${true}
              .options=${dataMock.withEverything}
              helperText="Choose any option"
            >
            </unity-dropdown>
          </div>
        </div>

        <div class="col">
          <div class="input-box">
            <unity-dropdown
              label="${"Search"}"
              boxType="search"
              inputType="menu"
              placeholder = "Write here or choose below"
              .options=${dataMock.labelsOnly}
              .onMenuClick=${this.onMenuClick}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Bottom content slot"}"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
            >
              <div slot="bottom-content" style="margin:0;padding:0;">
                <unity-button
                  type="borderless"
                  label="Add Option"
                  leftIcon="unity:add"
                  @click=${(e)=>console.log("Add Option button clicked")}
                  style="--unity-border-radius: 0; width:100%; --button-width: 100%;"
                >
                </unity-button>
              </div>
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Multi select"}"
              inputType="multi-select"
              .selected=${["1","3"]}
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Multi select with Tags and Checkboxes"}"
              inputType="multi-select"
              showTags
              showCheckboxes
              .selected=${["1","3"]}
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              class="inline"
              label="${"Inline"}"
              boxType="inline"
              .onMenuClick=${this.onMenuClick}
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box right-align">
            <unity-dropdown
              class="inline"
              label="${"Right alignment"}"
              boxType="inline"
              .rightAlign=${true}
              .onMenuClick=${this.onMenuClick}
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Expansion Controlled"}"
              .expanded=${this.isExpanded}
              .options=${dataMock.labelsOnly}
              .onExpandedChange="${(value) => this.isExpanded = value}"
            />
            </unity-dropdown>
            <unity-button
              style="${"margin-left: 10px"}"
              label="${this.isExpanded ? "Collapse" : "Expand"}"
              @click=${(e) => this.isExpanded = !this.isExpanded}
            />
            </unity-button>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Primary button with menu"}"
              boxType="button-primary"
              .onMenuClick=${this.onMenuClick}
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Secondary button with single-select"}"
              boxType="button-secondary"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Borderless button with single-select"}"
              boxType="button-borderless"
              inputType="single-select"
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Important button with single-select"}"
              boxType="button-primary"
              important
              inputType="single-select"
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown>
          </div>
        </div>

        <div class="col">
          <h4>Select Menus</h4>

          <div class="input-box ">
            <div>
              <p class="label">
                With Icons
              </p>
              <unity-select-menu
                .options=${dataMock.withIcons}
              >
              </unity-select-menu>
            </div>
          </div>

          <div class="input-box">
            <div>
              <p class="label">
                With SubMenus
              </p>
              <unity-select-menu
                .options=${dataMock.submenus}
                .onMenuClick=${this.onMenuClick}
              >
              </unity-select-menu>
            </div>
          </div>

          <div class="input-box ">
            <div>
              <p class="label">
                Options as Tags
              </p>
              <unity-select-menu
                .options=${dataMock.tags}
                .onMenuClick="${id => console.log('id clicked', id)}"
              >
              </unity-select-menu>
            </div>
          </div>

          <div class="input-box ">
            <div id="selectable-container">
              <p class="label">
                Selectable
              </p>
              <unity-select-menu
                id="selectable-select-menu"
                .options=${dataMock.labelsOnly}
                .highlighted=${this.selectedMenuOptions}
                .onMenuClick=${this._handleSelectMenuOption.bind(this)}
              >
              </unity-select-menu>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

window.customElements.define('my-dropdowns', MyDropdowns)
