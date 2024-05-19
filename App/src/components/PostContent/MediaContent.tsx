import {ScrollView} from 'react-native';
import React from 'react';
import {Media} from '@local_types/post';

import {AppStyleSheet} from '@themes/responsive';

import PostImage from '@components/PostContent/PostImage';

interface MediaContentProps {
  content: Media[];
}

const MediaContent = ({content = []}: MediaContentProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      scrollEventThrottle={5}>
      {content?.length > 0 &&
        content.map(image => <PostImage link={image.link} />)}
    </ScrollView>
  );
};

export default MediaContent;

const styles = AppStyleSheet.create({
  image: {
    width: 300,
    height: undefined,
    aspectRatio: 1,
  },
  container: {
    paddingLeft: 64,
  },
});
