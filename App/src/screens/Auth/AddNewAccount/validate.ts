import * as Yup from 'yup';

export const LOGIN_FORM_SCHEME = Yup.object().shape({
  username: Yup.string()
    .required('This field is required')
    .min(6, 'Username has a minimum length of 6'),
  password: Yup.string()
    .required('This field is required')
    .min(6, 'Password has a minimum length of 6'),
});
