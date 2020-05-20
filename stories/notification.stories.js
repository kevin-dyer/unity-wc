import '@bit/smartworks.unity.unity-core/unity-notification'
import { addNotification } from '../src/components/unity-notification/unity-notifications-handler'

import { html } from 'lit-element';
import { text, select, number, button, withKnobs } from "@storybook/addon-knobs";
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

export const UsingNotificationsHandler = () => {
  const maintext = text('Text', 'Text')
  const subtext = text('Subtext', 'Subtext')
  const timeout = number('Timeout (0 for none)', 5000, {
    range: true,
    min: 0,
    max: 10000,
    step: 500,
  })
  const animationDuration = number('Animation Duration in Milliseconds', 500, {
    range: true,
    min: 0,
    max: 5000,
    step: 100,
  })
  const position = select('position', {
    'top-right': 'top-right',
    'top-left': 'top-left',
    'bottom-right': 'bottom-right',
    'bottom-left': 'bottom-left',
  }, 'top-right')

  button('Add Success Message', addNotification({
    name: 'test-notifications',
    notfication: { text: maintext, subtext, timeout, type: 'success'}
  }))
  button('Add Warning Message', addNotification({
    name: 'test-notifications',
    notfication: { text: maintext, subtext, timeout, type: 'warning'}
  }))
  button('Add Error Message', addNotification({
    name: 'test-notifications',
    notfication: { text: maintext, subtext, timeout, type: 'error'}
  }))
  button('Add Help Message', addNotification({
    name: 'test-notifications',
    notfication: { text: maintext, subtext, timeout, type: 'help'}
  }))
  button('Add Tip Message', addNotification({
    name: 'test-notifications',
    notfication: { text: maintext, subtext, timeout, type: 'tip'}
  }))

  return html`
    <unity-notifications-handler
      name="test-notifications"
      .position=${position}
      .animationDuration=${animationDuration}
      .onClose=${action('close')}}
    >
    </unity-notifications-handler>
  `
}