import styles from './addresses.module.scss';
import { useEffect, useState } from 'react';
import { Address } from '@/api';
import { useAuth } from '@/hooks';
import { map } from 'lodash';
import classNames from 'classnames';

const addressCtrl = new Address();

export default function Addresses(props) {
  const { addressSelected, setAddressSelected } = props;
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await addressCtrl.getAll(user.id);
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [user.id]);

  return (
    <>
      <h2 className={styles.paymentTitle}>Addresses</h2>
      <article className={styles.addressContainer}>
        {map(addresses, (address) => (
          <div
            key={address.id}
            className={classNames(styles.addressInfo, {
              [styles.active]: address.id === addressSelected?.id,
            })}
            onClick={() => setAddressSelected(address)}
          >
            <h2 className={styles.title}>{address.attributes.title}</h2>
            <div className={styles.name}>{address.attributes.name}</div>
            <div className={styles.address}>{address.attributes.address}</div>
            <div className={styles.addressGeo}>
              <div className={styles.city}>
                {address.attributes.city},&nbsp;
              </div>
              <div className={styles.country}>
                {address.attributes.country},&nbsp;
              </div>
              <div className={styles.zip}>{address.attributes.postal_code}</div>
            </div>
          </div>
        ))}
      </article>
    </>
  );
}
