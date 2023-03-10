import { screen } from '@testing-library/react';

interface ControlMethods {
  getByDisplayValue: (value: string) => HTMLElement;
  getByPlaceholderText: (
    placeholder: string,
    isOptional?: boolean,
  ) => HTMLElement;
  getDisplayValue: (labelElement: HTMLElement) => string | boolean;
  getInteractiveElement: (labelElement: HTMLElement) => HTMLElement;
}

export const radioButton: Omit<
  ControlMethods,
  'getByPlaceholderText' | 'getByDisplayValue'
> & {
  getByLabel: (labelText: string) => HTMLElement;
} = {
  getByLabel: (placeholder) =>
    screen
      .queryByText(placeholder, {
        selector: '.radioButton__label',
      })
      ?.closest('label')!,
  getDisplayValue: (labelElement) =>
    (labelElement.querySelector('input[type="radio"]') as HTMLInputElement)
      .checked,
  getInteractiveElement: (labelElement) => labelElement,
};

export const checkbox: Omit<
  ControlMethods,
  'getByPlaceholderText' | 'getByDisplayValue'
> & {
  getByLabel: (labelText: string) => HTMLElement;
} = {
  getByLabel: (placeholder) =>
    screen
      .queryByText(placeholder, {
        selector: '.checkbox__label',
      })
      ?.closest('label')!,
  getDisplayValue: (labelElement) =>
    (labelElement.querySelector('input[type="checkbox"]') as HTMLInputElement)
      .checked,
  getInteractiveElement: (labelElement) => labelElement,
};

export const select: ControlMethods = {
  getByDisplayValue: (value) =>
    screen
      .queryByText(value, { selector: 'label .option__label *' })
      ?.closest('label')!,
  getByPlaceholderText: (placeholder, isOptional = false) =>
    screen
      .queryByText(`${placeholder}${isOptional ? ' T_fieldOptional' : ''}`, {
        selector: '.select-placeholder',
      })
      ?.closest('label')!,
  getDisplayValue: (labelElement) =>
    labelElement.querySelector('.option__label')?.textContent ||
    labelElement.querySelector('.option__content')?.textContent ||
    '',
  getInteractiveElement: (labelElement) =>
    labelElement.querySelector('.formSelect__control')!,
};

export const input: ControlMethods = {
  getByDisplayValue: (value) =>
    screen.queryByDisplayValue(value)?.closest('label')!,
  getByPlaceholderText: (placeholder, isOptional = false) =>
    screen
      .queryByText(`${placeholder}${isOptional ? ' T_fieldOptional' : ''}`, {
        selector: '.input-placeholder',
      })
      ?.closest('label')!,
  getDisplayValue: (labelElement) =>
    labelElement.querySelector('input')?.value || '',
  getInteractiveElement: (labelElement) => labelElement.querySelector('input')!,
};

export const inputSelect = {
  getByPlaceholderText(placeholder: string, isOptional: boolean = false) {
    return this.input
      .getByPlaceholderText(placeholder, isOptional)
      .closest('.form-field-parent');
  },
  input: {
    ...input,
  },
  select: {
    ...select,
    getByPlaceholderText: (placeholder, isOptional = false) =>
      screen
        .getByText(`${placeholder}${isOptional ? ' T_fieldOptional' : ''}`, {
          selector: '.input-placeholder',
        })
        .closest('label')!
        .parentElement!.querySelector('label + label')!,
  } as ControlMethods,
};

export const textarea: ControlMethods = {
  getByDisplayValue: (value) =>
    screen.getByDisplayValue(value).closest('.form-field')!,
  getByPlaceholderText: (placeholder, isOptional = false) =>
    screen
      .getByText(`${placeholder}${isOptional ? ' T_fieldOptional' : ''}`, {
        selector: '.textarea-placeholder',
      })
      .closest('.form-field label')!,
  getDisplayValue: (labelElement) =>
    labelElement.querySelector('textarea')?.value || '',
  getInteractiveElement: (labelElement) =>
    labelElement.querySelector('textarea')!,
};
