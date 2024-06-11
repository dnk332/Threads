import React, {forwardRef, memo} from 'react';
import {StyleProp, TextInput, TextInputProps, TextStyle} from 'react-native';

import {AppFonts, FontSizes} from '@themes/fonts';
import {colors} from '@themes/color';
import {
  ResponsiveFont,
  ResponsiveHeight,
  AppStyleSheet,
} from '@themes/responsive';

export interface AppInputProps extends TextInputProps {
  fontWeight?: keyof typeof AppFonts | string;
  fontSize?: number | keyof typeof FontSizes;
  color?: string;
  lineHeightRatio?: number;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
  align?: 'left' | 'center' | 'right';
  useDefaultFont?: boolean;
}

const AppInput = forwardRef(
  (
    {
      fontWeight = 400,
      fontSize = 'normal',
      color = colors.text,
      placeholderTextColor = colors.placeholder,
      lineHeightRatio,
      lineHeight,
      style,
      align = 'left',
      useDefaultFont = false,
      ...restProps
    }: AppInputProps,
    ref: React.LegacyRef<TextInput>,
  ) => {
    const size = typeof fontSize === 'string' ? FontSizes[fontSize] : fontSize;
    const textStyles = {
      fontFamily: useDefaultFont
        ? undefined
        : typeof fontWeight === 'string'
        ? fontWeight
        : AppFonts[fontWeight],
      color,
      fontSize: ResponsiveFont(size),
      ...(lineHeightRatio && {
        lineHeight: ResponsiveHeight(size * lineHeightRatio),
      }),
      ...(lineHeight && {lineHeight: ResponsiveHeight(lineHeight)}),
      textAlign: align,
    };
    return (
      <TextInput
        ref={ref}
        style={[styles.base, textStyles, style]}
        placeholderTextColor={placeholderTextColor}
        {...restProps}
      />
    );
  },
);

export default memo(AppInput);

const styles = AppStyleSheet.create({
  base: {
    color: colors.text,
  },
});
