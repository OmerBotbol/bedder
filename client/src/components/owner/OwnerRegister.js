import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

function OwnerRegister({ user }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState('');

  const handleClick = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !image ||
      !phoneNumber
    ) {
      setMessage('Please fill all the fields');
    } else if (confirmPassword) {
      const imageInForm = new FormData();
      imageInForm.append('file', image);
      const imageKey = await axios.post('/api/picture/upload', imageInForm);
      const dataToSend = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        picture: imageKey.data,
        phone_number: phoneNumber,
      };
      axios
        .post('/api/owner/create', dataToSend)
        .then(() => {
          setRedirect(true);
        })
        .catch(async (err) => {
          if (err.message.slice(-3) === '401') {
            setMessage('Invalid password or email');
            await axios.delete(`/api/picture/image/${imageKey.data}`);
          } else if (err.message.slice(-3) === '409') {
            setMessage('Email already exists');
            await axios.delete(`/api/picture/image/${imageKey.data}`);
          } else {
            setMessage('Problem, please try again later');
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
          <label>First name</label>
          <input onChange={(e) => setFirstName(e.target.value)} />
          <label>Last name</label>
          <input onChange={(e) => setLastName(e.target.value)} />
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
          <label>Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <label>Phone number</label>
          <input onChange={(e) => setPhoneNumber(e.target.value)} />
          <button
            onClick={() => {
              handleClick();
            }}>
            Register
          </button>
          {message && <p>{message}</p>}
          {redirect && <Redirect to="/login" />}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default OwnerRegister;