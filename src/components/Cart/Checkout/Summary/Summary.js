import styles from './summary.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { forEach } from 'lodash';
import { CalcDiscountPrice } from '@/utils';

export default function Summary(props) {
  const { books, handleNext } = props;
  const router = useRouter();
  const [totals, setTotals] = useState(null);
  const deliveryPrice = 5.0;
  const formattedDeliveryPrice = parseFloat(deliveryPrice.toFixed(2));

  useEffect(() => {
    let totals = { original: 0, discount: 0, price: 0 };

    forEach(books, (book) => {
      const price = parseFloat(book.attributes.price) || 0;
      const discount = parseFloat(book.attributes.discount) || 0;
      const quantity = parseInt(book.quantity) || 0;

      const finalPrice = CalcDiscountPrice(price, discount);

      totals = {
        original: totals.original + price * quantity,
        discount: totals.discount + (price - finalPrice) * quantity,
        price: totals.price + formattedDeliveryPrice + finalPrice * quantity,
      };
    });

    setTotals(totals);
  }, [books]);

  if (!totals) return null;

  return (
    <>
      <article className={styles.wrapperContainer}>
        <section className={styles.sectionContainer}>
          <div className={styles.summaryContainer}>
            <div className={styles.summaryItem1}>
              <span className={styles.summaryLabel}>Original price:</span>
              <span className={styles.summaryValue}>
                {totals.original.toFixed(2)} €
              </span>
            </div>
            <div className={styles.summaryItem2}>
              <span className={styles.summaryLabel}>Discount:</span>
              <span className={styles.summaryValue}>
                {totals.discount.toFixed(2)} €
              </span>
            </div>
            <div className={styles.summaryItem3}>
              <span className={styles.summaryLabel}>Delivery:</span>
              <span className={styles.summaryValue}>
                {formattedDeliveryPrice} €
              </span>
            </div>
            <div className={styles.summaryItem4}>
              <span className={styles.summaryLabelTotal}>Total:</span>
              <span className={styles.summaryValueTotal}>
                {totals.price.toFixed(2)} €
              </span>
            </div>
          </div>
        </section>
      </article>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => router.push('/')}>
          Keep buying
        </button>
        <button className={styles.button} onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
}
