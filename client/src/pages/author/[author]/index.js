import { Author } from '@/api';
export { default } from './author';

export async function getServerSideProps(context) {
  const {
    params: { author },
  } = context;

  const authorCtrl = new Author();
  const responseAuthor = await authorCtrl.getAuthorBySlug(author);

  return {
    props: {
      author: responseAuthor,
    },
  };
}
