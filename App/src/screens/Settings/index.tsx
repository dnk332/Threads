import React from 'react';
import SettingsScreenView from '@screens/Settings/view';

import {logoutAction} from '@src/redux/actions/auth';
import {useActions} from '@src/hooks/useActions';

const SettingsScreen = () => {
  const actions = useActions({
    logoutAction,
  });

  const onLogout = () => {
    actions.logoutAction();
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
