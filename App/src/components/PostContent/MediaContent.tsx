import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {View} from 'react-native';

import {IMedia} from '@localTypes/other';
import {AppStyleSheet} from '@themes/responsive';
// import {PostImageItem} from '@components';
import {PostImage} from '@src/components/PostContent';

interface MediaContentProps {
  content: IMedia[];
}

const ItemSeparator = () => {
  return <View style={styles.space} />;
};
const Spacer = () => {
  return <View style={styles.paddingLeft} />;
};

const MediaContent = ({content = []}: MediaContentProps) => {
  const RenderItem = useCallback(({item}: {item: IMedia}) => {
    return (
      <View key={item.orderColumn}>
        <PostImage link={item.link} />
      </View>
    );
  }, []);

  return (
    <FlashList
      data={content}
      renderItem={({item}) => <RenderItem item={item} />}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={content.length > 1}
      estimatedItemSize={3}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={Spacer}
      nestedScrollEnabled
    />
  );
};

export default MediaContent;

const styles = AppStyleSheet.create({
  paddingLeft: {
    paddingLeft: 64,
  },
  space: {width: 8},
});
