import styles from './genrePage.module.scss';
import { size } from 'lodash';
import { BasicLayout } from '@/layouts';
import Footer from '@/components/Footer/Footer';
import { GridBooks, Separator, Pagination, Seo } from '@/components/Shared';

export default function genrePage(props) {
  const { books, genres, pagination } = props;

  const existProducts = size(books) > 0;

  return (
    <>
      <Seo title={genres.attributes.title} />
      <div className={styles.basicLayout}>
        <BasicLayout />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>{genres.attributes.title}</h2>
          </div>
          {existProducts ? (
            <>
              <GridBooks books={books} />
              <Separator height={50} />
              <Pagination
                totalPages={pagination.pageCount}
                defaultPage={pagination.currentPage}
              />
            </>
          ) : (
            <p className={styles.messageNotFound}>
              Ouch! We still don't have books in this genre! Look for another
              one! 🤞
            </p>
          )}
        </div>
      </div>
      <Separator height={50} />
      <div className={styles.footer}>
        <Footer />
      </div>
      <Separator height={50} />
    </>
  );
}
