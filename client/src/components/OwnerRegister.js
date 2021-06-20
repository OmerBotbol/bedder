import axios from "axios";
import React, { useState } from "react";

function OwnerRegister({ user, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [picture, setPicture] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = () => {
    const dataToSend = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      picture,
      phone_number: phoneNumber,
    };
    axios
      .post("/api/owner/create", dataToSend)
      .then(() => {
        setUser({ email: email, isOwner: true });
      })
      .catch((err) => {
        if (err.message.slice(-3) === "401")
          setMessage("Invalid password or email");
        if (err.message.slice(-3) === "409") setMessage("Email already exists");
        else setMessage("Problem, please try again later");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <label>First name</label>
      <input onChange={(e) => setFirstName(e.target.value)} require />
      <label>Last name</label>
      <input onChange={(e) => setLastName(e.target.value)} require />
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} require />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        require
      />
      <label>Confirm password</label>
      <input
        type="password"
        onChange={(e) =>
          password === e.target.value
            ? setConfirmPassword(true)
            : setConfirmPassword(false)
        }
        require
      />
      {confirmPassword ? (
        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-times-circle-o" aria-hidden="true"></i>
      )}
      <label>Picture</label>
      <input onChange={(e) => setPicture(e.target.value)} require />
      <label>Phone number</label>
      <input onChange={(e) => setPhoneNumber(e.target.value)} require />
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Register
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OwnerRegister;
