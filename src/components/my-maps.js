import { LitElement, html, css } from 'lit-element';
import '@bit/smartworks.unity.unity-core/unity-icon'
import '@openlayers-elements/maps/ol-map'
import '@openlayers-elements/maps/ol-layer-openstreetmap'
import '@openlayers-elements/core/ol-layer-vector'
import '@openlayers-elements/maps/ol-marker-icon'
import '@openlayers-elements/maps/ol-select'
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
    this.zoomToFeature()
  }

  zoomToFeature() {
    var map = this.shadowRoot.querySelector("#map");

    this.shadowRoot.querySelector('ol-select').addEventListener('feature-selected', (e) => {
      console.log("POI was clicked!");
      console.log(e.detail.feature.getGeometry())
      map.fit(e.detail.feature.getGeometry().getExtent(), {
        duration:400,
        maxZoom: 18
      })
    })
  }

  render() {
    return html`
    <div class="map-page">
      <h2>My Maps</h2>
        <ol-map id="map" zoom="3" lat="16.231564" lon="-28.992471">
        <ol-layer-openstreetmap></ol-layer-openstreetmap>
          <ol-layer-vector z-index="1">
            <ol-marker-icon id="Madrid Office" src="https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true" lon="-3.632980" lat="40.431490" scale="0.5"></ol-marker-icon>
            <ol-marker-icon id="Berkeley Office" src="https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true" lon="-122.268340" lat="37.871170" scale="0.5"></ol-marker-icon>
            <ol-marker-icon id="Troy Office" src="https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true" lon="-83.111720" lat="42.562050" scale="0.5"></ol-marker-icon>
          </ol-layer-vector>
          <ol-select></ol-select>
        </ol-map>
    </div>`
  }
}

window.customElements.define('my-map', MyMaps);
