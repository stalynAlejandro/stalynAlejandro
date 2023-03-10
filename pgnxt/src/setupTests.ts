// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.crypto = require('crypto');

// global t method to be reused
const t = (key: string, interpolation: any) => {
  // Avoid namespace keys (ns)
  const interpolationKeys =
    (interpolation && Object.keys(interpolation).filter((k) => k !== 'ns')) ||
    [];

  return `T_${key}${
    interpolationKeys.length
      ? `--${interpolationKeys
          .map((k: string) => `${k}:${interpolation[k]}`)
          .join('--')}`
      : ''
  }`;
};

jest.mock('i18next', () => ({
  ...jest.requireActual('i18next'),
  t,
}));

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  t,
  useTranslation: () => ({
    t,
  }),
}));

jest.mock('./hooks/useFormTranslation', () => {
  const original = jest.requireActual('./hooks/useFormTranslation');

  return {
    useFormTranslation: () => ({ ...original.useFormTranslation(), t }),
  };
});

jest.setTimeout(10000);
