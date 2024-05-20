import {FlatList, ListRenderItemInfo} from 'react-native';
import React from 'react';
import {Media} from '@local_types/post';

import {AppStyleSheet} from '@themes/responsive';

import PostImage from '@components/PostContent/PostImage';

interface MediaContentProps {
  content: Media[];
}

const RenderItem = ({item}) => {
  return <PostImage key={item.id} link={item.link} />;
};

const MediaContent = ({content = []}: MediaContentProps) => {
  return (
    <FlatList
      data={content}
      renderItem={({item}: ListRenderItemInfo<Media>) => (
        <RenderItem item={item} />
      )}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default MediaContent;

const styles = AppStyleSheet.create({
  container: {
    paddingLeft: 64,
    gap: 8,
  },
});
