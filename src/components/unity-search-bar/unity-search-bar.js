import { LitElement, html, css } from 'lit-element'
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

    this._search = ""
    this._tags = []
    this._textSeed = []
    this._tagSeed = []
    this.onChange = ()=>{console.log("onChange not set")}  // TODO: rest to empty func

    this._showOptions = false
  }

  static get properties() {
    return {
      search: { type: String },
      tags: { type: Array },
      textSeed: { type: Array },
      tagSeed: { type: Array },
      onChange: { type: Function },

      // internals
      _showOptions: { type: false }
    }
  }

  set search(value) {
    const oldValue = this._search
    this._search = value
    // run debounceOnChange
    this.onChange(value)
    this.requestUpdate('search', oldValue)
  }
  get search() { return this._search }

  // set tags
  // get tags() { return this._tags }

  // set textSeed
  // get textSeed() { return this._textSeed }

  // set tagSeed
  // get tagSeed() { return this._tagSeed}

  // debounceOnChange

  // updateAutocomplete

  // selectTag

  // clearInput

  render() {
    const {
      search
    } = this

    return html`
      <div id="search-bar">
        <unity-text-input
          class="input"
          hideBorder
          .value="${search}"
          .onChange="${(e, v) => this.search = v}"
        ></unity-text-input>
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
