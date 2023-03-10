import { mockFile } from '../../testUtils/mockFile';
import { mapFileItem } from '../mapFileItem';

describe('Helper mapFileItem', () => {
  const fileProps = { content: 'my content text', name: 'testFile.pdf' };
  const serializedContent = 'bXkgY29udGVudCB0ZXh0';
  const file = mockFile(fileProps);

  it('returns the file object with its properties as provided', async () => {
    const result = await mapFileItem(file);
    expect(result.name).toEqual(file.name);
  });

  it('returns the file object with the data serialized', async () => {
    const result = await mapFileItem(file);
    expect(result.data).toEqual(serializedContent);
  });

  it('skips data serialization if an ID is provided in object by default', async () => {
    const clonedFile = mockFile(fileProps);
    clonedFile.id = 'my-id';

    const result = await mapFileItem(clonedFile);
    expect(result.name).toEqual(clonedFile.name);
    expect(result.data).toBeUndefined();
  });

  it('does not skip data serialization if an ID is provided and skipDataIfId prop is false', async () => {
    const clonedFile = mockFile(fileProps);
    clonedFile.id = 'my-id';

    const result = await mapFileItem(clonedFile, false);
    expect(result.name).toEqual(clonedFile.name);
    expect(result.data).toEqual(serializedContent);
  });
});
