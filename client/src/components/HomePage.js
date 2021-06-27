import "../styles/homepage.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import OwnerHomePage from "./owner/OwnerHomePage";
import RenterHomePage from "./renter/RenterHomePage";

function HomePage({ user }) {
  const [loading, setLoading] = useState(true);

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
        <div className="container2">
          <h1>Bedder</h1>
          {user ? (
            <>
              <div>{user.email}</div>
              <div>{user.isOwner ? "Owner" : "Renter"}</div>
              {user.isOwner ? (
                <OwnerHomePage user={user} />
              ) : (
                <RenterHomePage user={user} />
              )}
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
