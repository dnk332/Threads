import {IAuthor, IMedia, IPost, IPostText, IPostType} from '@src/types/post';
import {transformObjectKeysToCamelCase} from '@src/utils/transformText';

export function postTextModel(post: any): IPostText & Record<string, any> {
  const transformed = transformObjectKeysToCamelCase(post);
  return transformed as IPostText & Record<string, any>;
}

export function mediaModel(media: any): IMedia & Record<string, any> {
  const transformed = transformObjectKeysToCamelCase(media);
  return transformed as IMedia & Record<string, any>;
}

export function postModel(post: any): IPost & Record<string, any> {
  const transformed = transformObjectKeysToCamelCase(post);
  transformed.mediaContent = post.media_content.map((media: any) =>
    mediaModel(media),
  );
  return transformed as IPost & Record<string, any>;
}

export function authorModel(author: any): IAuthor & Record<string, any> {
  const transformed = transformObjectKeysToCamelCase(author);
  return transformed as IAuthor & Record<string, any>;
}

export function postTypeModel(postType: any): IPostType & Record<string, any> {
  const transformed = transformObjectKeysToCamelCase(postType);
  transformed.post = postTextModel(postType.post);
  transformed.author = authorModel(postType.author);
  return transformed as IPostType & Record<string, any>;
}

export function postListModel(posts: any[]): IPostType[] {
  return posts.map(postValue => {
    const transformed = transformObjectKeysToCamelCase(postValue);
    transformed.post = postTextModel(postValue.post);
    transformed.author = authorModel(postValue.author);
    transformed.interaction = authorModel(postValue.interaction);
    return transformed as IPostType & Record<string, any>;
  });
}
