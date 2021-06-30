import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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
    <div>
      <button onClick={() => setAddAsset(true)}>Add asset</button>
      {addAsset && <Redirect to="/addAsset" />}
      <h2 id="owner-assets">My Assets</h2>
      {assets.map((asset, i) => (
        <Suspense key={i} fallback={<div>Loading...</div>}>
          <ProfileAsset asset={asset} />
        </Suspense>
      ))}
      <h2 id="owner-requests">
        you have {transactions.length} unhandled orders
      </h2>
      <ol>
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
      <h2 id="owner-pending-orders">
        you have {needToBook.length} offers that you need to book
      </h2>
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
  );
}

export default OwnerHomePage;
