import { css } from 'lit-element';

//Note: was not able to import css files,
// Therefore any specified font should be loaded in parent app
// import 'typeface-nunito-sans';

// old succes light green: --default-success-rgb: 156, 204, 101;
// old danger light red: --default-danger-rgb: 244, 67, 54;
// old danger-lite light red: --default-danger-lite-rgb: 250, 179, 174;

export const UnityDefaultThemeStyles = css`
  :host {
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
    --default-white-text-color: var(rgb(rgb(--default-white-rgb)));
    --default-black-text-color: var(rgb(--default-black-rgb));
    --default-text-color: var(rgb(--default-charcoal-rgb));
    --default-hyperlink-color: var(rgb(--default-deep-blue-rgb));

    /* Layout Colors */
    --default-border-color: var(rgb(--default-gray-rgb));
    --default-background-color: var(rgb(--default-white-rgb));
    --default-nav-bar-color: var(rgb(--default-deep-blue-rgb));


    /* Interactables */
    --default-button-color: var(rgb(--default-deep-blue-rgb));
    --default-button-pressed-color: var(rgb(--default-deep-blue-tint-rgb));

    /* Notifications */
    /* Inputs */
    /* Tables */

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
