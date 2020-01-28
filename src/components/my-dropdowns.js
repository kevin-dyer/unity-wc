import { html, css } from 'lit-element';
import './unity-dropdown/unity-dropdown.js';
import './unity-dropdown/unity-select-menu.js';

import { PageViewElement } from './page-view-element.js';

import { SharedStyles } from './shared-styles.js';


const dataMock = {
  "labelsOnly": [
    {
      "label": "Option 1"
    },
    {
      "label": "Option 2"
    },
    {
      "label": "Option 3"
    }
  ],
  "withComments": [
    {
      "label": "Option 1", 
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    },
    {
      "label": "Option 2",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    },
    {
      "label": "Option 3",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    }
  ],
  "withIcons": [
    {
      "label": "Option 1", 
      "icon": "unity:info_circle"
    },
    {
      "label": "Option 2",
      "icon": "unity:share"
    },
    {
      "label": "Option 3",
      "icon": "unity:download_alt1"
    }
  ],
  "withEverything": [
    {
      "label": "Option 1", 
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "icon": "unity:info_circle"
    },
    {
      "label": "Option 2",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "icon": "unity:share"
    },
    {
      "label": "Option 3",
      "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      "icon": "unity:download_alt1"
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

  render() {
    return html`
      <div class="example-container">
        <div class="col">


          <div class="input-box">
            <unity-select-menu 
              .items=${dataMock.withComments}
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
              .options=${dataMock.labelsOnly}
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
              .selected=${[0]}

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
            .selected=${[0,2]}
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown>
        </div>

        <div class="input-box">
          <unity-dropdown
            label="${"Inline"}"
            boxType="inline"
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown>
        </div>

        <div class="input-box">
          <unity-dropdown
            label="${"Gradient button with menu"}"
            boxType="button-gradient"
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
