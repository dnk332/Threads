import React, {useCallback} from 'react';
import {Media} from '@local_types/post';

import {AppStyleSheet} from '@themes/responsive';

import PostImage from '@components/PostContent/PostImage';
import {FlashList} from '@shopify/flash-list';
import {View} from 'react-native';

interface MediaContentProps {
  content: Media[];
}
const ItemSeparator = () => {
  return <View style={styles.space} />;
};

const MediaContent = ({content = []}: MediaContentProps) => {
  const RenderItem = useCallback(({item}) => {
    return <PostImage key={item.id} link={item.link} />;
  }, []);

  return (
    <FlashList
      data={content}
      renderItem={({item}) => <RenderItem item={item} />}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEnabled={content.length > 1}
      estimatedItemSize={3}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MediaContent;

const styles = AppStyleSheet.create({
  container: {
    paddingLeft: 64,
    gap: 8,
  },
  space: {width: 8},
});
