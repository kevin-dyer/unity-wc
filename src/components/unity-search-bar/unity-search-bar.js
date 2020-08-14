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

 const DEBOUNCE_TIME = 250 // ms

class UnitySearchBar extends LitElement {
  constructor() {
    super()

    this._search = ""
    this._tags = []
    this._textSeed = []
    this._tagSeed = []
    this._onChange = ()=>{console.log("onChange not set")}  // TODO: reset to empty func

    // will track off of input, component will render off of this and if _currentOptions has matches
    this._showOptions = false
    this._currentOptions = []
    this._debouncedOnChange = ()=>{console.log('debounce not set up')} // TODO: reset to empty func
  }

  static get properties() {
    return {
      search: { type: String },
      tags: { type: Array },
      textSeed: { type: Array },
      tagSeed: { type: Array },
      onChange: { type: Function },

      // internals
      _showOptions: { type: false },
      _currentOptions: { type: false },
      _matches: { type: false }
    }
  }

  set search(value) {
    const oldValue = this._search
    this._search = value
    this.findMatches(value)
    console.log('update search', value)
    this.requestUpdate('search', oldValue)
  }
  get search() { return this._search }

  // set tags
  // get tags() { return this._tags }

  // set textSeed
  // get textSeed() { return this._textSeed }

  // set tagSeed
  // get tagSeed() { return this._tagSeed}

  set onChange(value) {
    const oldValue = this._onChange
    this._onChange = value
    this._debouncedOnChange = debounce(v => this.onInputChange(v), DEBOUNCE_TIME)
  }
  get onChange() { return this._onChange }

  onInputChange(value) {
    this.search = value
    this.onChange(this._currentOptions)
  }

  // compares value given against seeds to return best options
  // saves obj{ tags, strings } to _currentOptions
  findMatches(search) {
    // split search on spaces into terms
    const allTerms = search.toLowerCase().split(' ')
    let newMatches = { tags: [], text: [] }
    // for each term
    allTerms.forEach(term => {
      // check against all tag results (string, tag.label, tag.value)
      this.tagSeed.forEach(tag => {
        // if tag includes term in any, add to matches
        if (typeof tag === "string") {
          if (tag.toLowerCase().includes(term)) newMatches.tags.push(tag)
        } else if (tag instanceof Object) {
          if (tag.value.toLowerCase().includes(term)
          ||  tag.label.toLowerCase().includes(term))
            newMatches.tags.push(tag)
        }
      })
      // check against all strings in seed
      this.textSeed.forEach(text => {
        // if string includes term, add to matches
        if (text.toLowerCase().includes(text)) newMatches.text.push(text)
      })
    })
    this._currentOptions = newMatches
  }

  // selectTag

  // removeTag

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
          .onChange="${(e, v) => this._debouncedOnChange(v)}"
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
