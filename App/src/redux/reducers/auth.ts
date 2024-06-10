import {actionTypes} from '@action';

const initialState = {
  user: null,
};

const {USER} = actionTypes;

export default (state = initialState, action) => {
  switch (action?.type) {
    case USER.UPDATE_INFO.SUCCESS:
      return {
        ...state,
        user: {...state.user, ...action.user},
      };
    case USER.LOGOUT.SUCCESS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
