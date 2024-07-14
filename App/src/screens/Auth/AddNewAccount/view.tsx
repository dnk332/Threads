import React, {useEffect} from 'react';
import _ from 'lodash';

import {
  AppButton,
  AppContainer,
  AppImage,
  AppInput,
  AwareScrollView,
} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {View} from 'react-native';

interface AddNewAccountViewProps {
  onRegister: (
    username: string,
    password: string,
    setLoadingValue: (value: boolean) => void,
  ) => void;
  username?: string;
}

const AddNewAccountView: React.FC<AddNewAccountViewProps> = ({
  onRegister,
  username,
}) => {
  const [usernameValue, setUsernameValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const password = React.useRef('');

  useEffect(() => {
    if (!_.isEmpty(username)) {
      setUsernameValue(username);
    }
  }, [username]);

  return (
    <AppContainer style={styles.container}>
      <AwareScrollView keyboardShouldPersistTaps={true}>
        <AppImage
          containerStyle={styles.igImage}
          source={require('@assets/image/instagram-logo.png')}
        />
        <View style={styles.inputField}>
          <AppInput
            autoFocus
            placeholder="Username, email or mobile number"
            onChangeText={setUsernameValue}
            style={styles.textInput}
            value={usernameValue}
          />
          <AppInput
            autoFocus={!_.isEmpty(username)}
            placeholder="Password"
            onChangeText={e => (password.current = e)}
            style={styles.textInput}
            secureTextEntry={true}
          />
          <AppButton
            onPress={() =>
              onRegister(usernameValue, password.current, value => {
                setLoading(value);
              })
            }
            text="Log in"
            buttonColor={colors.blue}
            buttonStyle={styles.button}
            borderRadius={100}
            loading={loading}
          />
        </View>
      </AwareScrollView>
    </AppContainer>
  );
};

export default AddNewAccountView;

const styles = AppStyleSheet.create({
  container: {marginTop: 0, paddingTop: 16},
  igImage: {
    width: 72,
    height: 72,
    alignSelf: 'center',
    marginVertical: 30,
  },
  inputField: {
    gap: 16,
    marginHorizontal: 16,
    marginVertical: 40,
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
    marginTop: 40,
  },
});
