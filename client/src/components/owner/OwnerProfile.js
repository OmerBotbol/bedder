import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileAsset from '../asset/ProfileAsset';

export default function OwnerProfile({ user, setUser }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);

  function a(data) {
    data = ':image/jpeg;base64,{binary data}' + data;
    let imgUrl = URL.createObjectURL(
      new Blob([data.buffer], { type: 'image/*' })
    );
    // data.img
    console.log(imgUrl);
    console.log(data);
    return imgUrl;

    // let img = document.getElementById('profilePic');
    // img.src = data + ':image/jpeg;base64,{binary data}';
    // document.body.appendChild(img);
  }
  console.log(user.picture);
  //get assets from database of owner
  useEffect(() => {
    axios
      .get(`/api/asset?searchBy=owner_id&value=${user.id}`)
      .then((data) => setAssets(data.data))
      .catch((err) => console.log(err));
  }, []);

  //get picture

  // axios
  //   .get(`/api/asset?searchBy=owner_id&value=${user.id}`, {
  //     responseType: 'arraybuffer',
  //   })
  //   .then((response) =>
  //     Buffer.from(response.data, 'binary').toString('base64')
  //   );

  // Buffer.from(user.id.OwnerProfile, 'binary').toString('base64');
  return (
    <div>
      <p>Owner</p>
      <img
        src={a(Buffer.from(user.picture, 'binary').toString('base64'))}
        style={{ height: 100, width: 100 }}
      ></img>
      <button onClick={() => setAddAsset(true)}>Add asset</button>
      {addAsset && <Redirect to="/addAsset" />}
      <h2>My Assets</h2>
      {assets.map((asset, i) => (
        <ProfileAsset user={user} key={i} asset={asset} />
      ))}
    </div>
  );
}
