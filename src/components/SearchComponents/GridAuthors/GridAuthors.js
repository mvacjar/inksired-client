import styles from './gridAuthors.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Label, Separator } from '@/components/Shared';
import { map, groupBy, partition } from 'lodash';
import { CalcDiscountPrice } from '@/utils';
import { WishListIcon } from '@/components/Shared';

export function GridAuthors(props) {
  const { authors } = props;

  return (
    <section className={styles.authorContainer}>
      {map(authors, (author) => {
        const booksGroupedBySaga = groupBy(
          author.attributes.books.data,
          (book) =>
            book.attributes.sagas?.data?.attributes?.saga_title || 'No Saga'
        );

        // Isolate books by saga
        const [booksWithoutSaga, booksWithSaga] = partition(
          author.attributes.books.data,
          (book) => !book.attributes.sagas?.data?.attributes?.saga_title
        );

        // Verify if there are books without saga
        const hasBooksWithoutSaga = booksWithoutSaga.length > 0;

        return (
          <article key={author.id} className={styles.authorContainer}>
            <div className={styles.namecontainer}>
              <h1 className={styles.name}>{author.attributes.name_author}</h1>
            </div>

            {hasBooksWithoutSaga && (
              <>
                <div className={styles.titleBookscontainer}>
                  <h2 className={styles.titleBooks}>Standalone Books</h2>
                </div>

                {/* Render books without saga */}
                <section className={styles.booksContainer}>
                  {booksWithoutSaga.map((book, index) => {
                    const originalPrice = book.attributes.price;
                    const discount = book.attributes.discount;
                    const finalPrice = CalcDiscountPrice(
                      originalPrice,
                      discount
                    );

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

            {/* Render books with saga */}
            {map(
              booksGroupedBySaga,
              (books, sagaTitle) =>
                sagaTitle !== 'No Saga' && (
                  <div key={sagaTitle} className={styles.sagaWrapper}>
                    <div className={styles.sagaContainer}>
                      <h3 className={styles.sagaTitle}>
                        {`Saga: ${sagaTitle}`}
                      </h3>
                      {/* Render saga description once */}
                      <p>
                        {books[0].attributes.sagas.data.attributes.description}
                      </p>
                    </div>
                    <section className={styles.booksContainer}>
                      {books.map((book, index) => {
                        const originalPrice = book.attributes.price;
                        const discount = book.attributes.discount;
                        const finalPrice = CalcDiscountPrice(
                          originalPrice,
                          discount
                        );

                        return (
                          <div key={book.id} className={styles.bookContainer}>
                            <Link
                              href={`/book/${book.attributes.slug_title}`}
                              className={styles.book}
                            >
                              <div className={styles.imageContainer}>
                                <Image
                                  src={
                                    book.attributes.cover.data.attributes.url
                                  }
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
                              <h2 className={styles.titleBook}>
                                <span className={styles.orderSaga}>
                                  #{book.attributes.order_in_saga}
                                </span>
                                &nbsp;
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
      })}
    </section>
  );
}
