import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import router from 'next/router';
import classNames from 'classnames';
import styles from './hamburgerMenu.module.scss';
import Image from 'next/image';

export default function HamburgerMenu({ isSpan }) {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const menuRef = useRef(null);
  const clickOutRef = useRef(null);

  useEffect(() => {
    if (!openMenu && menuRef.current) {
      menuRef.current.style.display = 'none';
    }
  }, []);

  useEffect(() => {
    const menu = menuRef.current;

    if (openMenu) {
      menu.style.display = 'block';
    } else {
      const handleAnimationEnd = () => {
        if (!openMenu) {
          menu.style.display = 'none';
        }
      };
      menu.addEventListener('animationend', handleAnimationEnd);
      return () => {
        menu.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [openMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clickOutRef.current && !clickOutRef.current.contains(event.target)) {
        setOpenMenu(false);
        setShouldAnimate(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toAccount = () => {
    router.push('/account');
  };

  const toLogout = () => {
    logout();
    router.push('/');
  };

  const toggleMenu = () => {
    setShouldAnimate(true);
    setOpenMenu((prevOpenMenu) => !prevOpenMenu);
  };

  return (
    <div className={styles.hamburgerMenu} ref={clickOutRef}>
      <Image
        src='/images/logo.svg'
        width={45}
        height={45}
        alt='icon-menu'
        className={`${styles.logo} ${
          shouldAnimate && (openMenu ? styles.spinLeft : styles.spinRight)
        }`}
        onClick={toggleMenu}
      />

      <nav
        ref={menuRef}
        className={`${styles.dropdownMenu} ${
          shouldAnimate && (openMenu ? styles.slideRight : styles.slideLeft)
        }`}
      >
        <section className={styles.menuContainer}>
          <div className={classNames({ [styles.linkTop]: user })}>
            <p
              className={styles.linkTitle}
              name='user'
              onClick={user ? toAccount : () => {}}
            >
              {user ? 'My profile' : ''}
            </p>

            {user && <span className={styles.line}></span>}
          </div>

          <div className={styles.linkTop}>
            <p className={styles.linkTitle}>Contact</p>
            <span className={styles.line}></span>
          </div>

          <div className={styles.linkTop}>
            <p className={styles.linkTitle}>About Us</p>
            {user && <span className={styles.line}></span>}
          </div>

          <div className={classNames({ [styles.linkTop]: user })}>
            <p
              className={styles.linkTitle}
              name='user'
              onClick={user ? toLogout : () => {}}
            >
              {user ? 'Log Out' : ''}
            </p>
          </div>
        </section>
      </nav>
    </div>
  );
}
