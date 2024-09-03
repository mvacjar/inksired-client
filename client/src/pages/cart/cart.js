import { CartLayout } from '@/layouts';
import { useCart } from '@/hooks';
import { useEffect, useState } from 'react';
import { Book } from '@/api';
import { Seo } from '@/components/Shared';

const bookCtrl = new Book();

export default function CartPage() {
  const [books, setBooks] = useState([]);
  const { cart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cart || !Array.isArray(cart)) {
          setBooks([]);
          return;
        }

        const data = [];
        for (const item of cart) {
          const response = await bookCtrl.getBookById(item.id);
          data.push({ ...response.data, quantity: item.quantity });
        }
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cart]);

  return (
    <div>
      <Seo title='Cart' />
      <CartLayout books={books} />
    </div>
  );
}
