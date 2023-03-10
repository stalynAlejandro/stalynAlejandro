import styled, { css } from 'styled-components';

import { ThemeProps } from '../../../resources/theme';
import { InlineSelect } from '../InlineSelect';

export const StCalendarContainer = styled.div(() => css``);

export const StDatePickerContainer = styled.div(
  ({
    theme: {
      colors: { lightgray, lightsky, mediumgray, mediumsky, santander },
    },
  }: {
    theme: ThemeProps;
  }) => css`
    min-width: 250px;
    position: relative;

    .react-datepicker-popper {
      z-index: 10;
      right: 0 !important;
      left: auto !important;
    }

    .react-datepicker {
      border-radius: 0 0 4px 4px;
      border-color: ${lightgray};
    }

    .react-datepicker__day {
      border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      line-height: auto;
      height: auto;
      aspect-ratio: 1;

      &:hover {
        background-color: ${mediumsky};
      }

      &-name {
        color: ${mediumgray};
        text-transform: capitalize;
      }

      &--outside-month {
        visibility: hidden;
      }

      &--weekend {
        color: ${lightgray};
      }

      &--today {
        background-color: white;
        color: inherit;
        border: 1px solid ${mediumsky};
        font-weight: normal;
      }

      &--selected,
      &--keyboard-selected {
        color: inherit;
        background-color: ${lightsky};
      }
    }

    .react-datepicker__close-icon {
      background-image: url('/images/icon-clear.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;

      width: 16px;
      right: 50px;
      top: 2px;
      z-index: 2;

      &::after {
        display: none;
      }
    }

    .react-datepicker__today-button {
      background: white;
      border: none;
      font-weight: normal;
      padding: 0px 0 10px 0;
      color: ${santander};
    }

    .react-datepicker__header {
      background-color: transparent;
      border: none;
    }

    .datepicker-custom-header {
      width: 14.4rem;
      margin: 0 auto;
      justify-content: space-between;
    }

    .react-datepicker-popper[data-placement^='bottom'] {
      padding-top: 0;
    }

    .react-datepicker__month-container,
    ${StCalendarContainer}, .react-datepicker-popper {
      width: 100%;
      max-width: 280px;
    }

    .header-month-year-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 10px;

      .header-month-container {
        justify-content: space-between;
        width: 60%;
        display: flex;
        align-items: center;

        img {
          cursor: pointer;
        }
      }
    }
  `,
);

export const StYearSelector = styled(InlineSelect)(
  () => css`
    max-width: 30%;
  `,
);
