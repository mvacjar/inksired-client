import styles from './changePassword.module.scss';

import { useFormik } from 'formik';
import { initialValues, validationSchema } from './ChangePassword.form';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/api';

const userCtrl = new User();

export function ChangePassword() {
  const { user, logout, updateUser } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user.password),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        await userCtrl.updateMe(user.id, { password: values.password });
        updateUser('email', values.password);
        logout();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <input
          type='password'
          className={styles.input}
          name='password'
          placeholder='New password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password ? 'true' : 'false'}
        />

        <input
          type='password'
          className={styles.input}
          name='repeatPassword'
          placeholder='Repeat password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.repeatPassword ? 'true' : 'false'}
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
      {formik.errors.password && formik.touched.password && (
        <div className={styles.errorMessage}>{formik.errors.password}</div>
      )}
      {formik.errors.repeatPassword && formik.touched.repeatPassword && (
        <div className={styles.errorMessage}>
          {formik.errors.repeatPassword}
        </div>
      )}
    </>
  );
}
