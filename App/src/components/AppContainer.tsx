import {
  Pressable,
  StatusBar,
  StatusBarProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {Fragment, useMemo} from 'react';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {colors, layout} from '@themes/index';
import Animated from 'react-native-reanimated';
import {AppStyleSheet} from '@themes/responsive';
import useStatusBarHeight from '@hooks/getStatusBarHeight';
import {SVGName} from '@assets/svg';
import {goBack} from '@navigation/NavigationService';
import AppText from './AppText';

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
    {/* <SVGName title={'ARROW_LEFT'} /> */}
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
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  button: {
    alignSelf: 'flex-start',
    padding: 4,
    marginLeft: -4,
  },
});
