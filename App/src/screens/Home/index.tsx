import React, {useCallback, useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {useIsFocused} from '@react-navigation/native';

import HomeScreenView from './view';
import {
  currentAccountSelector,
  listAllPostSelector,
} from '@src/redux/selectors';
import Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {getUserProfileAction} from '@appRedux/actions/userAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
import useSelectorShallow from '@src/hooks/useSelectorShallowEqual';
import {
  getListAllPostAction,
  saveListAllPostAction,
} from '@appRedux/actions/postAction';
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

  const [loading, setLoading] = useState<boolean>(false);

  const isLoading = useRef<boolean>(false);

  const getUserProfile = useCallback(() => {
    const callback: Callback = ({success, message}) => {
      if (!success) {
        Navigator.navigateTo(SCREEN_NAME.UPDATE_USER_INFO);
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
        isLoading.current = false;
        setLoading(false);
      };
      actions.getListAllPostAction(pageId, SIZE_PAGE, callback);
    },
    [actions],
  );

  const loadMore = () => {
    if (isLoading.current === true) {
      return;
    }
    const pageNumber = Math.round(listAllPost.length / SIZE_PAGE);
    if (pageNumber > 0 && listAllPost.length === pageNumber * SIZE_PAGE) {
      isLoading.current = true;
      setLoading(true);
      getListPost(pageNumber + 1);
    }
  };

  const onRefresh = useCallback(() => {
    if (isLoading.current === true) {
      return;
    }
    setLoading(true);
    isLoading.current = true;
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
      loading={loading}
    />
  );
};

export default HomeScreen;
