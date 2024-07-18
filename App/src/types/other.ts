export interface IImageFile {
  uri: string;
  name: string;
  type: string;
}

export interface IImage {
  uri: string;
  type: string;
  name: string;
  width: number;
  height: number;
  size: number;
  sourceURL: string;
  data: string;
}
