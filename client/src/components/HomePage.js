import '../styles/homepage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import OwnerHomePage from './owner/OwnerHomePage';
import RenterHomePage from './renter/RenterHomePage';

function HomePage({ user }) {
  const [loading, setLoading] = useState(true);
  const [hideDates, setHideDates] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div id="homepage" style={{ overflow: hideDates ? '' : 'hidden' }}>
      {loading ? (
        <div className="loader">
          <ClipLoader color={'#00887a'} loading={loading} size={150} />
        </div>
      ) : (
        <div
          className={!user ? 'homepage-container' : 'homepage-user-container'}
        >
          {user ? (
            <>
              {user.isOwner ? (
                <OwnerHomePage
                  user={user}
                  hideDates={hideDates}
                  setHideDates={setHideDates}
                />
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
    </div>
  );
}

export default HomePage;
