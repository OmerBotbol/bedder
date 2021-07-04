import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { deleteHttp } from '../utils/httpRequests';
import '../styles/myOrders.css';

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
      ownerId: user.id,
      asset_id: assetDetails.id,
      startedAt: order.started_at,
      endedAt: order.ended_at,
    };
    Promise.all([
      deleteHttp('/api/transaction', { id: order.id }),
      deleteHttp('/api/asset/deleteUnavailableDates', dataToSend),
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
    <div className="alert">
      {userDetails && assetDetails && (
        <>
          {user.isOwner ? (
            <div className="owner-alert">
              {userDetails.first_name} {userDetails.last_name} is coming to{' '}
              {assetDetails.address}, {assetDetails.city} from{' '}
              {new Date(order.started_at).toLocaleDateString()} until{' '}
              {new Date(order.ended_at).toLocaleDateString()}
            </div>
          ) : (
            <div className="renter-alert">
              you are coming to {assetDetails.address}, {assetDetails.city} from{' '}
              {new Date(order.started_at).toLocaleDateString()} until{' '}
              {new Date(order.ended_at).toLocaleDateString()}
              <br />
              for eny changes call to: {userDetails.phone_number} -{' '}
              {userDetails.first_name} {userDetails.last_name}
            </div>
          )}
          <button className="delete-order-btn" onClick={() => deleteOrder()}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default OrderDisplay;
