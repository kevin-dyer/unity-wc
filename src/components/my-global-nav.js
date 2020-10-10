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
// import '@bit/smartworks.unity.unity-core/unity-global-nav-base'
import '@bit/smartworks.unity.unity-core/unity-icon'
import { items } from './unity-global-nav/fakeItems.js'
import '@bit/smartworks.unity.unity-core/unity-page-header';
import './unity-global-nav/unity-global-nav-base'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyGlobalNav extends PageViewElement {


  static get styles() {
    return [
      SharedStyles,
      css`
        .example-container {
          position: relative;
          width: 1000px;
          height: 750px;
          top: 30px;
          left: 50%;
          transform: translate(-50%,0);
          border: 1px solid grey;
        }
      `
    ];
  }

  onSelect(key) {
    console.log(`Selected option with key=${key}`);
  }

  render() {
    return html`
      <div class="example-container">
        <unity-global-nav-base collapsible
          headerImg="../../images/logo_SmartWorks_color.svg"
          .items=${items}
          .onSelect=${this.onSelect}
          .grid=${true}>
          <div slot="customHeader" style="background-color:#7bed9a">
            <div style="padding-left: 5px">
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
            </div>
            <div style="padding-left: 5px; background-color: #baffff">
              <unity-typography color="dark" weight="header1" size="header1"> This is a custom header</unity-typography>
            </div>
            <div style="padding-left: 5px; background-color: #f9affa">
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
              <span>
                <unity-icon icon="unity:globe"></unity-icon><unity-icon icon="unity:app_menu"></unity-icon>
              </span>
            </div>
          </div>
        </unity-global-nav-base>
      </div>
    `
  }
}

window.customElements.define('my-global-nav', MyGlobalNav);
