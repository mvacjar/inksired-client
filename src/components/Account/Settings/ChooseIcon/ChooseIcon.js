import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Icon, User } from '@/api';
import styles from './chooseIcon.module.scss';
import { initialValues, validationSchema } from './ChooseIcon.form';
import { useAuth } from '@/hooks';

const iconCtrl = new Icon();
const userCtrl = new User();

export function ChooseIcon() {
  const { user, updateUser } = useAuth();
  const [icons, setIcons] = useState(null);
  const [selectedIconUrl, setSelectedIconUrl] = useState(null);

  // Formik setup
  const formik = useFormik({
    initialValues: initialValues(user.icon),
    validationSchema: validationSchema(),
    validationOnChange: false,
    onSubmit: async (values) => {
      try {
        await userCtrl.updateMe(user.id, { icon: values.icon });
        updateUser({ icon: values.icon });
        setTimeout(() => {
          window.location.reload();
        }, 0);
      } catch (error) {
        console.error('Error choosing icon:', error);
      }
    },
  });

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
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <div className={styles.formContainer}>
        <div className={styles.wrapper}>
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
              error={formik.errors.icon}
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
            <button
              type='submit'
              disabled={formik.isSubmitting}
              className={styles.saveButton}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
