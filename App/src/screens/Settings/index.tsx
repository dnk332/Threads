import React from 'react';
import SettingsScreenView from '@screens/Settings/view';
import {useDispatch} from 'react-redux';
import {authActions} from '@src/redux/actions';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(authActions.onLogoutAction());
  };

  const HandelOptionSetting = (type: string) => {
    switch (type) {
      case 'Logout':
        onLogout();
        break;
      default:
        return;
    }
  };

  return <SettingsScreenView HandelOptionSetting={HandelOptionSetting} />;
};

export default SettingsScreen;
