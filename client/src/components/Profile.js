import axios from "axios";
import { useState, useEffect } from "react";

export default function Profile({ user, setUser }) {
  const [userDetails, setUserDetails] = useState({});
  useEffect(async () => {
    console.log(user);
    if (user.isOwner) {
      const findUser = await axios
        .get(`/api/owner/${user.id}`)
        .then((data) => setUserDetails(data.data))
        .catch((err) => console.log(err));
    } else {
      const findUser = await axios
        .get(`/api/renter/${user.id}`)
        .then((data) => setUserDetails(data.data))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div>
      <h1>
        Hello {userDetails.first_name} {userDetails.last_name},
      </h1>
      <p>{userDetails.email}</p>
      <p>{userDetails.phone_number}</p>
    </div>
  );
}
