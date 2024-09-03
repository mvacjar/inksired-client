import { useRouter } from 'next/router';
import styles from './pagination.module.scss';
import { Pagination as PaginationMUI } from '@mui/material';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function Pagination(props) {
  const router = useRouter();
  const { totalPages, currentPage } = props;

  const onPageChange = (_, page) => {
    router.replace({ query: { ...router.query, page } });
  };

  return (
    <>
      <Stack spacing={2}>
        <PaginationMUI
          count={totalPages}
          size='large'
          defaultPage={currentPage}
          boundaryCount={2}
          onChange={onPageChange}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
}
