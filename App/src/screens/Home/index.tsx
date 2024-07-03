import React, {useCallback, useEffect} from 'react';
import _ from 'lodash';
import {useDispatch} from 'react-redux';

import HomeScreenView from './view';
import {
  currentAccountSelector,
  listAllPostSelector,
} from '@src/redux/selectors';
import * as Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {getUserProfileAction} from '@src/redux/actions/user';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {getListAllPostAction} from '@src/redux/actions/post';
import {AppDispatch} from '@src/redux/store';

const SIZE_PAGE = 10;

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  let currentAccount = useSelectorShallow(currentAccountSelector);
  let listAllPost = useSelectorShallow(listAllPostSelector);
  console.log('listAllPost', listAllPost);
  const getUserProfile = useCallback(() => {
    const callback: Callback = ({success}) => {
      if (!success) {
        Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO, {
          currentAccount,
        });
      }
    };
    dispatch(getUserProfileAction(currentAccount.user_id, callback));
  }, [currentAccount, dispatch]);

  const getListPost = useCallback(
    (limit: number = 1) => {
      const callback: Callback = response => {
        console.log('getListPost response', response);
      };
      dispatch(getListAllPostAction(SIZE_PAGE, limit, callback));
    },
    [dispatch],
  );

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      getUserProfile();
    }
  }, [currentAccount, getUserProfile]);

  useEffect(() => {
    getListPost();
  }, [getListPost]);

  return <HomeScreenView />;
};

export default HomeScreen;
