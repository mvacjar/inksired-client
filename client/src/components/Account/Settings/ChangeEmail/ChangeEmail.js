import styles from './changeEmail.module.scss';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangeEmail.form';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/api';

const userCtrl = new User();

export function ChangeEmail() {
  const { user, updateUser } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user.email, ''),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await userCtrl.updateMe(user.id, { email: values.email });
        updateUser({ email: values.email, repeatEmail: values.email });
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
          name='email'
          placeholder={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email ? 'true' : 'false'}
        />
        <input
          type='email'
          className={styles.input}
          name='repeatEmail'
          placeholder='Repeat email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatEmail}
          error={formik.errors.repeatEmail ? 'true' : 'false'}
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
      <div className={styles.errorContainer}>
        {formik.errors.email && formik.touched.email && (
          <div className={styles.errorMessage}>{formik.errors.email}</div>
        )}
        {formik.errors.repeatEmail && formik.touched.repeatEmail && (
          <div className={styles.errorMessage}>{formik.errors.repeatEmail}</div>
        )}
      </div>
    </>
  );
}
