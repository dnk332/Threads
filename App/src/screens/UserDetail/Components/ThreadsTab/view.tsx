import React, {memo, useCallback, useMemo} from 'react';
import {ActivityIndicator, RefreshControl, View} from 'react-native';
import {Tabs} from 'react-native-collapsible-tab-view';

import {AppText, PostItem} from '@components';
import layout from '@themes/layout';
import {IPostType} from '@src/types/post';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';

interface ThreadsTabViewProps {
  loading: boolean;
  refreshing: boolean;
  data: IPostType[];
  loadMore: () => void;
  onRefresh: () => void;
}

const ItemSeparator = () => <View style={styles.separator} />;

const ThreadsTabView = ({
  loading,
  refreshing,
  data,
  loadMore,
  onRefresh,
}: ThreadsTabViewProps) => {
  const _renderItem = useCallback(({item}: {item: IPostType}) => {
    return (
      <PostItem
        postData={item.post}
        authorData={item.author}
        interaction={item.interaction}
        haveReplies={false}
        isRootPost={true}
      />
    );
    // let isRepliesPost = item.replies.length > 0;
    // if (isRepliesPost) {
    //   return (
    //     <Fragment>
    //       <PostItem
    //         postData={item.rootPost.post}
    //         userData={item.rootPost.userData}
    //         haveReplies={true}
    //         isRootPost={true}
    //       />
    //       {item.replies.map((replies, index) => {
    //         let isLastReplies =
    //           item.replies[item.replies.length - 1].id === replies.id;
    //         return (
    //           <PostItem
    //             key={index}
    //             postData={replies.post}
    //             userData={replies.userData}
    //             haveReplies={!isLastReplies}
    //             isReplies={true}
    //           />
    //         );
    //       })}
    //     </Fragment>
    //   );
    // } else {
    //   return (
    //     <PostItem
    //       postData={item.rootPost.post}
    //       userData={item.rootPost.userData}
    //     />
    //   );
    // }
  }, []);

  const renderFooterList = useMemo(() => {
    if (loading) {
      return <ActivityIndicator color={colors.white} />;
    }
    if (data.length === 0) {
      return <AppText>Empty</AppText>;
    }

    return <View />;
  }, [data.length, loading]);

  return (
    <View style={[layout.fill]}>
      <Tabs.FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={
          <View style={styles.bottom}>{renderFooterList}</View>
        }
        onEndReached={loadMore}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.white}
            size={10}
          />
        }
      />
    </View>
  );
};

export default memo(ThreadsTabView);

const styles = AppStyleSheet.create({
  separator: {borderBottomColor: colors.border, borderBottomWidth: 1},
  bottom: {alignItems: 'center', marginVertical: 10},
});
