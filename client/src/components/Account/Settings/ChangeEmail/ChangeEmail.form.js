import * as Yup from 'yup';

export function initialValues(email, repeatEmail) {
  return {
    email,
    repeatEmail,
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    repeatEmail: Yup.string()
      .oneOf([Yup.ref('email'), null], 'Emails must match')
      .email('Invalid email')
      .required('Required'),
  });
}
