import Basket from './Basket/Basket';
import Summary from './Summary/Summary';
import styles from './checkout.module.scss';

export function Checkout(props) {
  const { books, handleNext } = props;
  return (
    <>
      <article className={styles.checkoutContainer}>
        <div className={styles.basket}>
          <Basket books={books} />
        </div>
        <div className={styles.resume}>
          <Summary books={books} handleNext={handleNext} />
        </div>
      </article>
    </>
  );
}
