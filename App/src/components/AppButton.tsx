import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {AppStyleSheet} from '@themes/responsive';
import AppText from './AppText';
import colors from '@themes/color';

export interface AppButtonProps extends PressableProps {
  text: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  buttonColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  borderRadius?: number;
  key?: number;
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
  key = 1,
}: AppButtonProps): React.ReactNode => {
  return (
    <Pressable
      key={key}
      style={[
        styles.buttonContainer,
        {backgroundColor: buttonColor, borderRadius},
        buttonStyle,
      ]}>
      <View>
        <View>{leftIcon}</View>
        <AppText
          style={textStyle}
          color={textColor}
          fontSize={14}
          fontWeight={600}>
          {text}
        </AppText>
      </View>
      {rightIcon}
    </Pressable>
  );
};

export default AppButton;

const styles = AppStyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
});
