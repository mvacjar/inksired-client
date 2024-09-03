import styles from './changeName.module.scss';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeName.form';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/api';

const userCtrl = new User();

export function ChangeName() {
  const { user, updateUser } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user.username, user.name),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await userCtrl.updateMe(user.id, values);
        updateUser({ username: values.username, name: values.name });
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <input
          type='text'
          className={styles.input}
          name='username'
          placeholder={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username ? 'true' : 'false'}
        />
        <input
          type='text'
          className={styles.input}
          name='name'
          placeholder={formik.values.name || ''}
          onChange={formik.handleChange}
          error={formik.errors.name ? 'true' : 'false'}
        />
        <div className={styles.buttonContainer}>
          <button
            type='submit'
            disabled={formik.isSubmitting}
            className={styles.saveButton}
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
