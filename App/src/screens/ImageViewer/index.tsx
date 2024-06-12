import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import layout from '@themes/layout';
import {NavigationStackParamList} from '@navigation/Stack';
import {AppContainer, AppImage} from '@components';

type DetailsScreenRouteProp = RouteProp<
  NavigationStackParamList,
  'IMAGE_VIEWER'
>;

type ImageViewerProps = {
  route: DetailsScreenRouteProp;
};

const ImageViewerScreen = ({route}: ImageViewerProps) => {
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

export default ImageViewerScreen;

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
