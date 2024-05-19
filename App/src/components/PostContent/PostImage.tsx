import React, {memo, useEffect, useState} from 'react';
import {getImageSize, ISize} from '@hooks/getImageInfo';
import {AppImage} from '@components/index';
import {AppStyleSheet} from '@themes/responsive';
import {imageHeight, imageWidth} from '@constants/index';

const PostImage = ({link}) => {
  const [dimensions, setValue] = useState<ISize>({width: 0, height: 0});
  const [aspectRatio, setAspectRatio] = useState<number>(0);
  const [width, setWidth] = useState<number | undefined>(0);
  const [height, setHeight] = useState<number | undefined>(0);

  useEffect(() => {
    getImageSize(link).then(res =>
      setValue({width: res.width, height: res.height}),
    );
  }, [link]);

  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      setAspectRatio(dimensions.width / dimensions.height);
    }

    if (dimensions.width < dimensions.height) {
      setWidth(imageWidth);
      setHeight(undefined);
    } else {
      setWidth(undefined);
      setHeight(imageHeight);
    }
  }, [dimensions]);

  return (
    <AppImage
      style={[
        styles.image,
        {
          width,
          height,
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
    width: 300,
    height: undefined,
    aspectRatio: 1,
  },
});
