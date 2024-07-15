import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {AppStyleSheet} from '@themes/responsive';
import {AppText} from '@components';
import {colors} from '@themes/color';
import Lottie from 'lottie-react-native';

export interface AppButtonProps extends PressableProps {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  buttonColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderRadius?: number;
  onPress?: () => void;
  loading?: boolean;
}

const AppButton = ({
  text,
  leftIcon,
  rightIcon,
  textColor = colors.text,
  buttonColor = colors.primary,
  buttonStyle,
  textStyle,
  borderRadius = 16,
  onPress,
  loading = false,
}: AppButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.buttonContainer,
        {backgroundColor: buttonColor, borderRadius},
        buttonStyle,
      ]}>
      <View>
        <View>{leftIcon}</View>
        {loading ? (
          <Lottie
            source={require('@assets/lottie/loading.json')}
            style={styles.lottieView}
            autoPlay
          />
        ) : (
          <AppText
            style={textStyle}
            color={textColor}
            fontSize={14}
            fontWeight={600}>
            {text}
          </AppText>
        )}
      </View>
      {rightIcon}
    </Pressable>
  );
};

export default AppButton;

const styles = AppStyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  lottieView: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
});
