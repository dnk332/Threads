import React, {useCallback, useEffect} from 'react';
import _ from 'lodash';
import {useIsFocused} from '@react-navigation/native';

import HomeScreenView from './view';
import {
  currentAccountSelector,
  listAllPostSelector,
} from '@src/redux/selectors';
import Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {getUserProfileAction} from '@src/redux/actions/user';
import {Callback} from '@src/redux/actionTypes/actionTypeBase';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {
  getListAllPostAction,
  saveListAllPostAction,
} from '@src/redux/actions/post';
import {IPostType} from '@src/types/post';
import {postListModel} from '@src/models/post';
import {useActions} from '@src/hooks/useActions';

const SIZE_PAGE = 10;

const HomeScreen: React.FC = () => {
  const actions = useActions({
    getUserProfileAction,
    saveListAllPostAction,
    getListAllPostAction,
  });
  let currentAccount = useSelectorShallow(currentAccountSelector);
  let listAllPost = useSelectorShallow(listAllPostSelector);

  const getUserProfile = useCallback(() => {
    const callback: Callback = ({success}) => {
      if (!success) {
        Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO, {
          currentAccount,
        });
      }
    };
    actions.getUserProfileAction(currentAccount.user_id, callback);
  }, [actions, currentAccount]);

  const getListPost = useCallback(
    (pageId: number = 1) => {
      const callback: Callback = ({
        data,
        success,
      }: {
        data: IPostType[];
        success: boolean;
      }) => {
        if (success) {
          const convertData = postListModel(data);
          actions.saveListAllPostAction(convertData, pageId > 1);
        }
      };
      actions.getListAllPostAction(pageId, SIZE_PAGE, callback);
    },
    [actions],
  );

  const loadMore = () => {
    const pageNumber = Math.round(listAllPost.length / SIZE_PAGE);
    if (listAllPost.length === pageNumber * SIZE_PAGE) {
      getListPost(pageNumber + 1);
    }
  };
  const onRefresh = useCallback(() => {
    getListPost(1);
  }, [getListPost]);

  useEffect(() => {
    if (!_.isEmpty(currentAccount)) {
      getUserProfile();
    }
  }, [currentAccount, getUserProfile]);

  useEffect(() => {
    if (useIsFocused) {
      onRefresh();
    }
  }, [onRefresh]);

  return (
    <HomeScreenView
      listPost={listAllPost}
      loadMore={loadMore}
      onRefresh={onRefresh}
    />
  );
};

export default HomeScreen;
