import { LitElement, html, css } from 'lit-element'
import matchSorter from 'match-sorter'
import { debounce } from 'underscore'
import '@bit/smartworks.unity.unity-text-input'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-button'
// import dropdown or lightbox
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'


/**
 * @name UnitySearchBar
 * @param {''} search, the initial value of the search field
 * @param {[]} tags, the initial tags applied to the search, either strings or obj w/ label and value
 * @param {func} onChange, the callback to return the current list of terms to search by
 * @param {[]} textSeed, the list of keywords to seed the autocomplete, array of strings
 * @param {[]} tagSeed, the list of tags to seed the autocomplete, array of str or obj as above
 * @example
 * <unity-search-bar
 *   .search="${searchFromCookie}"
 *   .tags="${tagsFromCookie}"
 *   .textSeed="${[...listOfThingNames, ...listOfThingActions, ...listOfThingProperties]}"
 *   .tagSeed="${[...listOfThingTags, "Online", { label: "Offline", value: "disconnected" }]}"
 * />
 *
 * css vars
 *   extend needed text input
 *   border color
 *   icon color
 *   button color
 **/

class UnitySearchBar extends LitElement {
  constructor() {
    super()

    this._currValue = ""
    this._currTags = []
    this.search = ""
    this.tags = []
    this.textSeed = []
    this.tagSeed = []
    this.onChange = ()=>{console.log("onChange not set")}  // TODO: rest to empty func
  }

  static get properties() {
    return {
      search: { type: String },
      tags: { type: Array },
      textSeed: { type: Array },
      tagSeed: { type: Array },

      // internals
      _currValue: { type: false },
      _currTags: { type: false }
    }
  }

  // set _currValue
  // get _currValue

  // set _currTags
  // get _currTags

  // set textSeed
  // get textSeed

  // set tagSeed
  // get tagSeed

  // _updateAutocomplete

  // _debounceOnChange

  render() {
    const {
      _currValue
    } = this

    return html`
      <div id="search-bar">
        This is the search-bar value: [${_currValue}]
      </div>
    `
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-stuff-here: var(--thing, var(--default-thing));
        }
      `
    ]
  }
}

window.customElements.define('unity-search-bar', UnitySearchBar)
