import { css } from 'lit-element';

//Note: was not able to import css files,
// Therefore any specified font should be loaded in parent app
// import 'typeface-nunito-sans';

export const UnityDefaultThemeStyles = css`
  :host {
    --default-primary-brand-rgb: 58, 188, 225;
    --default-secondary-brand-rgb: 48, 128, 195;
    --default-danger-rgb: 244, 67, 54;
    --default-selection-opacity: 0.5;

    /* Colors*/
    --default-primary-brand-color: rgb(var(--default-primary-brand-rgb));
    --default-secondary-brand-color: rgb(var(--default-secondary-brand-rgb));
    --default-danger-color: rgb(var(--default-danger-rgb));
    --default-background-color: white;
    --default-global-nav-background-color: grey;
    --default-global-nav-section-color: #454545;
    --default-black-text-color: #000;
    --default-dark-grey-text-color: #5f6368;
    --default-medium-grey-text-color: #80868b;
    --default-light-grey-text-color: #b8b8b8;
    --default-dark-grey-background-color: #a7adaf;
    --default-medium-grey-background-color: #d4d9db;
    --default-light-grey-background-color: #f1f3f4;

    /*Composite style based on variables above*/
    --default-selection-highlight-color: rgba(var(--default-primary-brand-rgb), var(--default-selection-opacity));

    /* Fonts */
    --default-font-family: 'Nunito', sans-serif;

    --default-header1-font-size: 18pt;
    --default-header1-font-weight: 400;

    --default-header2-font-size: 18pt;
    --default-header2-font-weight: 400;

    --default-header2-selected-font-size: 18pt;
    --default-header2-selected-font-weight: 600;

    --default-paragraph-font-size: 11pt;
    --default-paragraph-font-weight: 400;

    /* this font size should likely change */
    --default-small-text-size: 11pt;
    --default-small-text-weight: 400;

    --default-small-text-selected-size: 11pt;
    --default-small-text-selected-weight: 600;
  }
`;
