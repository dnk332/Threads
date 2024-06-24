import {actionTypes} from '@actions';

const initialState = {
  userInfo: null,
};

const {USER} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action?.type) {
    case USER.SAVE_INFO:
      return {
        ...state,
        user: {...state.userInfo, ...action.payload},
      };
    default:
      return state;
  }
};
