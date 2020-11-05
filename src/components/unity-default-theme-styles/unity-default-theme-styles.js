import { css } from 'lit-element';

//Note: was not able to import css files,
// Therefore any specified font should be loaded in parent app
// import 'typeface-nunito-sans';

export const UnityDefaultThemeStyles = css`
  :host {
    /* Colors */
    --default-black-rgb: 0, 0, 0;                   /* #000000 */
    --default-white-rgb: 255, 255, 255;             /* #FFFFFF */
    --default-charcoal-rgb: 77, 77, 77;             /* #4D4D4D */
    --default-dark-gray-rgb: 151, 151, 151;         /* #979797 */
    --default-gray-rgb: 162, 170, 173;              /* #A2AAAD */
    --default-light-gray-1-rgb: 235, 235, 235;      /* #EBEBEB */
    --default-light-gray-2-rgb: 244, 244, 244;      /* #F4F4F4 */
    --default-white-rgb: 255, 255, 255;             /* #FFFFFF */
    --default-deep-blue-rgb: 0, 87, 118;            /* #005776 */
    --default-deep-blue-tint-rgb: 64, 129, 153;     /* #408199 */
    --default-sky-blue-rgb: 45, 204, 211;           /* #2DCCD3 */
    --default-sky-blue-shade-rgb: 50, 166, 172;     /* #32A6AC */
    --default-sky-blue-tint-1-rgb: 234, 249, 250;   /* #EAF9FA */
    --default-sky-blue-tint-2-rgb: 217, 243, 244;   /* #D9F3F4 */
    --default-red-orange-rgb: 250, 70, 22;          /* #FA4616 */
    --default-dark-red-orange-rgb: 145, 61, 38;     /* #913D26 */
    --default-light-red-orange-rgb: 252, 221, 220;  /* #FCDDDC */
    --default-yellow-rgb: 255, 198, 0;              /* #FFC600 */
    --default-green-rgb: 71, 162, 63;               /* #47A23F */

    /* Uses */

    /* Input text color */
    --default-black-color: rgb(var(--default-black-rgb));

    /* Default background color, Font Color */
    --default-white-color: rgb(var(--default-white-rgb));

    /* dark grey, text default */
    --default-dark-gray-color: rgb(var(--default-charcoal-rgb));

    /* dark grey 2 */
    --default-dark-gray-2-color: rgb(var(--default-dark-gray-rgb));

    /* normal gray, border default, disabled text */
    --default-gray-color: rgb(var(--default-gray-rgb));

    /* light gray 1, disabled content */
    --default-light-gray-1-color: rgb(var(--default-light-gray-1-rgb));

    /* light gray 2, disabled content */
    --default-light-gray-2-color: rgb(var(--default-light-gray-2-rgb));

    /* default brand color, switches, radios, checkboxes, focus */
    --default-primary-color: rgb(var(--default-sky-blue-rgb));

    /* darked primary color */
    --default-primary-shade-color: rgb(var(--default-sky-blue-shade-rgb));

    /* faint primary highlight */
    --default-primary-tint-1-color: rgb(var(--default-sky-blue-tint-1-rgb));

    /* primary highlight */
    --default-primary-tint-2-color: rgb(var(--default-sky-blue-tint-2-rgb));

    /* secondary brand color, buttons, tabs, links */
    --default-secondary-color: rgb(var(--default-deep-blue-rgb));

    /* muted secondary color, clicked button */
    --default-secondary-tint-color: rgb(var(--default-deep-blue-tint-rgb));

    /* utility color, error, alert, attention grabbing, present/past-tense */
    --default-tertiary-1-color: rgb(var(--default-red-orange-rgb));

    /* darker tertiary 1, pressed alert button */
    --default-tertiary-1-shade-color: rgb(var(--default-dark-red-orange-rgb));

    /* lighter tertiary 1, field error background */
    --default-tertiary-1-light-color: rgb(var(--default-light-red-orange-rgb));

    /* utility color, warning, alert, future/present-tense */
    --default-tertiary-2-color: rgb(var(--default-yellow-rgb));

    /* utility color, success, notification */
    --default-tertiary-3-color: rgb(var(--default-green-rgb));

    /* Old Colors */
    --default-primary-brand-color: rgb(var(--default-sky-blue-rgb));
    --default-primary-brand-color-light: rgb(var(--default-sky-blue-tint-2-rgb));
    --default-primary-brand-color-dark: rgb(var(--default-deep-blue-rgb));
    --default-secondary-brand-color: rgb(var(--default-red-orange-rgb));
    --default-success-color: rgb(var(--default-green-rgb));
    --default-danger-color: rgb(var(--default-yellow-rgb));
    --default-danger-lite-color: rgba(var(--default-yellow-rgb), .5);
    --default-error-color: rgb(var(--default-red-orange-rgb));
    --default-error-lite-color: rgba(var(--default-red-orange-rgb), .5);
    --default-background-color: rgb(var(--default-white-rgb));
    --default-black-text-color: rgb(var(--default-black-rgb));

    --default-dark-grey-text-color: rgb(var(--default-charcoal-rgb));
    --default-medium-grey-text-color: #80868b;
    --default-light-grey-text-color: #b8b8b8;
    --default-dark-grey-background-color: rgb(var(--default-gray-rgb));
    --default-medium-grey-background-color: rgb(var(--default-light-gray-1-rgb));
    --default-light-grey-background-color: rgb(var(--default-light-gray-2-rgb));

    /* Fonts */
    --default-font-family: 'NotoSans', sans-serif;
    --default-monospace-font-family: 'NotoMono', monospace;

    --default-header1-font-size: 16px;
    --default-header1-font-weight: 400;
    --default-header1-line-height: 24px;

    --default-header2-font-size: 16px;
    --default-header2-font-weight: 400;
    --default-header1-line-height: 24px;

    --default-header2-selected-font-size: 16px;
    --default-header2-selected-font-weight: 600;

    --default-paragraph-font-size: 12px;
    --default-paragraph-font-weight: 400;
    --default-paragraph-line-height: 16px;

    /* this font size should likely change */
    --default-small-text-size: 10px;
    --default-small-text-weight: 400;

    --default-small-text-selected-size: 10px;
    --default-small-text-selected-weight: 600;

    --default-bold-text-weight: 600;

    --default-medium-icon-size: 18px;
    --default-small-icon-size: 14px;
    --default-xsmall-icon-size: 10px;

    /* Sizes and Spacing */
    --default-unity-button-height: 32px;
    --default-unity-button-border-radius: 32px;

    --default-unity-text-input-height: 27px;

    /* Margins and Paddings */
    --default-margin-size-md: 12px;
    --default-padding-size-sm: 8px;
    --default-padding-size-md: 12px;
    --default-padding-size-lg: 16px;
    --default-padding-size-xl: 24px;

    /* Checkbox */
    --default-unity-checkbox-size: 16px;
    --default-unity-checkbox-border-size: 1px;
    --default-unity-checkbox-border-radius: 1px;
    --default-unity-checkbox-text-margin: 4px;
    --default-unity-checkbox-text-size: var(--paragraph-font-size, var(--default-paragraph-font-size));
    --default-unity-checkbox-text-color: var(--dark-grey-text-color, var(--default-dark-grey-text-color));
    --default-unity-checkbox-text-color-disabled: var(--gray-color, var(--default-gray-color));
    --default-unity-checkbox-background-color: var(--white-color, var(--default-white-color));
    --default-unity-checkbox-background-color-hover: var(--primary-tint-1-color, var(--default-primary-tint-1-color));
    --default-unity-checkbox-background-color-disabled: var(--light-gray-2-color, var(--default-light-gray-2-color));
    --default-unity-checkbox-border-color: var(--gray-color, var(--default-gray-color));
    --default-unity-checkbox-color: var(--primary-color, var(--default-primary-color));
    --default-unity-checkbox-color-hover: var(--primary-shade-color, var(--default-primary-shade-color));
    --default-unity-checkbox-color-disabled: var(--gray-color, var(--default-gray-color));
    --default-unity-checkbox-checkmark-color: var(--white-color, var(--default-white-color));
    --default-unity-checkbox-checkmark-color-disabled: var(--white-color, var(--default-white-color));
  }
`;
