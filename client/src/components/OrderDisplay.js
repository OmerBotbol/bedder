import axios from 'axios';
import React, { useEffect, useState } from 'react';

function OrderDisplay({ user, order, orders, setOrders }) {
  const [userDetails, setUserDetails] = useState();
  const [assetDetails, setAssetDetails] = useState();

  useEffect(() => {
    if (user) {
      const route = user.isOwner
        ? `renter/${order.renter_id}`
        : `owner/${order.owner_id}`;
      Promise.all([
        axios.get(`/api/${route}`),
        axios.get(`/api/asset/${order.asset_id}`),
      ]).then((data) => {
        setUserDetails(data[0].data);
        setAssetDetails(data[1].data);
      });
    }
  }, [user, order]);

  const deleteOrder = () => {
    const dataToSend = {
      asset_id: assetDetails.id,
      startedAt: order.started_at,
      endedAt: order.ended_at,
    };
    Promise.all([
      axios.delete('/api/transaction', { data: { id: order.id } }),
      axios.delete('/api/asset/deleteUnavailableDates', { data: dataToSend }),
    ])
      .then(() => {
        const ordersCopy = [...orders];
        const index = ordersCopy.findIndex((option) => {
          return option.id === order.id;
        });
        ordersCopy.splice(index, 1);
        setOrders(ordersCopy);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {userDetails && assetDetails && (
        <>
          {user.isOwner ? (
            <p>
              {userDetails.first_name} {userDetails.last_name} is coming to{' '}
              {assetDetails.address}, {assetDetails.city} from{' '}
              {order.started_at.slice(0, 10).replaceAll('-', '/')} until{' '}
              {order.ended_at.slice(0, 10).replaceAll('-', '/')}
            </p>
          ) : (
            <p>
              you are coming to {assetDetails.address}, {assetDetails.city} from{' '}
              {order.started_at.slice(0, 10).replaceAll('-', '/')} until{' '}
              {order.ended_at.slice(0, 10).replaceAll('-', '/')}
              <br />
              for eny changes call to: {userDetails.phone_number} -{' '}
              {userDetails.first_name} {userDetails.last_name}
            </p>
          )}
          <button onClick={() => deleteOrder()}>Delete</button>
        </>
      )}
    </div>
  );
}

export default OrderDisplay;
