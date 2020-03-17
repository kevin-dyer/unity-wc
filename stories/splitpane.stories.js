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
  return html`
    <unity-split-pane
      ?show="${show}"
      .onClose="${action('onClose')}"
    >
      <div slot="header">
        ${text("'header' slot", "This is the header.")}
      </div>
      <div slot="main">
        ${text("'main' slot", "This is the main body.")}
      </div>
      <div slot="footer">
        ${text("'footer' slot", "This is the footer.")}
      </div>
      <div slot="pane">
        ${text("'pane' slot", "This is the pane that can be hidden.")}
      </div>
    </unity-split-pane>
  `
}
