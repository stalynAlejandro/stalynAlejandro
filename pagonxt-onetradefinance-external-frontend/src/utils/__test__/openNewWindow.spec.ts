import { openNewWindow } from '../openNewWindow';

describe('Util openNewWindow', () => {
  const focusWindow = jest.fn();

  beforeEach(() => {
    focusWindow.mockReset();
    jest.spyOn(window, 'open').mockImplementation(
      () =>
        ({
          focus: focusWindow,
        } as any),
    );
  });

  it('opens a new window with the specified url and focuses it by default', () => {
    openNewWindow('my-url');
    expect(window.open).toHaveBeenCalledWith('my-url', '_blank');
    expect(focusWindow).toHaveBeenCalled();
  });

  it('does not focus the new window if focus prop is set to false', () => {
    openNewWindow('my-url', false);
    expect(window.open).toHaveBeenCalledWith('my-url', '_blank');
    expect(focusWindow).not.toHaveBeenCalled();
  });

  it('focuses on the new opened window if focus param is set to true', () => {
    openNewWindow('my-url', true);
    expect(focusWindow).toHaveBeenCalled();
  });
});
