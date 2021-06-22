import { Link, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileAsset from '../asset/ProfileAsset';

export default function OwnerProfile({ user, setUser }) {
  const [addAsset, setAddAsset] = useState(false);
  const [assets, setAssets] = useState([]);

  function a(data) {
    console.log(data.byteLength);
    let debugBytes = '';
    for (var i = 0; i < data.byteLength; i++) {
      debugBytes.concat(data[i].toString());
      debugBytes.concat(',');
    }

    console.log('Processing packet [' + '] ' + debugBytes);
    // data.img
    const content = new Uint8Array([
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 5,
      0, 0, 0, 5, 8, 6, 0, 0, 0, 141, 111, 38, 229, 0, 0, 0, 28, 73, 68, 65, 84,
      8, 215, 99, 248, 255, 255, 63, 195, 127, 6, 32, 5, 195, 32, 18, 132, 208,
      49, 241, 130, 88, 205, 4, 0, 14, 245, 53, 203, 209, 142, 14, 31, 0, 0, 0,
      0, 73, 69, 78, 68, 174, 66, 96, 130,
    ]);
    document.getElementById('profilePic').src = URL.createObjectURL(
      new Blob([content.buffer], { type: 'image/*' } /* (1) */)
    );
    // let img = document.getElementById('profilePic');
    // img.src = data + ':image/jpeg;base64,{binary data}';
    // document.body.appendChild(img);
  }
  useEffect(() => {
    axios
      .get(`/api/asset?searchBy=owner_id&value=${user.id}`)
      .then((data) => setAssets(data.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(`/api/asset?searchBy=owner_id&picture=${user.id}`, {
        responseType: 'arraybuffer',
      })
      .then((response) =>
        a(Buffer.from(response.data, 'binary').toString('base64'))
      );
  }, []);

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
      <img id="profilePic" style={{ height: 100, width: 100 }}></img>
      <button onClick={() => setAddAsset(true)}>Add asset</button>
      {addAsset && <Redirect to="/addAsset" />}
      <h2>My Assets</h2>
      {assets.map((asset, i) => (
        <ProfileAsset user={user} key={i} asset={asset} />
      ))}
    </div>
  );
}
