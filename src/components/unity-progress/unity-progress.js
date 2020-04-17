import { LitElement, html, css } from 'lit-element'
import '@bit/smartworks.unity.unity-typography'
import '@polymer/paper-progress/paper-progress.js';
import { UnityDefaultThemeStyles } from '@bit/smartworks.unity.unity-default-theme-styles'

/**
 * Progress bar with configurable styles. Accepts main and secondary progresses. May be set as indeterminate, showing a
 * progress animation in a loop.
 * @name UnityProgress
 * @param {string} label, text above the progress bar
 * @param {string} remark, text below the progress bar
 * @param {number} max, maximum progress value, defaults to 1
 * @param {number} value, current progress value, defaults to 0
 * @param {number} secondaryValue, value for secondary progress, defaults to 0
 * @param {bool} indeterminate, use progress animation instead of controlled values, defaults to false
 * @param {string} completionType, type for text inside progress showing completion. May be a percentage, ratio (value/max), or
 * an empty string. Defaults to ''
*  @example
    <unity-progress
      style="width: 300px"
      max=100
      value=25
      secondaryValue=60
      label='Progress'
      remark='Remark
      ?indeterminate=${false}
      completionType='percentage'
    </unity-progress>
*/
class UnityProgress extends LitElement {

  constructor() {
    super()
    this.label = ''
    this.remark = ''
    this.max = 1
    this.value = 0
    this.secondaryValue = 0
    this.indeterminate = false
    this.completionType = ''
  }

  static get properties() {
    return {
      label: { type: String },
      remark: { type: String },
      max: { type: Number },
      value: { type: Number },
      secondaryValue: { type: Number },
      indeterminate: { type: Boolean },
      completionType: { type: String }
    }
  }

  static get styles() {
    return [
      UnityDefaultThemeStyles,
      css`
        :host {
          --progress-color: var(--default-primary-brand-color);
          --progress-secondary-color: var(--default-primary-brand-color-light);
          --progress-height: 20px;
          --progress-indeterminate-cycle-duration: 3s;
          --label-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
          --text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
          --remark-position: start;
          --completion-position: center;
          --completion-color: black;
          display: block;
        }
        .label {
          padding: 0;
          font-size: var(--text-size);
          color: var(--label-color);
        }
        .remark {
          width: 100%;
          text-align: var(--remark-position);
        }
        .completion {
          position: absolute;
          width: 96%;
          left: 2%;
          text-align: var(--completion-position);
          top: 50%;
          transform: translate(0, -50%);
        }
        .progress-wrapper {
          position: relative;
          width: 100%;
        }
        paper-progress {
          --paper-progress-active-color: var(--progress-color);
          --paper-progress-secondary-color: var(--progress-secondary-color);
          --paper-progress-height: var(--progress-height);
          --paper-progress-indeterminate-cycle-duration: var(--progress-indeterminate-cycle-duration);
          width: 100%;
          margin: 6px 0;
        }
        .progressContainer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          position: relative;
        }
        .completion-text {
          --font-color-dark: var(--completion-color);
        }
      `
    ]
  }

  getCompletion(type, value, max) {
    switch (type) {
      case 'percentage':
        return `${value/max*100 } %`
      case 'ratio':
        return `${value} / ${max}`
      default:
        return ''
    }
  }

  render() {
    const { completionType, label, indeterminate, max, remark, value, secondaryValue} = this
    const completion = this.getCompletion(completionType, value, max)

    return html`
      <div class='progressContainer'>
        ${label? html`
          <unity-typography class='label' size='paragraph' color='dark'>
            ${label}
          </unity-typography>
        `: ''}
        <div class='progress-wrapper'>
          <paper-progress ?indeterminate=${indeterminate} max="${max}" value="${value}" secondary-progress="${secondaryValue}"></paper-progress>
          ${completion? html`
            <div class='completion'>
              <unity-typography class='completion-text' size='paragraph' color='dark'>
                ${completion}
              </unity-typography>  
            </div>
            ` : ''
          }
        </div>
        ${remark? html`
          <unity-typography class='remark' size='paragraph' color='dark'>
            ${remark}
          </unity-typography>
        `: ''}
      </div> 
      `
  }
}

window.customElements.define('unity-progress', UnityProgress)