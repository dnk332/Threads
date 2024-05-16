import {StatusBar, StatusBarProps, View, ViewStyle} from 'react-native';
import React, {useMemo} from 'react';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {colors, layout} from '@themes/index';
import Animated from 'react-native-reanimated';
import {AppStyleSheet} from '@themes/responsive';
import useStatusBarHeight from '@hooks/getStatusBarHeight';

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
}

const AppContainer = ({
  children,
  disableTop = false,
  disableBottom = true,
  statusBarProps,
  safeAreaColor,
  safeAreaStyle,
  style,
  containerStyle,
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
            backgroundColor: colors.background,
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
              backgroundColor: colors.background,
              marginTop: statusbarHeight,
            },
            style,
          ]}>
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
});
