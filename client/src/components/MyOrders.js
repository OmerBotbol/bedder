import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import OrderDisplay from './OrderDisplay';
import '../styles/myOrders.css';

function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const searchBy = user.isOwner ? 'owner_id' : 'renter_id';
      axios
        .get(`/api/transaction/user/all?searchBy=${searchBy}&value=${user.id}`)
        .then((data) => {
          const findOrders = data.data.reduce((filtered, option) => {
            if (option.owner_approvement && option.booked) {
              option.status = 'booked';
            }
            if (option.owner_approvement && !option.booked) {
              option.status = 'open';
            }
            if (!option.owner_approvement && !option.booked) {
              option.status = 'pending';
            }
            filtered.push(option);
            return filtered;
          }, []);
          setOrders(sortByStatus(findOrders));
        });
    }
  }, [user]);

  const sortByStatus = (arr) => {
    const sortOrder = { pending: 0, open: 1, booked: 2 };
    arr.sort((a, b) => {
      return sortOrder[a.status] - sortOrder[b.status];
    });
    return arr;
  };

  return (
    <div id="my-orders">
      {user ? (
        <div id="my-orders-container">
          <h1 id="my-orders-header">My Orders</h1>
          <div id="all-orders">
            {orders.length > 0 ? (
              orders.map((order, i) => {
                return (
                  <OrderDisplay
                    user={user}
                    order={order}
                    orders={orders}
                    setOrders={setOrders}
                    key={i}
                  />
                );
              })
            ) : (
              <p id="no-orders-message">no orders</p>
            )}
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default MyOrders;
