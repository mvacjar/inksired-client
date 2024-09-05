import dotenv from 'dotenv';

dotenv.config();

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
  STRIPE_TOKEN: process.env.STRIPE_TOKEN,
};
