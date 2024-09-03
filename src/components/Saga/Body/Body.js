import { Separator, Label } from '@/components/Shared';
import { CalcDiscountPrice } from '@/utils';
import styles from './body.module.scss';
import { map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';

export function Body(props) {
  const { saga } = props;

  return (
    <>
      <div className={styles.bodyContainer}>
        <div className={styles.sagaContainer}>
          <div className={styles.sagaHeader}>
            <h1>{saga.attributes.saga_title}</h1>
            <div className={styles.authorContainer}>
              <h2>Author:&nbsp;</h2>
              <h2 className={styles.authorContainer}>
                {saga.attributes.author}
              </h2>
            </div>
          </div>
          <div className={styles.descriptionContent}>
            <p>{saga.attributes.description}</p>
          </div>
          <Separator height={50} />
          <div className={styles.booksContainer}>
            {map(saga.attributes.books.data, (book, index) => {
              const { price: originalPrice, discount } = book.attributes;
              const finalPrice = CalcDiscountPrice(originalPrice, discount);
              const coverUrl = book.attributes.cover?.data?.attributes?.url;

              return (
                <div
                  key={`${book.id}-${index}`}
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
                          alt={`Image ${index + 1}`}
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
                    </div>
                  </Link>
                  <div className={styles.infoContainer}>
                    <div className={styles.titleOrder}>
                      <span className={styles.orderSaga}>
                        &nbsp; #{book.attributes.order_in_saga}
                      </span>
                      <h2 className={styles.titleBook}>
                        {book.attributes.title}
                      </h2>
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
        </div>
      </div>
    </>
  );
}
