import { css } from 'lit-element';

//Note: was not able to import css files,
// Therefore any specified font should be loaded in parent app
// import 'typeface-nunito-sans';

export const UnityDefaultThemeStyles = css`
  :host {
    /* Old RGBs */
    --default-black-rgb: 0, 0, 0;
    --default-white-rgb: 255, 255, 255;
    --default-primary-brand-rgb: 250, 70, 22;
    --default-primary-brand-rgb-light: 253, 181, 162;
    --default-primary-brand-rgb-dark: 200, 51, 5;
    --default-secondary-brand-rgb: 45, 204, 211;
    --default-success-rgb: 71, 162, 63;
    --default-danger-rgb: 255, 198, 0;
    --default-danger-lite-rgb: 255, 232, 153;
    --default-error-rgb: 240, 61, 12;
    --default-error-lite-rgb: 245, 120, 106;
    --default-selection-opacity: 0.5;

    /* Old Colors */
    --default-primary-brand-color: rgb(var(--default-primary-brand-rgb));
    --default-primary-brand-color-light: rgb(var(--default-primary-brand-rgb-light));
    --default-primary-brand-color-dark: rgb(var(--default-primary-brand-rgb-dark));
    --default-secondary-brand-color: rgb(var(--default-secondary-brand-rgb));
    --default-success-color: rgb(var(--default-success-rgb));
    --default-danger-color: rgb(var(--default-danger-rgb));
    --default-danger-lite-color: rgb(var(--default-danger-lite-rgb));
    --default-error-color: rgb(var(--default-error-rgb));
    --default-error-lite-color: rgb(var(--default-error-lite-rgb));
    --default-background-color: rgb(var(--default-white-rgb));
    --default-global-nav-background-color: #005776;
    --default-global-nav-expanded-color: #00465e;
    --default-global-nav-border-color: #669aad;
    --default-global-nav-text-color: rgb(var(--default-white-rgb));
    --default-black-text-color: rgb(var(--default-black-rgb));
    --default-dark-grey-text-color: #5f6368;
    --default-medium-grey-text-color: #80868b;
    --default-light-grey-text-color: #b8b8b8;
    --default-dark-grey-background-color: #a7adaf;
    --default-medium-grey-background-color: #d4d9db;
    --default-light-grey-background-color: #f1f3f4;

    /* Colors */
    --default-black-rgb: 0, 0, 0;                 /* #000000 */
    --default-charcoal-rgb: 77, 77, 77;           /* #4D4D4D */
    --default-gray-rgb: 162, 170, 173;            /* #A2AAAD */
    --default-light-gray-1-rgb: 235, 235, 235;    /* #EBEBEB */
    --default-light-gray-2-rgb: 244, 244, 244;    /* #F4F4F4 */
    --default-white-rgb: 255, 255, 255;           /* #FFFFFF */
    --default-deep-blue-rgb: 0, 87, 118;          /* #005776 */
    --default-deep-blue-tint-rgb: 64, 129, 153;   /* #408199 */
    --default-sky-blue-rgb: 45, 204, 211;         /* #2DCCD3 */
    --default-sky-blue-shade-rgb: 50, 166, 172;   /* #32A6AC */
    --default-sky-blue-tint-1-rgb: 234, 249, 250; /* #EAF9FA */
    --default-sky-blue-tint-2-rgb: 217, 243, 244; /* #D9F3F4 */
    --default-red-orange-rgb: 250, 70, 22;        /* #FA4616 */
    --default-dark-red-orange-rgb: 145, 61, 38;   /* #913D26 */
    --default-yellow-rgb: 255, 198, 0;            /* #FFC600 */
    --default-green-rgb: 71, 162, 63;             /* #47A23F */

    /* Text Colors */
    --default-white-text-color: rgb(var(--default-white-rgb)));
    --default-black-text-color: rgb(var(--default-black-rgb));
    --default-text-color: rgb(var(--default-charcoal-rgb));
    --default-hyperlink-color: rgb(var(--default-deep-blue-rgb));

    /* Layout Colors */
    --default-border-color: rgb(var(--default-gray-rgb));
    --default-background-color: rgb(var(--default-white-rgb));
    --default-nav-bar-color: rgb(var(--default-deep-blue-rgb));
    --default-tab-selected-color: rgb(var(--default-deep-blue-rgb));

    /* Buttons */
    --default-button-color: rgb(var(--default-deep-blue-rgb));
    --default-button-pressed-color: rgb(var(--default-deep-blue-tint-rgb));
    --default-button-important-color: rbg(var(--default-red-orange-rgb));
    --default-button-important-pressed-color: rgb(var(--default-dark-red-orange-rgb));
    --default-button-disabled-color: rgb(var(--default-light-gray-2-rgb));
    --default-button-disabled-text-color: rgb(var(--default-gray-rgb));
    --default-secondary-button-border-color: rgb(var(--default-gray-rgb));

    /* Tags */
    --default-tag-active-color: rgb(var(--default-sky-blue-rgb));
    --default-tag-inactive-color: rgb(var(--default-gray-rgb));

    /* Checkboxes & Radios */
    --default-checkbox-radio-selected-color: rgb(var(--default-sky-blue-rgb));
    --default-checkbox-radio-selected-hover-color: rgb(var(--default-sky-blue-shade-rgb));
    --default-checkbox-radio-hover-color: rgb(var(--default-sky-blue-tint-1-rgb));
    --default-checkbox-radio-disabled: rgb(var(--default-light-gray-2-rgb));

    /* Switches */
    --default-switch-active-color: rgb(var(--default-sky-blue-rgb));
    --default-switch-active-hover-color: rgb(var(--default-sky-blue-shade-rgb));
    --default-switch-inactive-knob-color: rgb(var(--default-charcoal-rgb));
    --default-switch-inactive-border-color: rgb(var(--default-gray-rgb));
    --default-switch-inactive-hover-border-color: rgb(var(--default-charcoal-rgb));
    --default-switch-diabled-color: rgb(var(--default-light-gray-2-rgb));
    --default-switch-disabled-border-knob-color: rgb(var(--default-gray-rgb));

    /* Drag & Drop */
    --default-drag-and-drop-border-color: rgb(var(--default-gray-rgb));
    --default-drag-and-drop-hover-border-color: rgb(var(--default-charcoal-rgb));
    --default-drag-and-drop-hover-background-color: rgb(var(--default-sky-blue-tint-2-rgb));
    --default-drag-and-drop-icon-color: rgb(var(--default-sky-blue-rgb));

    /* Notifications */
    --default-notification-color: rgb(var(--default-sky-blue-rgb));
    --default-notification-success-color: rgb(var(--default-green-rgb));
    --default-notification-warning-color: rgb(var(--default-yellow-rgb));
    --default-notification-error-color: rgb(vaR(--default-red-orange-rgb));

    /* Inputs & Dropdowns */
    --default-input-hover-border-color: rgb(var(--default-charcoal-rgb));
    --default-input-focus-border-color: rgb(var(--default-sky-blue-rgb));
    --default-input-danger-background-color: rgba( var(--default-red-orange-rgb), .5);
    --default-dropdown-option-hover-color: rgb(var(--default-light-gray-2-rgb));
    --default-dropdown-option-disabled-color: rgb(var(--default-gray-rgb));
    --default-list-selected-color: rgb(var(--default-sky-blue-tint-1-rgb));
    --default-input-valid-icon-color: rgb(var(--default-sky-blue-color));

    /* Sliders */
    --default-slider-range-color: rgb(var(--default-charcoal-rgb));
    --default-slider-track-color: rgb(var(--default-gray-rgb));
    --default-slider-hover-range-color: rgb(var(--default-sky-blue-rgb));
    --default-slider-hover-track-color: rgb(var(--default-sky-blue-tint-2-rgb));
    --default-slider-disabled-range-color: rgb(var(--default-gray-rgb));
    --default-slider-disabled-track-color: rgb(var(--default-light-gray-1-rgb));

    /* Progress */
    --default-progress-track-color: rgb(var(--default-light-gray-1-rgb));
    --default-progress-color: rgb(vaR(--default-sky-blue-rgb));

    /* Tables */
    --default-row-hover-color: rgb(var(--default-sky-blue-tint-1-rgb));
    --default-row-selected-color: rgb(var(--default-sky-blue-tint-1-rgb));
    --default-row-hover-selected-color: rgb(var(--default-sky-blue-tint-2-rgb));

    /*Composite style based on variables above*/
    --default-selection-highlight-color: #a2aaad;

    /* Fonts */
    --default-font-family: 'Noto', sans-serif;

    --default-header1-font-size: 18px;
    --default-header1-font-weight: 400;

    --default-header2-font-size: 18px;
    --default-header2-font-weight: 400;

    --default-header2-selected-font-size: 18px;
    --default-header2-selected-font-weight: 600;

    --default-paragraph-font-size: 11px;
    --default-paragraph-font-weight: 400;

    /* this font size should likely change */
    --default-small-text-size: 8px;
    --default-small-text-weight: 400;

    --default-small-text-selected-size: 8px;
    --default-small-text-selected-weight: 600;

    --default-medium-icon-size: 18px;
    --default-small-icon-size: 14px;
    --default-xsmall-icon-size: 10px;

    /* Sizes and Spacing */
    --default-unity-button-height: 30px;
    --default-unity-button-border-radius: 30px;
    --default-unity-button-padding: 20px;

    --default-unity-text-input-height: 27px;
  }
`;
