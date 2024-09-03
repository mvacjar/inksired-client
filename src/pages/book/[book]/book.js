import { BasicLayout } from '@/layouts';
import { Separator, Seo } from '@/components/Shared';
import { BookBody } from '@/components/Book';
import Footer from '@/components/Footer/Footer';
import styles from './book.module.scss';
import { CalcDiscountPrice } from '@/utils';

export default function BookPage(props) {
  const { book } = props;
  const cover = book.attributes.cover;
  const originalPrice = book.attributes.price;
  const discount = book.attributes.discount;
  const sagaTitle = book.attributes.sagas?.data?.attributes.saga_title ?? '';
  const finalPrice = CalcDiscountPrice(originalPrice, discount);

  return (
    <>
      <Seo
        title={book.attributes.title}
        description={book.attributes.synopsis}
      />
      <div className={styles.bodyBook}>
        <BasicLayout />
        <Separator height={150} />
        <div className={styles.bodyContainer}>
          <BookBody.Body
            cover={cover.data.attributes.url}
            alt={book.attributes.title}
            bookId={book.id}
            bookInfo={book.attributes}
            sagaTitle={sagaTitle}
            originalPrice={originalPrice}
            discount={discount}
            finalPrice={finalPrice}
          />
        </div>
        <Separator height={50} />
        <div className={styles.footerContainer}>
          <Footer />
        </div>
        <Separator height={50} />
      </div>
    </>
  );
}
