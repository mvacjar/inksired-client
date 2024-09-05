import styles from './gridSagas.module.scss';
import { CalcDiscountPrice } from '@/utils';
import { Label, Separator } from '@/components/Shared';
import Image from 'next/image';
import Link from 'next/link';
import { WishListIcon } from '@/components/Shared';

export function GridSagas({ sagas }) {
  return (
    <>
      {sagas &&
        sagas.map((saga, sagaIndex) => {
          const books = saga.attributes.books.data || [];
          const authors = saga.attributes.authors?.data || [];

          return (
            <div
              key={`${saga.id}-${sagaIndex}`}
              className={styles.sagaContainer}
            >
              <div className={styles.infoTextContainer}>
                <h1 className={styles.sagaTitle}>
                  Saga: {saga.attributes.saga_title}
                </h1>

                <h3 className={styles.sagaAuthor}>
                  {authors.map((author, authorIndex) => (
                    <Link
                      key={author.id}
                      href={`/author/${author.attributes.author_slug}`}
                      className={styles.authorLink}
                    >
                      <span className={styles.authorName}>
                        {author.attributes.name_author}
                        {authorIndex < authors.length - 1 ? ', ' : ''}
                      </span>
                    </Link>
                  ))}
                </h3>

                <p>{saga.attributes.description}</p>
              </div>
              <Separator height={50} />
              <div className={styles.wrapper}>
                {books.map((book, bookIndex) => {
                  const { price: originalPrice, discount } = book.attributes;
                  const finalPrice = CalcDiscountPrice(originalPrice, discount);
                  const coverUrl = book.attributes.cover?.data?.attributes?.url;

                  return (
                    <div
                      key={`${book.id}-${bookIndex}`}
                      className={styles.bookContainer}
                    >
                      <Link
                        href={`/book/${book.attributes.slug_title}`}
                        className={styles.book}
                      >
                        <div className={styles.imageContainer}>
                          {coverUrl && (
                            <Image
                              src={coverUrl}
                              alt={`Image ${bookIndex + 1}`}
                              width={200}
                              height={300}
                              priority
                              className={styles.bookCover}
                            />
                          )}
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
                        <div className={styles.orderTitle}>
                          <h2 className={styles.titleBook}>
                            <span className={styles.orderBook}>
                              #{book.attributes.order_in_saga}&nbsp;
                            </span>
                            {book.attributes.title}
                          </h2>
                        </div>
                        <p className={styles.authorBook}>
                          {book.attributes.authors?.data.map((author) => (
                            <Link
                              key={author.id}
                              href={`/author/${author.attributes.author_slug}`}
                              className={styles.authorLink}
                            >
                              <h2 className={styles.author}>
                                {author.attributes.name_author}
                              </h2>
                            </Link>
                          ))}
                        </p>
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
            </div>
          );
        })}
    </>
  );
}
