import { LitElement, html, css } from 'lit-element'
import { debounce } from 'underscore'
import '@bit/smartworks.unity.unity-text-input'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-select-menu'
import '@bit/smartworks.unity.unity-tag'
import '@bit/smartworks.unity.unity-popover'
// import dropdown or lightbox
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'


/**
 * @name UnitySearchBar
 * @param {''} search, the initial value of the search field
 * @param {[]} tags, the initial tags applied to the search, either strings or obj w/ label and value
 * @param {func} onChange, the callback to return the current list of terms to search by
 * @param {[]} textSeed, the list of keywords to seed the autocomplete, array of strings
 * @param {[]} tagSeed, the list of tags to seed the autocomplete, array of str or obj as above
 * @param {number} debounceTime, the ms value to debounce input changes by, defaults to 250
 * @example
 * <unity-search-bar
 *   .search="${searchFromCookie}"
 *   .tags="${tagsFromCookie}"
 *   .textSeed="${[...listOfThingNames, ...listOfThingActions, ...listOfThingProperties]}"
 *   .tagSeed="${[...listOfThingTags, "Online", { label: "Offline", value: "disconnected" }]}"
 *   .debounceTime="${500}"
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
    this._tagsLib = {}
    this.textSeed = []
    this.tagSeed = []
    this._onChange = ()=>{}
    this._debounceTime = 250

    // will track off of input, component will render off of this and if _currentOptions has matches
    this._showOptions = false
    this._currentOptions = []
    this._debouncedOnChange = ()=>{}
    this._menuLeft = 0
    this._menuWidth = 0
    this._showPopover = false
  }

  static get properties() {
    return {
      search: { type: String },
      tags: { type: Array },
      textSeed: { type: Array },
      tagSeed: { type: Array },
      onChange: { type: Function },
      debounceTime: { type: Number },

      // internals
      _tagsLib: { type: false },
      _showOptions: { type: false },
      _currentOptions: { type: false },
      _matches: { type: false },
      _menuLeft: { type: false },
      _menuWidth: { type: false },
      _showPopover: { type: false }
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

  set onChange(value) {
    const oldValue = this._onChange
    this._onChange = value
    this._makeDebounced()
    this.requestUpdate('onChange', oldValue)
  }
  get onChange() { return this._onChange }

  set debounceTime(value) {
    const oldValue = this._debounceTime
    this._debounceTime = value
    this._makeDebounced()
    this.requestUpdate('debounceTime', oldValue)
  }
  get debounceTime() { return this._debounceTime }

  _makeDebounced() {
    this._debouncedOnChange = debounce(v => this.onInputChange(v), this.debounceTime)
  }
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
          if (!!_tagsLib[tag]) return
          if (tag.toLowerCase().includes(term)) tagMatches[tag] = tag
        } else if (tag instanceof Object) {
          // if tag is already selected, skip showing
          if (!!_tagsLib[tag.value]
          ||  !!_tagsLib[tag.label])
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

  selectTag(tagValue) {
    const {
      search,
      tagSeed,
      tags
    } = this
    const newTag = tagSeed.find(tag => tag === tagValue || tag.label === tagValue || tag.value === tagValue)
    this.tags = [...tags, newTag]
    // clear input of matching chars
    // split input on spaces
    const terms = search.toLowerCase().split(" ")
    // filter out anything that is included in tagValue
    const filteredTerms = terms.filter(term => !tagValue.toLowerCase().includes(term))
    this.search = filteredTerms.join(" ")
    // keep focus on input
    this.shadowRoot.querySelector('.input').shadowRoot.querySelector(
'#input').focus()
  }

  handleToggleOrTag(e, tagValue) {
    // avoid open on clicking inside .tag-list
    !!e && e.stopPropagation()

    // get boxes for .tag-list and unity-popover
    const tagList = this.shadowRoot.querySelector('div.tag-list')
    const popover = this.shadowRoot.querySelector('unity-popover')

    const { [0]: {
      height: tagListHeight,
      width: tagListWidth
    }} = tagList.getClientRects()

    const { [1]: {
      height: popoverHeight,
      width: popoverWidth
    }} = popover.getClientRects()

    // open if needed, otherwise delete tag
    if ((tagListHeight < popoverHeight || tagListWidth < popoverWidth) && !this._showPopover) this.togglePopover(true)
    else if (!!tagValue) this.removeTag(tagValue)
  }

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
      tags,
      _showPopover
    } = this

    if (tags.length === 0) return null

    // get element to act as root for popover
    const popoverRoot = this.shadowRoot.querySelector('div.tag-list')
    // get height offset for popover
    const popoverOffset = popoverRoot && ((popoverRoot.clientHeight * -1) + 1) || 0
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
          .onClick="${(e, v) => {
            this.handleToggleOrTag(e, v)
          }}"
        ></unity-tag>
      `
    })

    return html`
      <div class="tag-list" @click="${() => {
        this.handleToggleOrTag()
      }}">
        <unity-popover
          .show="${_showPopover}"
          .flip="${false}"
          closeOnOutsideClick
          .onClose="${() => this.togglePopover(false)}"
          placement="bottom-start"
          .distance="${popoverOffset}"
          .referenceElement="${popoverRoot}"
        >
          <div class="popover-list" slot="on-page-content" >${tagsToRender}</div>
          <div class="popover-content" slot="popover-content">${tagsToRender}</div>
        </unity-popover>
      </div>
    `
  }

  togglePopover(show) {
    this._showPopover = typeof show === 'boolean' ? show : !this._showPopover
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
        id: tagLabel,
        tagStyles: {
          "--tag-text-color": "var(--black-color, var(--default-black-color))",
          "--tag-color": "transparent",
          "--tag-border": "1px solid var(--black-color, var(--default-black-color))"
        }
      }
    })

    return html`
      <unity-select-menu
        .items="${[...tagOptions, ...text]}"
        .onMenuClick="${tag => this.selectTag(tag)}"
        style="max-width: ${_menuWidth}px;"
      ></unity-select-menu>
    `
  }

  updated() {
    const search = this.shadowRoot.querySelector('div#search-bar')
    const input = this.shadowRoot.querySelector('unity-text-input.input')

    const { [0]: {
      left: outerLeft,
      width
    }} = search.getClientRects()
    const { [0]: {
      left: innerLeft=0,
    }} = input.getClientRects()

    const leftPos = Math.abs(outerLeft - innerLeft)
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
        <div class="input-wrapper">
          <unity-text-input
            class="input"
            hideBorder
            .value="${search}"
            .onChange="${(e, v) => this._debouncedOnChange(v)}"
            placeholder="Search"
          ></unity-text-input>
          ${this.renderMenu()}
        </div>
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
          --default-label-color: transparent;
          --default-label-text-color: var(--black-color, var(--default-black-color));
          --default-label-border: 1px solid var(--black-color, var(--default-black-color));
          font-family: var(--input-font, var(--default-input-font));
          flex: 1;
        }
        #search-bar {
          display: flex;
          flex: 1;
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
          max-width: 50%;
          max-height: var(--search-bar-height);
          overflow-x: hidden;
          overflow-y: hidden;
          z-index: 2;
        }
        unity-popover {
          height: 100%;
          width: 100%;
        }
        div.popover-list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          height: 100%;
          width: 100%;
        }
        div.popover-content {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        div.input-wrapper {
          position: relative;
          flex: 1;
          display: flex;
          height: 100%;
          align-items: center;
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
          top: calc(var(--search-bar-height) - 2px);
          white-space: nowrap;
          overflow-x: auto;
        }
        unity-tag {
          --tag-color: var(--label-color, var(--default-label-color));
          --tag-text-color: var(--label-text-color, var(--default-label-text-color));
          --tag-border: var(--label-border, var(--default-label-border));
          --tag-margin: 3px;
        }
      `
    ]
  }
}

window.customElements.define('unity-search-bar', UnitySearchBar)
