// import '@bit/smartworks.unity.unity-core/unity-global-nav-base'
import '../src/components/unity-global-nav/unity-global-nav-base'

import { html } from 'lit-element';
import {
  withKnobs,
  text,
  boolean,
  array,
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import { items as itemsLib } from '../src/components/unity-global-nav/fakeItems'


export default {
  title: 'Global Nav',
  decorators: [withKnobs]
};

export const Standard = () => {
  const {
    top: topItemList,
    bottom: bottomItemList
  } = itemsLib
  const gutter = boolean("Show Gutter", true)
  const headerText = text("Header Text", "Header")
  const showSubHeader = boolean("Show SubHeader", true)
  const collapsible = boolean("Collapsible", true)
  const collapsed = boolean("Collapsed", false)
  const grid = boolean("Grid", true)
  const alwaysShowBordersTop = boolean("Always Show Borders (Top Items)", false)
  const alwaysShowBordersBottom = boolean("Always Show Borders (Bottom Items)", false)
  const bubbleBottomItems = boolean("Bubble Bottom Items", false)
  const topItems = array("Top Items", topItemList)
  const bottomItems = array("Bottom Items", bottomItemList)
  const items = {
    top: topItems,
    bottom: bottomItems
  }
  const style = 'position: relative; width: 500px; height: 500px;'

  return html`
    <div style="${style}">
      <unity-global-nav-base
        .gutter="${gutter}"
        .header="${headerText}"
        .logo="../images/manifest/icon-48x48.png"
        ?collapsible="${collapsible}"
        ?collapsed="${collapsed}"
        .items="${items}"
        .grid="${grid}"
        .onSelect="${action('onSelect')}"
        .onToggleCollapse="${action('onToggleCollapse')}"
        ?subHeaderBorder="${showSubHeader}"
        ?alwaysShowBordersTop="${alwaysShowBordersTop}"
        ?alwaysShowBordersBottom="${alwaysShowBordersBottom}"
        ?bubbleBottomItems="${bubbleBottomItems}"
      >
        ${showSubHeader ? html`<div style="padding: 4px;" slot="subHeader">
          Sub Header Content
        </div>` : ''}
      </unity-global-nav-base>
    </div>
  `;
}
