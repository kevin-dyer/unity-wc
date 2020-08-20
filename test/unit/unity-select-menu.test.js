/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-dropdown/unity-select-menu'

describe ('unity-select-menu', () => {
  // testing consts
  const labelText = "label text"
  const idText = "ID"
  const otherId = "ID2"
  const iconName = "unity:db_candi"
  const commentText = "comment text"

  const subLabelText = "sub label text"
  const subIdText = "sub ID"
  const subIconName = "unity:db_carriots"
  const subCommentText = "sub comment text"

  const tagStyleColor = "red"

  const itemOne = {
    label: labelText,
    id: idText,
    icon: iconName,
    comment: commentText
  }
  const itemTwo = {
    label: labelText,
    id: otherId
  }
  const itemWithSubmenu = {
    label: labelText,
    id: idText,
    icon: iconName,
    comment: commentText,
    submenu: [
      {
        label: subLabelText,
        id: subIdText,
        icon: subIconName,
        comment: subCommentText
      }
    ]
  }
  const tagItem = {
    label: labelText,
    id: idText,
    tag: true,
    tagStyle: { "--tag-color": tagStyleColor }
  }

  const makeOnClick = injector => value => { injector.value = value }

  it('should render', async () => {
    const el = await fixture('<unity-select-menu></unity-select-menu>')
    expect(el).shadowDom.to.equal('<ul class="null"></ul>')
  })

  it('should render item', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemOne]}"></unity-select-menu>`)
    const ul = el.shadowRoot.querySelector('ul')
    const li = ul.querySelector('li')
    const labelWrapper = li.querySelector('div.item-label-wrapper')

    expect(ul).to.exist
    expect(li).to.exist
    expect(labelWrapper).to.exist
  })

  it('should render item with label', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemOne]}"></unity-select-menu`)
    const label = el.shadowRoot.querySelector('ul li div.item-label-wrapper p.item-label')

    expect(label).to.exist
    expect(label.innerText).to.equal(labelText)
  })

  // should render item with comment

  // should render item with icon

  // should render borderless

  // should send id to func

  // should render item with submenu

  // should render tag with label

  // should render tag with style
})
