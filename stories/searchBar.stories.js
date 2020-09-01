import '@bit/smartworks.unity.unity-search-bar'
// import '../src/components/unity-search-bar/unity-search-bar'
import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, text, object} from '@storybook/addon-knobs'

export default {
  title: 'Search Bar',
  decorators: [withKnobs]
}

const tagList = [
  {
    value: "tag 1"
  },
  {
    value: "tag_2"
  },
  {
    label: "Tag 3",
    value: "tag_3"
  }
]

export const Standard = () => {
  const search = text("Search Text", "")
  const tags = object("Tag List", [])
  const tagSeed = object("Seed for Tag Autocomplete", tagList)
  const debounceTime = number("Search Debounce (ms)", 300)

  return html`
    <unity-search-bar
      .search="${search}"
      .tags="${tags}"
      .tagSeed="${tagSeed}"
      .debounceTime="${debounceTime}"
    ></unity-tag>
  `
}
