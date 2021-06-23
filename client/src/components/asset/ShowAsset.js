import axios from "axios";
import { useState, useEffect } from "react";

export default function ShowAsset({ asset }) {
  const [pictureUrl, setPictureUrl] = useState("");

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
    </div>
  );
}
