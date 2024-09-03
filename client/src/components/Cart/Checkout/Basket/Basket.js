import styles from './basket.module.scss';
import { useState } from 'react';
import { map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { CalcDiscountPrice } from '@/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCart } from '@/hooks';

export default function Basket(props) {
  const { books } = props;
  const { changeQuantityItem, deleteItem } = useCart();

  const options = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
    { key: 5, text: '5', value: 5 },
    { key: 6, text: '6', value: 6 },
    { key: 7, text: '7', value: 7 },
    { key: 8, text: '8', value: 8 },
    { key: 9, text: '9', value: 9 },
    { key: 10, text: '10', value: 10 },
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: '#96503e',
      },
      secondary: {
        main: '#947a65',
      },
    },
    typography: {
      fontFamily: 'ABeeZee, sans-serif',
    },
  });

  return (
    <div className={styles.basketContainer}>
      <h1 className={styles.basketTitle}>Your bag</h1>
      <div className={styles.basketBooksList}>
        {map(books, (book) => {
          const { attributes } = book;
          const coverUrl = attributes?.cover?.data?.attributes?.url || '';
          const title = attributes?.title || 'Unknown Title';

          const authors =
            attributes.authors?.data[0]?.attributes?.name_author ??
            'Unknown Author';
          const linkAuthor = attributes.authors.data[0].attributes.author_slug;

          const saga = attributes?.sagas?.data?.attributes?.saga_title || '';
          const orderSaga = attributes?.order_in_saga || '';
          const linkSaga = attributes?.sagas?.data?.attributes?.saga_name || '';
          const hasSaga = attributes.sagas?.data?.attributes?.saga_title ?? '';

          const originalPrice = book.attributes.price;
          const discount = book.attributes.discount;
          const finalPrice = CalcDiscountPrice(originalPrice, discount);

          const firstValue = book.quantity;

          return (
            <div className={styles.basketBooks} key={book.id}>
              <div className={styles.basketBooksCover}>
                {coverUrl && (
                  <Image
                    src={coverUrl}
                    alt={title}
                    width={200}
                    height={300}
                    className={styles.bookCover}
                  />
                )}
              </div>
              <div className={styles.bookInfoWrapper}>
                <div className={styles.booksInfo}>
                  <h6 className={styles.title}>{title}</h6>
                  <Link href={`/author/${linkAuthor}`}>
                    <div className={styles.authors}>{authors}</div>
                  </Link>
                  <div className={styles.sagaWrapper}>
                    <Link href={`/saga/${linkSaga}`}>
                      <div className={styles.sagaContainer}>
                        {hasSaga ? (
                          <>
                            <span className={styles.sagaPretitle}>Saga:</span>{' '}
                            <span className={styles.sagaTitle}>{saga}</span>
                          </>
                        ) : (
                          <p style={{ display: 'none' }}></p>
                        )}
                      </div>
                    </Link>
                    <p className={styles.sagaOrder}>
                      {orderSaga ? `#${attributes?.order_in_saga}` : ''}
                    </p>
                  </div>
                  <div className={styles.priceContainer}>
                    {discount > 0 ? (
                      <>
                        <span className={styles.originalPrice}>
                          {originalPrice.toFixed(2)}€
                        </span>
                        <span className={styles.discountedPrice}>
                          {finalPrice.toFixed(2)}€
                        </span>
                      </>
                    ) : (
                      <span className={styles.regularPrice}>
                        {originalPrice.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>
                <div className={styles.quantity}>
                  <div>
                    <ThemeProvider theme={theme}>
                      <Box
                        sx={{
                          minWidth: 40,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          gap: '1rem',
                        }}
                        size='small'
                      >
                        <FormControl
                          sx={{
                            m: 1,
                            minWidth: 35,
                          }}
                          size='small'
                        >
                          <Select
                            value={firstValue}
                            onChange={(event) => {
                              changeQuantityItem(book.id, event.target.value);
                            }}
                            displayEmpty
                            sx={{ padding: '4px 10px' }}
                          >
                            {options.map((option) => (
                              <MenuItem key={option.key} value={option.value}>
                                {option.text}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </ThemeProvider>
                  </div>
                  <div>
                    <DeleteIcon
                      sx={(theme) => ({
                        mt: 1,
                        color: theme.palette.primary.main,
                        cursor: 'pointer',
                        marginRight: '1rem',
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'scale(1.2)',
                        },
                        '&:active': {
                          transform: 'scale(1)',
                        },
                      })}
                      onClick={() => deleteItem(book.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
