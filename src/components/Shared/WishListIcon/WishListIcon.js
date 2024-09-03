import { useState, useEffect } from 'react';
import styles from './WishListIcon.module.scss';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Wishlist } from '@/api';
import { useAuth } from '@/hooks';

const wishlistCtrl = new Wishlist();

export function WishListIcon(props) {
  const { bookId, removeCallBack } = props;
  const { user } = useAuth();
  const [hasWishlist, setHasWishlist] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await wishlistCtrl.check(user.id, bookId);
        setHasWishlist(response);
      } catch (error) {
        setHasWishlist(false);
        console.error(error);
      }
    })();
  }, [bookId]);

  const addWishlist = async () => {
    const response = await wishlistCtrl.add(user.id, bookId);
    setHasWishlist(response);
  };

  const deleteWishlist = async () => {
    try {
      await wishlistCtrl.delete(hasWishlist.id);
      setHasWishlist(false);

      if (removeCallBack) removeCallBack();
    } catch (error) {
      console.error(error);
    }
  };

  if (hasWishlist === null) return null;

  return (
    <div onClick={hasWishlist ? deleteWishlist : addWishlist}>
      {hasWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </div>
  );
}
