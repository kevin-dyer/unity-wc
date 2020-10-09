import { LitElement, html, css } from 'lit-element';
// import './unity-toggle-switch/unity-toggle-switch.js'
import '@bit/smartworks.unity.unity-core/unity-toggle-switch'
import './unity-checkbox/unity-checkbox.js'
// import '@bit/smartworks.unity.unity-checkbox'
import { SharedStyles } from './shared-styles.js';

class MyToggleSwitch extends LitElement {
  constructor() {
    super()
    this.val = false
  }

  static get properties() {
    return {
      val: { type: Boolean }
    }
  }

  flip(val) {
    console.log('calling flip', val)
    this.val = val
  }

  report(e, val) {
    console.log('e', e)
    console.log('val', val)
  }

  render() {
    const { val } = this
    console.log('switch on render', val)
    return html`
      <div class="sections">
        <div class="container">
          <div class="switch-box">
            <unity-toggle-switch
              ?value="${val}"
              .onChange="${v => this.flip(v)}"
            ></unity-toggle-switch>
          </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ Label"
                ?value="${val}"
                .onChange="${v => this.flip(v)}"
              ></unity-toggle-switch>
            </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ Disabled"
                disabled
                ?value="${val}"
                .onChange="${v => this.flip(v)}"
              ></unity-toggle-switch>
            </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ Remark"
                ?value="${val}"
                remark="A remark goes here"
                .onChange="${v => this.flip(v)}"
              ></unity-toggle-switch>
            </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ no onChange"
                ?value="${val}"
              ></unity-toggle-switch>
            </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ onLabel"
                ?value="${val}"
                onLabel="To the Right"
                .onChange="${v => this.flip(v)}"
              ></unity-toggle-switch>
            </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ offLabel"
                ?value="${val}"
                offLabel="To the Left"
                remark="A remark goes here"
                .onChange="${v => this.flip(v)}"
              ></unity-toggle-switch>
            </div>
            <div class="switch-box">
              <unity-toggle-switch
                label="My Switch w/ everything"
                ?value="${val}"
                onLabel="To the Right"
                offLabel="To the Left"
                remark="A remark goes here"
                .onChange="${v => this.flip(v)}"
              ></unity-toggle-switch>
            </div>
          </div>
          <div class="container">
            <div class="switch-box">
              <unity-checkbox
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="With Label"
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="Checked"
                checked
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="Indeterminate"
                indeterminate
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="Indeterminate and Checked"
                checked
                indeterminate
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="Disabled"
                disabled
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="Disabled Checked"
                disabled
                checked
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
            <div class="switch-box">
              <unity-checkbox
                label="Disabled Indeterminate"
                disabled
                checked
                indeterminate
                .onChange="${this.report}"
              ></unity-checkbox>
            </div>
          </div>
        </div>
    `
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        .section {
          display: flex;
        }
        .container {
          flex: 1;
          display: flex;
        }
        .switch-box {
          flex: 1;
          margin: 24px;
        }
      `
    ];
  }
}

window.customElements.define('my-toggle-switch', MyToggleSwitch)
