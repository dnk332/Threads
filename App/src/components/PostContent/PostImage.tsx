import React, {memo, useCallback, useEffect, useState} from 'react';
import {Pressable} from 'react-native';

import {getImageSize, ISize} from '@hooks/getImageInfo';
import {AppImage} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {imageHeight, imageWidth} from '@constants/deviceSize';
import Navigator from '@navigators';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {IMedia} from '@src/types/other';

export interface PostImageProps {
  link: string;
  index: number;
  listImage: IMedia[];
}

const PostImage = ({link, listImage, index}: PostImageProps) => {
  const [dimensions, setValue] = useState<ISize>({width: 0, height: 0});
  const [aspectRatio, setAspectRatio] = useState<number>(0);

  const listImageOfPost = {};

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
      onPress={() =>
        Navigator.navigateTo(SCREEN_NAME.IMAGE_VIEWER, {
          imageLink: link,
          index,
          listImage,
        })
      }>
      <AppImage
        style={{
          width: imageWidth,
          height: imageHeight,
          // width:
          //   dimensions.width > dimensions.height ? imageWidth : undefined,
          // height: imageHeight,
          // aspectRatio:
          //   dimensions.width > dimensions.height ? undefined : aspectRatio,
        }}
        source={{uri: link}}
        blurHashEnabled={true}
        containerStyle={styles.image}
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
