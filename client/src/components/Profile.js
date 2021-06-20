import axios from 'axios';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

export default function Profile({ user, setUser }) {
  const [userDetails, setUserDetails] = useState({});
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
      <h1>
        Hello {userDetails.first_name} {userDetails.last_name},
      </h1>
      <p>{userDetails.email}</p>
      <p>{userDetails.phone_number}</p>
      {userDetails.isOwner ? <p>Owner</p> : <p>Renter</p>}
    </div>
  );
}
