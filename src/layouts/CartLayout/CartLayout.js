import styles from './cartLayout.module.scss';
import { Separator } from '@/components/Shared';
import Footer from '@/components/Footer/Footer';
import { NavCart } from '@/components/Navbars/Cart/NavCart';
import { HeaderCart } from '../HeaderCart';
import useMediaQuery from '@mui/material/useMediaQuery';

export function CartLayout(props) {
  const { children, books } = props;
  const isSmallScreen = useMediaQuery('(max-width:568px)');

  return (
    <>
      <NavCart />
      <Separator height={isSmallScreen ? 150 : 200} />
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
