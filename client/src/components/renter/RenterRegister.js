import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function RenterRegister({ user, setUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [purpose, setPurpose] = useState("");
  const [image, setImage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleClick = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !purpose ||
      !image ||
      !phoneNumber
    ) {
      console.log({
        firstName,
        lastName,
        email,
        password,
        purpose,
        image,
        phoneNumber,
      });
      setMessage("Please fill all the fields");
    } else if (confirmPassword) {
      const imageInForm = new FormData();
      imageInForm.append("file", image);
      const imageKey = await axios.post("/api/picture/upload", imageInForm);
      const dataToSend = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        purpose,
        picture: imageKey.data,
        phone_number: phoneNumber,
      };
      axios
        .post("/api/renter/create", dataToSend)
        .then(() => {
          setRedirect(true);
        })
        .catch(async (err) => {
          if (err.message.slice(-3) === "401") {
            setMessage("Invalid password or email");
            await axios.delete(`/api/picture/image/${imageKey.data}`);
          } else if (err.message.slice(-3) === "409") {
            setMessage("Email already exists");
            await axios.delete(`/api/picture/image/${imageKey.data}`);
          } else {
            setMessage("Problem, please try again later");
            await axios.delete(`/api/picture/image/${imageKey.data}`);
          }
        });
    } else {
      setMessage("Password doesn't match");
    }
  };

  return (
    <>
      {!user ? (
        <div>
          <h1>Register</h1>
          <label>First Name</label>
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
          <label>Last Name</label>
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
          <label>Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label>Phone Number</label>
          <input type="text" onChange={(e) => setPhoneNumber(e.target.value)} />
          <button onClick={() => handleClick()}>Register</button>
          {message && <p>{message}</p>}
          {redirect && <Redirect to="/login" />}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default RenterRegister;
