import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import ThreadTabView from './view';
import useSelectorShallow from '@hooks/useSelectorShallowEqual';
import {listAllPostSelector} from '@selectors';
import {useActions} from '@hooks/useActions';
import {
  getListAllPostAction,
  saveListAllPostAction,
} from '@appRedux/actions/postAction';
import {Callback} from '@appRedux/actions/types/actionTypeBase';
import {IPostType} from '@src/types/post';
import {postListModel} from '@src/models/post';
import {useIsFocused} from '@react-navigation/native';

const SIZE_PAGE = 10;

const ThreadsTab = () => {
  let listAllPost = useSelectorShallow(listAllPostSelector);

  const [loading, setLoading] = useState<boolean>(false);
  const [isEndOfList, setIsEndOfList] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const isLoading = useRef<boolean>(false);

  const actions = useActions({
    saveListAllPostAction,
    getListAllPostAction,
  });

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
        setRefreshing(false);
        if (data.length < SIZE_PAGE) {
          setIsEndOfList(true);
        }
      };
      actions.getListAllPostAction(pageId, SIZE_PAGE, callback);
    },
    [actions],
  );

  const loadMoreListThreads = () => {
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

  const onRefreshListThreads = useCallback(() => {
    if (isLoading.current === true) {
      return;
    }
    setRefreshing(true);
    setLoading(true);
    setIsEndOfList(false);
    isLoading.current = true;
    getListPost(1);
  }, []);

  useEffect(() => {
    if (useIsFocused) {
      onRefreshListThreads();
    }
  }, [onRefreshListThreads]);

  return (
    <ThreadTabView
      loading={loading}
      refreshing={refreshing}
      data={listAllPost}
      loadMore={loadMoreListThreads}
      onRefresh={onRefreshListThreads}
    />
  );
};

export default ThreadsTab;

const styles = StyleSheet.create({
  container: {},
});
