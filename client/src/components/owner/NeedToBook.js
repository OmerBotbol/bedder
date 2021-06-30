import React from 'react';
import { deleteHttp, putHttp } from '../../utils/httpRequests';

function NeedToBook({ offer, setNeedToBook, needToBook }) {
  const refreshNeedToBook = () => {
    const offersCopy = [...needToBook];
    const index = offersCopy.findIndex((option) => {
      return option.id === offer.id;
    });
    offersCopy.splice(index, 1);
    setNeedToBook(offersCopy);
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

  return (
    <div>
      <p>start Date: {offer.started_at.slice(0, 10)}</p>
      <p>end Date: {offer.ended_at.slice(0, 10)}</p>
      <button onClick={() => book()}>Book!</button>
      <button onClick={() => deleteTransaction()}>Cancel</button>
    </div>
  );
}

export default NeedToBook;
