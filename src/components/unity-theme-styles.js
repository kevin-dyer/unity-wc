import { css } from 'lit-element';

//Note: was not able to import css files,
// Therefore any specified font should be loaded in parent app
// import 'typeface-nunito-sans';

export const UnityThemeStyles = css`
  :host {
    /* Colors */
    --black-rgb: 0, 0, 0;                   /* #000000 */
    --white-rgb: 255, 255, 255;             /* #FFFFFF */
    --charcoal-rgb: 77, 77, 77;             /* #4D4D4D */
    --gray-rgb: 162, 170, 173;              /* #A2AAAD */
    --light-gray-1-rgb: 235, 235, 235;      /* #EBEBEB */
    --light-gray-2-rgb: 244, 244, 244;      /* #F4F4F4 */
    --white-rgb: 255, 255, 255;             /* #FFFFFF */
    --deep-blue-rgb: 0, 87, 118;            /* #005776 */
    --deep-blue-tint-rgb: 64, 129, 153;     /* #408199 */
    --sky-blue-rgb: 45, 204, 211;           /* #2DCCD3 */
    --sky-blue-shade-rgb: 50, 166, 172;     /* #32A6AC */
    --sky-blue-tint-1-rgb: 234, 249, 250;   /* #EAF9FA */
    --sky-blue-tint-2-rgb: 217, 243, 244;   /* #D9F3F4 */
    --red-orange-rgb: 250, 70, 22;          /* #FA4616 */
    --dark-red-orange-rgb: 145, 61, 38;     /* #913D26 */
    --light-red-orange-rgb: 252, 221, 220;  /* #FCDDDC */
    --yellow-rgb: 255, 198, 0;              /* #FFC600 */
    --green-rgb: 71, 162, 63;               /* #47A23F */

    /* Uses */

    /* Input text color */
    --black-color: rgb(var(--black-rgb));

    /* Default background color, Font Color */
    --white-color: rgb(var(--white-rgb));

    /* dark grey, text default */
    --dark-gray-color: rgb(var(--charcoal-rgb));

    /* normal gray, border default, disabled text */
    --gray-color: rgb(var(--gray-rgb));

    /* light gray 1, disabled content */
    --light-gray-1-color: rgb(var(--light-gray-1-rgb));

    /* light gray 2, disabled content */
    --light-gray-2-color: rgb(var(--light-gray-2-rgb));

    /* default brand color, switches, radios, checkboxes, focus */
    --primary-color: rgb(var(--sky-blue-rgb));

    /* darked primary color */
    --primary-shade-color: rgb(var(--sky-blue-shade-rgb));

    /* faint primary highlight */
    --primary-tint-1-color: rgb(var(--sky-blue-tint-1-rgb));

    /* primary highlight */
    --primary-tint-2-color: rgb(var(--sky-blue-tint-2-rgb));

    /* secondary brand color, buttons, tabs, links */
    --secondary-color: rgb(var(--deep-blue-rgb));

    /* muted secondary color, clicked button */
    --secondary-tint-color: rgb(var(--deep-blue-tint-rgb));

    /* utility color, error, alert, attention grabbing, present/past-tense */
    --tertiary-1-color: rgb(var(--red-orange-rgb));

    /* darker tertiary 1, pressed alert button */
    --tertiary-1-shade-color: rgb(var(--dark-red-orange-rgb));

    /* lighter tertiary 1, field error background */
    --tertiary-1-light-color: rgb(var(--light-red-orange-rgb));

    /* utility color, warning, alert, future/present-tense */
    --tertiary-2-color: rgb(var(--yellow-rgb));

    /* utility color, success, notification */
    --tertiary-3-color: rgb(var(--green-rgb));

    /* Old Colors */
    --primary-brand-color: rgb(var(--sky-blue-rgb));
    --primary-brand-color-light: rgb(var(--sky-blue-tint-2-rgb));
    --primary-brand-color-dark: rgb(var(--deep-blue-rgb));
    --secondary-brand-color: rgb(var(--red-orange-rgb));
    --success-color: rgb(var(--green-rgb));
    --danger-color: rgb(var(--yellow-rgb));
    --danger-lite-color: rgba(var(--yellow-rgb), .5);
    --error-color: rgb(var(--red-orange-rgb));
    --error-lite-color: rgba(var(--red-orange-rgb), .5);
    --background-color: rgb(var(--white-rgb));
    --black-text-color: rgb(var(--black-rgb));

    --dark-grey-text-color: rgb(var(--charcoal-rgb));
    --medium-grey-text-color: #80868b;
    --light-grey-text-color: #b8b8b8;
    --dark-grey-background-color: rgb(var(--gray-rgb));
    --medium-grey-background-color: rgb(var(--light-gray-1-rgb));
    --light-grey-background-color: rgb(var(--light-gray-2-rgb));

    /* Fonts */
    --font-family: 'NotoSans', sans-serif;
    --monospace-font-family: 'NotoMono', monospace;

    --header1-font-size: 16px;
    --header1-font-weight: 400;
    --header1-line-height: 24px;

    --header2-font-size: 16px;
    --header2-font-weight: 400;
    --header1-line-height: 24px;

    --header2-selected-font-size: 16px;
    --header2-selected-font-weight: 600;

    --paragraph-font-size: 12px;
    --paragraph-font-weight: 400;
    --paragraph-line-height: 16px;

    /* this font size should likely change */
    --small-text-size: 10px;
    --small-text-weight: 400;

    --small-text-selected-size: 10px;
    --small-text-selected-weight: 600;

    --medium-icon-size: 18px;
    --small-icon-size: 14px;
    --xsmall-icon-size: 10px;

    /* Sizes and Spacing */
    --unity-button-height: 30px;
    --unity-button-border-radius: 30px;
    --unity-button-padding: 20px;

    --unity-text-input-height: 27px;

    /* Margins and Paddings */
    --margin-size-md: 12px;
    --padding-size-sm: 8px;
    --padding-size-md: 12px;
    --padding-size-lg: 16px;
    --padding-size-xl: 24px;
  }
`;
