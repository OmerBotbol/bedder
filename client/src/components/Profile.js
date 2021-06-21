import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import OwnerProfile from './OwnerProfile';
import RenterProfile from './RenterProfile';

export default function Profile({ user, setUser }) {
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (user) {
      console.log(user);
      if (user.isOwner) {
        const findUser = axios
          .get(`/api/owner/${user.id}`)
          .then((data) => setUserDetails(data.data))
          .catch((err) => console.log(err));
      } else {
        const findUser = axios
          .get(`/api/renter/${user.id}`)
          .then((data) => setUserDetails(data.data))
          .catch((err) => console.log(err));
      }
    }
  }, [user]);
  return (
    <div>
      {loading ? (
        <ClipLoader color={'red'} loading={loading} size={150} />
      ) : (
        <div>
          <h1>
            Hello {userDetails.first_name} {userDetails.last_name},
          </h1>
          <p>{userDetails.email}</p>
          <p>{userDetails.phone_number}</p>
          {user ? (
            <>
              {user.isOwner ? (
                <div>
                  <OwnerProfile user={user} />
                </div>
              ) : (
                <RenterProfile user={user} />
              )}
              <Link to="/">Home</Link>
            </>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      )}
    </div>
  );
}
