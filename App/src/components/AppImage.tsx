import React, {Fragment, memo} from 'react';
import {
  ImageRequireSource,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import {Blurhash} from 'react-native-blurhash';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {AppStyleSheet} from '@themes/responsive';

interface AppImageProps {
  source: Source | ImageRequireSource;
  style?: FastImageProps['style'];
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  blurHashEnabled?: boolean;

  [key: string]: any;
}

const hastValue: string = 'LEHV6nWB2yk8pyo0adR*.7kCMdnj';

const AppImage = ({
  source = {},
  style,
  resizeMode = 'cover',
  blurHashEnabled = false,
  containerStyle,
  disabled = true,
  onPress,
  onLongPress,
  ...props
}: AppImageProps) => {
  const fadingAnim = useSharedValue(1);

  const blurStyle = useAnimatedStyle(() => ({
    opacity: fadingAnim.value,
  }));

  return (
    <Fragment>
      <Pressable
        onLongPress={onLongPress}
        disabled={disabled}
        onPress={onPress}
        style={[styles.container, containerStyle]}>
        {blurHashEnabled && (
          <Animated.View style={[styles.blurhashView, blurStyle]}>
            <Blurhash
              style={styles.blurhashView}
              blurhash={hastValue}
              resizeMode="cover"
            />
          </Animated.View>
        )}
        <FastImage
          source={source}
          resizeMode={resizeMode}
          style={[styles.image, style]}
          onLoadEnd={() => {
            fadingAnim.value = withTiming(0);
          }}
          {...props}
        />
      </Pressable>
    </Fragment>
  );
};

export default memo(AppImage);

const styles = AppStyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  blurhashView: {
    ...AppStyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  container: {
    overflow: 'hidden',
  },
});
