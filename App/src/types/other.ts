export interface IImage {
  index: number;
  uri: string;
  type: string;
  name: string;
  width: number;
  height: number;
  size: number;
  sourceURL: string;
  data: string;
}

export interface IImageFile
  extends Pick<IImage, 'uri' | 'name' | 'type' | 'index'> {}
