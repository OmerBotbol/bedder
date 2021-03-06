import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../../styles/ownerHomepage.css';
const ProfileAsset = lazy(() => import('../asset/ProfileAsset'));
const OwnerTransactions = lazy(() => import('./OwnerTransactions'));
const NeedToBook = lazy(() => import('./NeedToBook'));

function OwnerHomePage({ user }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [needToBook, setNeedToBook] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/asset?owner_id=${user.id}`),
      axios.get(`/api/transaction/user/all?searchBy=owner_id&value=${user.id}`),
    ])
      .then((data) => {
        setAssets(data[0].data);

        const findTrans = data[1].data.reduce((filtered, option) => {
          if (!option.owner_approvement && !option.booked) {
            filtered.push(option);
          }
          return filtered;
        }, []);
        const findNeed = data[1].data.reduce((filtered, option) => {
          if (option.owner_approvement && !option.booked) {
            filtered.push(option);
          }
          return filtered;
        }, []);
        if (transactions.length !== findTrans.length) {
          setTransactions(findTrans);
        }
        setNeedToBook(findNeed);
      })
      .catch((err) => console.log(err));
  }, [user.id, transactions]);

  return (
    <div id="owner-homepage">
      <div id="assets-container">
        <div className="headlines-asset">
          <h2 id="owner-assets">Assets</h2>
          <div className="add-asset-button-container">
            <button
              className="add-asset-button"
              onClick={() => setAddAsset(true)}
            >
              Add asset
            </button>
            {addAsset && <Redirect to="/addAsset" />}
          </div>
        </div>
        <div id="assets">
          {assets.map((asset, i) => (
            <Suspense key={i} fallback={<div>Loading...</div>}>
              <ProfileAsset asset={asset} user={user} />
            </Suspense>
          ))}
        </div>
      </div>
      <div id="all-requests">
        <div id="owner-requests">
          <h2>
            My Likes{' '}
            <span className="number-orders">({transactions.length})</span>
          </h2>
          <ol id="transaction-list">
            {transactions.map((transaction, i) => (
              <Suspense key={i} fallback={<div>Loading...</div>}>
                <OwnerTransactions
                  transaction={transaction}
                  transactions={transactions}
                  setTransactions={setTransactions}
                />
              </Suspense>
            ))}
          </ol>
        </div>
        <div id="owner-pending-orders">
          <h2>
            Need To Book
            <span className="number-orders"> ({needToBook.length})</span>
          </h2>
          <div id="owner-pending-orders-list">
            {needToBook.map((offer, i) => (
              <Suspense key={i} fallback={<div>Loading...</div>}>
                <NeedToBook
                  needToBook={needToBook}
                  offer={offer}
                  setNeedToBook={setNeedToBook}
                />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerHomePage;
