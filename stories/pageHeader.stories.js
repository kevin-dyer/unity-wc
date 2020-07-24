import { html } from 'lit-element'
import {
  withKnobs,
  text,
  boolean,
  object,
  number
} from "@storybook/addon-knobs"
// import '@bit/smartworks.unity.unity-core/unity-page-header'
import '../src/components/unity-layout/unity-page-header'


export default {
  title: "Page Header",
  decorators: [withKnobs]
}

export const Standard = () => {
  const title = text("Title", "Page Header Title")
  return html`
    <unity-page-header .title="${title}" >
    </unity-page-header>
  `
}

export const Slots = () => {
  const title = text("Title", "Overriden by center-content")
  const showLeft = boolean("Show left-content", true)
  const leftContent = text("left-content Text", "To the Left")
  const showCenter = boolean("Show center-content", true)
  const centerContent = text("center-content Text", "In the Middle")
  const showRight = boolean("Show right-content", true)
  const rightContent = text("right-content Text", "To the Right")
  return html`
    <unity-page-header .title="${title}">
      ${showLeft ? html`
        <div slot="left-content">
          ${leftContent}
        </div>
      ` : null}
      ${showCenter ? html`
        <div slot="center-content">
          ${centerContent}
        </div>
      ` : null}
      ${showRight ? html`
        <div slot="right-content">
          ${rightContent}
        </div>
      ` : null}
    </unity-page-header>
  `
}

export const Tabs = () => {
  const title = text("Title", "Page Header w/ Tabs")
  const selectedTab = number("Selected Tab ID", null)
  const defaultTabs = [
    { label: "Tab 1" },
    { label: "Tab 2" },
    { label: "Tab 3" }
  ]
  const tabs = object("Tabs Array", defaultTabs)
  return html`
    <unity-page-header
      .title="${title}"
      .selectedTab="${selectedTab}"
      .tabs="${tabs}"
    >
    </unity-page-header>
  `
}
