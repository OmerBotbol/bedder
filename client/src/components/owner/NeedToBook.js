import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { deleteHttp, postHttp, putHttp } from '../../utils/httpRequests';

function NeedToBook({ offer, setNeedToBook, needToBook }) {
  const [renter, setRenter] = useState({});
  const [asset, setAsset] = useState({});
  useEffect(() => {
    Promise.all([
      axios.get(`/api/renter/${offer.renter_id}`),
      axios.get(`/api/asset/${offer.asset_id}`),
    ])
      .then((data) => {
        setRenter(data[0].data);
        setAsset(data[1].data);
      })
      .catch((err) => console.log(err));
  }, [offer]);

  const refreshNeedToBook = () => {
    const offersCopy = [...needToBook];
    const index = offersCopy.findIndex((option) => {
      return option.id === offer.id;
    });
    offersCopy.splice(index, 1);
    setNeedToBook(offersCopy);
  };

  const book = () => {
    const dataForTransaction = {
      value: true,
      field: 'booked',
      id: offer.id,
    };
    const dataForAsset = {
      ownerId: offer.owner_id,
      asset_id: offer.asset_id,
      startedAt: offer.started_at,
      endedAt: offer.ended_at,
    };
    Promise.all([
      putHttp('/api/transaction', dataForTransaction),
      postHttp('/api/asset/addUnavailableDates', dataForAsset),
    ])
      .then(() => {
        refreshNeedToBook();
      })
      .catch((err) => {
        if (err.message.slice(-3) === '409') {
          return alert('those are unavailable dates already');
        } else {
          console.log(err);
        }
      });
  };

  const deleteTransaction = () => {
    const dataToSend = {
      ownerId: offer.owner_id,
      asset_id: offer.asset_id,
      startedAt: offer.started_at,
      endedAt: offer.ended_at,
    };
    Promise.all([
      deleteHttp('/api/transaction', { id: offer.id }),
      deleteHttp('/api/asset/deleteUnavailableDates', dataToSend),
    ])
      .then(() => {
        refreshNeedToBook();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="transaction">
      <div className="transaction-details">
        asset: {asset.address}, {asset.city}
      </div>
      <div className="transaction-details">
        start Date: {new Date(offer.started_at).toLocaleDateString()}
      </div>
      <div className="transaction-details">
        end Date: {new Date(offer.ended_at).toLocaleDateString()}
      </div>
      <div className="renter-details-header">Renter Details:</div>
      <div className="renter-details">
        {renter.first_name} {renter.last_name}
      </div>
      <div className="renter-details">{renter.email}</div>
      <div className="renter-details">
        <a href={`tel:${renter.phone_number}`}>{renter.phone_number}</a>
      </div>
      <div className="transaction-btn-container">
        <button className="transaction-btn" onClick={() => book()}>
          Book!
        </button>
        <button
          className="transaction-btn cancel-btn"
          onClick={() => deleteTransaction()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NeedToBook;
