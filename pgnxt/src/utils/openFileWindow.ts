import ApiUrls from '../constants/apiUrls';
import { FileProps } from '../types/FileProps';
import { fetchServer } from './fetchServer';
import { openNewWindow } from './openNewWindow';

export const openFileWindow = async (file?: FileProps, fileUrl?: string) => {
  const url = (file?.id && `${ApiUrls.documents}/${file.id}`) || fileUrl;

  if (url) {
    const response = (await fetchServer(url, { returnRaw: true })) as any; // Fetch file with headers
    const fileBlob = await response.blob();
    // Convert it to blob URL and open new window with it
    const objectUrl = window.URL.createObjectURL(fileBlob);
    openNewWindow(objectUrl);

    return true;
  }

  return false;
};
