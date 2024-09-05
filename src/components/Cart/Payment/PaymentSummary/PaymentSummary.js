import styles from './paymentSummary.module.scss';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { forEach } from 'lodash';
import { CalcDiscountPrice } from '@/utils';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { useAuth, useCart } from '@/hooks';
import { Cart } from '@/api';

const cartCtrl = new Cart();

export function PaymentSumary(props) {
  const { books, addressSelected, handleNext } = props;
  const [total, setTotal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [circularProgress, setCircularProgress] = useState(false);
  const [isCardComplete, setIsCardComplete] = useState(false);
  const { deleteAllItems } = useCart();

  const deliveryPrice = 5.0;
  const formattedDeliveryPrice = parseFloat(deliveryPrice.toFixed(2));
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();

  const cardStyles = {
    style: {
      base: {
        color: '#2d2d2d',
        fontSize: '1rem',
        '::placeholder': {
          color: '#717070',
        },
      },
    },
  };

  const handleCircularProgress = () => {
    setCircularProgress(true);
    setTimeout(() => {
      setCircularProgress(false);
    }, 2000);
  };

  useEffect(() => {
    let total = 0;

    forEach(books, (book) => {
      const price = CalcDiscountPrice(
        book.attributes.price,
        book.attributes.discount
      );
      total += price * book.quantity + formattedDeliveryPrice;
    });
    setTotal(total.toFixed(2));
  }, [books]);

  const handleCardChange = (event) => {
    setIsCardComplete(event.complete);
  };

  const onPay = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.error(result.error.message);
      setLoading(false);
    } else {
      try {
        const response = await cartCtrl.paymentCart(
          result.token,
          books,
          user.id,
          addressSelected
        );

        if (response.status === 200) {
          deleteAllItems();
        } else {
          console.error('Error in payment');
        }
      } catch (error) {
        console.error('Error in payment', error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handlePayAndNext = async () => {
    await onPay();
    handleNext();
  };

  if (!total) return null;

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.paymentTitle}>Payment</h2>
      <div className={styles.block}>
        <div className={styles.products}>
          {books.map((book) => (
            <div key={book.id} className={styles.product}>
              <div className={styles.infoContainer}>
                <p className={styles.title}>{book.attributes.title}</p>
                <p>{book.attributes.authors?.data?.attributes?.name_author}</p>
              </div>
              <div className={styles.infoProducts}>
                <span className={styles.quantity}>
                  {book.quantity > 0 && `${book.quantity}x`}
                </span>
                <div>
                  {CalcDiscountPrice(
                    book.attributes.price,
                    book.attributes.discount
                  )}
                  €
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.blockTotal}>
          <div className={styles.totalPrice}>
            <div className={styles.total}>Total: &nbsp;</div>
            <div className={styles.price}>{total}€</div>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <CardElement options={cardStyles} onChange={handleCardChange} />{' '}
      </div>

      <button
        className={`${styles.button} ${loading ? styles.loading : ''} ${
          circularProgress ? styles.loading : ''
        }`}
        disabled={
          !addressSelected || circularProgress || !isCardComplete || loading
        }
        onClick={handlePayAndNext}
      >
        {loading || circularProgress ? (
          <CircularProgress size={20} thickness={4} />
        ) : (
          'Pay'
        )}
      </button>
    </section>
  );
}
