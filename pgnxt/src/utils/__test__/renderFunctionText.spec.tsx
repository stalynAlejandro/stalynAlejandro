import { screen } from '@testing-library/react';

import { renderComponent } from '../../testUtils/renderComponent';
import { renderFunctionText } from '../renderFunctionText';

describe('Util renderFunctionText', () => {
  const renderText = (txt: any) => {
    renderComponent(<div>{renderFunctionText(txt)}</div>);
  };

  it('renders a string correctly', () => {
    const test = 'test text';
    renderText(test);
    expect(screen.getByText(test)).toBeInTheDocument();
  });

  it('renders a number correctly', () => {
    const test = 243;
    renderText(test);
    expect(screen.getByText(test)).toBeInTheDocument();
  });

  it('renders a component function correctly', () => {
    const compFunc = () => (
      <span data-testid="test-render">
        <span>test text</span>
      </span>
    );

    renderText(compFunc);
    expect(screen.getByTestId('test-render')).toBeInTheDocument();
    expect(screen.getByText('test text')).toBeInTheDocument();
  });

  it('renders an object with component prop correctly', () => {
    const compFunc = () => (
      <span data-testid="test-render">
        <span>test text</span>
      </span>
    );
    const obj = { component: compFunc, propA: 'prop A' };

    renderText(obj);
    expect(screen.getByTestId('test-render')).toBeInTheDocument();
    expect(screen.getByText('test text')).toBeInTheDocument();
  });

  it('renders a valid React element correctly', () => {
    renderText(<span>Hello test</span>);
    expect(screen.getByText('Hello test')).toBeInTheDocument();
  });
});
