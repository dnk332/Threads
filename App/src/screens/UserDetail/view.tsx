import React, {useCallback, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import {
  CollapsibleRef,
  TabBarProps,
  Tabs,
  useCurrentTabScrollY,
} from 'react-native-collapsible-tab-view';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import SvgComponent from '@svg/index';
import layout from '@themes/layout';
import layoutValue from '@themes/layoutValue';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {Avatar, AppButton, AppText, AppContainer} from '@components';

import ThreadsTab from '@screens/UserDetail/Components/ThreadsTab';
import RepliesTab from '@screens/UserDetail/Components/RepliesTab';

import {width as DeviceWidth} from '@utils/DeviceInfo';

const UserDetailScreenView = () => {
  const refMap = useRef<CollapsibleRef>();
  const headerHeight = useRef<number>(234);
  const focusedTabValue = useSharedValue<string>('Threads');
  const [currentTab, setCurrentTab] = useState<string>('Threads');

  const indicatorShareValueStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            focusedTabValue.value === 'Threads'
              ? withTiming(0)
              : withTiming(DeviceWidth / 2),
        },
      ],
    };
  }, []);

  const TabBar = useCallback(
    ({width, tabNames}: TabBarProps) => {
      return (
        <View
          style={[
            layout.row,
            layout.alignItemsCenter,
            styles.tabBarContainer,
            {width},
          ]}>
          <Animated.View style={[styles.indicator, indicatorShareValueStyle]} />
          <Pressable
            onPress={() => {
              refMap.current.jumpToTab('Threads');
              focusedTabValue.value = 'Threads';
              setCurrentTab('Threads');
            }}
            style={[styles.tabBarBtn]}>
            <AppText
              color={currentTab === 'Threads' ? colors.white : colors.border}
              fontWeight={currentTab === 'Threads' ? 600 : 400}
              align={'center'}>
              {tabNames[0]}
            </AppText>
          </Pressable>
          <Pressable
            onPress={() => {
              refMap.current.jumpToTab('Replies');
              focusedTabValue.value = 'Replies';
              setCurrentTab('Replies');
            }}
            style={[styles.tabBarBtn]}>
            <AppText
              color={currentTab === 'Replies' ? colors.white : colors.border}
              fontWeight={currentTab === 'Replies' ? 600 : 400}
              align={'center'}>
              {tabNames[1]}
            </AppText>
          </Pressable>
        </View>
      );
    },
    [focusedTabValue, indicatorShareValueStyle, currentTab],
  );

  const Header = () => {
    const scrollY = useCurrentTabScrollY();

    const headerStyleAnimated = useAnimatedStyle(() => {
      return {
        opacity: scrollY.value < 1 ? withTiming(1) : withTiming(0),
      };
    });

    const contentStyleAnimated = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [headerHeight.current / 5, headerHeight.current / 4],
          [1, 0],
          Extrapolation.EXTEND,
        ),
      };
    });

    const infoStyleAnimated = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [headerHeight.current / 4, headerHeight.current / 2],
          [1, 0],
          Extrapolation.EXTEND,
        ),
      };
    });

    const buttonStyleAnimated = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [headerHeight.current / 2, headerHeight.current / 1.2],
          [1, 0],
          Extrapolation.EXTEND,
        ),
      };
    });

    return (
      <View
        onLayout={({nativeEvent}) => {
          const {height} = nativeEvent.layout;
          headerHeight.current = height;
        }}
        style={[styles.headerContainer]}>
        <Animated.View
          style={[
            layout.row,
            layout.alignItemsCenter,
            layout.justifyContentBetween,
            headerStyleAnimated,
          ]}>
          <Pressable>
            <SvgComponent name="GLOBE" />
          </Pressable>
          <View
            style={[layout.row, layout.alignItemsCenter, styles.leftHeaderBtn]}>
            <Pressable>
              <SvgComponent name="INSTAGRAM" />
            </Pressable>
            <Pressable>
              <SvgComponent name="LINE_2" />
            </Pressable>
          </View>
        </Animated.View>
        <View
          style={[
            layout.row,
            layout.justifyContentCenter,
            layout.justifyContentBetween,
            styles.headerContent,
            ,
          ]}>
          <View style={styles.headerContentContainer}>
            <Animated.View style={contentStyleAnimated}>
              <AppText fontSize={24} fontWeight={700}>
                Brian
              </AppText>
              <View style={layoutValue(8).marginVertical}>
                <AppText>brian_dn</AppText>
              </View>
            </Animated.View>
            <Animated.View style={infoStyleAnimated}>
              <AppText>
                Passionate about art, photography, and all things creative 🎨✨
              </AppText>
              <AppText style={layoutValue(8).marginTop}>12 followers</AppText>
            </Animated.View>
          </View>
          <Animated.View style={contentStyleAnimated}>
            <Avatar
              source={{
                uri: 'https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg',
              }}
              imgStyle={styles.avatar}
            />
          </Animated.View>
        </View>
        <Animated.View
          style={[
            layout.row,
            layout.justifyContentBetween,
            layout.alignItemsCenter,
            layoutValue(16).gap,
            layoutValue(16).marginTop,
            buttonStyleAnimated,
          ]}>
          <AppButton
            textStyle={styles.profileTextBtn}
            buttonStyle={[layout.fill, styles.profileBtn]}
            text="Edit profile"
          />
          <AppButton
            textStyle={styles.profileTextBtn}
            buttonStyle={[layout.fill, styles.profileBtn]}
            text="Share profile"
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <AppContainer>
      <Tabs.Container
        onTabChange={tab => {
          focusedTabValue.value = tab.tabName;
          setCurrentTab(tab.tabName);
        }}
        snapThreshold={1}
        ref={refMap}
        renderHeader={() => <Header />}
        headerHeight={headerHeight.current}
        tabBarHeight={40}
        renderTabBar={TabBar}>
        <Tabs.Tab label={'Threads'} name="Threads">
          <ThreadsTab />
        </Tabs.Tab>
        <Tabs.Tab label={'Replies'} name="Replies">
          <RepliesTab />
        </Tabs.Tab>
      </Tabs.Container>
    </AppContainer>
  );
};

export default UserDetailScreenView;

const styles = AppStyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.primary,
  },
  leftHeaderBtn: {
    gap: 16,
  },
  headerContent: {
    marginTop: 24,
  },
  avatar: {
    width: 64,
    height: 64,
    marginLeft: 8,
  },
  headerContentContainer: {
    flexShrink: 1,
  },
  profileBtn: {
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  profileTextBtn: {
    fontWeight: '700',
  },
  tabButton: {
    backgroundColor: colors.primary,
  },
  tabBarContainer: {
    backgroundColor: colors.primary,
  },
  tabBarBtn: {
    width: '50%',
    paddingVertical: 16,
  },
  indicator: {
    position: 'absolute',
    height: 1,
    left: 0,
    backgroundColor: colors.white,
    width: DeviceWidth / 2,
    bottom: -1,
  },
});
