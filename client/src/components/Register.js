import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Register({ user }) {
  const [type, setType] = useState("");
  const [temp, setTemp] = useState("");

  return (
    <>
      {!user ? (
        <div>
          <h1>Register as</h1>
          <label>Owner</label>{" "}
          <input
            type="radio"
            name="customer"
            onClick={() => setTemp("Owner")}
          />
          <label>Renter</label>{" "}
          <input
            type="radio"
            name="customer"
            onClick={() => setTemp("Renter")}
          />
          <button
            onClick={() => {
              setType(temp);
            }}
          >
            Next
          </button>
          {type === "Owner" ? (
            <Redirect to="/ownerRegister" />
          ) : (
            <Redirect to="/renterRegister" />
          )}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Register;
