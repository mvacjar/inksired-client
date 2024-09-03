import * as Yup from 'yup';

export function initialValues(icon) {
  return {
    icon: icon,
  };
}

export function validationSchema() {
  return Yup.object().shape({
    icon: Yup.mixed().required(true),
  });
}
