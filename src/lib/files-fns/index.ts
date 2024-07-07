"use server"

export const arrayBufferToBase64 = async (buffer: ArrayBuffer): Promise<string> => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
};

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binaryString = Buffer.from(base64, 'base64').toString('binary');
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
};

export const base64ToBlob = async(base64: string, mimeType: string): Promise<Blob> => {
  const arrayBuffer = base64ToArrayBuffer(base64);
  const blob = new Blob([arrayBuffer], { type: mimeType });
  return blob
};