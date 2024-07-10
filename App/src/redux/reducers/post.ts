import * as postActions from '@actionTypes/postActionTypes';
import * as likeActions from '@actionTypes/likeActionTypes';
import {IPostType} from '@src/types/post';

export interface IPostState {
  listAllPost: IPostType[];
}

const initialState: IPostState = {
  listAllPost: [],
};

export default function postReducer(
  state: IPostState = initialState,
  action: postActions.PostAction | likeActions.LikeAction,
) {
  switch (action.type) {
    case postActions.PostActionType.SAVE_LIST_ALL_POST:
      if (action.payload.loadMore) {
        return {
          ...state,
          listAllPost: [...state.listAllPost, ...action.payload.params.posts],
        };
      } else {
        return {
          ...state,
          listAllPost: action.payload.params.posts,
        };
      }
    case likeActions.LikeActionType.TOGGLE_LIKE:
      const updatedListAllPost = state.listAllPost.map(item => {
        if (item.id === action.payload.params.postId) {
          const newLikeStatus = !item.interaction.likeStatus;
          const newCountLikes =
            action.payload.params.action === 'like'
              ? item.interaction.countLikes + 1
              : item.interaction.countLikes - 1;

          return {
            ...item,
            interaction: {
              ...item.interaction,
              likeStatus: newLikeStatus,
              countLikes: newCountLikes,
            },
          };
        }
        return item;
      });
      return {...state, listAllPost: updatedListAllPost};
    default:
      return state;
  }
}
