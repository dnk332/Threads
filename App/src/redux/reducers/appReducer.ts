import * as actions from '@appRedux/actions/types/appActionTypes';

export interface IDeviceInfo {
  deviceId: string;
  model: any;
  systemVersion: string;
  token: string;
  systemName: string;
}

export interface IAppState {
  domain: string;
  deviceInfo: IDeviceInfo;
}

const initialState: IAppState = {
  domain: null,
  deviceInfo: null,
};

export default function appReducer(
  state: IAppState = initialState,
  action: actions.AppAction,
): IAppState {
  const actionType = actions.AppActionType;

  switch (action.type) {
    case actionType.SET_DOMAIN:
      return {
        ...state,
        domain: action.payload.params.domain,
      };
    case actionType.SET_DEVICE_INFO:
      return {
        ...state,
        deviceInfo: {
          ...state.deviceInfo,
          ...action.payload.params.deviceInfo,
        },
      };
    case actionType.CLEAR_REDUCER:
      return initialState;
    default:
      return state;
  }
}
