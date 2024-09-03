import Link from 'next/link';
import Image from 'next/image';
import { map } from 'lodash';
import styles from './gridWishlist.module.scss';
import { Label, WishListIcon } from '@/components/Shared';
import { CalcDiscountPrice } from '@/utils';

export function GridWishlist(props) {
  const { wishlist, onReload } = props;

  return (
    <section className={styles.gridContainer}>
      {map(wishlist, (item) => {
        const book = item.attributes.book.data;
        const originalPrice = book.attributes.price;
        const discount = book.attributes.discount;
        const finalPrice = CalcDiscountPrice(originalPrice, discount);
        const saga = book.attributes.sagas?.data?.attributes;
        const sagaTitle = saga?.saga_title || 'Unknown Saga';
        const sagaName = saga?.saga_name;

        return (
          <div key={book.id} className={styles.bookContainer}>
            <div className={styles.bookLinkContainer}>
              <Link
                href={`/book/${book.attributes.slug_title}`}
                className={styles.bookLink}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={book.attributes.cover.data.attributes.url}
                    alt={`Image ${item.id + 1}`}
                    width={200}
                    height={300}
                    className={styles.bookCover}
                  />
                  {discount > 0 && (
                    <Label.Discount className={styles.discount}>
                      {`-${discount}%`}
                    </Label.Discount>
                  )}
                </div>
              </Link>
              <div className={styles.iconHeartContainer}>
                <WishListIcon bookId={book.id} removeCallBack={onReload} />
              </div>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.titleContainer}>
                <h2 className={styles.titleBook}>
                  <span className={styles.orderBook}>
                    #{book.attributes.order_in_saga}&nbsp;
                  </span>
                  {book.attributes.title}
                </h2>
              </div>
              <h2 className={styles.authorBook}>
                {book.attributes.authors.data.map((author) => (
                  <Link
                    key={author.id}
                    href={`/author/${author.attributes.author_slug}`}
                  >
                    <p className={styles.author}>
                      {author.attributes.name_author}
                    </p>
                  </Link>
                ))}
              </h2>
              {sagaName && (
                <Link href={`/saga/${sagaName}`} className={styles.sagaLink}>
                  <p className={styles.sagaTitle}>{sagaTitle}</p>
                </Link>
              )}
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
          </div>
        );
      })}
    </section>
  );
}
