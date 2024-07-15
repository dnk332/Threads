import React, {forwardRef, useImperativeHandle} from 'react';
import {useFormik} from 'formik';
import {View} from 'react-native';

import {
  AppButton,
  AppContainer,
  AppFormInput,
  AppImage,
  AppText,
  DissmissKeyboardView,
} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {IUserProfile} from '@src/types/user';
import {UPDATE_USER_PROFILE_FORM_SCHEME} from './validate';
import ErrorCode from '@constants/errorCode';

interface IUserProfileSubset
  extends Pick<IUserProfile, 'name' | 'email' | 'bio'> {}

interface UpdateUserInfoViewProps {
  onUpdateUserProfile: (data: IUserProfileSubset) => void;
}

export interface UpdateUserInfoViewRef {
  onError: (code: string) => void;
}

const initValues: IUserProfileSubset = {
  name: '',
  email: '',
  bio: '',
};

const UpdateUserInfoView = forwardRef<
  UpdateUserInfoViewRef,
  UpdateUserInfoViewProps
>(({onUpdateUserProfile}, ref) => {
  const formik = useFormik({
    initialValues: initValues,
    onSubmit: values => {
      onUpdateUserProfile(values);
    },
    validationSchema: UPDATE_USER_PROFILE_FORM_SCHEME,
  });

  useImperativeHandle(ref, () => ({
    onError: (code: string) => {
      console.log('err code', code);
      if (code === ErrorCode.CONFLICT) {
        formik.setFieldError('email', 'This email is already taken.');
      }
    },
  }));

  return (
    <AppContainer style={styles.container}>
      <DissmissKeyboardView style={styles.content}>
        <AppText align="center" fontWeight={700} fontSize={26}>
          Update User Profile
        </AppText>
        <View style={styles.inputField}>
          <AppFormInput
            onChangeText={value =>
              formik.setFieldValue('name', value.toLowerCase())
            }
            value={formik.values.name}
            autoFocus
            placeholder="Username"
            style={styles.textInput}
            messageError={formik.errors.name}
            error={formik.touched.name && !!formik.errors.name}
          />
          <AppFormInput
            onChangeText={value =>
              formik.setFieldValue('email', value.toLowerCase())
            }
            value={formik.values.email}
            placeholder="Email"
            style={styles.textInput}
            messageError={formik.errors.email}
            error={formik.touched.email && !!formik.errors.email}
          />
          <AppFormInput
            onChangeText={formik.handleChange('bio')}
            value={formik.values.bio}
            placeholder="Bio"
            style={styles.textInput}
            messageError={formik.errors.bio}
            error={formik.touched.bio && !!formik.errors.bio}
          />
          <AppButton
            onPress={formik.handleSubmit}
            text="Update"
            buttonColor={colors.blue}
            buttonStyle={styles.button}
            borderRadius={100}
          />
          <AppImage
            containerStyle={styles.metaImage}
            source={require('@assets/image/meta-logo.png')}
          />
        </View>
      </DissmissKeyboardView>
    </AppContainer>
  );
});

export default UpdateUserInfoView;

const styles = AppStyleSheet.create({
  container: {
    marginTop: 0,
    paddingTop: 16,
  },
  inputField: {
    gap: 16,
    marginHorizontal: 16,
    flex: 1,
    marginVertical: 16,
  },
  textInput: {},
  button: {
    width: '100%',
    padding: 16,
  },
  metaImage: {
    width: 66,
    aspectRatio: 5,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '5%',
  },
  content: {
    justifyContent: 'space-around',
    height: '100%',
  },
});
