export {};

declare global {
  interface URL {
    createObjectURL: (obj: Blob | MediaSource) => string;
  }
}
