import { css } from 'lit-element';

export const UnityThemeStyles = css`
  :host {
    --primary-brand-rgb: 58, 188, 225;
    --secondary-brand-rgb: 48, 128, 195;
    --success-rgb: 156, 204, 101;
    --danger-rgb: 244, 67, 54;
    --danger-lite-rgb: 250, 179, 174;
    --selection-opacity: 0.5;
    --black-text-rgb: 0, 0, 0;

    /* Colors*/
    --primary-brand-color: rgb(var(--primary-brand-rgb));
    --secondary-brand-color: rgb(var(--secondary-brand-rgb));
    --success-color: rgb(var(--success-rgb));
    --danger-color: rgb(var(--danger-rgb));
    --danger-lite-color: rgb(var(--danger-light-color));
    --default-background-color: white;
    --global-nav-background-color: #122C33;
    --global-nav-expanded-color: #07191E;
    --global-nav-border-color: #464E57;
    --global-nav-section-color: #454545;
    --black-text-color: rgb(var(--black-text-rgb));
    --dark-grey-text-color: #5f6368;
    --medium-grey-text-color: #80868b;
    --light-grey-text-color: #bdbdbd;
    --dark-grey-background-color: #a7adaf;
    --medium-grey-background-color: #d4d9db;
    --light-grey-background-color: #f1f3f4;

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

    --paragraph-font-size: 11px;
    --paragraph-font-weight: 400;

    /* this font size should likely change */
    --small-text-size: 9px;
    --small-text-weight: 400;

    --small-text-selected-size: 11px;
    --small-text-selected-weight: 600;

    --medium-icon-size: 18px;
    --small-icon-size: 14px;
    --xsmall-icon-size: 10px;
  }
`;
