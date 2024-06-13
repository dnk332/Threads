import {actionTypes} from '@actions';

const initialState = {
  user: null,
};

const {USER, AUTH} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action?.type) {
    case USER.UPDATE_INFO:
      return {
        ...state,
        user: {...state.user, ...action.payload},
      };
    case AUTH.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
