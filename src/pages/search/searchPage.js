import styles from './searchPage.module.scss';
import { useEffect } from 'react';
import { size } from 'lodash';
import { BasicLayout } from '@/layouts';
import { Pagination, Separator, Seo } from '@/components/Shared';
import Footer from '@/components/Footer/Footer';
import { SearchComponents } from '@/components/SearchComponents';

export default function searchPage(props) {
  const { books, authors, sagas, booksPagination, authorsPagination } = props;

  const hasResultBooks = size(books) > 0;
  const hasResultAuthors = size(authors) > 0;
  const hasResultSagas = size(sagas) > 0;

  useEffect(() => {
    document.getElementById('searchBar').focus();
  }, []);

  return (
    <>
      <Seo title='Search' />
      <BasicLayout />
      <Separator height={150} />
      <div className={styles.containerBody}>
        {hasResultBooks ? (
          <>
            <SearchComponents.GridBooks books={books} />
            <Separator height={50} />
            <div className={styles.container}>
              <Pagination
                totalPages={booksPagination.pageCount}
                defaultPage={booksPagination.currentPage}
              />
            </div>
          </>
        ) : hasResultAuthors ? (
          <>
            <SearchComponents.GridAuthors authors={authors} />
            <Separator height={50} />
            <div className={styles.container}>
              <Pagination
                totalPages={authorsPagination.pageCount}
                defaultPage={authorsPagination.currentPage}
              />
            </div>
          </>
        ) : hasResultSagas ? (
          <>
            <SearchComponents.GridSagas sagas={sagas} />
            <Separator height={50} />
            <div className={styles.container}>
              <Pagination
                totalPages={authorsPagination.pageCount}
                defaultPage={authorsPagination.currentPage}
              />
            </div>
          </>
        ) : (
          <p className={styles.messageNotFound}>
            Ouch! We still don't have anything about it! Look for another thing!
            🤞
          </p>
        )}
      </div>
      <Separator height={50} />
      <div className={styles.container}>
        <Footer />
      </div>
      <Separator height={50} />
    </>
  );
}
