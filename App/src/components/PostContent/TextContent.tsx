import React from 'react';
import {AppText} from '@components';

interface TextContentProps {
  content: string;
}

const TextContent = ({content}: TextContentProps) => {
  return (
    <AppText fontSize={16} fontWeight={400}>
      {content}
    </AppText>
  );
};

export default TextContent;
