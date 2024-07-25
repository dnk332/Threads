// hooks/useFetchData.ts

import {useState} from 'react';
import {useActions} from '@hooks/useActions';
import {toggleLikePostAction} from '@appRedux/actions/likeAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';

interface useToggleLike {
  postId: number;
  currentLikeStatus: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useToggleLike = ({postId, currentLikeStatus}: useToggleLike) => {
  const actions = useActions({
    toggleLikePostAction,
  });

  const [likeStatus, setLikeStatus] = useState<boolean>(
    currentLikeStatus ?? false,
  );

  const handleLike = () => {
    let status: 'like' | 'unlike' = likeStatus ? 'unlike' : 'like';
    let callback: Callback = () => {};
    setLikeStatus(prevState => !prevState);
    actions.toggleLikePostAction(status, postId, callback);
  };

  return {likeStatus, handleLike};
};
