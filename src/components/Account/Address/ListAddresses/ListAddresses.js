import styles from './listAddresses.module.scss';
import { useState, useEffect } from 'react';
import { Address } from '@/api';
import { useAuth } from '@/hooks/useAuth';
import { AddressBox } from './AddressBox';
import { map } from 'lodash';

const addressCtrl = new Address();

export function ListAddresses(props) {
  const [addresses, setAddresses] = useState(null);
  const { user } = useAuth();
  const { reload, onReload } = props;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
        onReload();
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    if (user && user.id) {
      fetchAddresses();
    }
  }, [user, reload]);

  return (
    <>
      <div className={styles.addressContainer}>
        {map(addresses, (address) => (
          <AddressBox
            key={address.id}
            addressId={address.id}
            address={address.attributes}
            onReload={onReload}
          />
        ))}
      </div>
    </>
  );
}
