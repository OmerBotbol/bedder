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
              <div className="alert-line">
                Guest Name:{' '}
                <span className="alert-data">
                  {userDetails.first_name} {userDetails.last_name}
                </span>
              </div>
              <div className="alert-line">
                Address:{' '}
                <span className="alert-data">
                  {assetDetails.address}, {assetDetails.city}
                </span>
              </div>
              <div className="alert-line">
                Dates:{' '}
                <span className="alert-data">
                  {new Date(order.started_at).toLocaleDateString()} -
                  {new Date(order.ended_at).toLocaleDateString()}
                </span>
              </div>
              <div className={`status ${order.status}`}>
                status: {order.status}
              </div>
            </div>
          ) : (
            <div className="renter-alert">
              <div className="alert-line">
                Address:{' '}
                <span className="alert-data">
                  {assetDetails.address}, {assetDetails.city}
                </span>
              </div>
              <div className="alert-line">
                Dates:{' '}
                <span className="alert-data">
                  {new Date(order.started_at).toLocaleDateString()} -
                  {new Date(order.ended_at).toLocaleDateString()}
                </span>
              </div>
              {order.status !== 'pending' && (
                <div className="alert-line">
                  Contact Man:{' '}
                  <div className="alert-data">
                    <a
                      href={`https://wa.me/${userDetails.phone_number}`}
                      className="whatsapp-icon"
                    >
                      <i className="fab fa-whatsapp"></i>
                      {userDetails.phone_number}
                    </a>
                  </div>
                </div>
              )}
              <div className={`status ${order.status}`}>
                status: {order.status}
              </div>
            </div>
          )}
          <button className="delete-order-btn" onClick={() => deleteOrder()}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}

export default OrderDisplay;
