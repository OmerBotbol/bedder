import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileAsset from '../asset/ProfileAsset';

export default function OwnerProfile({ user, setUser }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/asset?searchBy=owner_id&value=${user.id}`)
      .then((data) => setAssets(data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <p>Owner</p>
      <button onClick={() => setAddAsset(true)}>Add asset</button>
      {addAsset && <Redirect to="/addAsset" />}
      <h2>My Assets</h2>
      {assets.map((asset, i) => (
        <ProfileAsset user={user} key={i} asset={asset} />
      ))}
    </div>
  );
}
