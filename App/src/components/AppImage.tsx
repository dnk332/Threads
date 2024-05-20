import React, {Fragment, memo} from 'react';
import {
  ImageRequireSource,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';

interface AppImageProps {
  source: Source | ImageRequireSource;
  style?: FastImageProps['style'];
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  [key: string]: any;
}

const AppImage = ({
  source = {},
  style,
  resizeMode = 'cover',
  containerStyle,
  disabled = true,
  onPress,
  onLongPress,
  ...props
}: AppImageProps) => {
  return (
    <Fragment>
      <Pressable
        onLongPress={onLongPress}
        disabled={disabled}
        onPress={onPress}
        style={containerStyle}>
        <FastImage
          source={source}
          resizeMode={resizeMode}
          style={[styles.image, style]}
          {...props}
        />
      </Pressable>
    </Fragment>
  );
};

export default memo(AppImage);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
