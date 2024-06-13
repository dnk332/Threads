import React from 'react';

import {AppButton, AppContainer, AppImage, AppInput} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {View} from 'react-native';
import {DismissKeyboardView} from '@src/components/DissmissKeyboardView';

interface AddNewAccountViewProps {
  onRegister: (username: string, password: string) => void;
}

const AddNewAccountView = ({onRegister}: AddNewAccountViewProps) => {
  const username = React.useRef('');
  const password = React.useRef('');

  return (
    <AppContainer style={styles.container}>
      <DismissKeyboardView style={styles.content}>
        <AppImage
          containerStyle={styles.igImage}
          source={require('@assets/image/instagram-logo.png')}
        />
        <View style={styles.inputField}>
          <AppInput
            autoFocus
            placeholder="Username, email or mobile number"
            onChangeText={e => (username.current = e)}
            style={styles.textInput}
          />
          <AppInput
            autoFocus
            placeholder="Password"
            onChangeText={e => (password.current = e)}
            style={styles.textInput}
          />
          <AppButton
            onPress={() => onRegister(username.current, password.current)}
            text="Log in"
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

export default AddNewAccountView;

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
