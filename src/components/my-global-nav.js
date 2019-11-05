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

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

// example table data, should eventually turn into controls
// normally this would be taken from the store
const exampleData = []

class MyGlobalNav extends PageViewElement {
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

  render() {
    return html`
      <div class="example-container">
        <unity-global-nav gutter>
          <div slot="logo">
            This is a logo.
          </div>
          <div slot="top">Top Item 0</div>
          <div slot="top">Top Item 1</div>
          <div slot="top">Top Item 2</div>
          <div slot="top">Top Item 3</div>
          <div slot="top">Top Item 4</div>
          <div slot="bottom">Bottom Item 0</div>
          <div slot="bottom">Bottom Item 1</div>
          <div slot="bottom">Bottom Item 2</div>
          <div slot="bottom">Bottom Item 3</div>
          <div slot="bottom">Bottom Item 4</div>
        </unity-global-nav>
      </div>
    `
  }
}

window.customElements.define('my-global-nav', MyGlobalNav);
