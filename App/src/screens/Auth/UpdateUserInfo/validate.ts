import * as Yup from 'yup';

export const UPDATE_USER_PROFILE_FORM_SCHEME = Yup.object().shape({
  name: Yup.string()
    .required('This field is required')
    .min(6, 'Username has a minimum length of 6'),
  email: Yup.string()
    .required('This field is required')
    .email('Please enter a valid email address'),
  bio: Yup.string().required('This field is required'),
});
