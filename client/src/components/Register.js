import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function Register() {
  const [type, setType] = useState("");
  const [temp, setTemp] = useState("");

  return (
    <div>
      <h1>Register as</h1>
      <label>Owner</label>{" "}
      <input type="radio" name="customer" onClick={() => setTemp("Owner")} />
      <label>Renter</label>{" "}
      <input type="radio" name="customer" onClick={() => setTemp("Renter")} />
      <button
        onClick={() => {
          setType(temp);
        }}
      >
        Next
      </button>
      {type === "Owner" && <Redirect to="/ownerRegister" />}
      {type === "Renter" && <Redirect to="/renterRegister" />}
    </div>
  );
}

export default Register;
