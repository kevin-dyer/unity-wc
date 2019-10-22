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
import './unity-table/unity-table.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store
const exampleData = [
  {name: 'red', hex: '#ff0000', favorite: true, image: 'show image'},
  {name: 'black', hex: '#000000', favorite: true, icon: 'work'},
  {name: 'yellow', hex: '#ffff00', favorite: false, icon: 'social:domain'},
  {name: 'green', hex: '#00ff00', favorite: true, icon: 'work'},
  {name: 'grey', hex: '#888888', favorite: false, image: 'show image', icon: 'build'},
  {name: 'magenta', hex: '#ff00ff', favorite: false, icon: 'social:domain'}
]

const exampleColumns = [
  {key: 'hex', label: 'Hex value', width: 200},
  {key: 'name', label: 'Color', width: 300, format: name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`},
  {key: 'favorite', label: 'Favourite?', width: 500, format: datum => datum ? 'I love it!' : 'passible, I guess'}
]

class MyTable extends PageViewElement {
  static get styles() {
    return [
      SharedStyles,
      css`
        .example-container {
          position: relative;
          width: 1000px;
          height: 500px;
          top: 100px;
          left: 50%;
          transform: translate(-50%,0);
        }
      `
    ];
  }

  render() {
    return html`
      <div class="example-container">
        <unity-table
          selectable
          .data="${exampleData}"
          .columns="${exampleColumns}"
          .onSelectionChange="${selected => console.log('These elements are selected:', selected)}"
        />
      </div>
    `
  }
}

window.customElements.define('my-table', MyTable);
