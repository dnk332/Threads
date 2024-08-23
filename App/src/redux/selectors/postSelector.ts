import {createSelector} from 'reselect';
import {IGlobalState} from '@reducers';

const getPost = (state: IGlobalState) => state.post;

export const listAllPostSelector = createSelector(
  [getPost],
  post => post.listAllPost,
);
export const creatingPostStatusSelector = createSelector(
  [getPost],
  post => post.creatingPost,
);
