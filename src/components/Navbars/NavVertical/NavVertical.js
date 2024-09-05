import styles from './navVertical.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import router from 'next/router';

export default function NavVertical() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Logic to keep wrap the navbar

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleMenu = (e) => {
    setShouldAnimate(true);
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  // Routers

  const toAccount = () => {
    router.push('/account');
  };

  const toLogout = () => {
    logout();
    router.push('/');
  };

  const toHome = () => {
    router.push('/');
  };

  const toLogin = () => {
    router.push('/join/sign-in');
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.peakSuperiorContainerNotMove}>
        <Image
          src='/images/peak-superior.svg'
          alt='peak'
          width={90}
          height={54}
        />
      </div>
      <div className={styles.logoContainer} onClick={handleToggle}>
        <Image
          src='/images/logo.svg'
          width={45}
          height={45}
          alt='icon-menu'
          className={`${styles.logo} ${
            shouldAnimate && (openMenu ? styles.pullDown : styles.pullUp)
          }`}
          onClick={toggleMenu}
        />
      </div>
      <nav
        className={`${styles.navbar}  ${
          isOpen ? styles.slideDown : styles.slideUp
        } `}
      >
        <div className={styles.peakSuperiorContainerMove}>
          <Image
            src='/images/peak-superior.svg'
            alt='peak'
            width={90}
            height={54}
          />
        </div>
        <div className={styles.menuContainer}>
          <div className={styles.linksContainer}>
            <Link href='/' className={styles.link}>
              <Image
                src='/images/home.svg'
                width={35}
                height={35}
                alt='icon-menu'
                className={styles.icon}
                onClick={toHome}
                title='Home Page'
              />
            </Link>
            {!user ? (
              <Link href='/' className={styles.link}>
                <Image
                  src='/images/login.svg'
                  width={35}
                  height={35}
                  alt='icon-menu'
                  className={styles.icon}
                  onClick={toLogin}
                  title='Sign In'
                />
              </Link>
            ) : (
              ''
            )}
            {/* <Link href='/forum' className={styles.link}>
              <Image
                src='/images/pen.svg'
                width={35}
                height={35}
                alt='icon-menu'
                className={styles.icon}
                title='Forum'
              />
            </Link> */}
            {/* <Link href='/bookshelf' className={styles.link}>
              {user ? (
                <Image
                  src='/images/shelf.svg'
                  width={35}
                  height={35}
                  alt='icon-menu'
                  className={styles.icon}
                  title='My Wishlist'
                />
              ) : (
                ''
              )}
            </Link> */}
            <Link href='/favourites' className={styles.link}>
              {user ? (
                <Image
                  src='/images/shelf.svg'
                  width={35}
                  height={35}
                  alt='icon-menu'
                  className={styles.icon}
                  title='My Wishlist'
                />
              ) : (
                ''
              )}
            </Link>
            <Link
              href='/account'
              className={styles.link}
              onClick={user ? toAccount : () => {}}
            >
              {user ? (
                <Image
                  src='/images/gear.svg'
                  width={35}
                  height={35}
                  alt='icon-menu'
                  className={styles.icon}
                  title='My Settings'
                />
              ) : (
                ''
              )}
            </Link>
            <Link
              href='/join/sign-in'
              className={styles.link}
              onClick={user ? toLogout : () => {}}
            >
              {user ? (
                <Image
                  src='/images/logout.svg'
                  width={33}
                  height={33}
                  alt='icon-menu'
                  className={styles.icon}
                  title='Logout'
                />
              ) : (
                ''
              )}
            </Link>
          </div>
          <div className={styles.titleNavContainer}>
            <Link href='/'>
              <Image
                src='/images/logo_dark.svg'
                width={90}
                height={90}
                alt='logo-menu'
                priority
                className={styles.titleNav}
                title='Home Page'
              />
            </Link>
          </div>
          <div className={styles.peakInferiorContainer}>
            <Image
              src='/images/peak-inferior.svg'
              alt='peak'
              width={80}
              height={60}
              className={styles.peakInferior}
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
