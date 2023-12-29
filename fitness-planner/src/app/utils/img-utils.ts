import { base64RegExParser } from "./regex-utils";

export const b64toBlob = (
  b64Data: string,
  contentType = "",
  sliceSize = 512
) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export const blobToBase64 = (blob): Promise<string> =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.onloadend = () => {
      return resolve((reader.result as string).match(base64RegExParser)[0]);
    };
    reader.readAsDataURL(blob);
  });
