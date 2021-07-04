import '../styles/homepage.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import OwnerHomePage from './owner/OwnerHomePage';
import RenterHomePage from './renter/RenterHomePage';

function HomePage({ user }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div id="homepage">
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
                <OwnerHomePage user={user} />
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
              <Popup
                trigger={<button className="about">ABOUT US</button>}
                position="top left"
              >
                {(close) => (
                  <div className="box">
                    <div className="header">
                      <h1 className="story"> Our Story</h1>
                    </div>
                    <div className="content">
                      <p>
                        <p>
                          This application was established in 2021 after the
                          Operation Guardian of the Walls, by Omer Botbol, Shira
                          Meirovitz and Noa Shalom as part of a program for
                          veterans that operated by Scale-Up Velocity in
                          cooperation with the IDF and the cyber system.
                          <br></br>
                        </p>
                        The purpose of the application is to reflect the
                        knowledge acquired after five months of training and has
                        one vision: to create and expand the circles of
                        volunteering and giving in Israeli society, with an
                        emphasis on free accommodation. In order to promote this
                        vision, we have developed an application that makes
                        accessible and quick search for accommodation, as well
                        as advertising accommodation at the click of a button.
                      </p>
                      <br></br>
                      <p>
                        We believe that volunteering can and should become
                        public domain, and that the way there is through quality
                        technology.
                      </p>
                      <a className="close" onClick={close}>
                        &times;
                      </a>
                    </div>
                  </div>
                )}
              </Popup>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
