import '../src/components/unity-export-button/unity-export-button'
import { html } from 'lit-element';
import {
  withKnobs,
  select,
  boolean
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Export Button',
  decorators: [withKnobs]
};


export const Standard = () => {
  const buttonTypeKnob = {
    None: '',
    outlined: 'outlined',
    solid: 'solid',
    gradient: 'gradient'
  }

  return html`<unity-export-button
    buttonType=${select('Button type', buttonTypeKnob, 'solid')}
    .headers="${['key', 'label', 'note']}"
    .autoAddColumns=${boolean('Automatically Add Columns?', true)}
    .data="${data}"
    .onExport=${action('Exported')}
  />
  `
}

// const data = [
//   ['row1key','Row 1 Label', 'This is row 1 data'],
//   ['row2key','Row 2 Label', 'This is row 2 data'],
//   ['row3key','Row 3 Label', 'This is row 3 data'],
// ]

const data = [
  {
    key: 1,
    label: 'One',
  },
  {
    key: 2,
    label: 'Two',
    type: 'number',
  },
  {
    key: 3,
    label: 'Three',
    type: 'number',
  },
  {
    key: 4,
    label: 'Green',
    type: 'color',
    color: 'green'
  },
  {
    key: 5,
    label: 'Blue',
    color: 'blue'
  },
]
