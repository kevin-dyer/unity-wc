import '../src/components/unity-table/unity-column-editor.js'
import { html } from 'lit-element';
import {
  withKnobs,
  select
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

export default {
  title: 'ColumnEditor',
  decorators: [withKnobs]
};


export const Standard = () => {
  const buttonTypeKnob = {
    None: '',
    outlined: 'outlined',
    solid: 'solid',
    gradient: 'gradient'
  }
  const buttonType = select('Button type', buttonTypeKnob, 'solid')
  return html`<unity-column-editor
        buttonType=${buttonType}
        .columns="${[
          {
            key: 'column-1',
            label: 'Column #1',
          },
          {
            key: 'column-2',
            label: 'Column #2',
          },
          {
            key: 'column-3',
            label: 'Column #3'
          }
        ]}"
        .selectedColumns="${['column-1', 'column-2']}"
        .onUpdate="${action('Selected Columns')}"
      />`
}