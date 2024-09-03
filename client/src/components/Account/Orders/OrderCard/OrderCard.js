import styles from './orderCard.module.scss';
import { DateTime } from 'luxon';
import { forEach, map } from 'lodash';
import { useState } from 'react';
import Image from 'next/image';
import { CalcDiscountPrice } from '@/utils';
import { BasicModal } from '@/components/Shared';

export function OrderCard(props) {
  const { order } = props;
  const createdAt = new Date(order.attributes.createdAt).toISOString();
  const products = order.attributes.products;
  const [showModal, setShowModal] = useState(false);
  const address = order.attributes.addressShipping;

  const openCloseModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const getTotalProducts = () => {
    let total = 0;
    forEach(products, (product) => {
      total += product.quantity;
    });
    return total;
  };

  return (
    <>
      <div className={styles.orderContainer} onClick={openCloseModal}>
        <div className={styles.infoContainer}>
          <p>
            Quantity: <span>{getTotalProducts()}</span>
          </p>
          <p>
            Date:{' '}
            <span>
              {DateTime.fromISO(createdAt, { locale: 'en' }).toFormat(
                'dd/MM/yyyy'
              )}
            </span>
          </p>
        </div>
        <div className={styles.totalContainer}>
          <span className={styles.totalPayment}>
            {Number(order.attributes.totalPayment).toFixed(2)}€
          </span>
        </div>
      </div>
      <BasicModal
        open={showModal}
        onClose={openCloseModal}
        title={'Order Information'}
      >
        {map(products, (product) => (
          <section key={product.id} className={styles.modalContainer}>
            <div className={styles.productContainer}>
              <Image
                src={product.attributes.cover.data.attributes.url}
                width={120}
                height={180}
                alt='Product cover'
                className={styles.cover}
              />
            </div>
            <div>
              <div className={styles.dataContainer}>
                <div>
                  <p className={styles.title}>{product.attributes.title}</p>
                  {map(product.attributes.authors.data, (author) => (
                    <p className={styles.author} key={author.id}>
                      {author.attributes.name_author}
                    </p>
                  ))}
                </div>
              </div>
              <div className={styles.quantityContainer}>
                <span className={styles.quantity}>x{product.quantity}</span>
                <span className={styles.price}>
                  {CalcDiscountPrice(
                    product.attributes.price,
                    product.attributes.discount
                  )}
                  €
                </span>
              </div>
            </div>
          </section>
        ))}
        <div className={styles.address}>
          <div>
            <p className={styles.title}>{address.attributes.title}</p>
            <p className={styles.addressInfo}>
              {address.attributes.name}, {address.attributes.address},{' '}
              {address.attributes.state}, {address.attributes.city},{' '}
              {address.attributes.postal_code}
            </p>
          </div>
        </div>

        <div className={styles.total}>
          <p>TOTAL: {order.attributes.totalPayment.toFixed(2)}€</p>
        </div>
      </BasicModal>
    </>
  );
}
