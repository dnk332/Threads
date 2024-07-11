import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  PanResponder,
  SafeAreaView,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@src/themes/responsive';
import {IPostType} from '@src/types/post';
import {AppText, PostText} from '@src/components';

type HomeScreenViewProps = {
  listPost: IPostType[];
  loadMore: () => void;
  onRefresh: () => void;
  loading: boolean;
};

const ItemSeparator = () => <View style={styles.separator} />;

const HomeScreenView: React.FC<HomeScreenViewProps> = ({
  listPost,
  loadMore,
  onRefresh,
  loading,
}) => {
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const refreshContainerStyles = useAnimatedStyle(() => ({
    height: pullDownPosition.value,
  }));

  const pullDownStyles = useAnimatedStyle(() => ({
    transform: [{translateY: pullDownPosition.value}],
  }));

  const onRefreshList = (done: () => void) => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setRefreshing(false);
      done();
    }, 1000);
  };

  const onPanRelease = () => {
    pullDownPosition.value = withTiming(isReadyToRefresh.value ? 75 : 0, {
      duration: 180,
    });
    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;
      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {duration: 180});
      };
      onRefreshList(onRefreshComplete);
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return scrollPosition.value <= 0 && gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
          return;
        }
        const maxDistance = 150;
        pullDownPosition.value = Math.max(
          Math.min(maxDistance, gestureState.dy),
          0,
        );
        isReadyToRefresh.value = pullDownPosition.value >= maxDistance / 2;
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );

  const _renderItem = useCallback(({item}: {item: IPostType}) => {
    return (
      <PostText
        userData={item.author}
        postData={item.post}
        interaction={item.interaction}
      />
    );
    // const isRepliesPost = item.replies.length > 0;
    // if (isRepliesPost) {
    //   return (
    //     <Fragment>
    //       <PostItem
    //         postData={item.rootPost.post}
    //         userData={item.rootPost.userData}
    //         haveReplies={true}
    //         isRootPost={true}
    //       />
    //       {item.replies.map((replies, index) => (
    //         <PostItem
    //           key={index}
    //           postData={replies.post}
    //           userData={replies.userData}
    //           haveReplies={index !== item.replies.length - 1}
    //           isReplies={true}
    //         />
    //       ))}
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
    if (listPost.length === 0) {
      return <AppText>Empty</AppText>;
    }

    return <View />;
  }, [listPost.length, loading]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        pointerEvents={refreshing ? 'none' : 'auto'}
        style={styles.container}>
        <Animated.View
          style={[styles.refreshContainer, refreshContainerStyles]}>
          {refreshing && (
            <Lottie
              source={require('@assets/lottie/refresh.json')}
              style={styles.lottieView}
              autoPlay
            />
          )}
        </Animated.View>
        <Animated.View
          style={[styles.contentContainer, pullDownStyles]}
          {...panResponderRef.current.panHandlers}>
          <Animated.FlatList
            onScroll={scrollHandler}
            data={listPost}
            keyExtractor={item => item.id.toString()}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            onEndReachedThreshold={0.3}
            nestedScrollEnabled
            onEndReached={loadMore}
            ListFooterComponent={
              <View style={styles.bottom}>{renderFooterList}</View>
            }
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenView;

const styles = AppStyleSheet.create({
  lottieView: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
  },
  separator: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  refreshContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {alignItems: 'center', marginVertical: 10},
});
