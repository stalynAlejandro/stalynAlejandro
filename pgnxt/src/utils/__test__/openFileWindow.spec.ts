import fetchMockJest from 'fetch-mock-jest';

import ApiUrls from '../../constants/apiUrls';
import { openFileWindow } from '../openFileWindow';
import * as openNewWindowModule from '../openNewWindow';

describe('Util openFileWindow', () => {
  const blobUrl = 'http://test-blob-url';

  beforeEach(() => {
    fetchMockJest.mockClear();
    fetchMockJest.mock(new RegExp(ApiUrls.documents), 'my data', {
      delay: 0,
      overwriteRoutes: true,
    });
    global.URL.createObjectURL = jest.fn().mockReturnValue(blobUrl);
    jest
      .spyOn(openNewWindowModule, 'openNewWindow')
      .mockImplementation(() => jest.fn());
  });

  it('opens the file in a new window if it has an ID and returns true', async () => {
    const doc = { id: 'my-id', name: 'file' };
    const result = await openFileWindow(doc as any);

    expect(fetchMockJest.lastCall(new RegExp(ApiUrls.documents))).toBeTruthy();
    expect(
      fetchMockJest
        .lastCall(new RegExp(ApiUrls.documents))?.[0]
        .includes(doc.id),
    ).toBeTruthy();

    expect(openNewWindowModule.openNewWindow).toHaveBeenCalledWith(blobUrl);
    expect(result).toBeTruthy();
  });

  it('does not open any window if file does not have an id prop', async () => {
    await openFileWindow({ abc: 2039, name: 'file' } as any);
    expect(openNewWindowModule.openNewWindow).not.toHaveBeenCalled();
  });

  it('does not open any window if file is undefined', async () => {
    await openFileWindow(undefined as any);
    expect(openNewWindowModule.openNewWindow).not.toHaveBeenCalled();
  });

  it('does not open any window if no param is provided', async () => {
    await openFileWindow();
    expect(openNewWindowModule.openNewWindow).not.toHaveBeenCalled();
  });

  it('opens the file in a new window if a URL is provided in stead of an ID', async () => {
    const url = 'http://test-url';
    fetchMockJest.mock(url, 'my data', {
      delay: 0,
    });
    await openFileWindow(undefined, url);
    expect(openNewWindowModule.openNewWindow).toHaveBeenCalledWith(blobUrl);
  });
});
