import React, {useCallback, useEffect} from 'react';
import _ from 'lodash';

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
import {useActions} from '@src/hooks/useActions';
import {getListAllPostAction} from '@src/redux/actions/post';

const SIZE_PAGE = 10;

const HomeScreen: React.FC = () => {
  const actions = useActions({
    getUserProfileAction,
    getListAllPostAction,
  });

  let currentAccount = useSelectorShallow(currentAccountSelector);
  let listAllPost = useSelectorShallow(listAllPostSelector);

  const getUserProfile = useCallback(() => {
    if (currentAccount.user_id) {
      const callback: Callback = res => {
        if (!res.success) {
          Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO, {
            currentAccount,
          });
        }
      };
      actions.getUserProfileAction(currentAccount.user_id, callback);
    }
  }, [actions, currentAccount]);

  const getListPost = useCallback(
    (limit: number = 1) => {
      const callback: Callback = response => {
        console.log('getListPost response', response);
      };
      actions.getListAllPostAction(SIZE_PAGE, limit, callback);
    },
    [actions],
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
