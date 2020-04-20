import '../src/components/unity-notification/unity-notification'
import { html } from 'lit-element';
import {
  withKnobs,
  text,
  boolean,
  number,
  array
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Notification',
  decorators: [withKnobs]
};

export const Standard = () => {
  return html`
    <unity-notification
      text='This is a notification'
      icon='unity:share'
      .onClose=${action('close')}>
    </unity-notification>
  `
}

