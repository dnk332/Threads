import React from 'react';
import {
  ImageRequireSource,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {FastImageProps, Source} from 'react-native-fast-image';

import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
// import {GlobalComponent} from '@components';
import AppImage from '@src/components/AppImage';
// const {AppImage} = GlobalComponent;

interface AvatarProps {
  source: Source | ImageRequireSource;
  canFollow?: boolean;
  container?: StyleProp<ViewStyle>;
  imgStyle?: FastImageProps['style'];
}

const Avatar = ({source, canFollow, container, imgStyle}: AvatarProps) => {
  return (
    <View style={[styles.container, container]}>
      <AppImage
        source={source}
        containerStyle={[styles.imageContainer, imgStyle]}
        style={styles.image}
      />
      {canFollow && (
        <Pressable>
          <View style={[styles.flowButton]}>
            {/* <SVGName title={'plus'} /> */}
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
  container: {
    alignSelf: 'flex-start',
    borderRadius: 40,
  },
});
