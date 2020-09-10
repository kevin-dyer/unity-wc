import { LitElement, html, css } from 'lit-element';

class MyMaps extends LitElement{
  render() {
    console.log("Render Map");
    return html`
    <div class="map-page">
    <h1>My Maps</h1>
    </div>`
  }
}

window.customElements.define('my-map', MyMaps);
