import React from 'react';
import SettingsScreenView from '@screens/Settings/view';
import {useDispatch} from 'react-redux';
import {logoutAction} from '@src/redux/actions/auth';
import {AppDispatch} from '@src/redux/store';

const SettingsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logoutAction());
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
