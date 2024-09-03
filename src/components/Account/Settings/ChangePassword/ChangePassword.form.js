import * as Yup from 'yup';

export function initialValues(password = '', repeatPassword = '') {
  return {
    password,
    repeatPassword,
  };
}

export function validationSchema() {
  return Yup.object({
    password: Yup.string().min(3, 'Too short').required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
}
