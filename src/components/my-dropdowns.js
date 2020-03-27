import { html, css } from 'lit-element';
import '@bit/smartworks.unity.unity-dropdown';
import '@bit/smartworks.unity.unity-select-menu';

import { PageViewElement } from './page-view-element.js';

import { SharedStyles } from './shared-styles.js';


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
      "disabled": true
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
  ]
};

class MyDropdowns extends PageViewElement {
  constructor() {
    super();
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .example-container {
          position: relative;
          width: 1000px;
          height: 750px;
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
        }
        .input-box {
          position: relative;
          width: 250px;
          margin: 1em 0;
        }
      `
    ];
  }

  onMenuClick(index) {
    window.alert(`Clicked option  with index=${index}`);
  }

  render() {
    return html`
      <div class="example-container">
        <div class="col">


          <div class="input-box">
            <unity-select-menu
              .items=${dataMock.submenus}
              .onMenuClick=${this.onMenuClick}
            >
            </unity-select-menu>
          </div>

          <div class="input-box ">
            <unity-select-menu
              .items=${dataMock.withIcons}
            >
            </unity-select-menu>
          </div>

        </div>

        <div class="col">


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
              .options=${dataMock.labelsOnly}
              searchBox=${true}
            >
            </unity-dropdown>
          </div>

          <div class="input-box">
            <unity-dropdown
              label="${"Full example"}"
              inputType="single-select"
              placeholder="Choose an option"
              .options=${dataMock.withEverything}
              searchBox=${true}
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
          inputType="single-select"
          .options=${dataMock.labelsOnly}

        >
        </unity-dropdown>
       </div>

        <div class="input-box">
          <unity-dropdown
            label="${"Multi select"}"
            inputType="multi-select"
            showTags
            .selected=${["1","3"]}
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown>
        </div>

        <div class="input-box">
          <unity-dropdown
            label="${"Inline"}"
            boxType="inline"
            .onMenuClick=${this.onMenuClick}
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown>
        </div>

        <div class="input-box">
          <unity-dropdown
            label="${"Gradient button with menu"}"
            boxType="button-gradient"
            .onMenuClick=${this.onMenuClick}
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown>
        </div>

        <div class="input-box">
          <unity-dropdown
            label="${"Outlined button with single-select"}"
            boxType="button-outlined"
            inputType="single-select"
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown>
        </div>

      </div>
    </div>`;
  }
}

window.customElements.define('my-dropdowns', MyDropdowns);
