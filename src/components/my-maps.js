import { LitElement, html, css } from 'lit-element'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'
import '@bit/smartworks.unity.unity-button'
import Moveable from 'moveable'
import '@openlayers-elements/core/ol-map'
import '@openlayers-elements/maps/ol-layer-openstreetmap'
import '@openlayers-elements/core/ol-layer-vector'
import '@openlayers-elements/maps/ol-marker-icon'
import '@openlayers-elements/maps/ol-select'
import '@openlayers-elements/maps/ol-overlay'

class MyMaps extends LitElement {

  constructor() {
    super()
    this.editing = false
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
      #map: {
        width: 100%;
        height: 400px;
      }`
    ];
  }

  static get properties() {
    return {
      editing: {
        type: Boolean
      }
    }
  }

  loadImage() {
    this.editing = true
    var floorplans = this.shadowRoot.querySelector('#floorplan-image')
    var img = document.createElement('img')
    img.id = 'madrid-floorplan'
    img.src = 'https://support.robinpowered.com/hc/article_attachments/360000862346/maps-before-plan.png'
    img.style = 'width:200px;height:100px'
    floorplans.appendChild(img)

    this.manipulateImage();
  }

  saveChanges() {
    this.editing = false
  }

  firstUpdated() {
    this.zoomToFeature()
    // this.manipulateImage()
  }

  zoomToFeature() {
    var map = this.shadowRoot.querySelector('#map')
    // var floorplanOverlay = this.shadowRoot.querySelector('#floorplan')

    this.shadowRoot.querySelector('ol-select').addEventListener('feature-selected', (e) => {
      console.log('POI was clicked!')
      var coordinates = e.detail.feature.getGeometry().getFlatCoordinates()
      map.fit(e.detail.feature.getGeometry().getExtent(), {
        duration: 400,
        maxZoom: 18
      })
      // floorplanOverlay.setPosition(coordinates)
    })
  }

  manipulateImage() {
    var floorplan = this.shadowRoot.querySelector('#madrid-floorplan')
    const moveable = new Moveable(this.shadowRoot.querySelector('#floorplan-image'), {
      target: floorplan,
      draggable:true,
      rotatable: true,
      resizable: true,
    });

    // draggable
    moveable.on('drag', ({ target, transform, left, top }) => {
      console.log(transform) // displays pixel translation
      target.style.transform = transform
    })
    //rotatable
    moveable.on('rotate', ({ target, transform }) => {
      target.style.transform = transform
    })
    //resizeable
    moveable.on('resize', ({ target, width, height }) => {
      target.style.width = width + 'px'
      target.style.height = height + 'px'
    })
  }

  render() {
    return html`
    <div class='map-page'>
      <h2>My Maps</h2>
      <div id='editing-button-container'>
        ${this.editing ? html`<unity-button
          id='save-button'
          label='Save changes'
          style='margin-left: 600px'
          @click=${this.saveChanges}>
        ></unity-button>` : html`<unity-button
          id='load-button'
          label='Load image'
          style='margin-left: 600px'
          @click=${this.loadImage}>
        ></unity-button>`}
      </div>
        <ol-map id='map' zoom='3' lat='16.231564' lon='-28.992471'>
        <ol-layer-openstreetmap></ol-layer-openstreetmap>
          <ol-layer-vector id='markers' z-index='1'>
            <ol-marker-icon id='Madrid Office' src='https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true' lon='-3.632980' lat='40.431490' scale='0.5'></ol-marker-icon>
            <ol-marker-icon id='Berkeley Office' src='https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true' lon='-122.268340' lat='37.871170' scale='0.5'></ol-marker-icon>
            <ol-marker-icon id='Troy Office' src='https://github.com/zazuko/openlayers-elements/blob/master/demos/assets/icon.png?raw=true' lon='-83.111720' lat='42.562050' scale='0.5'></ol-marker-icon>
          </ol-layer-vector>
          <ol-select></ol-select>
          <div id='floorplan-image'>
          </div>
          <!-- <ol-overlay id='floorplan'>
            <img id='madrid-floorplan' src='https://support.robinpowered.com/hc/article_attachments/360000862346/maps-before-plan.png' style='width:200px;height:100px'>
          </ol-overlay> -->
        </ol-map>
    </div>`
  }
}

window.customElements.define('my-map', MyMaps);
