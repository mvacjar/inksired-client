import styles from './cartLayout.module.scss';
import { Separator } from '@/components/Shared';
import Footer from '@/components/Footer/Footer';
import { NavCart } from '@/components/Navbars/Cart/NavCart';
import { HeaderCart } from '../HeaderCart';

export function CartLayout(props) {
  const { children, books } = props;

  return (
    <>
      <NavCart />
      <div className={styles.header}>
        <HeaderCart books={books} />
      </div>
      <Separator height={50} />
      <div>{children}</div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  );
}
