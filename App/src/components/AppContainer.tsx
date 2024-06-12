import React, {Fragment, useMemo} from 'react';
import {
  Pressable,
  StatusBar,
  StatusBarProps,
  View,
  ViewStyle,
} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

import layout from '@themes/layout';
import {colors} from '@themes/color';
import Animated from 'react-native-reanimated';
import {AppStyleSheet} from '@themes/responsive';
import useStatusBarHeight from '@hooks/getStatusBarHeight';
import SvgComponent from '@svg/index';
import {goBack} from '@navigators';
import {AppText} from '@components';

interface AppContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  disableTop?: boolean;
  disableBottom?: boolean;
  statusBarProps?: StatusBarProps;
  useFading?: boolean;
  containerStyle?: ViewStyle;
  safeAreaStyle?: ViewStyle;
  safeAreaColor?: string;
  haveBackButton?: boolean;
  backButton?: React.ReactNode;
  haveTitle?: boolean;
  title?: string;
}
const DefaultBackButton = () => (
  <Fragment>
    <SvgComponent name={'ARROW_LEFT'} />
    <AppText style={styles.buttonText} fontSize={16}>
      Back
    </AppText>
  </Fragment>
);

const AppContainer = ({
  children,
  disableTop = false,
  disableBottom = true,
  statusBarProps,
  safeAreaColor,
  safeAreaStyle,
  style,
  containerStyle,
  haveBackButton = false,
  backButton,
  haveTitle = false,
  title = 'Threads',
}: AppContainerProps) => {
  const statusbarHeight = useStatusBarHeight();

  const safeEdges = useMemo<ReadonlyArray<Edge>>(() => {
    if (!disableTop && !disableBottom) {
      return ['top', 'bottom', 'left', 'right'];
    } else if (!disableTop) {
      return ['top', 'left', 'right'];
    } else if (!disableBottom) {
      return ['bottom'];
    } else {
      return ['left', 'right'];
    }
  }, [disableTop, disableBottom]);
  return (
    <SafeAreaView
      edges={safeEdges}
      style={[
        layout.fill,
        safeAreaStyle,
        {
          backgroundColor:
            safeAreaColor ||
            containerStyle?.backgroundColor ||
            style?.backgroundColor,
        },
      ]}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: colors.primary,
          },
          containerStyle,
        ]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
          {...statusBarProps}
        />
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.primary,
              marginTop: statusbarHeight,
            },
            style,
          ]}>
          <View style={styles.header}>
            {haveBackButton && (
              <Pressable
                style={[layout.row, layout.alignItemsCenter, styles.button]}
                onPress={() => goBack()}>
                {backButton ?? <DefaultBackButton />}
              </Pressable>
            )}
            {haveTitle && (
              <AppText fontSize={20} fontWeight={700} style={styles.title}>
                {title}
              </AppText>
            )}
          </View>
          {children}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AppContainer;

const styles = AppStyleSheet.create({
  container: {
    ...AppStyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: -1,
  },
  buttonText: {
    marginLeft: 4,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
  },
  button: {
    alignSelf: 'flex-start',
    padding: 4,
    marginLeft: -4,
  },
});
