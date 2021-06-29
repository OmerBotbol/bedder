import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import OwnerProfile from './owner/OwnerProfile';
import RenterProfile from './renter/RenterProfile';
import '../styles/profile.css';

export default function Profile({ user }) {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (user) {
      const route = user.isOwner ? 'owner' : 'renter';
      axios
        .get(`/api/${route}/${user.id}`)
        .then((data) => setUserDetails(data.data))
        .catch((err) => console.log(err));
    }
  }, [user]);
  return (
    <div
      className={
        user ? (user.isOwner ? 'profile-owner' : 'profile-renter') : ''
      }>
      {loading ? (
        <div className="loader">
          <ClipLoader color={'#00887a'} loading={loading} size={150} />
        </div>
      ) : (
        <div>
          {user ? (
            <>
              {user.isOwner ? (
                <div>
                  <OwnerProfile user={user} userDetails={userDetails} />
                </div>
              ) : (
                <RenterProfile user={user} userDetails={userDetails} />
              )}
            </>
          ) : (
            <Redirect to="/" />
          )}
          <h1 className="profile-name">
            {userDetails.first_name} {userDetails.last_name}
          </h1>
          <p>{userDetails.email}</p>
          <p>{userDetails.phone_number}</p>
        </div>
      )}
    </div>
  );
}
