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
      <AwareScrollView
        containerStyle={styles.content}
        keyboardShouldPersistTaps={true}>
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
        <AppImage
          containerStyle={styles.metaImage}
          source={require('@assets/image/meta-logo.png')}
        />
      </AwareScrollView>
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
