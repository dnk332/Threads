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

export interface IAuthor {
  userName: string;
  name: string;
  email: string;
}

export interface IPostText {
  id: number;
  authorId: number;
  textContent: string;
  createdAt: string;
  updatedAt: string;
}

export type IPostType = {
  id: number;
  post: IPostText;
  author: IAuthor;
};
