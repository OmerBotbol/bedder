import React, { useEffect, useState } from 'react';
import { deleteHttp, putHttp } from '../../utils/httpRequests';

function NeedToBook({ offer, setNeedToBook, needToBook }) {
  const [renter, setRenter] = useState({});
  useEffect(() => {
    renterDetails();
  }, []);

  console.log(renter);
  const refreshNeedToBook = () => {
    const offersCopy = [...needToBook];
    const index = offersCopy.findIndex((option) => {
      return option.id === offer.id;
    });
    offersCopy.splice(index, 1);
    setNeedToBook(offersCopy);
  };
  const renterDetails = () => {
    axios
      .get(`/api/renter/${offer.renter_id}`)
      .then((data) => setRenter(data.data))
      .catch((err) => console.log(err));
  };
  const book = () => {
    const dataToSend = {
      value: true,
      field: 'booked',
      id: offer.id,
    };
    putHttp('/api/transaction', dataToSend)
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
  console.log(offer);

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
