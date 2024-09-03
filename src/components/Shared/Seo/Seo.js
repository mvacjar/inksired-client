import Head from 'next/head';

export function Seo(props) {
  const {
    title = 'Insired - Buy the best books',
    description = 'Your favourite books have never been so close to you',
    image = 'favicon.ico',
  } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='description' content='Where characters come to life' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
}
