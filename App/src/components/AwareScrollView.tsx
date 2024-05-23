import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface AwareScrollViewProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  disableKBDismissScroll?: any;
  keyboardShouldPersistTaps?: boolean;
  isNested?: boolean;
  isScrollEnabled?: boolean;
  [key: string]: any;
}

function AwareScrollView({
  children,
  contentContainerStyle,
  disableKBDismissScroll,
  keyboardShouldPersistTaps,
  isNested = false,
  isScrollEnabled = true,
  ...props
}: AwareScrollViewProps) {
  return (
    <KeyboardAwareScrollView
      nestedScrollEnabled={isNested}
      automaticallyAdjustContentInsets={false}
      resetScrollToCoords={disableKBDismissScroll ? null : {x: 0, y: 0}}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
      {...props}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={isScrollEnabled}>
      {children}
    </KeyboardAwareScrollView>
  );
}

export default React.memo(AwareScrollView);
