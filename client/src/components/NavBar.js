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
    <>
      <div id="top-navbar">
        <div>
          <i
            className={`fa fa-user-circle${user.isOwner ? '-o' : ''}`}
            aria-hidden="true"></i>
          <span> </span>
          <span id="user-name">
            {userDetails.first_name} {userDetails.last_name}
          </span>
        </div>
        <li className="navbar-title">Bedder</li>
      </div>
      <div className="nav">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <div className="menu">
          <li>
            <Link className="option-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="option-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="option-link">
            <Link className="option-link">My orders</Link>
          </li>
          <li
            className="option-link"
            onClick={() => {
              logout();
            }}>
            logout
          </li>
        </div>
      </div>
    </>
  );
}

export default NavBar;
