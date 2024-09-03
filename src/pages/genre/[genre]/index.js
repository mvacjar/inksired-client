import { LiteraryGenres, Book } from '@/api';
export { default } from './genrePage';

export async function getServerSideProps(context) {
  const { query, params } = context;
  const { page = 1 } = query;
  const { genre } = params;

  const genreCtrl = new LiteraryGenres();
  const responseGenre = await genreCtrl.getBySlug(genre);

  const bookCtrl = new Book();
  const responseBooks = await bookCtrl.getByGenreSlug(genre, page);

  return {
    props: {
      books: responseBooks.data,
      genres: responseGenre,
      pagination: responseBooks.meta.pagination,
    },
  };
}
