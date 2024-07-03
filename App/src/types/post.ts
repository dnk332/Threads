export interface IMedia {
  id: number;
  link: any;
  type: string;
}
export interface IPost {
  textContent: string;
  mediaContent: IMedia[];
  time: string;
  liked: number;
  comment: number;
  reported: number;
}

export interface IPostText {
  authorId: number;
  textContent: string;
  createAt: string;
  upDateAt: string;
}
