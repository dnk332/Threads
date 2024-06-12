import {actionTypes} from '@actions';

const initialState = {
  user: null,
};

const {USER, AUTH} = actionTypes;

export default (state = initialState, action) => {
  switch (action?.type) {
    case USER.UPDATE_INFO.SUCCESS:
      return {
        ...state,
        user: {...state.user, ...action.payload},
      };
    case AUTH.LOGOUT.SUCCESS:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
