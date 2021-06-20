import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eraseCookie } from '../utils/cookies';
import ShowAsset from './ShowAsset';

function HomePage({ user, setUser }) {
  const [assets, setAssets] = useState([]);
  const logout = () => {
    eraseCookie('accessToken');
    eraseCookie('refreshToken');
    setUser('');
  };

  const getAssets = () => {
    axios
      .get('/api/asset')
      .then((data) => {
        console.log(data.data);
        setAssets(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAssets();
  }, []);
  return (
    <>
      <h1>Home Page</h1>
      {user ? (
        <>
          <div>{user.email}</div>
          <div>{user.isOwner ? 'Owner' : 'Renter'}</div>
          <button
            onClick={() => {
              logout();
            }}>
            logout
          </button>
          {user.isOwner ? (
            ''
          ) : (
            <div>
              {assets.map((asset, i) => (
                <ShowAsset key={i} asset={asset} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div>welcome to bedder</div>
          <Link to="/login">login</Link>
          <br />
          <Link to="/register">Register</Link>
        </>
      )}
    </>
  );
}

export default HomePage;
