import React, {useCallback, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import {
  CollapsibleRef,
  TabBarProps,
  Tabs,
} from 'react-native-collapsible-tab-view';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import layout from '@themes/layout';

import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {AppContainer, AppText} from '@components';

import ThreadsTab from '@screens/UserDetail/Components/ThreadsTab';
import RepliesTab from '@screens/UserDetail/Components/RepliesTab';

import {width as DeviceWidth} from '@utils/DeviceInfo';
import Header from './Components/Header';
import {IUser, IUserProfile} from '@src/types/user';

interface UserDetailScreenViewProps {
  currentUser: IUserProfile;
  currentAccount: IUser;
}

const UserDetailScreenView = ({
  currentUser,
  currentAccount,
}: UserDetailScreenViewProps) => {
  const refMap = useRef<CollapsibleRef>();
  const headerRef = useRef<number>(234);

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

  return (
    <AppContainer>
      <Tabs.Container
        onTabChange={tab => {
          focusedTabValue.value = tab.tabName;
          setCurrentTab(tab.tabName);
        }}
        snapThreshold={1}
        ref={refMap}
        renderHeader={() => (
          <Header
            ref={headerRef}
            currentUser={currentUser}
            currentAccount={currentAccount}
          />
        )}
        headerHeight={headerRef.current}
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
