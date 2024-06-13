import {actionTypes} from '@actions';

const initialState = {
  token: null,
};

const {AUTH} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action?.type) {
    case AUTH.SAVE_TOKEN:
      return {
        ...state,
        token: action?.token,
      };
    case AUTH.LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
