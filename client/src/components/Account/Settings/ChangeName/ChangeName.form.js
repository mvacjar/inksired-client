import * as Yup from 'yup';

export function initialValues(username, name) {
  return {
    username,
    name,
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required(true),
    name: Yup.string().required(true),
  });
}
