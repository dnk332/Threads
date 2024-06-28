import React, {forwardRef} from 'react';
import {Pressable, View} from 'react-native';
import {useCurrentTabScrollY} from 'react-native-collapsible-tab-view';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import SvgComponent from '@svg/index';
import layout from '@themes/layout';
import layoutValue from '@themes/layoutValue';
import {colors} from '@themes/color';
import {AppStyleSheet} from '@themes/responsive';
import {Avatar, AppButton, AppText} from '@components';
import * as Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {IUser, IUserProfile} from '@src/types/user';

interface HeaderProps {
  currentUser: IUserProfile;
  currentAccount: IUser;
}

const Header = forwardRef<number | null, any>(
  (props: HeaderProps, headerRef) => {
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
          [headerRef['current'] / 5, headerRef['current'] / 4],
          [1, 0],
          Extrapolation.EXTEND,
        ),
      };
    });

    const infoStyleAnimated = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [headerRef['current'] / 4, headerRef['current'] / 2],
          [1, 0],
          Extrapolation.EXTEND,
        ),
      };
    });

    const buttonStyleAnimated = useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          scrollY.value,
          [headerRef['current'] / 2, headerRef['current'] / 1.2],
          [1, 0],
          Extrapolation.EXTEND,
        ),
      };
    });

    const openSetting = () => {
      Navigator.navigateTo(SCREEN_NAME.SETTINGS);
    };

    return (
      <View
        onLayout={({nativeEvent}) => {
          const {height} = nativeEvent.layout;
          headerRef['current'] = height;
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
            <Pressable style={styles.icon} onPress={openSetting}>
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
          ]}>
          <View style={styles.headerContentContainer}>
            <Animated.View style={contentStyleAnimated}>
              <AppText fontSize={24} fontWeight={700}>
                {props.currentAccount.username}
              </AppText>
              <View style={layoutValue(8).marginVertical}>
                <AppText>{props.currentUser.name}</AppText>
              </View>
            </Animated.View>
            <Animated.View style={infoStyleAnimated}>
              <AppText>{props.currentUser.bio}</AppText>
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
  },
);

export default Header;

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
  icon: {},
});
