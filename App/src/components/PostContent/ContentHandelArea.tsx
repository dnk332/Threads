import React from 'react';
import {View} from 'react-native';

import {AppComponent} from '@components';
import layout from '@themes/layout';
import {AppStyleSheet} from '@themes/responsive';

const {TextContent} = AppComponent.PostContent;

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
