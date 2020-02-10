// import '@bit/smartworks.unity.unity-text-input';
import { html } from 'lit-element';
import { withKnobs, text } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';

import '@bit/smartworks.unity.unity-text-input'


export default {
  title: 'Text Inputs',
  decorators: [withKnobs]
};


export const Standard = () => {
  const value = text("Editor text", "");
  return html`
   <unity-text-input placeholder="Write here" .value="${value}" .onChange=${action("onChange")}></unity-text-input>
  `;
}

export const Password = () => html`
  <unity-text-input label="Password" password></unity-text-input>
`;

