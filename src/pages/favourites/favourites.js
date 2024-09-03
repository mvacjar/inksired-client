import { Wishlist } from '@/components/Account';
import { Separator } from '@/components/Shared';
import { BasicLayout } from '@/layouts';
import Footer from '@/components/Footer/Footer';
import styles from './favourites.module.scss';

export default function favouritesPage() {
  return (
    <>
      <BasicLayout />
      <div className={styles.bodyContainer}>
        <Separator height={200} />
        <h1 className={styles.title}>My Wishlist</h1>
        <div className={styles.wishlistContainer}>
          <Wishlist />
        </div>
        <Separator height={50} />
        <Footer />
      </div>
    </>
  );
}
