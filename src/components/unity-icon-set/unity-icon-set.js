import { html } from '@polymer/polymer/lib/utils/html-tag.js'
import '@polymer/iron-iconset-svg/iron-iconset-svg'

/**
* add icons to the list by adding a:
*   <g id="{{icon-id}}">
*     ...paths
*   </g>
*
* all theses icons will be available with iron-icons:
*   unity-icons:icon-id
**/

const unitIconSet = html`<iron-iconset-svg name="unity" size="32">
  <svg>
    <defs>
      <g id="error">
        <path d="M16 6l12 20h-24l12-20zM16 4c-0.703 0-1.354 0.369-1.715 0.971l-12 20c-0.371 0.618-0.38 1.387-0.025 2.014s1.020 1.015 1.74 1.015h24c0.721 0 1.385-0.388 1.74-1.015s0.345-1.397-0.025-2.014l-12-20c-0.361-0.602-1.012-0.971-1.715-0.971v0z"></path>
        <path d="M17 19h-2c-0.552 0-1-0.448-1-1v-4c0-1.105 0.895-2 2-2v0c1.105 0 2 0.895 2 2v4c0 0.552-0.448 1-1 1z"></path>
        <path d="M16 24v0c-1.105 0-2-0.895-2-2v0c0-1.105 0.895-2 2-2v0c1.105 0 2 0.895 2 2v0c0 1.105-0.895 2-2 2z"></path>
      </g>
      <g id="check">
        <path d="M11.922 24.043l-6.982-6.982 2.121-2.121 5.018 5.018 12.945-11.096 1.953 2.277z"></path>
      </g>
    </defs>
  </svg>
</iron-iconset-svg>`

document.head.appendChild(unitIconSet.content)
