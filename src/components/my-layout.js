import { LitElement, html, css } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import './unity-layout/unity-page-header.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyLayout extends LitElement {
  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`<unity-page-header title="MOCC2 Title"/>`
  }
}

window.customElements.define('my-layout', MyLayout);
