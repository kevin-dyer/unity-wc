import { html } from 'lit-element';
import { withKnobs, boolean, text, select } from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import "@bit/smartworks.unity.unity-core/unity-dropdown"

export default {
  title: 'Dropdown',
  decorators: [withKnobs]
};



export const SingleInput = () => {
  const disabled = boolean("Disabled", false)
  const label = text("Label", "Dropdown")
  const placeholder = text("Placeholder", "Choose below")
  const selectIcon = boolean("Show select icon", true)
  const searchBox = boolean("Show filter search box", true)
  const showTags = boolean("Show tags (multi-select only)", true)
  const inputType = select(
    "Input type", 
    {
      SingleSelect: 'single-select',
      MultiSelect: 'multi-select',
      Menu: 'menu'
    },
    'SingleSelect'
  )
  const boxType = select (
    "Box type",
    {
      Label: 'label',
      Search: 'search',
      ButtonGradient: 'button-gradient',
      ButtonOutlined: 'button-outlined',
      Inline: 'inline',
      Fixed: 'fixed',
    },
    'label'
  )

  return html`
    <unity-dropdown
      label=${label}
      inputType=${inputType}
      boxType=${boxType}
      placeholder=${placeholder}
      .options=${[{label: "Option 1", id: "1"}, {label: "Option 2", id: "2"}]}
      ?disabled=${disabled}
      ?selectIcon=${selectIcon}
      ?searchBox=${searchBox}
      ?showTags=${showTags}
    >
   </unity-dropdown>
  `;
}
