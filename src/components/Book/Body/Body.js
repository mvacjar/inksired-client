import { useState } from 'react';
import styles from './body.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Label } from '@/components/Shared';
import { WishListIcon } from '@/components/Shared';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import { useCart } from '@/hooks';

export function Body(props) {
  const { cover, alt, bookId, bookInfo, originalPrice, discount, finalPrice } =
    props;
  const [loading, setLoading] = useState(false);
  const { addCart } = useCart();
  const addCartWrapper = () => {
    setLoading(true);
    addCart(bookId);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const hasSagaNumber = bookInfo.order_in_saga !== 0;
  const hasSaga = bookInfo.sagas?.data?.attributes?.saga_title ?? '';

  const validOriginalPrice =
    typeof originalPrice === 'number' && !isNaN(originalPrice);
  const validDiscount = typeof discount === 'number' && !isNaN(discount);
  const validFinalPrice = typeof finalPrice === 'number' && !isNaN(finalPrice);

  return (
    <>
      <article
        id={`book-${bookId}`}
        className={styles.bookDescriptionContainer}
      >
        <div className={styles.bookContainer}>
          <div className={styles.iconHeartContainer}>
            <Image
              src={cover}
              alt={alt}
              title={alt}
              width={200}
              height={300}
              className={styles.bookCover}
            />
            {validDiscount && discount > 0 && (
              <Label.Discount className={styles.discount}>
                {`-${discount}%`}
              </Label.Discount>
            )}
            {validOriginalPrice && (
              <div className={styles.priceContainer}>
                {validDiscount && discount > 0 ? (
                  <>
                    <span className={styles.originalPrice}>
                      {originalPrice.toFixed(2)}€
                    </span>
                    {validFinalPrice && (
                      <span className={styles.discountedPrice}>
                        {finalPrice.toFixed(2)}€
                      </span>
                    )}
                  </>
                ) : (
                  <span className={styles.regularPrice}>
                    {originalPrice.toFixed(2)}€
                  </span>
                )}
              </div>
            )}
            <div className={styles.iconHeart}>
              <WishListIcon bookId={bookId} />
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={`${styles.buyBtn} ${loading ? styles.loading : ''}`}
              onClick={addCartWrapper}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={20} thickness={4} />
              ) : (
                'Add to bag'
              )}
            </button>
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{bookInfo.title}</h2>
            <div className={styles.stock}>
              <CheckIcon fontSize='small' className={styles.checkIcon} /> In
              stock
            </div>
          </div>
          <Link
            href={`/author/${bookInfo.authors.data[0].attributes.author_slug}`}
            className={styles.authorContainer}
          >
            <h3 className={styles.author}>
              {bookInfo.authors.data[0].attributes.name_author}
            </h3>
          </Link>
          <div className={styles.sagaWrapper}>
            <Link href={`/saga/${bookInfo.sagas?.data?.attributes?.saga_name}`}>
              <div className={styles.sagaContainer}>
                {hasSaga ? (
                  <>
                    <span className={styles.sagaPretitle}>Saga:</span>{' '}
                    <span className={styles.sagaTitle}>
                      {bookInfo.sagas?.data?.attributes?.saga_title}
                    </span>
                  </>
                ) : (
                  <p style={{ display: 'none' }}></p>
                )}
              </div>
            </Link>

            <p className={styles.sagaOrder}>
              {hasSagaNumber ? `#${bookInfo.order_in_saga}` : ''}
            </p>
          </div>

          <p className={styles.synopsis}>{bookInfo.synopsis}</p>
          <div>
            <p className={styles.language}>
              Page number:&nbsp;
              <span className={styles.language}>{bookInfo.page_number}</span>
            </p>
            <p className={styles.publication}>
              Publication date:&nbsp;
              <span className={styles.publication}>
                {bookInfo.publication_date}
              </span>
            </p>
            <p className={styles.publisher}>
              Publisher:&nbsp;
              <span className={styles.publisher}>{bookInfo.publisher}</span>
            </p>
          </div>

          <div className={styles.genresContainer}>
            {bookInfo.literary_genres.data.map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.attributes.slug_genres}`}
              >
                <p className={styles.genres}>#{genre.attributes.title} </p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
