import {IMedia} from '@src/types/other';

// export interface IPost {
//   textContent: string;
//   mediaContent: IMedia[];
//   time: string;
//   liked: number;
//   comment: number;
//   reported: number;
// }

export interface IAuthor {
  userName: string;
  name: string;
  email: string;
  authorAvatar: string;
}

export interface IPost {
  id: number;
  authorId: number;
  textContent: string;
  imageContent: IMedia[];
  createdAt: string;
  updatedAt: string;
}

export type IPostType = {
  id: number;
  post: IPost;
  author: IAuthor;
  interaction: IInteraction;
};

export type IInteraction = {
  countLikes: number;
  likeStatus: boolean;
};
