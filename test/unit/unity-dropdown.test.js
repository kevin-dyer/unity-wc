/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { html } from 'lit-element'
import sinon from 'sinon';

import '@bit/smartworks.unity.unity-dropdown'
// import '../../src/components/unity-dropdown/unity-dropdown'


const options = [
  {
    "label": "Option 1",
    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    "icon": "unity:info_circle",
    "id": "1"
  },
  {
    "label": "Option 2",
    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    "icon": "unity:share",
    "id": "2"
  },
  {
    "label": "Option 3",
    "comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    "icon": "unity:download_alt1",
    "id": "3"
  }
]

describe('unity-dropdown', () => {

  it('expands on click if collapsed', async () => {
    const el = await fixture('<unity-dropdown></unity-dropdown>')
    let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    expect(el.expanded).to.be.false
    expect(optionsDialog).to.not.exist


    const dropdownMenu = el.shadowRoot.querySelector('.input-label-div')
    const listener = oneEvent(dropdownMenu, 'click')
    dropdownMenu.click()
    await listener
    optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    
    expect(el.expanded).to.be.true
    expect(optionsDialog).to.exist
  });

  it('collapses on click if expanded', async () => {
    const el = await fixture('<unity-dropdown expanded></unity-dropdown>')
    let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    expect(el.expanded).to.be.true
    expect(optionsDialog).to.exist


    const dropdownMenu = el.shadowRoot.querySelector('.input-label-div')
    const listener = oneEvent(dropdownMenu, 'click')
    dropdownMenu.click()
    await listener
    optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    
    expect(el.expanded).to.be.false
    expect(optionsDialog).to.not.exist
  });

  // TODO: this doesn't work because the outside click needs to trigger the iron-overlay-canceled event, which is not happening
  // it('collapses on click outside', async () => {
  //   await fixture('<div id="outside"></div><unity-dropdown id="dropdown" expanded></unity-dropdown>')
  //   const el = document.getElementById("dropdown")
  //   let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
  //   expect(el.expanded).to.be.true
  //   expect(optionsDialog).to.exist


  //   const outside = document.getElementById('outside')
  //   const listener = oneEvent(outside, 'click')
  //   outside.click()
  //   await listener
  //   optionsDialog = updatedEl.shadowRoot.querySelector('#options-dialog')
    
  //   expect(el.expanded).to.be.false
  //   expect(optionsDialog).to.not.exist
  // });

  it('initializes as expanded if set', async () => {
    const el = await fixture('<unity-dropdown expanded></unity-dropdown>')
    let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    expect(el.expanded).to.be.true
    expect(optionsDialog).to.exist
  });

  it('does not expand if box type equals fixed', async () => {
    const el = await fixture('<unity-dropdown boxType="fixed"></unity-dropdown>')
    let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    expect(el.expanded).to.be.false
    expect(optionsDialog).to.not.exist


    const dropdownMenu = el.shadowRoot.querySelector('.input-label-div')
    const listener = oneEvent(dropdownMenu, 'click')
    dropdownMenu.click()
    await listener
    optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    
    expect(el.expanded).to.be.false
    expect(optionsDialog).to.not.exist
  });

  it('does not expand if disabled', async () => {
    const el = await fixture('<unity-dropdown disabled></unity-dropdown>')
    let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    expect(el.expanded).to.be.false
    expect(optionsDialog).to.not.exist


    const dropdownMenu = el.shadowRoot.querySelector('.input-label-div')
    const listener = oneEvent(dropdownMenu, 'click')
    dropdownMenu.click()
    await listener
    optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    
    expect(el.expanded).to.be.false
    expect(optionsDialog).to.not.exist
  });

  it('displays a label above the dropdown', async () => {
    const el = await fixture('<unity-dropdown label="label"></unity-dropdown>')
    const label = el.shadowRoot.querySelector('.label')
    expect(label).to.exist
    expect(label.innerText).to.equal('label')
  });

  it('displays a helper text below the options list', async () => {
    const el = await fixture('<unity-dropdown expanded helperText="helper text"></unity-dropdown>')
    const helperText = el.shadowRoot.querySelector('#helper-text')
    expect(helperText).to.exist
    expect(helperText.innerText).to.equal("helper text")
  });

  it('displays a text input if box type equals "search"', async () => {
    const el = await fixture('<unity-dropdown boxType="search"></unity-dropdown>')
    const input = el.shadowRoot.querySelector('unity-text-input#search-input')
    expect(input).to.exist
  });

  it('right aligns dropdown box when rightAlign is set', async () => {
    const el = await fixture('<unity-dropdown expanded rightAlign></unity-dropdown>')
    let optionsDialog = el.shadowRoot.querySelector('#options-dialog')
    expect([...optionsDialog.classList]).to.contain('right-align')
  });
  
  it('renders options list', async () => {
    const el = await fixture(html`<unity-dropdown inputType="single-select" expanded .options=${options}></unity-dropdown>`)
    let optionsList = el.shadowRoot.querySelector('#options-list')
    expect(el.options).to.equal(options)
    expect(optionsList.children.length).to.equal(3)
  });

  it('set options in select menu', async () => {
    const el = await fixture(html`<unity-dropdown expanded .options=${options}></unity-dropdown>`)
    let optionsList = el.shadowRoot.querySelector('unity-select-menu')
    expect(optionsList.options).to.equal(options)
  });

  it('single select an option', async () => {
    const el = await fixture(html`<unity-dropdown inputType="single-select" expanded .options=${options}></unity-dropdown>`)
    expect(el.selected).to.be.empty
    expect(el.expanded).to.be.true

    // select one option
    const selectable = el.shadowRoot.querySelectorAll('li.selectable')
    const firstOption = selectable[0]
    const firstListener = oneEvent(firstOption, 'click')
    firstOption.click()
    await firstListener
    expect(el.selected).to.eql([options[0].id])
    expect(el.expanded).to.be.false // 

    // select a different option
    const secondOption = selectable[1]
    const secondListener = oneEvent(secondOption, 'click')
    secondOption.click()
    await secondListener
    expect(el.selected).to.eql([options[1].id])

    // deselect an option
    secondOption.click()
    await secondListener
    expect(el.selected).to.be.empty
  });

  // TODO

  it('click a menu option', async () => {
    const fakeOnMenuClick = i => i
    const callback = sinon.spy(fakeOnMenuClick)
    const el = await fixture(html`<unity-dropdown expanded .options=${options} .onMenuClick=${callback}></unity-dropdown>`)
    expect(el.selected).to.be.empty
    expect(el.expanded).to.be.true

    let optionsList = el.shadowRoot.querySelector('unity-select-menu')
    expect(callback).to.not.have.been.called
    optionsList.onMenuClick('1')
    expect(el.expanded).to.be.false
    expect(callback).to.have.been.called
  });

  describe('multi select', () => {
    it('select multiple options', async () => {
      const el = await fixture(html`<unity-dropdown inputType="multi-select" expanded .options=${options}></unity-dropdown>`)
      expect(el.selected).to.be.empty
  
      // select one option
      const selectable = el.shadowRoot.querySelectorAll('li.selectable')
      const firstOption = selectable[0]
      const firstListener = oneEvent(firstOption, 'click')
      firstOption.click()
      await firstListener
      expect(el.selected).to.eql([options[0].id])
  
      // select a different option
      const secondOption = selectable[1]
      const secondListener = oneEvent(secondOption, 'click')
      secondOption.click()
      await secondListener
      expect(el.selected).to.eql([options[0].id, options[1].id])
  
      // deselect an option
      secondOption.click()
      await secondListener
      expect(el.selected).to.eql([options[0].id])
    });

    it('select all options', async () => {
      const el = await fixture(html`<unity-dropdown inputType="multi-select" expanded .options=${options}></unity-dropdown>`)
      expect(el.selected).to.be.empty
  
      // select all
      const selectAll = el.shadowRoot.querySelector('#select-all')
      expect(selectAll.innerText.replace(/\n/g, "").trim()).to.equal("Select visible")
      const listener = oneEvent(selectAll, 'click')
      selectAll.click()
      await listener
      expect(el.selected).to.eql(options.map(o => o.id))

      // deselect all
      expect(selectAll.innerText.replace(/\n/g, "").trim()).to.equal("Deselect visible")
      selectAll.click()
      await listener
      expect(el.selected).to.be.empty
    });
  });


  it('render tags', async () => {
    const el = await fixture(html`<unity-dropdown showTags inputType="multi-select" .options=${options} .selected=${[options[0].id, options[1].id]}></unity-dropdown>`)
    const tagList = el.shadowRoot.querySelector(".tag-list")
    expect(tagList).to.exist
    expect(el.selected).to.eql([options[0].id, options[1].id])

    let tags = el.shadowRoot.querySelectorAll(".tag")
    expect(tags.length).to.equal(2)
    expect(tags[0].innerText).to.equal(options[0].label)
    expect(tags[1].innerText).to.equal(options[1].label)

    // clicking close tag removes it from selected
    const closeButton = tags[0].querySelector('.close-tag-button')
    const listener = oneEvent(closeButton, 'click')
    closeButton.click()
    await listener
    
    tags = el.shadowRoot.querySelectorAll(".tag")
    expect(tags.length).to.equal(1)
    expect(el.selected).to.eql([options[1].id])
  });

  it('renders inner search box when searchBox attribute is set', async () => {
    const withoutSearchBox = await fixture('<unity-dropdown expanded></unity-dropdown>')
    const withSearchBox = await fixture('<unity-dropdown expanded searchBox></unity-dropdown>')
    const withSearchBoxCollapsed = await fixture('<unity-dropdown searchBox></unity-dropdown>')

    let searchBox = withoutSearchBox.shadowRoot.getElementById("dropdown-inner-search-box")
    expect(searchBox).to.not.exist
    searchBox = withSearchBoxCollapsed.shadowRoot.getElementById("dropdown-inner-search-box")
    expect(searchBox).to.not.exist
    searchBox = withSearchBox.shadowRoot.getElementById("dropdown-inner-search-box")
    expect(searchBox).to.exist
  });
  
  describe('button box type', () => {
    it('displays a primary button if box type is button-primary', async () => {
      const el = await fixture('<unity-dropdown boxType="button-primary"></unity-dropdown>')
      const button = el.shadowRoot.querySelector('unity-button.dropdown-button')
      expect(button).to.exist
      expect(button.type).to.equal('primary')
    });
    it('displays a secondary button if box type is button-secondary', async () => {
      const el = await fixture('<unity-dropdown boxType="button-secondary"></unity-dropdown>')
      const button = el.shadowRoot.querySelector('unity-button.dropdown-button')
      expect(button).to.exist
      expect(button.type).to.equal('secondary')
    });
    it('displays a borderless button if box type is button-borderless', async () => {
      const el = await fixture('<unity-dropdown boxType="button-borderless"></unity-dropdown>')
      const button = el.shadowRoot.querySelector('unity-button.dropdown-button')
      expect(button).to.exist
      expect(button.type).to.equal('borderless')
    });
    it('displays an important button', async () => {
      const el = await fixture('<unity-dropdown boxType="button-primary" important></unity-dropdown>')
      const button = el.shadowRoot.querySelector('unity-button.dropdown-button')
      expect(button).to.exist
      expect(button.important).to.be.true
    });
  })

});