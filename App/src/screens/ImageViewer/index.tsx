import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppContainer from '@components/AppContainer';
import {layout} from '@themes/index';
import AppImage from '@components/AppImage';
import {RouteProp} from '@react-navigation/native';
import {NavigationStackParamList} from '@navigation/Stack';

type DetailsScreenRouteProp = RouteProp<
  NavigationStackParamList,
  'IMAGE_VIEWER'
>;

type ImageViewerProps = {
  route: DetailsScreenRouteProp;
};

const ImageViewer = ({route}: ImageViewerProps) => {
  const {imageLink} = route.params;
  return (
    <AppContainer haveBackButton={true}>
      <View style={[layout.fill, styles.container]}>
        <AppImage
          resizeMode="cover"
          style={styles.image}
          source={{uri: imageLink}}
        />
      </View>
    </AppContainer>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 10,
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
