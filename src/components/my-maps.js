import { LitElement, html, css } from 'lit-element'
import Moveable from 'moveable'
import '@openlayers-elements/core/ol-map'
// import '@openlayers-elements/maps/ol-map'
import '@openlayers-elements/maps/ol-layer-openstreetmap'
import '@openlayers-elements/core/ol-layer-vector'
import '@openlayers-elements/maps/ol-marker-icon'
import '@openlayers-elements/maps/ol-select'
import '@openlayers-elements/maps/ol-overlay'

class MyMaps extends LitElement {
  firstUpdated() {
    this.zoomToFeature()
    this.manipulateImage()
  }

  zoomToFeature() {
    var map = this.shadowRoot.querySelector("#map")
    var floorplanOverlay = this.shadowRoot.querySelector("#floorplan")

    this.shadowRoot.querySelector('ol-select').addEventListener('feature-selected', (e) => {
      console.log("POI was clicked!")
      var coordinates = e.detail.feature.getGeometry().getFlatCoordinates()
      map.fit(e.detail.feature.getGeometry().getExtent(), {
        // duration: 400,
        maxZoom: 18
      })
      floorplanOverlay.setPosition(coordinates)
    })
  }

  manipulateImage() {
    var floorplan = this.shadowRoot.querySelector('#madrid-floorplan')
    const moveable = new Moveable(this.shadowRoot.querySelector('#floorplan'), {
      target: floorplan,
      draggable:true,
      rotatable: true,
      resizable: true,
    });

    // draggable
    moveable.on('drag', ({ target, transform, left, top }) => {
      // console.log(transform) // displays pixel translation
      // console.log("Left: ", left)
      // console.log("Top: ", top)
      // console.log(target.style)
      target.style.transform = transform
    });
    moveable.on('rotate', ({ target, transform }) => {
      target.style.transform = transform;
    });
    moveable.on('resize', ({ target, width, height }) => {
      target.style.width = width + 'px';
      target.style.height = height + 'px';
    });
  }

  render() {
    return html`
    <div class="map-page">
      <h2>My Maps</h2>
      <!-- <img id='madrid-floorplan' src='https://support.robinpowered.com/hc/article_attachments/360000862346/maps-before-plan.png' style='width:300px;height:200px'> -->
        <ol-map id="map" zoom="3" lat="16.231564" lon="-28.992471">
        <ol-layer-openstreetmap></ol-layer-openstreetmap>
          <ol-layer-vector id="markers" z-index="1">
            <ol-marker-icon id="Madrid Office" src="https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true" lon="-3.632980" lat="40.431490" scale="0.5"></ol-marker-icon>
            <ol-marker-icon id="Berkeley Office" src="https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true" lon="-122.268340" lat="37.871170" scale="0.5"></ol-marker-icon>
            <ol-marker-icon id="Troy Office" src="https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true" lon="-83.111720" lat="42.562050" scale="0.5"></ol-marker-icon>
          </ol-layer-vector>
          <ol-select></ol-select>
          <ol-overlay id="floorplan">
            <img id="madrid-floorplan" src="https://support.robinpowered.com/hc/article_attachments/360000862346/maps-before-plan.png" style="width:200px;height:100px">
          </ol-overlay>
        </ol-map>
    </div>`
  }
}

window.customElements.define('my-map', MyMaps);
