import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ProfileAsset from "../asset/ProfileAsset";
import OwnerTransactions from "./OwnerTransactions";
import NeedToBook from "./NeedToBook";

function OwnerHomePage({ user }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [needToBook, setNeedToBook] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`/api/asset?owner_id=${user.id}`),
      axios.get(`/api/transaction/ownerAll/${user.id}`),
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
      <h2>My Assets</h2>
      {assets.map((asset, i) => (
        <ProfileAsset key={i} asset={asset} />
      ))}
      <h2>you have {transactions.length} unhandled orders</h2>
      <ol>
        {transactions.map((transaction, i) => (
          <OwnerTransactions
            transaction={transaction}
            transactions={transactions}
            setTransactions={setTransactions}
            key={i}
          />
        ))}
      </ol>
      <h2>you have {needToBook.length} offers that you need to book</h2>
      {needToBook.map((offer, i) => (
        <NeedToBook
          needToBook={needToBook}
          offer={offer}
          setNeedToBook={setNeedToBook}
          key={i}
        />
      ))}
    </div>
  );
}

export default OwnerHomePage;
