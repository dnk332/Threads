import {actionTypes} from '@actions';

const initialState = {
  domain: null,
  theme: null,
  font: null,
  force_dark: null,
  language: null,
  setting: null,
  device: null,
  onboard: null,
};
const {APP} = actionTypes;
export default (state = initialState, action: any) => {
  switch (action.type) {
    case APP.CHANGE_THEME.SUCCESS:
      return {
        ...state,
        theme: action?.theme,
      };

    case APP.CHANGE_FONT.SUCCESS:
      return {
        ...state,
        font: action?.font,
      };

    case APP.FORCE_APPEARANCE.SUCCESS:
      return {
        ...state,
        force_dark: action?.force_dark,
      };

    case APP.CHANGE_LANGUAGE.SUCCESS:
      return {
        ...state,
        language: action?.language,
      };

    case APP.SAVE_DOMAIN.SUCCESS:
      return {
        ...state,
        domain: action?.domain,
      };

    case APP.SAVE_DEVICE_INFO.SUCCESS:
      return {
        ...state,
        device: {
          ...state.device,
          ...action?.device,
        },
      };

    case APP.SAVE_SETTING.SUCCESS:
      return {
        ...state,
        setting: {
          ...state.setting,
          ...action?.setting,
        },
      };

    case APP.SAVE_ONBOARD.SUCCESS:
      return {
        ...state,
        onboard: action.onboard,
      };

    case APP.CHANGE_LISTING_STYLE.SUCCESS:
      return {
        ...state,
        listing: action.style,
      };
    default:
      return state;
  }
};
