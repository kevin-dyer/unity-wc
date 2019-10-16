import { css } from 'lit-element';
import 'typeface-nunito';
import 'typeface-nunito-sans';

const UnityDefaultThemeStyles = css`
  :host {
    --default-primary-brand-rgb: 58, 188, 225;
    --default-secondary-brand-rgb: 0, 94, 255;
    --default-selection-opacity: 0.5;

    /* Colors*/
    --default-primary-brand-color: rgb(var(--default-primary-brand-rgb));
    --default-secondary-brand-color: rgb(var(--default-secondary-brand-rgb));
    --default-global-nav-background-color: grey;
    --default-global-nav-section-color: #454545;
    --default-black-text-color: #000;
    --default-dark-grey-text-color: #303030;
    --default-light-grey-text-color: #8c8c8c;
    --default-dark-grey-background-color: #303030;
    --default-light-grey-background-color: #8c8c8c;

    /*Composite style based on variables above*/
    --default-selection-highlight-color: rgba(var(--default-primary-brand-rgb), var(--default-selection-opacity));

    /* Fonts */
    --default-font-family: 'Nunito', sans-serif;

    --default-header1-font-size: 18px;
    --default-header1-font-weight: 400;

    --default-header2-font-size: 18px;
    --default-header2-font-weight: 400;

    --default-header2-selected-font-size: 18px;
    --default-header2-selected-font-weight: 600;

    --default-paragraph-font-size: 14px;
    --default-paragraph-font-weight: 400;

    --default-small-text-size: 11px;
    --default-small-text-weight: 400;

    --default-small-text-selected-size: 11px;
    --default-small-text-selected-weight: 600;
  }
`;

export default UnityDefaultThemeStyles
