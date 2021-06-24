import React from "react";
import axios from "axios";

function NeedToBook({ offer, setNeedToBook, needToBook }) {
  const book = () => {
    const dataToSend = {
      value: true,
      field: "booked",
      id: offer.id,
    };
    axios.put("/api/transaction", dataToSend).then(() => {
      const offersCopy = [...needToBook];
      const index = offersCopy.findIndex((option) => {
        return option.id === offer.id;
      });
      offersCopy.splice(index, 1);
      setNeedToBook(offersCopy);
    });
  };

  return (
    <div>
      <p>start Date: {offer.started_at.slice(0, 10)}</p>
      <p>end Date: {offer.ended_at.slice(0, 10)}</p>
      <button onClick={() => book()}>Book!</button>
      <button>Cancel</button>
    </div>
  );
}

export default NeedToBook;
