import styles from './addressBox.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { AddressForm } from '../../AddressForm';
import { BasicModal, Confirm } from '@/components/Shared';
import { Address as AddressCtrl } from '@/api';

const addressCtrl = new AddressCtrl();

export function AddressBox(props) {
  const { addressId, address, onReload } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const openCloseEdit = () => setShowEdit((prevState) => !prevState);
  const openCloseConfirm = () => setShowConfirm((prevState) => !prevState);

  const onDelete = async () => {
    try {
      await addressCtrl.delete(addressId);
      onReload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <article className={styles.boxWrapper}>
        <section className={styles.boxContainer}>
          <h3 className={styles.text}>{address.title}</h3>
          <p className={styles.text}>{address.address}</p>
          <p className={styles.text}>
            {address.city}, {address.country}
          </p>
          <p className={styles.text}>{address.postal_code}</p>
          <p className={styles.text}>{address.telephone}</p>
        </section>

        <section className={styles.iconsContainer}>
          <Image
            src='/images/pen.svg'
            alt='Edit'
            width={35}
            height={35}
            className={styles.iconEdit}
            onClick={openCloseEdit}
          />
          <Image
            src='/images/xBeige.svg'
            alt='Delete'
            width={35}
            height={35}
            className={styles.iconDelete}
            onClick={openCloseConfirm}
          />
        </section>
      </article>
      <Confirm
        open={showConfirm}
        onCancel={openCloseConfirm}
        onConfirm={onDelete}
        content='Are you sure you want to delete this address?'
      />
      <BasicModal open={showEdit} onClose={openCloseEdit} title='Edit address'>
        <AddressForm
          onClose={openCloseEdit}
          onReload={onReload}
          addressId={addressId}
          address={address}
        />
      </BasicModal>
    </>
  );
}
