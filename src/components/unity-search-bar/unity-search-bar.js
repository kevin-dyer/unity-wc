import { LitElement, html, css } from 'lit-element'
import { debounce } from 'throttle-debounce'
import '@bit/smartworks.unity.unity-text-input'
import '@bit/smartworks.unity.unity-icon'
import '@bit/smartworks.unity.unity-select-menu'
import '@bit/smartworks.unity.unity-tag'
import '@bit/smartworks.unity.unity-popover'
import { findMatches } from '@bit/smartworks.unity.unity-utils'
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'


/**
 * @name UnitySearchBar
 * @param {''} search, the initial value of the search field
 * @param {[]} tags, the initial tags applied to the search, obj w/ value and label
 * @param {func} onChange, the callback to return the current list of terms to search by
 * @param {[]} textSeed, the list of keywords to seed the autocomplete, array of strings, not implemented
 * @param {[]} tagSeed, the list of tags to seed the autocomplete, array of str or obj as above
 * @param {number} debounceTime, the ms value to debounce input changes by, defaults to 300
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
 *   input-font
 *   input-text-color
 *   input-text-size
 *   input-icon-color
 *   input-border-color
 *   input-border-hover-color
 *   input-border-focus-color
 *   search-tag-color
 *   search-tag-text-color
 *   search-tag-border
 **/

class UnitySearchBar extends LitElement {
  constructor() {
    super()

    this._search = ""
    this._tags = new Map()
    // this.textSeed = []
    this._tagSeed = []
    this._onChange = ()=>{}
    this._debounceTime = 300

    // will track off of input, component will render off of this and if _currentOptions has matches
    this._showOptions = false
    this._currentOptions = []
    this._debouncedOnChange = ()=>{}
    this._menuWidth = 0
    this._showPopover = false
    this._excludedTags = []
    this._availableTags = new Map()
    this._oversized = false
    this._ellipsisRight = 0
  }

  static get properties() {
    return {
      search: { type: String },
      tags: { type: Array },
      // textSeed: { type: Array },
      tagSeed: { type: Array },
      onChange: { type: Function },
      debounceTime: { type: Number },

      // internals
      _excludedTags: { type: false },
      _showOptions: { type: false },
      _currentOptions: { type: false },
      _matches: { type: false },
      _menuWidth: { type: false },
      _showPopover: { type: false },
      _availableTags: { type: false },
      _oversized: { type: false },
      _ellipsisRight: { type: false }
    }
  }

  set search(value) {
    const oldValue = this._search
    this._search = value
    this.getMatches()
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
    let newValue = value
    // if not a map, make it into a map
    if (!(value instanceof Map)) {
      // if not an array, make an empty map
      if (!Array.isArray(value)) {
        newValue = new Map()
      } else {
        // get array of tag strings to exclude
        newValue = new Map(value.map(tag => [tag.value, tag]))
      }
    }
    this._tags = newValue
    // all [tag values and labels]
    let excluded = []
    newValue.forEach(({value, label}) => {
      excluded.push(value)
      if (label) excluded.push(label)
    })
    this._excludedTags = excluded
    this.requestUpdate('tags', oldValue)
  }
  get tags() { return this._tags }

