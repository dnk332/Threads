import React from 'react';
import TextContent from './TextContent';
import {View} from 'react-native';
import {layout} from '@themes/index';
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
    <View style={[layout.fill, styles.container]}>
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
