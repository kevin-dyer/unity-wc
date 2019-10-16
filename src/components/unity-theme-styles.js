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
    --dark-grey-text-color: #303030;
    --light-grey-text-color: #8c8c8c;
    --dark-grey-background-color: #303030;
    --light-grey-background-color: #8c8c8c;

    /*Composite style based on variables above*/
    --selection-highlight-color: rgba(var(--primary-brand-rgb), var(--selection-opacity));

    /* Fonts */
    --font-family: 'Nunito', sans-serif;

    --header1-font-size: 18px;
    --header1-font-weight: 400;

    --header2-font-size: 18px;
    --header2-font-weight: 400;

    --header2-selected-font-size: 18px;
    --header2-selected-font-weight: 600;

    --paragraph-font-size: 14px;
    --paragraph-font-weight: 400;

    --small-text-size: 11px;
    --small-text-weight: 400;

    --small-text-selected-size: 11px;
    --small-text-selected-weight: 600;
  }
`;
