/* eslint-disable no-unused-expressions */
import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-dropdown/unity-select-menu'

describe ('unity-select-menu', () => {
  // testing consts
  const labelText = "label text"
  const otherLabelText = "other label text"
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
    label: otherLabelText,
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
    const submenuIcon = labelWrapper.querySelector('div.icon-right-wrapper')

    expect(ul).to.exist
    expect(li).to.exist
    expect(labelWrapper).to.exist
    expect(submenuIcon).to.not.exist
  })

  it('should render item with label', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemOne]}"></unity-select-menu`)
    const label = el.shadowRoot.querySelector('ul li div.item-label-wrapper p.item-label')

    expect(label).to.exist
    expect(label.innerText).to.equal(labelText)
  })

  it('should render item with comment', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemOne]}"></unity-select-menu`)
    const comment = el.shadowRoot.querySelector('ul li p.item-comment')

    expect(comment).to.exist
    expect(comment.innerText).to.equal(commentText)
  })

  it('should render item with icon', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemOne]}"></unity-select-menu`)
    const icon = el.shadowRoot.querySelector('ul li div.item-label-wrapper div.icon-left-wrapper unity-icon')

    expect(icon).to.exist
    expect(icon.icon).to.equal(iconName)
  })

  it('should render borderless', async () => {
    const el = await fixture(html`<unity-select-menu borderless .items="${[itemOne]}"></unity-select-menu`)
    const borderlessUl = el.shadowRoot.querySelector('ul.borderless')

    expect(borderlessUl).to.exist
  })

  it('should send id to onMenuClick', async () => {
    let ref = {}
    const onClick = makeOnClick(ref)

    const el = await fixture(html`<unity-select-menu .items="${[itemOne]}" .onMenuClick="${onClick}"></unity-select-menu>`)
    const li = el.shadowRoot.querySelector('ul li')

    const eventName = 'click'
    const event = new Event(eventName)
    const listener = oneEvent(li, eventName)

    li.dispatchEvent(event)
    await listener

    expect(ref.value).to.equal(idText)
  })

  it('should render multiple items', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemOne, itemTwo]}"></unity-select-menu>`)
    const ul = el.shadowRoot.querySelector('ul')
    const lis = ul.querySelectorAll('li')
    const firstLabel = lis[0].querySelector('div.item-label-wrapper p.item-label')
    const secondLabel = lis[1].querySelector('div.item-label-wrapper p.item-label')

    expect(lis.length).to.equal(2)
    expect(firstLabel.innerText).to.equal(labelText)
    expect(secondLabel.innerText).to.equal(otherLabelText)
  })

  it('should render item with submenu', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[itemWithSubmenu]}"></unity-select-menu>`)
    const rootItem = el.shadowRoot.querySelector('ul li')
    const submenuIcon = rootItem.querySelector('div.item-label-wrapper div.icon-right-wrapper unity-icon.inner-icon')
    const submenuItem = rootItem.querySelector('ul li')
    const submenuLabel = submenuItem.querySelector('div.item-label-wrapper p.item-label')

    expect(submenuIcon).to.exist
    expect(submenuItem).to.exist
    expect(submenuLabel).to.exist
    expect(submenuLabel.innerText).to.equal(subLabelText)
  })

  it('should render tag with label', async () => {
    const el = await fixture(html`<unity-select-menu .items="${[tagItem]}"></unity-select-menu>`)
    const tag = el.shadowRoot.querySelector('ul li unity-tag')

    expect(tag).to.exist
    expect(tag.label).to.equal(labelText)
  })
})
