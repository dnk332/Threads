import {actionTypes} from '@actions';

const initialState = {
  token: null,
};

const {AUTH} = actionTypes;

export default (state = initialState, action) => {
  switch (action?.type) {
    case AUTH.LOGIN.SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case AUTH.LOGOUT.SUCCESS:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
