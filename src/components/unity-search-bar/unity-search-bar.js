import { LitElement, html, css } from 'lit-element'
import { debounce } from 'underscore'
import '@bit/smartworks.unity.unity-text-input'
import '@bit/smartworks.unity.unity-icon'
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
    this.onChange(this._currentOptions) // should return {tags, text: search}
  }

  // compares value given against seeds to return best options
  // saves obj{ tags, strings } to _currentOptions
  findMatches(search) {
    const {
      tagSeed=[],
      textSeed=[]
    } = this
    if (!Array.isArray(tagSeed) || !Array.isArray(textSeed)) return
    // split search on spaces into terms
    const allTerms = search.toLowerCase().split(' ')
    let tagMatches = {}
    let textMatches = {}
    // for each term
    allTerms.forEach(term => {
      if (!term) return
      // check against all tag results (string, tag.label, tag.value)
      tagSeed.forEach(tag => {
        // if tag includes term in any, add to matches
        if (typeof tag === "string") {
          if (tag.toLowerCase().includes(term)) tagMatches[tag] = tag
        } else if (tag instanceof Object) {
          if (tag.value.toLowerCase().includes(term)
          ||  tag.label.toLowerCase().includes(term))
            tagMatches[tag.value] = tag
        }
      })
      // check against all strings in seed
      textSeed.forEach(text => {
        // if string includes term, add to matches
        if (text.toLowerCase().includes(text)) textMatches[text] = text
      })
    })
    const newMatches = { tags: Object.values(tagMatches), text: Object.values(textMatches) }
    this._currentOptions = newMatches
  }

  // selectTag

  // removeTag

  clearInput() {
    this.tags = []
    this.search = ""
    this._showOptions = false
    this._currentOptions = []
  }

  render() {
    const {
      search
    } = this

    return html`
      <div id="search-bar" class="showBorder">
        <unity-icon icon="unity:search"></unity-icon>
        <unity-text-input
          class="input"
          hideBorder
          .value="${search}"
          .onChange="${(e, v) => this._debouncedOnChange(v)}"
        ></unity-text-input>
        <div class="clear-button" @click="${() => this.clearInput()}">CLEAR</unity-button>
      </div>
    `
  }


  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --default-input-font: var(--font-family, var(--default-font-family));
          --default-input-text-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --default-input-text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --default-input-border-color: var(--gray-color, var(--default-gray-color));
          --default-input-border-hover-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-input-border-focus-color: var(--primary-color, var(--default-primary-color));
          font-family: var(--input-font, var(--default-input-font));
        }
        #search-bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          height: var(--unity-text-input-height, var(--default-unity-text-input-height))
        }
        #search-bar.showBorder {
          border-width: 1px;
          border-color: var(--input-border-color, var(--default-input-border-color));
          border-style: solid;
          border-radius: 2px;
        }
        unity-icon {
          flex: 0;
          margin: 0 var(--padding-size-sm, var(--default-padding-size-sm));
        }
        .input {
          flex: 1;
        }
        div.clear-button {
          flex: 0;
          font-size: var(--small-text-selected-size, var(--default-small-text-selected-size));
          color: var(--dark-gray-color, var(--default-dark-gray-color));
          margin: 0 var(--padding-size-sm, var(--default-padding-size-sm));
          cursor: pointer;
        }
      `
    ]
  }
}

window.customElements.define('unity-search-bar', UnitySearchBar)
