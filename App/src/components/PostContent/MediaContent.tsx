import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {View, ViewStyle} from 'react-native';

import {IMedia} from '@localTypes/other';
import {AppStyleSheet} from '@themes/responsive';
// import {PostImageItem} from '@components';
import {PostImage} from '@src/components/PostContent';

interface MediaContentProps {
  content: IMedia[];
  haveSpacer?: boolean;
}

const ItemSeparator = () => {
  return <View style={styles.space} />;
};

const MediaContent = ({content = [], haveSpacer = true}: MediaContentProps) => {
  const RenderItem = useCallback(
    ({index, item}: {index: number; item: IMedia}) => {
      return (
        <View key={item.orderColumn}>
          <PostImage link={item.link} index={index} listImage={content} />
        </View>
      );
    },
    [],
  );

  return (
    <FlashList
      data={content}
      renderItem={({index, item}) => <RenderItem index={index} item={item} />}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={content.length > 1}
      estimatedItemSize={3}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <View style={haveSpacer ? styles.paddingLeft : styles.noPaddingLeft} />
      )}
      ListFooterComponent={() => (
        <View style={haveSpacer ? {} : styles.noPaddingLeft} />
      )}
      nestedScrollEnabled
    />
  );
};

export default MediaContent;

const styles = AppStyleSheet.create({
  paddingLeft: {
    paddingLeft: 64,
  },
  noPaddingLeft: {
    paddingLeft: 16,
  },
  space: {width: 8},
});
