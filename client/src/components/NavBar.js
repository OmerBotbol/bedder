import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eraseCookie } from "../utils/cookies";
import axios from "axios";

function NavBar({ user, setUser }) {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (user) {
      const route = user.isOwner ? "owner" : "renter";
      axios
        .get(`/api/${route}/${user.id}`)
        .then((data) => setUserDetails(data.data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logout = () => {
    eraseCookie("accessToken");
    eraseCookie("refreshToken");
    setUser("");
  };

  return (
    <div>
      <i
        className={`fa fa-user-circle${user.isOwner ? "-o" : ""}`}
        aria-hidden="true"
      ></i>
      <span> </span>
      <Link to="/profile">
        {userDetails.first_name} {userDetails.last_name}
      </Link>
      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
}

export default NavBar;
