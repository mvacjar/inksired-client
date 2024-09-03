import { useState, useEffect } from 'react';
import styles from './navHorizontal.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth, useCart } from '@/hooks';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export default function NavHorizontal() {
  const { user } = useAuth();
  const { total } = useCart();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  // Routing for icons

  const toCart = () => {
    router.push('/cart');
  };

  const toLogin = () => {
    router.push('/join/sign-in');
  };

  const toSignUp = () => {
    router.push('/join/sign-up');
  };

  // Search bar functionality

  useEffect(() => {
    setSearchValue(router.query.s || '');
  }, [router.query]);

  const handleSearchOnChange = (e) => setSearchValue(e.target.value);

  const handleClearInput = (e) => {
    e.preventDefault();
    setSearchValue('');
  };

  const handleOnChange = (e) => {
    handleSearchOnChange(e);
  };

  // Clean search input and redirect to search page

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedValue = searchValue.trim();

    if (trimmedValue) {
      const capitalizedValue =
        trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
      router.push({
        pathname: '/search',
        query: { s: capitalizedValue },
      });
    }
  };

  // Theme colors for the badge

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#96503e',
      },
    },
    typography: {
      fontFamily: 'ABeeZee, sans-serif',
    },
  });

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <nav className={styles.navbar}>
          <div className={styles.imageWrapper}>
            <div className={styles.narbarWrapper}>
              <div className={styles.narbarContainer}>
                <div className={styles.searchContainer}>
                  <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                      id='searchBar'
                      type='text'
                      className={styles.searchInput}
                      placeholder='Search...'
                      value={searchValue}
                      onChange={handleOnChange}
                    />
                    <div className={styles.searchIconWrapper}>
                      <div className={styles.searchIconContainer}>
                        <Image
                          src='/images/xBlue.svg'
                          width={20}
                          height={20}
                          alt='clear-icon'
                          className={styles.xIcon}
                          onClick={handleClearInput}
                          title='Delete'
                        />
                        <button type='submit' className={styles.searchButton}>
                          <Image
                            src='/images/search.svg'
                            width={21}
                            height={21}
                            alt='search-icon'
                            className={styles.searchIcon}
                            title='Search'
                          />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  {user ? (
                    <div className={styles.cartIconContainer}>
                      <Badge badgeContent={total} color='primary'>
                        <Image
                          src='/images/cart.svg'
                          width={45}
                          height={45}
                          alt='cart-icon'
                          className={styles.cartIcon}
                          onClick={toCart}
                          title='Shopping Cart'
                        />
                      </Badge>
                    </div>
                  ) : (
                    <div className={styles.buttonContainer}>
                      <button className={styles.buttonIn} onClick={toLogin}>
                        Sign In
                      </button>
                      <button className={styles.buttonUp} onClick={toSignUp}>
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </ThemeProvider>
    </>
  );
}
