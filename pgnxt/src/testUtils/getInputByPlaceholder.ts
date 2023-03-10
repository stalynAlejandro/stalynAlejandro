import { screen } from '@testing-library/react';

export const getInputByPlaceholder = (placeholder: string) =>
  screen
    .getByText(placeholder, { selector: '.form-field span' })
    ?.closest('label');
