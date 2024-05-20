import React, {memo, useCallback, useEffect, useState} from 'react';
import {getImageSize, ISize} from '@hooks/getImageInfo';
import {AppImage} from '@components/index';
import {AppStyleSheet} from '@themes/responsive';
import {imageHeight} from '@constants/index';

export interface PostImageProps {
  link: string;
  key: number;
}

const PostImage = ({link, key}: PostImageProps) => {
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
  }, [dimensions.height, dimensions.width]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      HandleImageSize();
    }
  }, [HandleImageSize, dimensions]);

  return (
    <AppImage
      key={key}
      style={[
        styles.image,
        {
          width: undefined,
          height: imageHeight,
          aspectRatio,
        },
      ]}
      source={{uri: link}}
    />
  );
};

export default memo(PostImage);

const styles = AppStyleSheet.create({
  image: {
    borderRadius: 10,
  },
});
