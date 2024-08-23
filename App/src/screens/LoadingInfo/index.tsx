import React, {useCallback, useEffect} from 'react';
import _ from 'lodash';

import LoadingInfoView from '@screens/LoadingInfo/view';
import {currentAccountSelector} from '@src/redux/selectors';
import Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {getUserProfileAction} from '@appRedux/actions/userAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {useActions} from '@src/hooks/useActions';

const LoadingInfo: React.FC = () => {
  const actions = useActions({
    getUserProfileAction,
  });
  let currentAccount = useSelectorShallow(currentAccountSelector);

  const getUserProfile = useCallback(() => {
    const callback: Callback = ({success}) => {
      if (!success) {
        Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO);
      } else {
        Navigator.navigateAndSimpleReset(SCREEN_NAME.ROOT);
      }
    };
    actions.getUserProfileAction(currentAccount.user_id, callback);
  }, [actions, currentAccount]);

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      getUserProfile();
    } else {
      Navigator.navigateAndSimpleReset(SCREEN_NAME.LOGIN);
    }
  }, [currentAccount, getUserProfile]);

  return <LoadingInfoView />;
};

export default LoadingInfo;
