import {actionTypes} from '@actions';

const initialState = {
  user: null,
};

const {USER} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action?.type) {
    case USER.UPDATE_INFO:
      return {
        ...state,
        user: {...state.user, ...action.payload},
      };
    default:
      return state;
  }
};
