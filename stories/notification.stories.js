import '../src/components/unity-notification/unity-notification'
import { html } from 'lit-element';
import { text, withKnobs } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

export default {
  title: 'Notification',
  decorators: [withKnobs]
};

export const Standard = () => {
  const maintext = text('Text', 'Text')
  const subtext = text('Subtext', 'Subtext')
  const icon = text('Icon', 'unity:share')
  return html`
    <unity-notification
      text=${maintext}
      subtext=${subtext}
      icon=${icon}
      .onClose=${action('close')}>
    </unity-notification>
  `
}

