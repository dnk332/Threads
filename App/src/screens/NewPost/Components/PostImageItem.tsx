import React from 'react';
import {AppStyleSheet} from '@themes/responsive';
import {IImage} from '@src/types/other';
import AppImage from '@src/components/AppImage';
import {imageHeight, imageWidth} from '@constants/deviceSize';
import {Pressable, View} from 'react-native';
import SvgComponent from '@svg/index';

type PostImageProps = {
  image: IImage;
  deleteImage: (uri: string) => void;
};

const PostImageItem: React.FC<PostImageProps> = ({image, deleteImage}) => {
  return (
    <View>
      <Pressable
        style={styles.deleteBtn}
        onPress={() => deleteImage(image.uri)}>
        <SvgComponent name={'DELETE'} />
      </Pressable>
      <AppImage style={styles.postImage} source={{uri: image.uri}} />
    </View>
  );
};

export default PostImageItem;

const styles = AppStyleSheet.create({
  postImage: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 8,
  },
  deleteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 8,
  },
});