  set tagSeed(value) {
    const oldValue = this._tagSeed
    this._tagSeed = value
    this._availableTags = new Map(value.map(tag => [tag.value, tag]))
    this.requestUpdate('tagSeed', oldValue)
  }
  get tagSeed() { return this._tagSeed }

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
    this._debouncedOnChange = debounce(this.debounceTime, v => this.onInputChange(v))
  }

  report() {
     this.onChange({tags: Array.from(this.tags), text: this.search})
  }

  onInputChange(value) {
    this.search = value
    this.report() // should return {tags, text: search}
  }

  getMatches() {
    const {
      tagSeed,
      // textSeed,
      search,
      _excludedTags: exclude
    } = this
    this._currentOptions = findMatches({ tagSeed, /*textSeed,*/ search, exclude })
  }

  selectTag(tagValue) {
    let {
      search,
      _availableTags,
      tags
    } = this
    const newTag = _availableTags.get(tagValue)
    tags.set(tagValue, newTag)
    this.tags = tags
    // clear input of matching chars or first from end
    // see if can remove whole tag
    const valueRegex = RegExp(newTag.value, 'i')
    const labelRegex = RegExp(newTag.label, 'i')
    let newSearch
    if (newTag.value && valueRegex.test(search)) {
      let removed = search.split(valueRegex)
      newSearch = removed.map(term => term.trim())
    } else if (newTag.label && labelRegex.test(search)) {
      let removed = search.split(labelRegex)
      newSearch = removed.map(term => term.trim())
    } else {
      // split input on spaces
      const terms = search.split(/\s+/)
      // check from back to remove only last-most possible tag
      let found = false
      for (let i = terms.length - 1; i >= 0 && found === false ; i--) {
        let term = RegExp(terms[i], 'i')
        found = (term.test(newTag.value) || term.test(newTag.label)) ? i : false
      }
      newSearch = [...terms.slice(0, found), ...terms.slice(found + 1)]
    }
    // filter out anything that is included in tagValue
    this.search = newSearch.join(" ")
    // call report to onChange
    this.report()
    // keep focus on input
    this.shadowRoot.querySelector('.input').shadowRoot.querySelector(
'#input').focus()
  }

  // TODO: add selectText, selecting text option from menu would remove all terms that match and add selected text to the search
  // term would need to be saved in a list to make sure it's included in the match exclude
  // careful around terms that include spaces
  // need to make sure to update said lib when term is entered manually or removed

  removeTag(tagValue) {
    const { tags } = this
    tags.delete(tagValue)
    this.tags = tags
    this.getMatches()
    this.report()
    if (tags.size === 0) this.togglePopover(false)
  }

  clearInput() {
    this.tags = []
    this.search = ""
    this._showOptions = false
    this._currentOptions = []
    // report to onChange
    this.report()
  }

  renderTags() {
    const {
      tags,
      _showPopover,
      _oversized
    } = this

    if (tags.length === 0) return null

    // get element to act as root for popover
    const popoverRoot = this.shadowRoot.querySelector('div.tag-list')
    // get height offset for popover
    const popoverOffset = popoverRoot && ((popoverRoot.clientHeight * -1) + 1) || 0
    // iterate over tags
    let tagsToRender = []
    tags.forEach(({label, value, styles}) => {
      // make style str from tag.styles
      let tagStyles = ''
      if (styles instanceof Object) {
        tagStyles = Object.entries(styles).reduce((a, [key, value]) => `${a}${key}: ${value};`, '')
      }
      tagsToRender.push(html`
        <unity-tag
          withClose
          .label="${label || value}"
          .value="${value}"
          .onClose="${(e, v) => this.removeTag(v)}"
          style="${tagStyles}"
        ></unity-tag>
      `)
    })

    return html`
      <div class="tag-list" @mouseover="${() => this.handleHover()}">
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

  handleHover() {
    if (this._oversized) this.togglePopover(true)
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
      _menuWidth
    } = this
    if (!_showOptions || (tags.length === 0 && text.length === 0)) return null

    const tagOptions = tags.map(({label, value, styles}, i) => {
      let tagStyles = {
        "--tag-text-color": "var(--dark-gray-color, var(--default-dark-gray-color))",
        "--tag-color": "transparent",
        "--tag-border": "1px solid var(--dark-gray-color, var(--default-dark-gray-color))"
      }

      if (styles instanceof Object) {
        Object.entries(styles).forEach(([key, value]) => {
          tagStyles[key] = value
        })
      }
      return {
        label: label || value,
        tag: true,
        id: value,
        tagStyles
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
    // setting position for autocomplet menu
    const search = this.shadowRoot.querySelector('div#search-bar')
    const input = this.shadowRoot.querySelector('unity-text-input.input')

    const { [0]: {
      left: outerLeft,
      width
    }} = search.getClientRects()
    const { [0]: {
      left: innerLeft=0,
      width: inputWidth
    }} = input.getClientRects()

    const leftPos = Math.abs(outerLeft - innerLeft)
    this._menuWidth = width - leftPos
    this._ellipsisRight = inputWidth

    // controls if popover and tag ellipsis should show
    this.updateComplete.then(() => {
      const tagList = this.shadowRoot.querySelector('div.tag-list')
      const popover = this.shadowRoot.querySelector('unity-popover')

      console.log('popover.getClientRects', popover.getClientRects())

      const { [0]: {
        height: tagListHeight,
        width: tagListWidth
      }} = tagList.getClientRects()

      const { [1]: {
        height: popoverHeight,
        width: popoverWidth
      }} = popover.getClientRects()

      // open if needed, otherwise delete tag
      const overbounds = tagListHeight < popoverHeight || tagListWidth < popoverWidth
      if (this.tags.size > 0 && overbounds && !this._showPopover)
        this._oversized = true
      else this._oversized = false
    })
  }

  render() {
    const {
      search,
      _oversized,
      _ellipsisRight
    } = this

    return html`
      <div id="search-bar" class="showBorder">
        <unity-icon icon="unity:search"></unity-icon>
        ${this.renderTags()}
        <div class="input-wrapper">
          ${!!_oversized ? html`<unity-typography style="right: ${_ellipsisRight}px;" class="ellipsis">...</unity-typography>` : null}
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
          --default-input-icon-color: var(--black-text-rgb, var(--default-black-text-rgb));
          --default-input-border-color: var(--gray-color, var(--default-gray-color));
          --default-input-border-hover-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-input-border-focus-color: var(--primary-color, var(--default-primary-color));
          --search-bar-height: var(--unity-text-input-height, var(--default-unity-text-input-height));
          --default-search-tag-color: transparent;
          --default-search-tag-text-color: var(--dark-gray-color, var(--default-dark-gray-color));
          --default-search-tag-border: 1px solid var(--dark-gray-color, var(--default-dark-gray-color));
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
          color: var(--input-icon-color, var(--default-input-icon-color));
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
        unity-typography.ellipsis {
          position: absolute;
          bottom: 0;
          z-index: 1;
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
          --tag-color: var(--search-tag-color, var(--default-search-tag-color));
          --tag-text-color: var(--search-tag-text-color, var(--default-search-tag-text-color));
          --tag-border: var(--search-tag-border, var(--default-search-tag-border));
          --tag-margin: 3px;
        }
      `
    ]
  }
}

window.customElements.define('unity-search-bar', UnitySearchBar)
