import '../styles/homepage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import OwnerHomePage from './owner/OwnerHomePage';
import RenterHomePage from './renter/RenterHomePage';

function HomePage({ user }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.isOwner) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div className="loader">
          <ClipLoader color={'#00887a'} loading={loading} size={150} />
        </div>
      ) : (
        <div className="homepage-container">
          {user ? (
            <>
              <div>{user.email}</div>
              <div>{user.isOwner ? 'Owner' : 'Renter'}</div>
              {user.isOwner ? (
                <OwnerHomePage user={user} setLoading={setLoading} />
              ) : (
                <RenterHomePage user={user} />
              )}
            </>
          ) : (
            <>
              <div id="welcome">welcome to</div>
              <h1 id="homepage-header">Bedder</h1>
              <div id="homepage-btn">
                <Link className="link" to="/login">
                  login
                </Link>
                <Link className="link" to="/register">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
