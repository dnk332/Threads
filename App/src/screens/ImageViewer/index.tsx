import React, {useCallback, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp} from '@react-navigation/native';

import layout from '@themes/layout';
import {NavigationStackParamList} from '@navigation/Stack';
import {AppContainer, AppImage} from '@components';
import SCREEN_NAME from '@src/navigation/ScreenName';
import {FlashList} from '@shopify/flash-list';
import {IMedia} from '@src/types/other';
import {height, width} from '@utils/DeviceInfo';

type ImageViewerScreenRouteProp = RouteProp<
  NavigationStackParamList,
  typeof SCREEN_NAME.IMAGE_VIEWER
>;

type ImageViewerProps = {
  route: ImageViewerScreenRouteProp;
};

const ImageViewerScreen = ({route}: ImageViewerProps) => {
  const {imageLink, index, listImage} = route.params;
  const sliderRef = useRef<FlashList<IMedia>>(null);

  const RenderImage = useCallback(({item}: {item: IMedia}) => {
    return (
      <AppImage
        resizeMode="cover"
        style={styles.image}
        source={{uri: item.link}}
      />
    );
  }, []);

  return (
    <AppContainer haveBackButton={true}>
      <View style={[layout.fill, styles.container]}>
        <FlashList
          horizontal={true}
          ref={sliderRef}
          data={listImage}
          renderItem={RenderImage}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          estimatedListSize={{width, height}}
          estimatedItemSize={4}
          onLayout={() => {
            sliderRef.current.scrollToIndex({
              animated: false,
              index,
            });
          }}
        />
      </View>
    </AppContainer>
  );
};

export default ImageViewerScreen;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: undefined,
    aspectRatio: 2 / 3,
  },
  container: {
    paddingTop: 16,
  },
});
