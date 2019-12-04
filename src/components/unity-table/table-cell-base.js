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
    console.log("handleMouseDown e: ", e)
    this.startingX = e.clientX

    //TODO: should fix the widths of the columns before this one
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
    // console.log("mousemove listener called! deltaX: ", deltaX)

    e.stopPropagation()
    e.preventDefault()

    this.onResize(deltaX)
  }

  //clean up event listener
  handleMouseUp(e) {
    const deltaX = e.clientX - this.startingX

    document.removeEventListener('mousemove', this.mouseMoveListener)
    document.removeEventListener('mouseup', this.mouseUpListener)

    e.stopPropagation()
    e.preventDefault()

    this.onResizeComplete(deltaX)
  }

  handleClick(e) {
    e.stopPropagation()
    e.preventDefault()
    console.log("handleClick e: ", e)

    return false
  }

  render() {
    return html`
      <div class="table-cell-base" @click="${e => {

        //NOTE: this only stops click propagation if cursor ends up on same table cell. If it goes to neighboring cell, will not fire
        //Will need to use logic in row click to compare mousedown and mouseup screenX - dont fire if dragged.
        console.log("preventing table-cell-base @click.")
        e.preventDefault()
        e.stopPropagation()
        return false
      }}">
        <div class="content">
          <slot></slot>
        </div>
        ${this.resizable
          ? html`<div
              class="resize-handle"
              @mousedown="${this.handleMouseDown}"
              @click="${this.handleClick}"
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