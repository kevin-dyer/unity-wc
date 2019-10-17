import { css } from 'lit-element';

export const UnityThemeStyles = css`
  :host {
    --primary-brand-rgb: 58, 188, 225;
    --secondary-brand-rgb: 0, 94, 255;
    --selection-opacity: 0.5;

    /* Colors*/
    --primary-brand-color: rgb(var(--primary-brand-rgb));
    --secondary-brand-color: rgb(var(--secondary-brand-rgb));
    --global-nav-background-color: grey;
    --global-nav-section-color: #454545;
    --black-text-color: #000;
    ---dark-grey-text-color: #5f6368;
    ---medium-grey-text-color: #80868b;
    ---light-grey-text-color: #bdbdbd;
    ---dark-grey-background-color: #f1f3f4;
    ---medium-grey-background-color: #d4d9db;
    ---light-grey-background-color: #a7adaf;

    /*Composite style based on variables above*/
    --selection-highlight-color: rgba(var(--primary-brand-rgb), var(--selection-opacity));

    /* Fonts */
    --font-family: 'Nunito', sans-serif;

    --header1-font-size: 18pt;
    --header1-font-weight: 400;

    --header2-font-size: 18pt;
    --header2-font-weight: 400;

    --header2-selected-font-size: 18pt;
    --header2-selected-font-weight: 600;

    --paragraph-font-size: 14pt;
    --paragraph-font-weight: 400;

    --small-text-size: 11pt;
    --small-text-weight: 400;

    --small-text-selected-size: 11pt;
    --small-text-selected-weight: 600;
  }
`;
