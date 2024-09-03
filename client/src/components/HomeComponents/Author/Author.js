import styles from './author.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Label, Separator } from '@/components/Shared';
import { CalcDiscountPrice } from '@/utils';
import { groupBy, partition, map } from 'lodash';

export function Author(props) {
  const { author } = props;

  // Group books by saga title or 'No Saga'
  const booksGroupedBySaga = groupBy(
    author.attributes.books.data,
    (book) => book.attributes.sagas?.data?.attributes?.saga_title || 'No Saga'
  );

  // Isolate books by saga (those without a saga are those with 'No Saga')
  const [booksWithoutSaga, booksWithSaga] = partition(
    author.attributes.books.data,
    (book) => !book.attributes.sagas?.data?.attributes?.saga_title
  );

  // Check if there are books without a saga
  const hasBooksWithoutSaga = booksWithoutSaga.length > 0;

  return (
    <article className={styles.authorContainer}>
      <div className={styles.namecontainer}>
        <h1 className={styles.name}>{author.attributes.name_author}</h1>
      </div>

      {hasBooksWithoutSaga && (
        <>
          <div className={styles.titleBookscontainer}>
            <h2 className={styles.titleBooks}>Standalone Books</h2>
          </div>

          <section className={styles.booksContainer}>
            {booksWithoutSaga.map((book, index) => {
              const originalPrice = book.attributes.price;
              const discount = book.attributes.discount;
              const finalPrice = CalcDiscountPrice(originalPrice, discount);

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
                    </div>
                  </Link>
                  <div className={styles.infoContainer}>
                    <h2 className={styles.titleBook}>
                      {book.attributes.title}
                    </h2>
                    <h2 className={styles.authorBook}>
                      {author.attributes.name_author}
                    </h2>
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
        </>
      )}
      <Separator height={50} />

      {map(
        booksGroupedBySaga,
        (books, sagaTitle) =>
          sagaTitle !== 'No Saga' && (
            <div key={sagaTitle} className={styles.sagaWrapper}>
              <div className={styles.sagaContainer}>
                <h3 className={styles.sagaTitle}>{`Saga: ${sagaTitle}`}</h3>
              </div>
              <section className={styles.booksContainer}>
                {books.map((book, index) => {
                  const originalPrice = book.attributes.price;
                  const discount = book.attributes.discount;
                  const finalPrice = CalcDiscountPrice(originalPrice, discount);

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
                        </div>
                      </Link>
                      <div className={styles.infoContainer}>
                        <h2 className={styles.titleBook}>
                          <span className={styles.orderSaga}>
                            #{book.attributes.order_in_saga}
                          </span>{' '}
                          {book.attributes.title}
                        </h2>
                        <Link href={`/authors/${author.id}`}>
                          <h2 className={styles.authorBook}>
                            {author.attributes.name_author}
                          </h2>
                        </Link>
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
            </div>
          )
      )}
    </article>
  );
}
