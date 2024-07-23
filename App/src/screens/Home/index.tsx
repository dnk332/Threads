import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import HomeScreenView from './view';
import {listAllPostSelector} from '@src/redux/selectors';
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

  let listAllPost = useSelectorShallow(listAllPostSelector);

  const [loading, setLoading] = useState<boolean>(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);

  const isLoading = useRef<boolean>(false);

  const getListPost = useCallback(
    (pageId: number = 1) => {
      const callback: Callback = ({
        data,
        success,
      }: {
        data: IPostType[];
        success: boolean;
      }) => {
        if (success && data.length > 0) {
          const convertData = postListModel(data);
          actions.saveListAllPostAction(convertData, pageId > 1);
        }
        isLoading.current = false;
        setLoading(false);
        if (data.length < SIZE_PAGE) {
          setIsEndOfList(true);
        }
      };
      actions.getListAllPostAction(pageId, SIZE_PAGE, callback);
    },
    [actions],
  );

  const loadMore = () => {
    if (isLoading.current === true) {
      return;
    }
    if (isEndOfList) {
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
    setIsEndOfList(false);
    isLoading.current = true;
    getListPost(1);
  }, []);

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
