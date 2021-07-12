import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { deleteHttp, putHttp } from '../../utils/httpRequests';

function OwnerTransactions({ transaction, transactions, setTransactions }) {
  const [renterDetails, setRenterDetails] = useState('');
  const [assetDetails, setAssetDetails] = useState('');

  //Owner needs to approve contact with renter
  useEffect(() => {
    Promise.all([
      axios.get(`/api/renter/${transaction.renter_id}`),
      axios.get(`/api/asset/${transaction.asset_id}`),
    ])
      .then((data) => {
        setRenterDetails(data[0].data);
        setAssetDetails(data[1].data);
      })
      .catch((err) => console.log(err));
  }, [transaction]);

  const acceptConnection = () => {
    const dataToSend = {
      value: true,
      field: 'owner_approvement',
      id: transaction.id,
    };
    putHttp('/api/transaction', dataToSend).then(() => {
      const transactionsCopy = [...transactions];
      const index = transactionsCopy.findIndex((option) => {
        return option.id === transaction.id;
      });
      transactionsCopy.splice(index, 1);
      setTransactions(transactionsCopy);
    });
  };

  const cancelConnection = () => {
    deleteHttp('/api/transaction', { id: transaction.id }).then(() => {
      const transactionsCopy = [...transactions];
      const index = transactionsCopy.findIndex((option) => {
        return option.id === transaction.id;
      });
      transactionsCopy.splice(index, 1);
      setTransactions(transactionsCopy);
    });
  };

  return (
    <li>
      {renterDetails && (
        <div className="transaction">
          <div className="transaction-text">
            <div className="transaction-renter-line">
              Name:{' '}
              <span className="transaction-data">
                {renterDetails.first_name} {renterDetails.last_name}
              </span>
            </div>
            <div className="transaction-renter-line">
              Address:{' '}
              <span className="transaction-data">
                {assetDetails.address}, {assetDetails.city}
              </span>
            </div>
            <div className="transaction-renter-line">
              Dates:{' '}
              <span className="transaction-data">
                {new Date(transaction.started_at).toLocaleDateString()} -{' '}
                {new Date(transaction.ended_at).toLocaleDateString()}
              </span>
            </div>
            <div className="transaction-renter-line">
              Purpose:{' '}
              <span className="transaction-data">{renterDetails.purpose}</span>
            </div>
            {transaction.comments && (
              <div className="transaction-renter-line">
                comments:{' '}
                <span className="transaction-data">{transaction.comments}</span>
              </div>
            )}
          </div>
          <div className="transaction-btn-container">
            <button
              className="transaction-btn"
              onClick={() => acceptConnection()}
            >
              Accept
            </button>
            <button
              className="transaction-btn cancel-btn"
              onClick={() => cancelConnection()}
            >
              Deny
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default OwnerTransactions;
