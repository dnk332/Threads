import {actionTypes} from '@actions';

const initialState = {
  domain: null,
  theme: null,
  setting: null,
  device: null,
};

const {APP} = actionTypes;

export default (state = initialState, action: any) => {
  switch (action.type) {
    case APP.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action?.language,
      };

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

    case APP.SAVE_SETTING:
      return {
        ...state,
        setting: {
          ...state.setting,
          ...action?.setting,
        },
      };
    default:
      return state;
  }
};
