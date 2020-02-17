import { css } from 'lit-element';

export const UnityThemeStyles = css`
  :host {
    --primary-brand-rgb: 250, 70, 22;
    --primary-brand-rgb-light: 253, 181, 162;
    --primary-brand-rgb-dark: 200, 51, 5;
    --secondary-brand-rgb: 45, 204, 211;
    --success-rgb: 71, 162, 63;
    --danger-rgb: 255, 198, 0;
    --danger-lite-rgb: 255, 232, 153;
    --selection-opacity: 0.5;
    --black-text-rgb: 0, 0, 0;
    --white-text-rgb: 255, 255, 255;

    /* Colors*/
    --primary-brand-color: rgb(var(--primary-brand-rgb));
    --primary-brand-color-light: rgb(var(--primary-brand-rgb-light));
    --primary-brand-color-dark: rgb(var(--primary-brand-rgb-dark));
    --secondary-brand-color: rgb(var(--secondary-brand-rgb));
    --success-color: rgb(var(--success-rgb));
    --danger-color: rgb(var(--danger-rgb));
    --danger-lite-color: rgb(var(--danger-light-rgb));
    --background-color: white;
    --global-nav-background-color: #005776;
    --global-nav-expanded-color: #00465e;
    --global-nav-border-color: #669aad;
    --global-nav-text-color: rgb(var(--white-text-rgb));
    --black-text-color: rgb(var(--black-text-rgb));
    --dark-grey-text-color: #5f6368;
    --medium-grey-text-color: #80868b;
    --light-grey-text-color: #b8b8b8;
    --dark-grey-background-color: #a7adaf;
    --medium-grey-background-color: #d4d9db;
    --light-grey-background-color: #f1f3f4;

    /*Composite style based on variables above*/
    --selection-highlight-color: #c1c5c8;

    /* Fonts */
    --font-family: 'Noto', sans-serif;

    --header1-font-size: 18px;
    --header1-font-weight: 400;

    --header2-font-size: 18px;
    --header2-font-weight: 400;

    --header2-selected-font-size: 18px;
    --header2-selected-font-weight: 600;

    --paragraph-font-size: 11px;
    --paragraph-font-weight: 400;

    /* this font size should likely change */
    --small-text-size: 8px;
    --small-text-weight: 400;

    --small-text-selected-size: 8px;
    --small-text-selected-weight: 600;

    --medium-icon-size: 18px;
    --small-icon-size: 14px;
    --xsmall-icon-size: 10px;

    /* Sizes and Spacing */
    --unity-button-height: 30px;
    --unity-button-border-radius: 30px;
    --unity-button-padding: 0 20px;

    --unity-text-input-height: 27px;
  }
`;
