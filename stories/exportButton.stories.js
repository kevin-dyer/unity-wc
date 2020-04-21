import '../src/components/unity-export-button/unity-export-button'
import { html } from 'lit-element';
import {
  withKnobs,
  select,
  boolean,
  array,
  text
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

  const dataOption = text('Data', JSON.stringify(data, null, 2)).replace(/&quot;/g, '"')
  console.log('dataOption', dataOption.toString())

  return html`<unity-export-button
    buttonType=${select('Button type', buttonTypeKnob, 'solid')}
    .headers="${array('Column Headers', headers)}"
    .autoAddColumns=${boolean('Automatically Add Columns?', true)}
    .data="${JSON.parse(dataOption.toString())}"
    .onExport=${action('Exported')}
  />
  `
}

const headers = ['key', 'label', 'note']

// const data = [
//   ['row1key','Row 1 Label', 'This is row 1 data'],
//   ['row2key','Row 2 Label', 'This is row 2 data'],
//   ['row3key','Row 3 Label', 'This is row 3 data'],
// ]

const data = [
  {
    key: 1,
    label: 'One',
    note: 'One is the loneliest number'
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
    note: 'Three is company'
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
    color: 'blue',
    note: 'Feeling blue today'
  },
]
