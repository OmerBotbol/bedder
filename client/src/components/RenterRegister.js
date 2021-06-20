import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { createCookie } from "../utils/cookies";

function RenterRegister({ setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [picture, setPicture] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    const dataToSend = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      purpose,
      picture,
      phone_number: phoneNumber,
    };
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !purpose ||
      !picture ||
      !phoneNumber
    ) {
      setMessage("Please fill all the fields");
    } else if (confirmPassword) {
      axios
        .post("/api/renter/create", dataToSend)
        .then((data) => {
          const userData = { email: email, isOwner: false, id: data.data.id };
          setUser(userData);
          setRedirect(true);
        })
        .catch((err) => {
          console.log(err.message.slice(-3) === "401");
          if (err.message.slice(-3) === "401") {
            setMessage("Invalid password or email");
          } else if (err.message.slice(-3) === "409") {
            setMessage("Email already exists");
          } else {
            setMessage("Problem, please try again later");
          }
        });
    } else {
      setMessage("Password doesn't match");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <label>First Name</label>
      <input type="text" onChange={(e) => setFirstName(e.target.value)} />
      <label>Last Name</label>
      <input type="text" onChange={(e) => setLastName(e.target.value)} />
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <label>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm password</label>
      <input
        type="password"
        onChange={(e) =>
          password === e.target.value
            ? setConfirmPassword(true)
            : setConfirmPassword(false)
        }
      />
      {confirmPassword ? (
        <i className="fa fa-check-circle-o" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-times-circle-o" aria-hidden="true"></i>
      )}
      <label>Purpose</label>
      <textarea
        rows="5"
        cols="10"
        onChange={(e) => setPurpose(e.target.value)}
      />
      <label>Picture</label>
      <input type="text" onChange={(e) => setPicture(e.target.value)} />
      <label>Phone Number</label>
      <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
      <button onClick={() => handleClick()}>register</button>
      {message && <p>{message}</p>}
      {redirect && <Redirect to="/login" />}
    </>
  );
}

export default RenterRegister;
