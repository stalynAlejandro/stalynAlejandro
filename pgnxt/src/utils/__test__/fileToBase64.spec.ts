import { mockFile } from '../../testUtils/mockFile';
import { fileToBase64 } from '../fileToBase64';

describe('Util fileToBase64', () => {
  const file = mockFile({ content: 'my content' });
  const base64Content = 'bXkgY29udGVudA==';

  it('returns file data encoded to base64', async () => {
    const res = await fileToBase64(file);
    expect(res).toEqual(base64Content);
  });

  it('adds base64 padding if content does not fit base64 formatting', async () => {
    Object.defineProperty(FileReader.prototype, 'result', {
      get: jest.fn(() => base64Content.replace('=', '')),
    });

    const res = await fileToBase64(file);
    expect(res).toEqual(base64Content);
  });

  it('rejects with an error if there is no readable data', async () => {
    Object.defineProperty(FileReader.prototype, 'result', {
      get: jest.fn(() => null),
    });

    await expect(
      fileToBase64(mockFile({ content: null as any })),
    ).rejects.toThrow('No reader.result available for this file.');
  });

  it('rejects with an error if any unexpected error happens', async () => {
    await expect(fileToBase64({ t: 'est' } as any)).rejects.toThrow();
  });
});
