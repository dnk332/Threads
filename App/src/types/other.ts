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

export interface IMedia {
  id: number;
  link: string;
  type: string;
  orderColumn: number;
  createdAt: string;
  referenceObject: string;
  referenceObjectId: number;
}
