export { default } from './book';
import { Book } from '@/api';

export async function getServerSideProps(context) {
  const {
    params: { book },
  } = context;

  const bookCtrl = new Book(book);
  const response = await bookCtrl.getBySlug(book);

  return {
    props: {
      book: response,
    },
  };
}
