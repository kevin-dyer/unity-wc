import { LitElement, html, css } from 'lit-element'
import { debounce } from 'underscore'
import '@bit/smartworks.unity.unity-core/unity-text-input'
import '@bit/smartworks.unity.unity-core/unity-icon'
import '@bit/smartworks.unity.unity-core/unity-select-menu'
import '@bit/smartworks.unity.unity-core/unity-tag'
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
    this._tagsLib = {}
    this.textSeed = []
    this.tagSeed = []
    this._onChange = ()=>{console.log("onChange not set")}  // TODO: reset to empty func

    // will track off of input, component will render off of this and if _currentOptions has matches
    this._showOptions = false
    this._currentOptions = []
    this._debouncedOnChange = ()=>{console.log('debounce not set up')} // TODO: reset to empty func
    this._menuLeft = 0
    this._menuWidth = 0
  }

  static get properties() {
    return {
      search: { type: String },
      tags: { type: Array },
      textSeed: { type: Array },
      tagSeed: { type: Array },
      onChange: { type: Function },

      // internals
      _tagsLib: { type: false },
      _showOptions: { type: false },
      _currentOptions: { type: false },
      _matches: { type: false },
      _menuLeft: { type: false },
      _menuWidth: { type: false }
    }
  }

  set search(value) {
    const oldValue = this._search
    this._search = value
    this.findMatches(value)
    const {
      tags: tagOptions,
      text: textOptions
    } = this._currentOptions
    this._showOptions = tagOptions.length > 0 || textOptions.length > 0
    console.log('update search', value)
    this.requestUpdate('search', oldValue)
  }
  get search() { return this._search }

  set tags(value) {
    const oldValue = this._tags
    this._tags = value
    this._tagsLib = value.reduce((a,v)=>({...a,[v.label || v]: v}), {})
    this.requestUpdate('tags', oldValue)
  }
  get tags() { return this._tags }

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
      textSeed=[],
      _tagsLib
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
          // if tag is already selected, skip showing
          if (!!_tagsLib[tag.toLowerCase()]) return
          if (tag.toLowerCase().includes(term)) tagMatches[tag] = tag
        } else if (tag instanceof Object) {
          // if tag is already selected, skip showing
          if (!!_tagsLib[tag.value.toLowerCase()]
          ||  !!_tagsLib[tag.label.toLowerCase()])
            return
          if (tag.value.toLowerCase().includes(term)
          ||  tag.label.toLowerCase().includes(term))
            tagMatches[tag.value] = tag
        }
      })
      // check against all strings in seed
      textSeed.forEach(text => {
        // if string includes term, add to matches
        //
        if (text.toLowerCase().includes(text)) textMatches[text] = text
      })
    })
    const newMatches = { tags: Object.values(tagMatches), text: Object.values(textMatches) }
    this._currentOptions = newMatches
  }

  // selectTag

  removeTag(tagValue) {
    this.tags = this.tags.filter(tag => tag !== tagValue && tag.label !== tagValue && tag.value !== tagValue)
  }

  clearInput() {
    this.tags = []
    this.search = ""
    this._showOptions = false
    this._currentOptions = []
  }

  renderTags() {
    const {
      tags
    } = this

    if (tags.length === 0) return null

    // iterate over tags
    const tagsToRender = tags.map(tag => {
      let {
        label=tag,
        value=tag
      } = tag
      return html`
        <unity-tag
          withClose
          .label="${label}"
          .value="${value}"
          .onClick="${(e, v) => this.removeTag(v)}"
        ></unity-tag>
      `
    })
    console.log('tagsToRender', tagsToRender)
    return html`
      <div class="tag-list">
        ${tagsToRender}
      </div>
    `
  }

  renderMenu() {
    const {
      _showOptions,
      _currentOptions: {
        tags=[],
        text=[]
      }={},
      _menuLeft,
      _menuWidth
    } = this
    if (!_showOptions || (tags.length === 0 && text.length === 0)) return null

    const tagOptions = tags.map((tag, i) => {
      let tagLabel
      if (typeof tag === "string") tagLabel = tag
      else tagLabel = tag.label
      return {
        label: tagLabel,
        tag: true,
        id: tagLabel
      }
    })

    return html`
      <unity-select-menu
        .items="${[...tagOptions, ...text]}"
        .onMenuClick="${index => console.log('clicked option: ', index)}"
        style="left: ${_menuLeft}px; max-width: ${_menuWidth}px;"
      ></unity-select-menu>
    `
  }

  updated() {
    const search = this.shadowRoot.querySelector('div#search-bar')
    const input = this.shadowRoot.querySelector('div#search-bar unity-text-input.input')

    const { [0]: {
      left: outerLeft,
      width
    }} = search.getClientRects()
    const { [0]: {
      left: innerLeft=0,
    }} = input.getClientRects()

    const leftPos = Math.abs(outerLeft - innerLeft)
    this._menuLeft = leftPos
    this._menuWidth = width - leftPos
  }

  render() {
    const {
      search
    } = this

    return html`
      <div id="search-bar" class="showBorder">
        <unity-icon icon="unity:search"></unity-icon>
        ${this.renderTags()}
        <unity-text-input
          class="input"
          hideBorder
          .value="${search}"
          .onChange="${(e, v) => this._debouncedOnChange(v)}"
        ></unity-text-input>
        ${this.renderMenu()}
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
          --search-bar-height: var(--unity-text-input-height, var(--default-unity-text-input-height));
          font-family: var(--input-font, var(--default-input-font));
          position: relative;
        }
        #search-bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          height: var(--search-bar-height);
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
        div.tag-list {
          display: flex;
          max-width: 50%;
          max-height: var(--search-bar-height);
          overflow-x: hidden;
          overflow-y: hidden;
          flex-wrap: wrap;
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
        unity-select-menu {
          position: absolute;
          top: calc(var(--search-bar-height) - 1px);
          white-space: nowrap;
          overflow-x: auto;
        }
      `
    ]
  }
}

window.customElements.define('unity-search-bar', UnitySearchBar)
