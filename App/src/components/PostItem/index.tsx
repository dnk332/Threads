import React, {memo} from 'react';

import PostItemView from './PostItem';
import {IAuthor, IInteraction, IPost} from '@src/types/post';

export interface PostItemProps {
  authorData: IAuthor;
  postData: IPost;
  interaction: IInteraction;
  haveReplies?: boolean;
  lastReplies?: boolean;
  isReplies?: boolean;
  isRootPost?: boolean;
}

const PostText = (props: PostItemProps) => {
  return <PostItemView {...props} />;
};

export default memo(PostText);
