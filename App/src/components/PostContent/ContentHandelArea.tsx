import React, {Fragment} from 'react';
import TextContent from './TextContent';
import {View} from 'react-native';
import {layout} from '@themes/index';

interface ContentHandelAreaProps {
  textContent: string;
  // mediaContent,
  // time,
  // liked,
  // comment,
  // reported,
}

const ContentHandelArea = ({
  textContent,
}: //   mediaContent,
//   time,
//   liked,
//   comment,
//   reported,
ContentHandelAreaProps) => {
  return (
    <View style={[layout.fill]}>
      <TextContent content={textContent} />
      {/* {contentType === 'image' && <TextContent content={content} />} */}
    </View>
  );
};

export default ContentHandelArea;
