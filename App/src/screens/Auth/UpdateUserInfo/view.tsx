import React from 'react';

import {
  AppButton,
  AppContainer,
  AppImage,
  AppInput,
  AppText,
} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {View} from 'react-native';
import {DismissKeyboardView} from '@src/components/DissmissKeyboardView';

interface UpdateUserInfoViewProps {}

const UpdateUserInfoView = ({}: UpdateUserInfoViewProps) => {
  return (
    <AppContainer style={styles.container}>
      <DismissKeyboardView style={styles.content}>
        <AppText align="center" fontWeight={700} fontSize={26}>
          UPDATE USER PROFILE
        </AppText>
        <View style={styles.inputField}>
          <AppInput
            autoFocus
            placeholder="Username, email or mobile number"
            style={styles.textInput}
          />
          <AppInput
            autoFocus
            placeholder="Username, email or mobile number"
            style={styles.textInput}
          />
          <AppInput
            autoFocus
            placeholder="Username, email or mobile number"
            style={styles.textInput}
          />
          <AppInput
            autoFocus
            placeholder="Username, email or mobile number"
            style={styles.textInput}
          />
          <AppButton
            onPress={() => {}}
            text="Update"
            buttonColor={colors.blue}
            buttonStyle={styles.button}
            borderRadius={100}
          />
        </View>
        <AppImage
          containerStyle={styles.metaImage}
          source={require('@assets/image/meta-logo.png')}
        />
      </DismissKeyboardView>
    </AppContainer>
  );
};

export default UpdateUserInfoView;

const styles = AppStyleSheet.create({
  container: {marginTop: 0, paddingTop: 16},
  contentContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 14,
    padding: 16,
  },
  igImage: {
    width: 72,
    height: 72,
    alignSelf: 'center',
  },
  inputField: {
    gap: 16,
    marginHorizontal: 16,
    flex: 1,
    marginVertical: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 16,
  },
  button: {
    width: '100%',
    padding: 16,
  },
  metaImage: {
    width: 66,
    height: undefined,
    aspectRatio: 5,
    alignSelf: 'center',
  },
  content: {
    justifyContent: 'space-around',
    height: '100%',
  },
});
