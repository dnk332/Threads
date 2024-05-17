export interface Media {
  link: any;
  type: string;
}
export interface Post {
  textContent: string;
  mediaContent: Media[];
  time: string;
  liked: number;
  comment: number;
  reported: number;
}
