import { ENV } from './env';

export const ENV = {
  SERVER_HOST: 'https://inksired-server-production.up.railway.app',
  API_URL: 'https://inksired-server-production.up.railway.app/api',
  ENDPOINTS: {
    AUTH: { REGISTER: 'auth/local/register', LOGIN: 'auth/local' },
    USERS_ME: 'users/me',
    USERS: 'users',
    LITERARY_GENRES: 'literary-genres',
    ADDRESS: 'addresses',
    BOOKS: 'books',
    AUTHORS: 'authors',
    SAGAS: 'sagas',
    ICONS: 'profile-icons',
    WISHLIST: 'wishlists',
    PAYMENT_ORDER: 'payment-order',
    ORDER: 'orders',
  },
  TOKEN: 'token',
  CART: 'cart',
  STRIPE_TOKEN:
    'sk_test_51PigTEGYnwDtBj0MSe8ADUVKGvJfloEU4RPwo2pNTMtObgmrnUxhbQiWZ8ElB5DMHOgMtCj19XU2xspFFRBdZ9Dw00K0Y8OQwQ',
};
