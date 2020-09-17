import '../src/components/my-maps.js'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
export default {
  title: 'Map',
  decorators: [withKnobs]
};

export const MapStandard = () => {
  return html`<my-map></my-map>`
}
