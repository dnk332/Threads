import React from 'react';
import {View} from 'react-native';

import TextContent from '@src/components/PostContent/TextContent';
import {AppStyleSheet} from '@themes/responsive';

interface ContentHandelAreaProps {
  textContent: string;
  // time,
  // liked,
  // comment,
  // reported,
}

const ContentHandelArea = ({textContent = ''}: ContentHandelAreaProps) => {
  return (
    <View style={[styles.container]}>
      <TextContent content={textContent} />
    </View>
  );
};

export default ContentHandelArea;

const styles = AppStyleSheet.create({
  container: {
    // marginBottom: 8,
  },
});
