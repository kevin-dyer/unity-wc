import { html, css } from 'lit-element';
// import './unity-button/unity-button.js'
import './unity-dropdown-input/unity-dropdown-input-base.js';
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
        }
      `
    ];
  }

  render() {
    return html`
      <div class="example-container">
        <div class="col">

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"Menu"}"
              type="menu"
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"Single select"}"
              type="single-select"
              .options=${dataMock.labelsOnly}
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"With placeholder"}"
              type="single-select"
              .options=${dataMock.labelsOnly}
              placeholder="Choose an option"
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"Single select disabled"}"
              type="single-select"
              disabled
              .options=${dataMock.labelsOnly}

            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"With comments"}"
              type="single-select"
              .options=${dataMock.withComments}
              
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"With icons"}"
              type="single-select"
              .options=${dataMock.withIcons}
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"With helper text"}"
              type="single-select"
              .options=${dataMock.labelsOnly}
              helperText="Choose any option"
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"Inner search box"}"
              type="single-select"
              .options=${dataMock.labelsOnly}
              searchBox=${true}
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"Search"}"
              type="search"
              .options=${dataMock.labelsOnly}
              
            >
            </unity-dropdown-input-base>
          </div>

          <div class="input-box">
            <unity-dropdown-input-base 
              label="${"Full example"}"
              type="single-select"
              placeholder="Choose an option"
              .options=${dataMock.withEverything}
              searchBox=${true}
              helperText="Choose any option"
            >
            </unity-dropdown-input-base>
          </div>

       </div>

       <div class="col">

        <div class="input-box">
          <unity-dropdown-input-base 
            label="${"Gradient button"}"
            type="button-gradient"
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown-input-base>
        </div>
        
        <div class="input-box">
          <unity-dropdown-input-base 
            label="${"Outlined button"}"
            type="button-outlined"
            .options=${dataMock.labelsOnly}
          >
          </unity-dropdown-input-base>
        </div>
       
      </div>
    </div>`;       
  }
}

window.customElements.define('my-dropdowns', MyDropdowns);
