import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  TextInputProps,
  StyleProp,
  ViewStyle,
  Platform,
  TextStyle,
} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import AppText from './AppText';
import {SVG_NAME} from '~/assets/patch';

import {AppFonts, FontSizes} from '@themes/fonts';
import {colors} from '@themes/color';
import {
  ResponsiveFont,
  ResponsiveHeight,
  AppStyleSheet,
} from '@themes/responsive';
interface AppTextInputProps extends TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  styleContent?: StyleProp<ViewStyle>;
  keyboardType?: TextInputProps['keyboardType'];
  error?: boolean;
  messageError?: string;
  password?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  height?: number;
  label?: string;
  capitalize?: boolean;
  maxLength?: number;
  important?: boolean;
  iconRight?: React.ReactNode;
  onEndEditing?: () => void;
  onPressFiled?: () => void;
  fontWeight?: keyof typeof AppFonts | string;
  fontSize?: number | keyof typeof FontSizes;
  color?: string;
  lineHeightRatio?: number;
  lineHeight?: number;
  style?: StyleProp<ViewStyle>;
  align?: 'left' | 'center' | 'right';
  useDefaultFont?: boolean;
}
// TODO: update this code
const AppTextInput: React.FC<AppTextInputProps> = ({
  onChangeText,
  value,
  style,
  styleContent,
  keyboardType,
  error,
  messageError,
  password,
  autoCapitalize,
  height,
  label,
  maxLength,
  important,
  iconRight,
  onEndEditing,
  onPressFiled,
  fontWeight = 400,
  fontSize = 'normal',
  color = colors.text,
  placeholderTextColor = colors.placeholder,
  lineHeightRatio,
  lineHeight,
  align = 'left',
  useDefaultFont = false,
  ...props
}) => {
  const size = typeof fontSize === 'string' ? FontSizes[fontSize] : fontSize;
  const textStyles: TextStyle = {
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

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const moveText = useSharedValue(0);
  const focusInput = useRef<TextInput>(null);

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else {
      moveTextBottom();
    }
  }, [value]);

  const onFocusHandler = () => {
    if (value !== '') {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  const moveTextTop = useCallback(() => {
    moveText.value = withTiming(1, {duration: 200, easing: Easing.linear});
  }, [moveText]);

  const moveTextBottom = useCallback(() => {
    moveText.value = withTiming(0, {duration: 200, easing: Easing.linear});
  }, [moveText]);

  const aniLabel = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: moveText.value === 0 ? 0 : -13,
      },
    ],
    fontSize: moveText.value === 0 ? 14 : 12,
  }));

  const aniInput = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: moveText.value === 0 ? 0 : 8,
      },
    ],
  }));

  const ControlSecureTextEntry: React.FC<{data: boolean}> = useCallback(
    ({data}) => (
      <TouchableOpacity
        style={styles.icRight}
        onPress={() => setSecureTextEntry(!data)}>
        {data ? <SVG_NAME.IC_HIDE_PASSWORD /> : <SVG_NAME.IC_SHOW_PASSWORD />}
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        focusInput.current?.focus();
        onPressFiled?.();
      }}
      style={[styleContent, styles.margin]}>
      <View
        style={[
          styles.view,
          style,
          {
            borderColor: error ? colors.red : colors.white,
            height: height ?? 52,
          },
        ]}>
        <Animated.Text
          numberOfLines={1}
          style={[
            aniLabel,
            {
              color: colors.text_gray,
            },
            styles.animatedStyle,
          ]}>
          {label}
          {important && (
            <Animated.Text
              numberOfLines={1}
              style={[
                aniLabel,
                {
                  color: colors.red,
                },
                styles.animatedStyle,
              ]}>
              {' '}
              *
            </Animated.Text>
          )}
        </Animated.Text>
        <Animated.View style={aniInput}>
          <TextInput
            {...props}
            ref={focusInput}
            style={[styles.textInput, textStyles]}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={placeholderTextColor}
            autoCapitalize={autoCapitalize ?? 'sentences'}
            underlineColorAndroid="transparent"
            keyboardType={keyboardType}
            secureTextEntry={password ? secureTextEntry : false}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            textContentType="oneTimeCode"
            maxLength={maxLength}
            onEndEditing={onEndEditing}
          />
        </Animated.View>
        {!password ? (
          value === '' ? null : (
            <TouchableOpacity
              style={styles.icRight}
              onPress={() => onChangeText('')}>
              <SVG_NAME.IC_DELETE />
            </TouchableOpacity>
          )
        ) : (
          <ControlSecureTextEntry data={secureTextEntry} />
        )}
      </View>
      {iconRight && (
        <View style={[!password && value === '' ? styles.ic : styles.ic2]}>
          {iconRight}
        </View>
      )}
      {error && <AppText style={styles.txtError}>{messageError}</AppText>}
    </TouchableOpacity>
  );
};

export default React.memo(AppTextInput);

const styles = AppStyleSheet.create({
  view: {
    borderWidth: 1,
    paddingRight: 50,
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    paddingLeft: Platform.OS === 'ios' ? 16 : 12,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  textInput: {
    color: colors.black,
    paddingRight: 20,
    width: 265,
    height: '100%',
  },
  title: {
    color: colors.text,
    fontSize: 14,
    marginBottom: 8,
  },
  txtError: {
    color: colors.red,
    fontSize: 12,
    marginLeft: 16,
    marginTop: 4,
  },
  margin: {
    marginBottom: 16,
  },
  eye: {
    height: '100%',
    width: '100%',
  },
  animatedStyle: {
    left: 16,
    position: 'absolute',
    zIndex: 10000,
    width: '100%',
  },
  icRight: {
    position: 'absolute',
    right: 9,
    top: 7.5,
    padding: 10,
  },
  ic: {
    position: 'absolute',
    right: 9,
    top: 11,
    padding: 10,
  },
  ic2: {
    position: 'absolute',
    right: 40,
    top: 11,
    padding: 10,
  },
});
