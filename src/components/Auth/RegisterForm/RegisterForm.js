import styles from './RegisterForm.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import {
  initialValues,
  validationSchema,
} from '@/components/Auth/RegisterForm/RegisterForm.form';
import { Auth, Icon } from '@/api';

const authCtrl = new Auth();
const iconCtrl = new Icon();

export default function RegisterForm() {
  const router = useRouter();

  // Formik setup
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const result = await authCtrl.register(values);
        router.push('/join/sign-in');
      } catch (error) {
        console.error('Error registering user:', error);

        if (error.message === 'Email or Username are already taken') {
          alert('The email or username is already in use.');
        } else {
          alert(`Error: ${error.message || JSON.stringify(error)}`);
        }
      }
    },
  });

  // Fetch list of icons
  const [icons, setIcons] = useState(null);
  const [selectedIconUrl, setSelectedIconUrl] = useState(null);

  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const resultIcon = await iconCtrl.getAllIcons();
        setIcons(resultIcon.data);
      } catch (error) {
        console.error('Error fetching icons:', error);
      }
    };

    fetchIcons();
  }, []);

  return (
    <>
      <article className={styles.formSignUpContainer}>
        <h1 className={styles.textPopUp}>Sign Up</h1>
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              name='icon'
              value={formik.values.icon}
              onChange={(e) => {
                formik.handleChange(e);
                const selectedIcon = icons.find(
                  (icon) => icon.id === parseInt(e.target.value)
                );

                setSelectedIconUrl(
                  selectedIcon
                    ? selectedIcon.attributes.icon.data.attributes.url
                    : null
                );
              }}
              onBlur={formik.handleBlur}
            >
              <option className={styles.placeholder}>Select an icon</option>
              {icons &&
                icons.map((icon) => (
                  <option
                    className={styles.option}
                    key={icon.id}
                    value={icon.id}
                  >
                    {icon.attributes.icon_name}
                  </option>
                ))}
            </select>
            {selectedIconUrl && (
              <div className={styles.iconPreview}>
                <Image
                  src={selectedIconUrl}
                  alt='Selected Icon'
                  className={styles.iconImage}
                  width={80}
                  height={80}
                />
              </div>
            )}
          </div>

          <input
            name='username'
            type='text'
            placeholder='username'
            className={styles.inputSign}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={formik.errors.username ? 'true' : 'false'}
          />
          <input
            name='name'
            type='text'
            placeholder='name'
            className={styles.inputSign}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name ? 'true' : 'false'}
          />
          <input
            name='email'
            type='email'
            placeholder='email'
            className={styles.inputSign}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.errors.email ? 'true' : 'false'}
          />
          <input
            name='password'
            type='password'
            placeholder='password'
            className={styles.inputSign}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.errors.password ? 'true' : 'false'}
          />
          {formik.errors.password && formik.touched.password && (
            <div className={styles.errorMessage}>{formik.errors.password}</div>
          )}
          <input
            name='confirmPassword'
            type='password'
            placeholder='confirm password'
            className={styles.inputSign}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.errors.confirmPassword ? 'true' : 'false'}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <div className={styles.errorMessage}>
              {formik.errors.confirmPassword}
            </div>
          )}
          <button
            className={styles.buttonSignUp}
            type='submit'
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Loading...' : 'Sign Up'}
          </button>
        </form>
        <div className={styles.questionContainer}>
          <div className={styles.questionIn}>
            <div>
              <p>Do you already have an account?</p>
            </div>
            <Link href='/join/sign-in' className={styles.signInButtonLink}>
              <button className={styles.signInButton}>Sign In</button>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
