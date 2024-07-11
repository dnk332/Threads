import React, {forwardRef, memo} from 'react';
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';

import {AppFonts, FontSizes} from '@themes/fonts';
import {colors} from '@themes/color';
import {
  ResponsiveFont,
  ResponsiveHeight,
  AppStyleSheet,
} from '@themes/responsive';
import AppText from './AppText';

export interface AppFormInputProps extends TextInputProps {
  fontWeight?: keyof typeof AppFonts | string;
  fontSize?: number | keyof typeof FontSizes;
  color?: string;
  lineHeightRatio?: number;
  lineHeight?: number;
  style?: StyleProp<TextStyle>;
  align?: 'left' | 'center' | 'right';
  useDefaultFont?: boolean;
  error: any;
  messageError?: string;
}

const AppFormInput = forwardRef(
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
      error,
      messageError = '',
      ...restProps
    }: AppFormInputProps,
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
      <View>
        <TextInput
          ref={ref}
          style={[styles.base, textStyles, error && styles.error, style]}
          placeholderTextColor={placeholderTextColor}
          {...restProps}
        />
        {error && messageError && (
          <AppText fontSize={12} color={colors.red} style={styles.errorMessage}>
            {messageError}
          </AppText>
        )}
      </View>
    );
  },
);

export default memo(AppFormInput);

const styles = AppStyleSheet.create({
  base: {
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 16,
  },
  error: {borderColor: colors.red},
  errorMessage: {
    marginTop: 8,
  },
});
