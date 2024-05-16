import {
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
  ViewComponent,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '@themes/index';
import Animated from 'react-native-reanimated';

interface AppContainerProps extends ViewComponent {
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
        styles.container,
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
          barStyle="dark-content"
          {...statusBarProps}
        />
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
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

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // zIndex: 10,
    flex: 1,
  },
});
