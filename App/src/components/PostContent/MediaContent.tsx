import React, {useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {View} from 'react-native';

import {Media} from '@localTypes/post';
import {AppStyleSheet} from '@themes/responsive';
// import {PostImage} from '@components';
import {PostImage} from '@src/components/PostContent';

interface MediaContentProps {
  content: Media[];
}
const ItemSeparator = () => {
  return <View style={styles.space} />;
};
const Spacer = () => {
  return <View style={styles.paddingLeft} />;
};

const MediaContent = ({content = []}: MediaContentProps) => {
  const RenderItem = useCallback(({item}) => {
    return (
      <View key={item.id}>
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
