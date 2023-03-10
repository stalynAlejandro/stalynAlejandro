export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader?.result) {
        let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
        if (encoded.length % 4 > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      } else {
        reject(new Error('No reader.result available for this file.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
