import styles from './addressForm.module.scss';
import { useFormik } from 'formik';
import { Address } from '@/api';
import { useAuth } from '@/hooks';
import { initialValues, validationSchema } from './AddressForm.form';

const addressCtrl = new Address();

export function AddressForm(props) {
  const { onClose, onReload, addressId, address } = props;
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(address || {}),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        if (addressId) {
          await addressCtrl.update(values, addressId);
        } else {
          await addressCtrl.create(values, user.id);
        }
        formik.handleReset();
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
      <div className={styles.inputsContainer}>
        <input
          type='text'
          name='title'
          className={styles.inputSmall}
          placeholder='Title'
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <input
          type='text'
          name='name'
          className={styles.inputSmall}
          placeholder='Address name'
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>
      <input
        type='text'
        name='address'
        className={styles.input}
        placeholder='Your address'
        value={formik.values.address}
        onChange={formik.handleChange}
      />
      <div className={styles.inputsContainer}>
        <input
          type='text'
          name='city'
          className={styles.inputSmall}
          placeholder='City'
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <input
          type='text'
          name='country'
          className={styles.inputSmall}
          placeholder='Country'
          value={formik.values.country}
          onChange={formik.handleChange}
        />
      </div>
      <div className={styles.inputsContainer}>
        <input
          type='number'
          name='postal_code'
          className={styles.inputSmall}
          placeholder='Postal code'
          value={formik.values.postal_code}
          onChange={formik.handleChange}
        />
        <input
          type='number'
          name='telephone'
          className={styles.inputSmall}
          placeholder='Phone number'
          value={formik.values.telephone}
          onChange={formik.handleChange}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          type='submit'
          className={styles.saveButton}
          disabled={formik.isSubmitting}
        >
          Send
        </button>
      </div>
    </form>
  );
}
