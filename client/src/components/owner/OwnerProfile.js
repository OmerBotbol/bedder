import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileAsset from "../asset/ProfileAsset";
import OwnerTransactions from "./OwnerTransactions";
import NeedToBook from "./NeedToBook";

export default function OwnerProfile({ user, userDetails }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [needToBook, setNeedToBook] = useState([]);
  const [pictureUrl, setPictureUrl] = useState("");

  //Get assets from database of owner
  useEffect(() => {
    Promise.all([
      axios.get(`/api/picture/image/${userDetails.picture}`),
      axios.get(`/api/asset?owner_id=${user.id}`),
      axios.get(`/api/transaction/ownerAll/${user.id}`),
    ])
      .then((data) => {
        setPictureUrl(data[0].data);
        setAssets(data[1].data);

        const findTrans = data[2].data.reduce((filtered, option) => {
          if (!option.owner_approvement && !option.booked) {
            filtered.push(option);
          }
          return filtered;
        }, []);
        const findNeed = data[2].data.reduce((filtered, option) => {
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
  }, [user.id, userDetails.picture, transactions]);
  return (
    <div>
      <p>Owner</p>
      <img src={pictureUrl} style={{ height: 100, width: 100 }} alt="profile" />
      <button onClick={() => setAddAsset(true)}>Add asset</button>
      {addAsset && <Redirect to="/addAsset" />}
      <h2>My Assets</h2>
      {assets.map((asset, i) => (
        <ProfileAsset userDetails={userDetails} key={i} asset={asset} />
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
