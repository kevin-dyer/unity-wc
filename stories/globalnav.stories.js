import '@bit/smartworks.unity.unity-core/unity-global-nav-base'

import { html, LitElement } from 'lit-element';
import {
  withKnobs,
  text,
  boolean,
  number,
  array,
  select
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
  const collapsible = boolean("Collapsible", true)
  const collapsed = boolean("Collapsed", false)
  const grid = boolean("Grid", true)
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
        .logo="../images/manifest/icon-48x48.png"
        .collapsible="${collapsible}"
        .collapsed="${collapsed}"
        .items="${items}"
        .grid="${grid}"
        .onSelect="${action('onSelect')}"
        .onToggleCollapse="${action('onToggleCollapse')}"
      ></unity-global-nav-base>
    </div>
  `;
}
