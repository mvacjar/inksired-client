import React from 'react';
import { Order } from '@/api';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks';
import { map } from 'lodash';
import { OrderCard } from './OrderCard';

const orderCtrl = new Order();

export function Orders() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await orderCtrl.getAll(user.id);
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!orders) {
    return <p>Any order over here... yet!</p>;
  }

  return (
    <>
      {map(orders, (order) => {
        return <OrderCard key={order.id} order={order} />;
      })}
    </>
  );
}
