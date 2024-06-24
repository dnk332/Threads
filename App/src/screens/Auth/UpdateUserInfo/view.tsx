import React from 'react';
import {useFormik} from 'formik';

import {
  AppButton,
  AppContainer,
  AppFormInput,
  AppImage,
  AppText,
} from '@components';
import {AppStyleSheet} from '@themes/responsive';
import {colors} from '@themes/color';
import {View} from 'react-native';
import {DismissKeyboardView} from '@src/components/DissmissKeyboardView';
import {UserProfile} from '@src/types/user';
import {UPDATE_USER_PROFILE_FORM_SCHEME} from './validate';

interface UpdateUserInfoViewProps {
  onUpdateUserProfile: (data: UserProfile) => void;
}

const initValues: UserProfile = {
  name: '',
  email: '',
  bio: '',
};

const UpdateUserInfoView = ({onUpdateUserProfile}: UpdateUserInfoViewProps) => {
  const formik = useFormik({
    initialValues: {
      ...initValues,
    },
    onSubmit: values => {
      onUpdateUserProfile(values);
    },
    validationSchema: UPDATE_USER_PROFILE_FORM_SCHEME,
  });

  return (
    <AppContainer style={styles.container}>
      <DismissKeyboardView style={styles.content}>
        <AppText align="center" fontWeight={700} fontSize={26}>
          Update user profile
        </AppText>
        <View style={styles.inputField}>
          <AppFormInput
            onChangeText={value =>
              formik.setFieldValue('name', value.toLocaleLowerCase())
            }
            value={formik.values.name}
            autoFocus
            placeholder="Username"
            style={styles.textInput}
            messageError={formik.errors.name}
            error={formik.touched.name && formik.errors.name}
          />
          <AppFormInput
            onChangeText={value =>
              formik.setFieldValue('email', value.toLocaleLowerCase())
            }
            value={formik.values.email}
            placeholder="Email"
            style={styles.textInput}
            messageError={formik.errors.email}
            error={formik.touched.email && formik.errors.email}
          />
          <AppFormInput
            onChangeText={formik.handleChange('bio')}
            value={formik.values.bio}
            placeholder="Bio"
            style={styles.textInput}
            messageError={formik.errors.bio}
            error={formik.touched.bio && formik.errors.bio}
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
      </DismissKeyboardView>
    </AppContainer>
  );
};

export default UpdateUserInfoView;

const styles = AppStyleSheet.create({
  container: {marginTop: 0, paddingTop: 16},
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
    height: undefined,
    aspectRatio: 5,
    alignSelf: 'center',
    bottom: '5%',
    position: 'absolute',
  },
  content: {
    justifyContent: 'space-around',
    height: '100%',
  },
});
