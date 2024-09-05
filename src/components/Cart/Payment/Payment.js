import styles from './payment.module.scss';
import { Separator } from '@/components/Shared';
import { useEffect, useState } from 'react';
import { forEach } from 'lodash';
import { CalcDiscountPrice } from '@/utils';
import Addresses from './Addresses/Addresses';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ENV } from '@/utils';
import { PaymentSumary } from './PaymentSummary';

const stripeInit = loadStripe(ENV.STRIPE_SECRET);
console.log('stripeInit', stripeInit);

export function Payment(props) {
  const [totals, setTotals] = useState(null);
  const { books, handleNext, handleBack } = props;
  const [addressSelected, setAddressSelected] = useState(null);

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
      <Elements stripe={stripeInit}>
        <article className={styles.paymentContainer}>
          <section>
            <Addresses
              addressSelected={addressSelected}
              setAddressSelected={setAddressSelected}
            />
          </section>
          {addressSelected && (
            <>
              <PaymentSumary
                books={books}
                addressSelected={addressSelected}
                handleNext={handleNext}
              />
            </>
          )}
          <Separator height={50} />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleBack}>
              Back
            </button>
          </div>
        </article>
      </Elements>
    </>
  );
}
