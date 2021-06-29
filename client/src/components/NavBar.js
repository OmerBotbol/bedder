import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eraseCookie } from '../utils/cookies';
import axios from 'axios';
import '../styles/navbar.css';

function NavBar({ user, setUser }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (user) {
      const route = user.isOwner ? 'owner' : 'renter';
      axios
        .get(`/api/${route}/${user.id}`)
        .then((data) => setUserDetails(data.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logout = () => {
    eraseCookie('accessToken');
    eraseCookie('refreshToken');
    setUser('');
  };

  return (
    <ul className="navbar">
      <li className="dropbtn dropdown">
        <i
          className={`fa fa-user-circle${user.isOwner ? '-o' : ''}`}
          aria-hidden="true"
        ></i>

        <span className="dropdown">
          {userDetails.first_name} {userDetails.last_name}
        </span>
        <span> </span>
        <i className="fa fa-caret-down"></i>

        <div className="dropdown-content">
          <div className="dropdown-link">
            <Link className="option-link" to="/profile">
              Profile
            </Link>
          </div>

          <div
            className="dropdown-link"
            onClick={() => {
              logout();
            }}
          >
            logout
          </div>
        </div>
        <span></span>
      </li>
      {user.isOwner ? (
        <>
          <li className="other-links">My Assets</li>
          <li className="other-links">Requests</li>
          <li className="other-links">Pending Orders</li>
          <li className="other-links">My orders</li>
          <li>
            <Link className="home" to="/">
              <i className="fa fa-fw fa-home home" />
            </Link>
          </li>{' '}
        </>
      ) : (
        <>
          <li className="other-links">Search</li>
          <li className="other-links">My orders</li>
          <li>
            <Link className="home" to="/">
              <i className="fa fa-fw fa-home home" />
            </Link>
          </li>
        </>
      )}
      <li className="navbar-title">Bedder</li>
    </ul>
  );
}

export default NavBar;
