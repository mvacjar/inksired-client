import styles from './gridbooks.module.scss';
import { map } from 'lodash';
import { CalcDiscountPrice } from '@/utils';
import { Label } from '@/components/Shared';
import Image from 'next/image';
import Link from 'next/link';
import { WishListIcon } from '@/components/Shared';

export function GridBooks(props) {
  const { books } = props;

  return (
    <>
      <div className={styles.wrapper}>
        {map(books, (book, index) => {
          const originalPrice = book.attributes.price;
          const discount = book.attributes.discount;
          const finalPrice = CalcDiscountPrice(originalPrice, discount);

          // Accede a saga_title y saga_name de manera segura
          const sagaAttributes = book.attributes.sagas?.data?.attributes || {};
          const sagaTitle = sagaAttributes.saga_title || 'No Saga';
          const sagaName = sagaAttributes.saga_name || '';

          // Accede a los autores
          const authors = book.attributes.authors?.data || [];

          return (
            <div key={book.id} className={styles.bookContainer}>
              <Link
                href={`/book/${book.attributes.slug_title}`}
                className={styles.book}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={book.attributes.cover.data.attributes.url}
                    alt={`Image ${index + 1}`}
                    width={200}
                    height={300}
                    className={styles.bookCover}
                  />
                  {discount > 0 && (
                    <Label.Discount className={styles.discount}>
                      {`-${discount}%`}
                    </Label.Discount>
                  )}
                  <div className={styles.iconHeart}>
                    <WishListIcon bookId={book.id} />
                  </div>
                </div>
              </Link>
              <div className={styles.infoContainer}>
                <h2 className={styles.titleBook}>{book.attributes.title}</h2>

                {authors.length > 0
                  ? authors.map((author) => (
                      <Link
                        key={author.id}
                        href={`/author/${author.attributes.author_slug}`}
                        className={styles.authorLink}
                      >
                        <h3 className={styles.authors}>
                          {author.attributes.name_author}
                        </h3>
                      </Link>
                    ))
                  : 'Unknown Author'}

                <div className={styles.sagaContainer}>
                  <span className={styles.sagaOrder}>
                    #{book.attributes.order_in_saga}&nbsp;
                  </span>
                  <Link href={`/saga/${sagaName}`} className={styles.sagaLink}>
                    <span className={styles.sagaTitle}>{sagaTitle}</span>
                  </Link>
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
            </div>
          );
        })}
      </div>
    </>
  );
}
