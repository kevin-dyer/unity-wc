import { html } from 'lit-element';
import {
  withKnobs,
  select,
  text,
  boolean
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import '@bit/smartworks.unity.unity-core/unity-column-editor'

export default {
  title: 'ColumnEditor',
  decorators: [withKnobs]
};


export const Standard = () => {
  const buttonTypeKnob = {
    None: '',
    primary: 'primary',
    secondary: 'secondary',
    borderless: 'borderless'
  }
  const buttonLabel = text('Button Label', 'Edit Columns')
  const buttonType = select('Button Type', buttonTypeKnob, 'primary')
  const buttonLeftIcon = text('Button Left Icon', 'settings')
  const buttonRightIcon = text('Button Right Icon', '')
  const buttonCenterIcon = text('Button Center Icon', '')
  const buttonDisabled = boolean('Button Disabled', false)
  const buttonLoading = boolean('Button Loading', false)

  return html`<unity-column-editor
        .buttonProps=${{
          label: buttonLabel,
          type: buttonType,
          leftIcon: buttonLeftIcon,
          rightIcon: buttonRightIcon,
          centerIcon: buttonCenterIcon,
          disabled: buttonDisabled,
          loading: buttonLoading
        }}
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