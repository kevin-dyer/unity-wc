import { LitElement, html, css } from 'lit-element';
import '@bit/smartworks.unity.unity-core/unity-icon'
import '@openlayers-elements/maps/ol-map'
import '@openlayers-elements/maps/ol-layer-openstreetmap'
// import OSM from 'ol/source/OSM';
// import Map from 'ol/Map';
// import Overlay from 'ol/Overlay';
// import TileLayer from 'ol/layer/Tile';
// import View from 'ol/View';
// import Feature from 'ol/Feature';
// import Point from 'ol/geom/Point';
// import Vector from 'ol/layer/Vector';
// import Source from 'ol/source/Vector';
// import {fromLonLat} from 'ol/proj';

class MyMaps extends LitElement {
  firstUpdated() {
    this.createMap()
  }

  createMap() {

  }

  render() {
    return html`
    <div class="map-page">
      <h1>My Maps</h1>
        <ol-map zoom="4" lat="46.7985" lon="8.2318">
        <ol-layer-openstreetmap></ol-layer-openstreetmap>
          <ol-layer-vector z-index="1">
            <ol-marker-icon id="Madrid" src="https://toppng.com/uploads/preview/map-marker-icon-600x-map-marker-11562939743ayfahlvygl.png" lat="40.4" lon="-3.683333" anchor-y="46" anchor-y-units="pixels"></ol-marker-icon>
          </ol-layer-vector>
        </ol-map>
    </div>`
  }
}

window.customElements.define('my-map', MyMaps);
