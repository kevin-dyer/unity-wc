import { LitElement, html, css } from 'lit-element'

const MIN_COL_WIDTH = 100

class TableCellBase extends LitElement {

  static get properties() {
    return {
      resizable: Boolean,
      width: Number,
      onResizeStart: Function,
      onResize: Function,
      onResizeComplete: Function,
    }
  }

  constructor() {
    super()

    this.width=MIN_COL_WIDTH
    this.resizable=false
    this.onResizeStart=()=>{}
    this.onResize=()=>{}
    this.onResizeComplete=()=>{}
  }

  //TODO: start event listener to track mouse movement
  handleMouseDown(e) {
    this.startingX = e.clientX
    this.mouseMoveListener = this.handleMouseMove.bind(this)
    this.mouseUpListener = this.handleMouseUp.bind(this)
    document.addEventListener('mousemove', this.mouseMoveListener)
    document.addEventListener('mouseup', this.mouseUpListener)

    this.onResizeStart()
  }



  //TODO: replace with document mouse move event listener
  handleMouseMove(e) {
    // this.currentX = e.clientX
    const deltaX = e.clientX - this.startingX

    this.onResize(deltaX)
  }

  //clean up event listener
  handleMouseUp(e) {
    const deltaX = e.clientX - this.startingX

    document.removeEventListener('mousemove', this.mouseMoveListener)
    document.removeEventListener('mouseup', this.mouseUpListener)

    this.onResizeComplete(deltaX)
  }

  render() {
    return html`
      <div class="table-cell-base">
        <div class="content">
          <slot></slot>
        </div>
        ${this.resizable
          ? html`<div
              class="resize-handle"
              @mousedown="${this.handleMouseDown}"
            ></div>`
          : ''
        }
      </div>
    `
  }

  static get styles() {
    return [
      css`
        :host {
          flex: 1;
        }
        .table-cell-base {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: stretch;
          position: relative;
        }
        .content {
          flex: 1;
        }
        .resize-handle{
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          /*height: 100%;*/
          width: 8px;
          transform: translateX(50%);
          /*border: 1px solid black;*/
          cursor: col-resize;
          z-index: 2;
        }
      `
    ]
  }
}
customElements.define('table-cell-base', TableCellBase);