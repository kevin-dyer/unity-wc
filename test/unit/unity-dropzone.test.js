import { fixture, expect, oneEvent } from '@open-wc/testing'
import { LitElement, html, css } from 'lit-element'
import '../../src/components/unity-dropzone/unity-dropzone'

describe('dropzone test', () => {
  const makeOnUpload = injector => value => {
    injector.value = value
  }
  const defaultDropzoneText = 'Drag and Drop a file here'
  const defaultInvalidText = 'Invalid file type'
  const testAccept = 'application/json'

  it('should exist', async () => {
    const el = await fixture('<unity-dropzone></unity-dropzone>')
    expect(el).to.exist
  })

  it('should have sp-dropzone', async () => {
    const el = await fixture('<unity-dropzone></unity-dropzone>')
    const dropzone = el.shadowRoot.querySelector('sp-dropzone#dropzone')
    expect(dropzone).to.exist
  })

  it('should have icon in area', async () => {
    const el = await fixture('<unity-dropzone></unity-dropzone>')
    const icon = el.shadowRoot.querySelector('sp-dropzone#dropzone div.drop-area iron-icon.upload-icon')
    expect(icon).to.exist
    expect(icon.icon).to.equal('unity:file_upload')
  })

  it('should not have icon in area if hideIcon is true', async () => {
    const el = await fixture('<unity-dropzone hideIcon></unity-dropzone>')
    const dropArea = el.shadowRoot.querySelector('sp-dropzone#dropzone div.drop-area')
    const icon = dropArea.querySelector('iron-icon.upload-icon')
    expect(dropArea).to.exist
    expect(icon).to.not.exist
  })

  it('should have dropzoneText', async () => {
    const el = await fixture('<unity-dropzone></unity-dropzone>')
    const dropzoneText = el.shadowRoot.querySelector('#dropzone .drop-area unity-typography.dropzone-text')
    expect(dropzoneText).to.exist
    expect(dropzoneText.innerText).to.equal(defaultDropzoneText)
  })

  it('should have custom dropzoneText', async () => {
    const text = 'text'
    const el = await fixture(`<unity-dropzone dropzoneText="${text}"></unity-dropzone>`)
    const dropzoneText = el.shadowRoot.querySelector('#dropzone .drop-area unity-typography.dropzone-text')
    expect(dropzoneText).to.exist
    expect(dropzoneText.innerText).to.not.equal(defaultDropzoneText)
    expect(dropzoneText.innerText).to.equal(text)
  })

  it('should have label with unity-typography', async () => {
    const el = await fixture('<unity-dropzone></unity-dropzone>')
    const label = el.shadowRoot.querySelector('#dropzone .drop-area label.labelText')
    const textInLabel = label.querySelector('unity-typography')
    expect(label).to.exist
    expect(textInLabel).to.exist
    expect(textInLabel.innerText).to.equal('Or Select a File from your computer')
  })

  it('should have a file input field', async () => {
    const el = await fixture('<unity-dropzone></unity-dropzone>')
    const input = el.shadowRoot.querySelector('#dropzone .drop-area input#file-input')
    expect(input).to.exist
    expect(input.type).to.equal('file')
  })

  it('should use passed in accept for file input', async () => {
    const el = await fixture(`<unity-dropzone accept="${testAccept}"></unity-dropzone>`)
    const input = el.shadowRoot.querySelector('#dropzone .drop-area #file-input')
    expect(input).to.exist
    expect(input.accept).to.equal(testAccept)
  })

  it('should have disabled style when disabled', async () => {
    const el = await fixture('<unity-dropzone disabled></unity-dropzone>')
    const dropzone = el.shadowRoot.querySelector('sp-dropZone#dropzone.disabled')
    const icon = dropzone.querySelector('iron-icon.upload-icon.disabled')
    const dropzoneText = dropzone.querySelector('unity-typography.dropzone-text')
    const label = dropzone.querySelector('label.labelText unity-typography')
    const input = dropzone.querySelector('input#file-input')
    expect(dropzone).to.exist
    expect(icon).to.exist
    expect(dropzoneText).to.exist
    expect(dropzoneText.color).to.equal('light')
    expect(label).to.exist
    expect(label.color).to.equal('light')
    expect(input).to.not.exist
  })

  // outlines for event testing, input type=file has issues testing because of security reasons
  // it('should send file to onUpload', async () => {
  //   let ref = {}
  //   const testFileName = 'test file name'
  //   const testFileType = 'test file type'
  //   const onUpload = makeOnUpload(ref)
  //
  //   const el = await fixture(html`<unity-dropzone .onUpload="${onUpload}"></unity-dropzone>`)
  //   const input = el.shadowRoot.querySelector('#dropzone input#file-input')
  //
  //   el.inputRef = {...el.inputRef, files: [{type: 'application/json'}], removeEventListener: ()=>{} }
  //   const eventName = 'change'
  //   const event = new CustomEvent(eventName, { detail: { dataTransfer: { items: [{name: testFileName, type: testFileType}] } } })
  //   const listener = oneEvent(input, eventName)
  //
  //   input.dispatchEvent(event)
  //   await listener
  //
  //   expect(ref.file).to.exist
  //   expect(ref.file.name).to.equal(testFileName)
  // })

  // drop testing, await listener isn't resolving for some reason
  // it('should send dropped file to onUpload', async () => {
  //   let ref = {}
  //   const testFileName = 'test file name'
  //   const testFileType = 'test file type'
  //   const onUpload = makeOnUpload(ref)
  //
  //   const el = await fixture(html`<unity-dropzone .onUpload="${onUpload}"></unity-dropzone>`)
  //   const dropzone = el.shadowRoot.querySelector('#dropzone')
  //
  //   const eventName = 'sp-dropzone-drop'
  //   const event = new CustomEvent(eventName) //, { detail: { dataTransfer: { items: [{name: testFileName, type: testFileType}] } } })
  //   const listener = oneEvent(dropzone, eventName)
  //
  //   input.dispatchEvent(event)
  //   await listener
  //   console.log('ref', ref)
  //   expect(ref.file).to.exist
  //   expect(ref.file.name).to.equal(testFileName)
  // })
})
