import React, {Fragment} from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {width as DeviceWidth} from '@utils/DeviceInfo';
import AppButton, {AppButtonProps} from '@src/components/AppButton';

interface AppGroupButtonProps {
  data: AppButtonProps[];
  containerColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  [key: string]: any;
}

const AppGroupButton = ({
  data = [{text: ''}],
  containerColor,
  containerStyle,
  ...props
}: AppGroupButtonProps) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: containerColor},
        containerStyle,
      ]}
      {...props}>
      {data.length > 1 ? (
        data.map((button, index) => (
          <Fragment key={index}>
            <AppButton
              text={button.text}
              leftIcon={button.leftIcon}
              rightIcon={button.rightIcon}
              textColor={button.textColor}
              buttonColor={button.buttonColor}
              buttonStyle={[
                button.buttonStyle,
                index === 0 && styles.firstButton,
                index === data.length - 1 && styles.lastButton,
              ]}
              textStyle={button.textStyle}
              borderRadius={0}
            />
            <View
              style={(index === 0 || index < data.length - 1) && styles.line}
            />
          </Fragment>
        ))
      ) : (
        <AppButton
          text={data[0].text}
          leftIcon={data[0].leftIcon}
          rightIcon={data[0].rightIcon}
          textColor={data[0].textColor}
          buttonColor={data[0].buttonColor}
          buttonStyle={[styles.borderRadius, data[0].buttonStyle]}
          textStyle={data[0].textStyle}
        />
      )}
    </View>
  );
};
export default AppGroupButton;

const styles = AppStyleSheet.create({
  buttonContainer: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  container: {},
  borderRadius: {
    borderRadius: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    width: DeviceWidth - 64,
    alignSelf: 'center',
  },
  firstButton: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  lastButton: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
});
