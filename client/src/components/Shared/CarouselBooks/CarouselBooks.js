import styles from './carouselBooks.module.scss';
import { Book } from '@/api';
import { useEffect, useState, useRef } from 'react';
import { CalcDiscountPrice } from '@/utils';
import { Label } from '@/components/Shared';
import { map } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { WishListIcon } from '@/components/Shared';
import AOS from 'aos';
import 'aos/dist/aos.css';

const book = new Book();

export function CarouselBooks({
  title,
  literaryGenresId,
  limit,
  genreId,
  onReload,
}) {
  const [booksByGenre, setBooksByGenre] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const carouselRef = useRef(null);

  // Fetch books by genre
  useEffect(() => {
    (async () => {
      try {
        const response = await book.obentoBooks({ limit, literaryGenresId });
        setBooksByGenre(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [limit, literaryGenresId]);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  // Arrow visibility
  useEffect(() => {
    const updateArrowVisibility = () => {
      const carousel = carouselRef.current;
      if (carousel) {
        const scrollLeft = carousel.scrollLeft;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < maxScrollLeft - 1);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      // Check visibility on load
      updateArrowVisibility();

      // Add event listeners
      carousel.addEventListener('scroll', updateArrowVisibility);
      window.addEventListener('resize', updateArrowVisibility);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', updateArrowVisibility);
      }
      window.removeEventListener('resize', updateArrowVisibility);
    };
  }, [booksByGenre]);

  // AOS
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1000,
      easing: 'ease-in-sine',
    });

    AOS.refresh();
  }, []);

  return (
    <>
      <div>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{title}</h3>
        </div>
      </div>
      <div className={styles.booksWrapper}>
        <div className={styles.booksContent}>
          <div
            className={`${styles.leftArrowWrapper} ${
              showLeftArrow ? styles.show : ''
            }`}
          >
            <div className={styles.leftArrowContainer}>
              <ArrowBackIosIcon
                sx={{ color: '#2d2d2d', fontSize: 25 }}
                className={styles.leftArrow}
              />
            </div>
          </div>
          <div className={styles.carouselItems} ref={carouselRef}>
            {map(
              booksByGenre.filter((book) =>
                book.attributes.literary_genres.data.some(
                  (genre) => genre.id === genreId
                )
              ),
              (book, index) => {
                const originalPrice = book.attributes.price;
                const discount = book.attributes.discount;
                const finalPrice = CalcDiscountPrice(originalPrice, discount);

                const sagaAttributes =
                  book.attributes.sagas?.data?.attributes || {};
                const sagaTitle = sagaAttributes.saga_title ?? '';
                const sagaName = sagaAttributes.saga_name || '';

                const authors = book.attributes.authors?.data || [];

                return (
                  <div
                    key={book.id}
                    onClick={() => handleImageClick(index)}
                    className={styles.bookContainer}
                    data-aos='fade-left'
                    data-aos-duration='1000'
                  >
                    <div className={styles.heartContainer}>
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
                      <div className={styles.iconHeart}>
                        <WishListIcon
                          bookId={book.id}
                          removeCallBack={onReload}
                        />
                      </div>
                    </div>
                    <div className={styles.infoContainer}>
                      <h2 className={styles.titleBook}>
                        {book.attributes.title}
                      </h2>

                      <div className={styles.authorsContainer}>
                        {authors.length > 0
                          ? authors.map((author) => (
                              <Link
                                key={author.id}
                                href={`/author/${author.attributes.author_slug}`}
                                className={styles.authorLink}
                              >
                                <h3 className={styles.author}>
                                  {author.attributes.name_author}
                                </h3>
                              </Link>
                            ))
                          : 'Unknown Author'}
                      </div>

                      <div className={styles.sagaContainer}>
                        {sagaName && (
                          <>
                            <span className={styles.sagaOrder}>
                              #{book.attributes.order_in_saga}&nbsp;
                            </span>
                            <Link
                              href={`/saga/${sagaName}`}
                              className={styles.sagaLink}
                            >
                              <span className={styles.sagaTitle}>
                                {sagaTitle}
                              </span>
                            </Link>
                          </>
                        )}
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
              }
            )}
          </div>
          <div
            className={`${styles.rightArrowWrapper} ${
              showRightArrow ? styles.show : ''
            }`}
          >
            <div className={styles.rightArrowContainer}>
              <ArrowForwardIosIcon
                sx={{ color: '#2d2d2d', fontSize: 25 }}
                className={styles.rightArrow}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
