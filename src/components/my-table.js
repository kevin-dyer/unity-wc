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
import './UnityTable/UnityTable.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store
const exampleData = [
  {name: 'red', hex: '#ff0000', favorite: true},
  {name: 'black', hex: '#000000', favorite: true},
  {name: 'yellow', hex: '#ffff00', favorite: false},
  {name: 'green', hex: '#00ff00', favorite: true},
  {name: 'grey', hex: '#888888', favorite: false},
  {name: 'magenta', hex: '#ff00ff', favorite: false}
]

const exampleColumns = [
  {name: 'hex', label: 'Hex value', width: 500},
  {name: 'name', label: 'Color'},
  {name: 'favorite', label: 'Favourite?'}
]

class MyTable extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        .example-container {
          position: relative;
          width: 1000px;
          top: 200px;
          left: 50%;
          transform: translate(-50%,0);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="example-container">
        <unity-table selectable .data="${exampleData}" .columns="${exampleColumns}" />
      </div>
    `
  }
}

window.customElements.define('my-table', MyTable);
