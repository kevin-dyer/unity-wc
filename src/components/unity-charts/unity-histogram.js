import { LitElement, html, css } from 'lit-element'
// import * as echarts from 'echarts/dist/echarts.min.js'
import echarts from '@types/echarts'


class UnityHistogram extends LitElement {
  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
        }
      `
    ];
  }

  static get properties() {
    return {
      label: {
        type: String
      }
    }
  }

  constructor() {
    super()

    
  }

  firstUpdated() {
    console.log("first updated hist")
  }

  //NOTE: consider rendering slot inside paper button that will render in place of label
  render() {
    return html`<div>Hist</div>`
  }
}

window.customElements.define('unity-histogram', UnityHistogram);