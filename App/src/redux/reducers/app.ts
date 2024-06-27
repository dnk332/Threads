import {actionTypes} from '@actions';

export interface IAppState {
  domain: string;
  device: object;
}

const initialState = {
  domain: null,
  device: null,
};

const {APP} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action.type) {
    case APP.SAVE_DOMAIN:
      return {
        ...state,
        domain: action?.domain,
      };

    case APP.SAVE_DEVICE_INFO:
      return {
        ...state,
        device: {
          ...state.device,
          ...action?.device,
        },
      };
    default:
      return state;
  }
};
