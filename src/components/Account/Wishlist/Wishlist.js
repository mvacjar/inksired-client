import { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Wishlist as WishlistCtrl } from '@/api';
import { useAuth } from '@/hooks';
import { GridWishlist } from './GridWishlist';

const wishlistCtrl = new WishlistCtrl();

export function Wishlist() {
  const [wishlist, setWishlist] = useState(null);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();

  const onReload = () => setReload((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.getAll(user.id);
        setWishlist(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [reload]);

  return size(wishlist) === 0 ? (
    <div>No items in your wishlist yet? Go for it!</div>
  ) : (
    <GridWishlist wishlist={wishlist} onReload={onReload} />
  );
}
