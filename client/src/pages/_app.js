import '@/scss/globals.scss';

import { AuthProvider, CartProvider } from '@/contexts';

export default function App(props) {
  const { Component, pageProps } = props;
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}
