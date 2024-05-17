import React from 'react';
import AppText from '@components/AppText';

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
