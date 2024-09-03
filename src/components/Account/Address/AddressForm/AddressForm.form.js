import * as Yup from 'yup';

export function initialValues(address) {
  return {
    title: address?.title || '',
    name: address?.name || '',
    address: address?.address || '',
    city: address?.city || '',
    country: address?.country || '',
    postal_code: address?.postal_code || '',
    telephone: address?.telephone || '',
  };
}

export function validationSchema() {
  return Yup.object({
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    country: Yup.string().required(true),
    postal_code: Yup.number().required(true),
    telephone: Yup.number().required(true),
  });
}
