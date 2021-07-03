import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { deleteHttp, postHttp, putHttp } from '../../utils/httpRequests';

function NeedToBook({ offer, setNeedToBook, needToBook }) {
  const [renter, setRenter] = useState({});
  useEffect(() => {
    axios
      .get(`/api/renter/${offer.renter_id}`)
      .then((data) => setRenter(data.data))
      .catch((err) => console.log(err));
  }, [offer.renter_id]);

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
      .catch((err) => console.log(err));
  };

  const deleteTransaction = () => {
    deleteHttp('/api/transaction', { id: offer.id })
      .then(() => {
        refreshNeedToBook();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>start Date: {offer.started_at.slice(0, 10)}</p>
      <p>end Date: {offer.ended_at.slice(0, 10)}</p>
      <h3>Renter Details:</h3>
      <p>
        {renter.first_name} {renter.last_name}
      </p>
      <p>{renter.email}</p>
      <p>{renter.phone_number}</p>
      <button onClick={() => book()}>Book!</button>
      <button onClick={() => deleteTransaction()}>Cancel</button>
    </div>
  );
}

export default NeedToBook;
