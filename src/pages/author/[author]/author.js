import styles from './author.module.scss';
import { BasicLayout } from '@/layouts';
import Footer from '@/components/Footer/Footer';
import { Separator, Seo } from '@/components/Shared';
import { Author } from '@/components/HomeComponents/Author';

export default function AuthorPage(props) {
  const { author } = props;

  return (
    <>
      <Seo title={author.attributes.name_author} />
      <div className={styles.bodyBook}>
        <BasicLayout />
        <Separator height={150} />
        <div className={styles.bodyContainer}>
          <Author author={author} />
        </div>
        <Separator height={50} />
        <div className={styles.footerContainer}>
          <Footer />
        </div>
        <Separator height={50} />
      </div>
    </>
  );
}
