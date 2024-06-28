import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import HomeScreenView from './view';
import {currentAccountSelector} from '@src/redux/selectors';
import * as Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {AppDispatch} from '../../redux/store/index';
import {getUserProfileAction} from '@src/redux/actions/user';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  let currentAccount = useSelector(currentAccountSelector);

  const getUserInfo = useCallback(() => {
    if (currentAccount['user_id']) {
      const callback: Callback = res => {
        if (!res.success) {
          Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO, {
            currentAccount,
          });
        }
      };
      dispatch(getUserProfileAction(currentAccount.user_id, callback));
    }
  }, [currentAccount, dispatch]);

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      getUserInfo();
    }
  }, [currentAccount, getUserInfo]);

  return <HomeScreenView />;
};

export default HomeScreen;
