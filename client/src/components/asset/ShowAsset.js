import axios from "axios";
import { useState, useEffect } from "react";
import SendRequest from "./SendRequest";

export default function ShowAsset({ user, asset, startedAt, endedAt }) {
  const [pictureUrl, setPictureUrl] = useState("");
  const [openSendRequest, setOpenSendRequest] = useState(false);

  //Show asset on home page
  useEffect(() => {
    axios
      .get(`/api/picture/image/${asset.picture}`)
      .then((data) => {
        setPictureUrl(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asset.picture]);

  return (
    <div className="asset">
      <img src={pictureUrl} alt="asset" />
      <span>{asset.city}</span>
      <p>{asset.description}</p>
      <p>Availability</p>
      <p>
        {asset.started_at.slice(0, 10).replaceAll("-", "/")}-
        {asset.ended_at.slice(0, 10).replaceAll("-", "/")}
      </p>
      <button onClick={() => setOpenSendRequest((prev) => !prev)}>like</button>
      {openSendRequest && (
        <SendRequest
          user={user}
          asset={asset}
          setOpenSendRequest={setOpenSendRequest}
          startedAt={startedAt}
          endedAt={endedAt}
        />
      )}
    </div>
  );
}
