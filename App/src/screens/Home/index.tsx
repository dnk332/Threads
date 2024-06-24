import React, {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import _ from 'lodash';

import HomeScreenView from './view';
import {userActions} from '@src/redux/actions';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {currentAccountSelector} from '@src/redux/selectors';
import * as Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';

const HomeScreen = () => {
  const dispatch = useDispatch();
  let currentAccount = useSelectorShallow(currentAccountSelector);

  const getUserInfo = useCallback(() => {
    const callback = res => {
      if (!res.success) {
        Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO, {
          currentAccount,
        });
      }
    };
    dispatch(userActions.getUserInfoAction(currentAccount.user_id, callback));
  }, [currentAccount, dispatch]);

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      getUserInfo();
    }
  }, [currentAccount, getUserInfo]);

  return <HomeScreenView />;
};

export default HomeScreen;
