// import '@bit/smartworks.unity.unity-split-pane'
import '../src/components/unity-layout/unity-split-pane'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from "@storybook/addon-knobs"

export default {
  title: 'Split Pane',
  decorators: [withKnobs]
}

export const SplitPane = () => {
  const show = boolean('Show', false)
  const collapsed = boolean('collapsed', false)
  const closeButton = boolean("Close button", false)
  return html`
    <unity-split-pane
      style="height: 400px; border: 1px solid grey;"
      ?show="${show}"
      ?collapsed=${collapsed}
      ?closeButton="${closeButton}"
      .onClose="${action('onClose')}"
      .onResize=${action('onResize')}
    >
      <div style="padding-left: 20px" slot="header">
        ${text("'header' slot", "This is the header.")}
      </div>
      <div slot="main">
        ${text("'main' slot", "This is the main body.")}
      </div>
      <div slot="footer">
        ${text("'footer' slot", "This is the footer.")}
      </div>
      <div style="padding: 8px" slot="pane">
        ${text("'pane' slot", "This is the pane that can be hidden.")}
      </div>
    </unity-split-pane>
  `
}
