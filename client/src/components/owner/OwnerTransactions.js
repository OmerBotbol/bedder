import axios from "axios";
import React, { useEffect, useState } from "react";

function OwnerTransactions({ transaction, transactions, setTransactions }) {
  const [renterDetails, setRenterDetails] = useState("");

  useEffect(() => {
    axios
      .get(`/api/renter/${transaction.renter_id}`)
      .then((data) => {
        setRenterDetails(data.data);
      })
      .catch((err) => console.log(err));
  }, [transaction.renter_id]);

  const AcceptConnection = () => {
    const dataToSend = {
      value: true,
      field: "owner_approvement",
      id: transaction.id,
    };
    axios.put("/api/transaction", dataToSend).then(() => {
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
        <>
          <p>
            Hi! my name is {renterDetails.first_name} {renterDetails.last_name}{" "}
            and I would like to come to your asset from{" "}
            {transaction.started_at.slice(0, 10)} to{" "}
            {transaction.ended_at.slice(0, 10)}. my purpose is{" "}
            {renterDetails.purpose}
          </p>
          {transaction.comments && (
            <p>
              I have a few thing I would like to tell you first:{" "}
              {transaction.comments}
            </p>
          )}
          <button onClick={() => AcceptConnection()}>Accept</button>
          <button>Deny</button>
        </>
      )}
    </li>
  );
}

export default OwnerTransactions;
