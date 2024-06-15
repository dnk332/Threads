import {SafeAreaView, View, PanResponder} from 'react-native';
import React, {Fragment, useCallback} from 'react';
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

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default function PullToRefresh() {
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  const refreshContainerStyles = useAnimatedStyle(() => {
    return {
      height: pullDownPosition.value,
    };
  });

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
  const panResponderRef = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (scrollPosition.value <= 0 && gestureState.dy > 0) {
          return true;
        }
        return false;
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

        if (
          pullDownPosition.value >= maxDistance / 2 &&
          isReadyToRefresh.value === false
        ) {
          isReadyToRefresh.value = true;
        }

        if (
          pullDownPosition.value < maxDistance / 2 &&
          isReadyToRefresh.value === true
        ) {
          isReadyToRefresh.value = false;
        }
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    }),
  );
  const pullDownStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: pullDownPosition.value,
        },
      ],
    };
  });

  const _renderItem = useCallback(({item}) => {
    let isRepliesPost = item.replies.length > 0;
    if (isRepliesPost) {
      return (
        <Fragment>
          <PostItem
            postData={item.rootPost.post}
            userData={item.rootPost.userData}
            haveReplies={true}
            isRootPost={true}
          />
          {item.replies.map((replies, index) => {
            let isLastReplies =
              item.replies[item.replies.length - 1].id === replies.id;
            return (
              <PostItem
                key={index}
                postData={replies.post}
                userData={replies.userData}
                haveReplies={!isLastReplies}
                isReplies={true}
              />
            );
          })}
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
    <>
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
    </>
  );
}

const styles = AppStyleSheet.create({
  lottieView: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
  },
  contentContainer: {flex: 1},
  separator: {borderBottomColor: colors.border, borderBottomWidth: 1},
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
  refreshIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 36,
    height: 36,
    marginTop: -18,
    marginLeft: -18,
    borderRadius: 18,
    objectFit: 'contain',
  },
});
