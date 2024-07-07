import * as actions from '@actionTypes/postActionTypes';
import {IPostType} from '@src/types/post';

export interface IPostState {
  listAllPost: IPostType[];
}

const initialState: IPostState = {
  listAllPost: [],
};

export default function postReducer(
  state: IPostState = initialState,
  action: actions.PostAction,
) {
  const actionType = actions.PostActionType;
  switch (action.type) {
    case actionType.SAVE_LIST_ALL_POST:
      if (action.payload.loadMore) {
        console.log('load more');
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

    default:
      return state;
  }
}
