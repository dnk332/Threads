import React, {Fragment, useCallback, useRef, useState} from 'react';
import {SafeAreaView, View, PanResponder} from 'react-native';
import Lottie from 'lottie-react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {PostItem} from '@src/components';
import {dummyPost} from '@src/constants/dummyData';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@src/themes/responsive';
import {IPostText} from '@src/types/post';

type HomeScreenViewProps = {
  listPost: IPostText[];
};

const ItemSeparator = () => <View style={styles.separator} />;

const HomeScreenView: React.FC<HomeScreenViewProps> = ({listPost}) => {
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = (done: () => void) => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      done();
    }, 2000);
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
      onRefresh(onRefreshComplete);
    }
  };

  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return scrollPosition.value <= 0 && gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) return;
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
  // TODO: update post text item, need add user data of post's author
  const _renderItem = useCallback(({item}) => {
    const isRepliesPost = item.replies.length > 0;
    if (isRepliesPost) {
      return (
        <Fragment>
          <PostItem
            postData={item.rootPost.post}
            userData={item.rootPost.userData}
            haveReplies={true}
            isRootPost={true}
          />
          {item.replies.map((replies, index) => (
            <PostItem
              key={index}
              postData={replies.post}
              userData={replies.userData}
              haveReplies={index !== item.replies.length - 1}
              isReplies={true}
            />
          ))}
        </Fragment>
      );
    } else {
      return (
        <PostItem
          postData={item.rootPost.post}
          userData={item.rootPost.userData}
        />
      );
    }
  }, []);

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
            data={dummyPost}
            keyExtractor={item => item.id.toString()}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
            onEndReachedThreshold={16}
            nestedScrollEnabled
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
});
