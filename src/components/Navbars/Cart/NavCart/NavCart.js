import styles from './navCart.module.scss';
import Image from 'next/image';
import router from 'next/router';

export function NavCart() {
  const toHome = () => {
    router.push('/');
  };

  const toBack = () => {
    router.back();
    router.reload();
  };

  return (
    <>
      <nav className={styles.navCartContainer}>
        <section className={styles.sectionCartContainer}>
          <div className={styles.arrowContainer}>
            <Image
              src='/images/leftarrowlight.svg'
              width={25}
              height={25}
              alt='arrow-icon'
              className={styles.arrow}
              onClick={toBack}
            />
          </div>
          <div className={styles.logoContainer}>
            <Image
              src='/images/logo_dark.svg'
              width={150}
              height={150}
              alt='cart-icon'
              className={styles.logo}
              onClick={toHome}
            />
          </div>
        </section>
      </nav>
    </>
  );
}
