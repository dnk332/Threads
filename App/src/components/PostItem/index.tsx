import React, {memo, useState} from 'react';

import PostItemView from './PostItem';
import {IAuthor, IInteraction, IPost} from '@src/types/post';
import {useActions} from '@hooks/useActions';
import {toggleLikePostAction} from '@appRedux/actions/likeAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

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
  const {interaction, postData} = props;

  const actions = useActions({
    toggleLikePostAction,
  });

  const [likeStatus, setLikeStatus] = useState<boolean>(
    interaction?.likeStatus ?? false,
  );

  const handleLike = () => {
    let postId: number = postData.id;
    let status: 'like' | 'unlike' = likeStatus ? 'unlike' : 'like';
    let callback: Callback = () => {};
    setLikeStatus(prevState => !prevState);
    actions.toggleLikePostAction(status, postId, callback);
  };

  return (
    <PostItemView likeStatus={likeStatus} handleLike={handleLike} {...props} />
  );
};

export default memo(PostText);
