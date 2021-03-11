import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean, object, optionsKnob } from "@storybook/addon-knobs"
// import '@bit/smartworks.unity.unity-core/unity-multi-pane'
import '../src/components/unity-layout/unity-multi-pane'

export default {
  title: 'Split Pane',
  decorators: [withKnobs]
}

const labelsLib = {
  first: "First",
  second: "Second",
  third: "Third"
}

const paneKeyLib = {
  First: 'first',
  Second: 'second',
  Third: 'third'
}

export const SplitPane = () => {
  const collapsed = boolean('collapsed', false)
  const closeButton = boolean("Close button", true)
  const collapseButton = boolean("Collapse button", true)
  const labels = object('Labels', labelsLib)
  const visiblePanes = optionsKnob("Visible Panes", paneKeyLib, 'first', {display: 'multi-select'})
  const collapsedPanes = optionsKnob("Collapsed Panes", paneKeyLib, '', {display: 'multi-select'})
  return html`
    <unity-multi-pane
      style="height: 400px; border: 1px solid grey;"
      .labels=${labels}
      .visiblePanes="${visiblePanes}"
      .collapsedPanes="${collapsedPanes}"
      ?collapsed=${collapsed}
      ?closeButton="${closeButton}"
      ?collapseButton="${collapseButton}"
      .onClose="${action('onClose')}"
      .onCollapseChange="${action('onCollapseChange')}"
    >
      <div slot="first::header">
        ${text("'first::header' slot", "This is the header.")}
      </div>
      <div slot="first">
        ${text("'first' slot", "This is the body.")}
      </div>
      <div slot="first::footer">
        ${text("'first::footer' slot", "This is the footer.")}
      </div>
      <div slot="second::header">
        ${text("'second::header' slot", "This is the header.")}
      </div>
      <div slot="second">
        ${text("'second' slot", "This is the body.")}
      </div>
      <div slot="second::footer">
        ${text("'second::footer' slot", "This is the footer.")}
      </div>
      <div slot="third::header">
        ${text("'third::header' slot", "This is the header.")}
      </div>
      <div slot="third">
        ${text("'third' slot", "This is the body.")}
      </div>
      <div slot="third::footer">
        ${text("'third::footer' slot", "This is the footer.")}
      </div>
    </unity-multi-pane>
  `
}
