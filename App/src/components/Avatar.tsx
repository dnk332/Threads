import {
  ImageRequireSource,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {AppStyleSheet} from '@themes/responsive';
import colors from '@themes/color';
import AppImage from '@components/AppImage';
import {FastImageProps, Source} from 'react-native-fast-image';
import {SVGName} from '@assets/svg';

interface AvatarProps {
  source: Source | ImageRequireSource;
  canFollow?: boolean;
  container?: StyleProp<ViewStyle>;
  style?: FastImageProps['style'];
}

const Avatar = ({source, canFollow, container, style}: AvatarProps) => {
  return (
    <View style={container}>
      <AppImage
        source={source}
        containerStyle={styles.imageContainer}
        style={styles.image}
      />
      {canFollow && (
        <Pressable>
          <View style={[styles.flowButton, style]}>
            <SVGName title={'plus'} />
          </View>
        </Pressable>
      )}
    </View>
  );
};

export default Avatar;

const styles = AppStyleSheet.create({
  imageContainer: {width: 40, height: 40},
  image: {
    borderRadius: 40,
  },
  flowButton: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -2,
    right: -2,
    zIndex: 2,
  },
});
