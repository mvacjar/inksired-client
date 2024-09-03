import * as Yup from 'yup';

export function initialValues() {
  return {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email('Invalid email').required(true),
    username: Yup.string().required(true),
    name: Yup.string().required(true),
    password: Yup.string().min(3, 'Too short').required(true),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });
}
