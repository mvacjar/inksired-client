import styles from './LoginForm.module.scss';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import { useRouter } from 'next/router';
import { Auth } from '@/api';
import { useAuth } from '@/hooks/useAuth';

const authCtrl = new Auth();

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validationOnChange: false,
    onSubmit: async (values) => {
      try {
        const response = await authCtrl.login(values);
        login(response.jwt);
      } catch (error) {
        if (error.message === 'Email or Username incorrect') {
          alert('The email or password is incorrect.');
        } else {
          alert(`Error: ${error.message || JSON.stringify(error)}`);
        }
      }
    },
  });

  return (
    <>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <input
          name='identifier'
          type='text'
          placeholder='email or username'
          className={styles.inputSign}
          value={formik.values.identifier}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.identifier
              ? formik.errors.identifier.toString()
              : undefined
          }
        />
        {formik.errors.identifier && formik.touched.identifier && (
          <div className={styles.errorMessage}>{formik.errors.identifier}</div>
        )}
        <input
          type='password'
          placeholder='password'
          className={styles.inputSign}
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password && (
          <div className={styles.errorText}>{formik.errors.password}</div>
        )}

        <button
          className={styles.signInButton}
          type='submit'
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </>
  );
}
