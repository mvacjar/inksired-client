import { forEach } from 'lodash';
import { ENV, authFetch } from '@/utils';

export class Cart {
  add(bookId) {
    const books = this.getAll();
    const objectIndex = books.findIndex((book) => book.id === bookId);

    if (objectIndex < 0) {
      books.push({
        id: bookId,
        quantity: 1,
      });
    } else {
      const book = books[objectIndex];
      books[objectIndex].quantity = book.quantity + 1;
    }

    localStorage.setItem(ENV.CART, JSON.stringify(books));
  }

  getAll() {
    const response = localStorage.getItem(ENV.CART);

    if (!response) {
      return [];
    } else {
      return JSON.parse(response);
    }
  }

  count() {
    const response = this.getAll();
    let count = 0;

    forEach(response, (book) => {
      count += book.quantity;
    });

    return count;
  }

  changeQuantity(bookId, quantity) {
    const books = this.getAll();
    const objIndex = books.findIndex((book) => book.id === bookId);

    books[objIndex].quantity = quantity;

    localStorage.setItem(ENV.CART, JSON.stringify(books));
  }

  delete(bookId) {
    const books = this.getAll();
    const updateBooks = books.filter((book) => book.id !== bookId);

    localStorage.setItem(ENV.CART, JSON.stringify(updateBooks));
  }

  deleteAll() {
    localStorage.removeItem(ENV.CART);
  }

  async paymentCart(token, products, idUser, address) {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
      const params = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          products,
          idUser,
          addressShipping: address,
        }),
      };
      const response = await authFetch(url, params);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
