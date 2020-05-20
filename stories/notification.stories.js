import '@bit/smartworks.unity.unity-core/unity-notification'
import '@bit/smartworks.unity.unity-core/unity-button'
import '@bit/smartworks.unity.unity-core/unity-notifications-handler'
import { addNotification } from '@bit/smartworks.unity.unity-core/unity-notifications-handler'

import { html } from 'lit-element';
import { text, select, number, boolean, withKnobs } from "@storybook/addon-knobs";
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
  const noAnimation = boolean('No Animation', false)
  const position = select('position', {
    'top-right': 'top-right',
    'top-left': 'top-left',
    'bottom-right': 'bottom-right',
    'bottom-left': 'bottom-left',
  }, 'top-right')

  return html`
    <div class="main-container">
      <div class="section">
        <unity-notifications-handler
          name="test-notifications-1"
          .position=${position}
        >
        </unity-notifications-handler>
        <div class="buttons-container">
          <unity-button
            type="solid"
            label="Add Success Message"
            @click=${() => addNotification({
              name: 'test-notifications-1',
              notification: { text: maintext, subtext, timeout, type: 'success'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Warning Message"
            @click=${() => addNotification({
              name: 'test-notifications-1',
              notification: { text: maintext, subtext, timeout, type: 'warning'}
            })}
            ></unity-button>
          <unity-button
            type="solid"
            label="Add Error Message"
            @click=${() => addNotification({
              name: 'test-notifications-1',
              notification: { text: maintext, subtext, timeout, type: 'error'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Help Message"
            @click=${() => addNotification({
              name: 'test-notifications-1',
              notification: { text: maintext, subtext, timeout, type: 'help'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Tip Message"
            @click=${() => addNotification({
              name: 'test-notifications-1',
              notification: { text: maintext, subtext, timeout, type: 'tip'}
            })}
          ></unity-button>
        </div>
      </div>
      <div class="section">
        <unity-notifications-handler
          name="test-notifications-2"
          .position=${position}
        >
        </unity-notifications-handler>
        <div class="buttons-container">
          <unity-button
            type="solid"
            label="Add Success Message"
            @click=${() => addNotification({
              name: 'test-notifications-2',
              notification: { text: maintext, subtext, timeout, type: 'success'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Warning Message"
            @click=${() => addNotification({
              name: 'test-notifications-2',
              notification: { text: maintext, subtext, timeout, type: 'warning'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Error Message"
            @click=${() => addNotification({
              name: 'test-notifications-2',
              notification: { text: maintext, subtext, timeout, type: 'error'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Help Message"
            @click=${() => addNotification({
              name: 'test-notifications-2',
              notification: { text: maintext, subtext, timeout, type: 'help'}
            })}
          ></unity-button>
          <unity-button
            type="solid"
            label="Add Tip Message"
            @click=${() => addNotification({
              name: 'test-notifications-2',
              notification: { text: maintext, subtext, timeout, type: 'tip'}
            })}
          ></unity-button>
        </div>
      </div>
    </div>
    <style>
      .main-container {
        height: 600px;
        display: flex;
        flex-direction: row;
      }

      .section {
        flex: 1;
        display: flex;
        flex-direction:  column;
        justify-content: center;
        margin: 10px;
        position: relative;
        box-shadow: 0 0 5px 1px rgba(0,0,0,0.1);
        overflow: hidden;
      }

      .buttons-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 100px;
      }
    </style>
  `
}