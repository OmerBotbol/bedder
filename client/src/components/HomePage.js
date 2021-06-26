import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { eraseCookie } from "../utils/cookies";
import ClipLoader from "react-spinners/ClipLoader";
import OwnerHomePage from "./owner/OwnerHomePage";
import RenterHomePage from "./renter/RenterHomePage";

function HomePage({ user, setUser }) {
  const [loading, setLoading] = useState(true);

  const logout = () => {
    eraseCookie("accessToken");
    eraseCookie("refreshToken");
    setUser("");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <ClipLoader color={"red"} loading={loading} size={150} />
      ) : (
        <div>
          <h1>Home Page</h1>
          {user ? (
            <>
              <div>{user.email}</div>
              <div>{user.isOwner ? "Owner" : "Renter"}</div>
              <button
                onClick={() => {
                  logout();
                }}
              >
                logout
              </button>
              {user.isOwner ? (
                <OwnerHomePage user={user} />
              ) : (
                <RenterHomePage user={user} />
              )}
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <>
              <div>welcome to bedder</div>
              <Link to="/login">login</Link>
              <br />
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
