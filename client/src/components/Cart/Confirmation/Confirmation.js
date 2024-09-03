import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import styles from './confirmation.module.scss';
import router from 'next/router';

export function Confirmation() {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.5, y: 0.5 },
    });
  }, []);

  const toAccount = () => {
    router.push('/account');
  };

  return (
    <div className={styles.confirmation}>
      <h1 className={styles.title}>Order Confirmed!</h1>
      <p className={styles.text}>
        Thank you so much for your order! We will send you a confirmation email.{' '}
      </p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={toAccount}>
          Check Orders
        </button>
      </div>
    </div>
  );
}
