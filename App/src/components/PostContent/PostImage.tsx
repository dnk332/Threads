import React, {memo, useCallback, useEffect, useState} from 'react';
import {Pressable} from 'react-native';

import {getImageSize, ISize} from '@hooks/getImageInfo';
import {AppImage} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {imageHeight, imageWidth} from '@constants/deviceSize';
import {navigateTo} from '@navigators';
import {SCREEN_NAME} from '@navigation/ScreenName';

export interface PostImageProps {
  link: string;
}

const PostImage = ({link}: PostImageProps) => {
  const [dimensions, setValue] = useState<ISize>({width: 0, height: 0});
  const [aspectRatio, setAspectRatio] = useState<number>(0);

  useEffect(() => {
    //get image size
    if (link === '') {
      return;
    }
    getImageSize(link).then(res =>
      setValue({width: res.width, height: res.height}),
    );
  }, [link]);

  const HandleImageSize = useCallback(() => {
    setAspectRatio(dimensions.width / dimensions.height);
    if (dimensions.width > dimensions.height) {
    }
  }, [dimensions.height, dimensions.width]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      HandleImageSize();
    }
  }, [HandleImageSize, dimensions]);

  return (
    <Pressable
      onPress={() => navigateTo(SCREEN_NAME.IMAGE_VIEWER, {imageLink: link})}>
      <AppImage
        style={[
          styles.image,
          {
            width:
              dimensions.width > dimensions.height ? imageWidth : undefined,
            height: imageHeight,
            aspectRatio:
              dimensions.width > dimensions.height ? undefined : aspectRatio,
          },
        ]}
        source={{uri: link}}
      />
    </Pressable>
  );
};

export default memo(PostImage);

const styles = AppStyleSheet.create({
  image: {
    borderRadius: 10,
  },
});
