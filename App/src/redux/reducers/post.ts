import * as actions from '@actionTypes/postActionTypes';
import {IPostText} from '@src/types/post';

export interface IPostState {
  listAllPost: IPostText[];
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
        return {
          ...state,
          listPlace: [...state.listAllPost, ...action.payload.params.posts],
        };
      } else {
        return {
          ...state,
          listPlace: action.payload.params.posts,
        };
      }

    default:
      return state;
  }
}
