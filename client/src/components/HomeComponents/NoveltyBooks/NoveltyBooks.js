import styles from './noveltyBooks.module.scss';
import { useState, useEffect } from 'react';
import { Book } from '@/api';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/Shared';
import { Label } from '@/components/Shared';

const bookCtrl = new Book();

export function NoveltyBooks(props) {
  const [saveLastBook, setSaveLastBook] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await bookCtrl.getLastBookPublished();
        setSaveLastBook(response.data.slice(0, 3));
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!saveLastBook.length) return null;

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className={styles.background}>
        <div
          style={{
            width: '100vw',
            height: '80vh',
            position: 'absolute',
            zIndex: -1,
          }}
        >
          <Image
            src='/images/background.svg'
            alt='background'
            fill
            objectFit='cover'
            priority
          />
        </div>
        <Separator height={50} />
        <div className={styles.titlePublishedContainer}>
          <h1 className={styles.titlePublished}>Novelty</h1>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.carousel}>
            <div className={styles.cards}>
              {saveLastBook.map((book, index) => {
                const isActive = index === activeIndex;
                const isPrev =
                  index ===
                  (activeIndex - 1 + saveLastBook.length) % saveLastBook.length;
                const isNext =
                  index === (activeIndex + 1) % saveLastBook.length;
                const isBehind = !isActive && !isPrev && !isNext;
                const originalPrice = book.attributes.price;
                const discount = book.attributes.discount;
                const finalPrice =
                  originalPrice - (originalPrice * discount) / 100;

                return (
                  <div
                    key={book.id}
                    className={`${styles.card} ${
                      isActive ? styles.active : ''
                    } ${isPrev ? styles.prev : ''} ${
                      isNext ? styles.next : ''
                    } ${isBehind ? styles.behind : ''}`}
                    onClick={() => handleImageClick(index)}
                  >
                    <div className={styles.coverContainer}>
                      <Image
                        src={book.attributes.cover.data.attributes.url}
                        alt={`Image ${index + 1}`}
                        layout='fill'
                        objectFit='cover'
                        className={styles.cover}
                      />
                    </div>
                    <Link href={`/book/${book.attributes.slug_title}`}>
                      <div className={styles.info}>
                        <div className={styles.titleCoverContainer}>
                          <h3 className={styles.titleCover}>
                            {book.attributes.title}
                          </h3>
                        </div>
                        <div className={styles.synopsisContainer}>
                          <p className={styles.synopsis}>
                            {book.attributes.synopsis}
                          </p>
                          <div className={styles.pricesContainer}>
                            <div className={styles.discountContainer}>
                              {discount && discount > 0 && (
                                <Label.Discount className={styles.discount}>
                                  {`-${discount}%`}
                                </Label.Discount>
                              )}
                            </div>
                            <div className={styles.priceContainer}>
                              {originalPrice && (
                                <div className={styles.priceContainer}>
                                  {discount && discount > 0 ? (
                                    <>
                                      <span className={styles.originalPrice}>
                                        {originalPrice.toFixed(2)}€
                                      </span>
                                      {finalPrice && (
                                        <span
                                          className={styles.discountedPrice}
                                        >
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
