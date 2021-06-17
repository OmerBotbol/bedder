import React from "react";
import { Link } from "react-router-dom";
import { eraseCookie } from "../utils/cookies";

function HomePage({ user, setUser }) {
  const logout = () => {
    eraseCookie("accessToken");
    eraseCookie("refreshToken");
    setUser("");
  };

  return (
    <>
      <h1>Home Page</h1>
      {user ? (
        <>
          <div>{user.email}</div>
          <div>{user.isOwner ? "Owner" : "renter"}</div>
          <button
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <div>welcome to bedder</div>
          <Link to="/login">login</Link>
        </>
      )}
    </>
  );
}

export default HomePage;
