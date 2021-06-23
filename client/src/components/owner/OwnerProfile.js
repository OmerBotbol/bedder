import { Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ProfileAsset from "../asset/ProfileAsset";

export default function OwnerProfile({ user, userDetails }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);
  const [pictureUrl, setPictureUrl] = useState("");

  //get assets from database of owner
  useEffect(() => {
    axios
      .get(`/api/picture/image/${userDetails.picture}`)
      .then((data) => {
        setPictureUrl(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/api/asset?searchBy=owner_id&value=${user.id}`)
      .then((data) => setAssets(data.data))
      .catch((err) => console.log(err));
  }, [userDetails.picture, user.id]);

  return (
    <div>
      <p>Owner</p>
      <img
        src={pictureUrl}
        style={{ height: 100, width: 100 }}
        alt="profile"
      ></img>
      <button onClick={() => setAddAsset(true)}>Add asset</button>
      {addAsset && <Redirect to="/addAsset" />}
      <h2>My Assets</h2>
      {assets.map((asset, i) => (
        <ProfileAsset userDetails={userDetails} key={i} asset={asset} />
      ))}
    </div>
  );
}
