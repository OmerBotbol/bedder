import axios from "axios";
import React from "react";
import { useState } from "react";

function SendRequest({ user, asset, startedAt, endedAt, setOpenSendRequest }) {
  const [comments, setComments] = useState("");

  const handleClick = () => {
    const dataToSend = {
      asset_id: asset.id,
      owner_id: asset.owner_id,
      renter_id: user.id,
      started_at: startedAt,
      ended_at: endedAt,
      comments,
    };
    axios
      .post("/api/transaction/new", dataToSend)
      .then(() => {
        setOpenSendRequest(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p>
        the date you arrive is {startedAt.slice(0, 10).replaceAll("-", "/")}
      </p>
      <p>the date you leave is {endedAt.slice(0, 10).replaceAll("-", "/")}</p>
      <p>add anything we need to know</p>
      <input type="text" onChange={(e) => setComments(e.target.value)} />
      <button onClick={() => handleClick()}>send</button>
    </div>
  );
}

export default SendRequest;
