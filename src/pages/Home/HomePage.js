import styles from './home.module.scss';
import { useAuth } from '@/hooks';
import { BasicLayout } from '@/layouts';
import { HomeComponents } from '@/components/HomeComponents';
import {
  Separator,
  BarInfo,
  CarouselBooks,
  BannerAd,
  Seo,
} from '@/components/Shared';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  const { user } = useAuth();

  const titleBanner = user
    ? 'Send us your best cover for a fantasy book and...'
    : 'Register now and get a discount!';
  const subtitleBanner = user
    ? 'Get 5 books from your wishlist for free!✨'
    : 'Get a notebook for free! ✨';
  const btnTitleBanner = user ? 'Participate' : 'Sign up';
  const btnLinkBanner = user ? '/account' : '/join/sign-up';

  return (
    <>
      <Seo />

      <main className={styles.bodyContainer}>
        <BasicLayout />

        <article className={styles.mainContainer}>
          <Separator height={150} />
          <section className={styles.carouselContainer}>
            <HomeComponents.CarouselGenres />
          </section>

          <Separator height={50} />
          <section className={styles.noveltyContainer}>
            <HomeComponents.NoveltyBooks />
          </section>
          <Separator height={100} />

          <section className={styles.obentoContainer}>
            <HomeComponents.ObentoBooks title={`Read the latest!`} />
          </section>
          <Separator height={100} />

          <section className={styles.bannerAdContainer}>
            <BannerAd
              titleBanner={titleBanner}
              subtitleBanner={subtitleBanner}
              btnTitleBanner={btnTitleBanner}
              btnLinkBanner={btnLinkBanner}
              image='/images/imgAd.png'
            />
          </section>
          <Separator height={100} />

          <section className={styles.carouselBooksContainer}>
            <CarouselBooks genreId={2} title='Latest Fantasy Books' />
          </section>
          <Separator height={50} />

          <section className={styles.carouselBooksContainer}>
            <CarouselBooks genreId={16} title='Latest Thriller Books' />
          </section>
          <Separator height={50} />

          <section className={styles.barInfoContainer}>
            <BarInfo />
          </section>
          <Separator height={50} />

          <section className={styles.footerContainer}>
            <Footer />
          </section>
          <Separator height={50} />
        </article>
      </main>
    </>
  );
}
