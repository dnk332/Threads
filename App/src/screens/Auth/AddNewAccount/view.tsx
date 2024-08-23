import React, {forwardRef, useEffect, useImperativeHandle} from 'react';
import _ from 'lodash';

import {
  AppButton,
  AppContainer,
  AppFormInput,
  AppImage,
  AwareScrollView,
} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {View} from 'react-native';
import {useFormik} from 'formik';
import {LOGIN_FORM_SCHEME} from '@screens/Auth/AddNewAccount/validate';

interface AddNewAccountViewProps {
  onSubmit: (data: LoginParams) => void;
  usernameValue?: string;
}

export interface AddNewAccountViewRef {
  setLoadingState: (status: boolean) => void;
}

export type LoginParams = {
  username: string;
  password: string;
};
const initValues: LoginParams = {
  username: '',
  password: '',
};

const AddNewAccountView = forwardRef<
  AddNewAccountViewRef,
  AddNewAccountViewProps
>(({onSubmit, usernameValue}, ref) => {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: values => {
      onSubmit(values);
    },
    validationSchema: LOGIN_FORM_SCHEME,
  });

  useImperativeHandle(ref, () => ({
    setLoadingState: (status: boolean) => {
      setLoading(status);
    },
  }));

  useEffect(() => {
    if (!_.isEmpty(usernameValue)) {
      formik.setFieldValue('username', usernameValue);
    }
  }, [usernameValue]);

  return (
    <AppContainer style={styles.container}>
      <AwareScrollView isScrollEnabled={false} keyboardShouldPersistTaps={true}>
        <AppImage
          containerStyle={styles.igImage}
          source={require('@assets/image/instagram-logo.png')}
        />
        <View style={styles.inputField}>
          <AppFormInput
            autoFocus
            placeholder="Username, email or mobile number"
            onChangeText={value =>
              formik.setFieldValue('username', value.toLowerCase())
            }
            value={formik.values.username}
            messageError={formik.errors.username}
            error={formik.touched.username && !!formik.errors.username}
          />
          <AppFormInput
            value={formik.values.password}
            autoFocus={!_.isEmpty(usernameValue)}
            placeholder="Password"
            onChangeText={value => formik.setFieldValue('password', value)}
            secureTextEntry={true}
            messageError={formik.errors.password}
            error={formik.touched.password && !!formik.errors.password}
          />
          <AppButton
            onPress={formik.handleSubmit}
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
});
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
    // borderWidth: 1,
    // borderColor: colors.border,
    // borderRadius: 10,
    // padding: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    marginTop: 40,
  },
});
