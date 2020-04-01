import { css } from 'lit-element';

//Note: was not able to import css files,
// Therefore any specified font should be loaded in parent app
// import 'typeface-nunito-sans';

// old succes light green: --default-success-rgb: 156, 204, 101;
// old danger light red: --default-danger-rgb: 244, 67, 54;
// old danger-lite light red: --default-danger-lite-rgb: 250, 179, 174;

export const UnityDefaultThemeStyles = css`
  :host {
    --default-primary-brand-rgb: 250, 70, 22;
    --default-primary-brand-rgb-light: 253, 181, 162;
    --default-primary-brand-rgb-dark: 200, 51, 5;
    --default-secondary-brand-rgb: 45, 204, 211;
    --default-success-rgb: 71, 162, 63;
    --default-danger-rgb: 255, 198, 0;
    --default-danger-lite-rgb: 255, 232, 153;
    --default-selection-opacity: 0.5;
    --black-text-rgb: 0, 0, 0;
    --white-text-rgb: 255, 255, 255;

    /* Colors*/
    --default-primary-brand-color: rgb(var(--default-primary-brand-rgb));
    --default-primary-brand-color-light: rgb(var(--default-primary-brand-rgb-light));
    --default-primary-brand-color-dark: rgb(var(--default-primary-brand-rgb-dark));
    --default-secondary-brand-color: rgb(var(--default-secondary-brand-rgb));
    --default-success-color: rgb(var(--default-success-rgb));
    --default-danger-color: rgb(var(--default-danger-rgb));
    --default-danger-lite-color: rgb(var(--default-danger-light-rgb));
    --default-background-color: white;
    --default-global-nav-background-color: #005776;
    --default-global-nav-expanded-color: #00465e;
    --default-global-nav-border-color: #669aad;
    --default-global-nav-text-color: rgb(var(--white-text-rgb));
    --default-black-text-color: rgb(var(--black-text-rgb));
    --default-dark-grey-text-color: #5f6368;
    --default-medium-grey-text-color: #80868b;
    --default-light-grey-text-color: #b8b8b8;
    --default-dark-grey-background-color: #a7adaf;
    --default-medium-grey-background-color: #d4d9db;
    --default-light-grey-background-color: #f1f3f4;

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
