import React, {memo, useState} from 'react';

import PostTextView from './PostText';
import {IAuthor, IInteraction, IPostText} from '@src/types/post';
import {useActions} from '@hooks/useActions';
import {toggleLikePostAction} from '@appRedux/actions/likeAction';
import {Callback} from '@actionTypes/actionTypeBase';

export interface PostTextProps {
  userData: IAuthor;
  postData: IPostText;
  interaction: IInteraction;
}

const PostText = (props: PostTextProps) => {
  const {interaction, postData} = props;

  const actions = useActions({
    toggleLikePostAction,
  });

  const [likeStatus, setLikeStatus] = useState<boolean>(interaction.likeStatus);

  const handleLike = () => {
    let postId: number = postData.id;
    let status: 'like' | 'unlike' = likeStatus ? 'unlike' : 'like';
    let callback: Callback = () => {};
    setLikeStatus(prevState => !prevState);
    actions.toggleLikePostAction(status, postId, callback);
  };

  return (
    <PostTextView likeStatus={likeStatus} handleLike={handleLike} {...props} />
  );
};

export default memo(PostText);
