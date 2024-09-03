import styles from './cart.module.scss';
import { useAuth } from '@/hooks';
import Image from 'next/image';
import router from 'next/router';

export default function Cart() {
  const { user } = useAuth();

  const toCart = () => {
    router.push('/cart');
  };

  const toLogin = () => {
    router.push('/join/sign-in');
  };

  return (
    <>
      {user ? (
        <Image
          src='/images/cart2.png'
          width={45}
          height={45}
          alt='cart-icon'
          className={styles.cartIcon}
          onClick={toCart}
        />
      ) : (
        <button className={styles.signInButton} onClick={toLogin}>
          Sign In
        </button>
      )}
    </>
  );
}
