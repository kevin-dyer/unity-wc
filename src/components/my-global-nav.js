/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import { html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import './unity-global-nav/unity-global-nav.js'
import './unity-global-nav/unity-global-nav-top-item.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store
const topItems = [
  {
    key: 'item-0',
    label: 'Top Item 0',
    slot: 'top',
    short: false,
    icon: 'account-balance'
  },
  {
    key: 'item-1',
    label: 'Top Item 1',
    slot: 'top',
    short: true,
    icon: 'account-circle'
  },
  {
    key: 'item-2',
    label: 'Top Item 2',
    slot: 'top',
    short: false,
    icon: 'add-circle-outline'
  },
  {
    key: 'item-3',
    label: 'Top Item 3',
    slot: 'top',
    short: true,
    icon: 'android'
  },
  {
    key: 'item-4',
    label: 'Top Item 4',
    slot: 'top',
    short: false,
    icon: 'bug-report'
  }
]
const bottomItems = [
  {
    key: 'item-5',
    label: 'Bottom Item 0',
    slot: 'bottom',
    short: true
  },
  {
    key: 'item-6',
    label: 'Bottom Item 1',
    slot: 'bottom',
    short: false
  },
  {
    key: 'item-7',
    label: 'Bottom Item 2',
    slot: 'bottom',
    short: true
  },
  {
    key: 'item-8',
    label: 'Bottom Item 3',
    slot: 'bottom',
    short: true
  },
  {
    key: 'item-9',
    label: 'Bottom Item 4',
    slot: 'bottom',
    short: false
  }
]

function reportSelection(key, label) { console.log(`I clicked on key[${key}] with label[${label}]`)}

class MyGlobalNav extends PageViewElement {
  constructor() {
    super()
    this._selected = topItems[0].key

    this._changeSelection = this._changeSelection.bind(this)
  }

  static get properties() {
    return {
      _selected: { type: String }
    }
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        unity-global-nav {
          --default-global-nav-background-color: #122C33;
          --default-global-nav-expanded-color: #07191E;
          --default-global-nav-text-color: white;
          --global-nav-border-color: var(--default-dark-grey-text-color)
        }
        .example-container {
          position: relative;
          width: 1000px;
          height: 750px;
          top: 75px;
          left: 50%;
          transform: translate(-50%,0);
          border: 1px solid grey;
        }
      `
    ];
  }

  _changeSelection(key) { this._selected = key }

  render() {
    return html`
      <div class="example-container">
        <unity-global-nav gutter>
          <div slot="logo">
            This is a logo.
          </div>
          ${topItems.map(({slot, key, label, short, icon}) => html`
            <unity-global-nav-top-item
              slot="${slot}"
              key="${key}"
              .onSelect="${this._changeSelection}"
              label="${label}"
              icon="${icon}"
              .short="${short}"
              .selected="${this._selected === key}"
            ></unity-global-nav-top-item>
          `)}
          ${bottomItems.map(({slot, key, label, short, icon}) => html`
            <unity-global-nav-top-item
              slot="${slot}"
              key="${key}"
              .onSelect="${this._changeSelection}"
              label="${label}"
              icon="${icon}"
              .short="${short}"
              .selected="${this._selected === key}"
            ></unity-global-nav-top-item>
          `)}
        </unity-global-nav>
      </div>
    `
  }
}

window.customElements.define('my-global-nav', MyGlobalNav);
