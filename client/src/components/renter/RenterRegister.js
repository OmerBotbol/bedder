import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../styles/renterRegister.css';

function RenterRegister({ user, setUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [purpose, setPurpose] = useState('');
  const [image, setImage] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
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
        purpose,
        picture: imageKey.data,
        phone_number: phoneNumber,
      };
      axios
        .post('/api/renter/create', dataToSend)
        .then(() => {
          setRedirect(true);
        })
        .catch(async (err) => {
          if (err.message.slice(-3) === '401') {
            setMessage('Invalid password or email');
          } else if (err.message.slice(-3) === '409') {
            setMessage('Email already exists');
          } else {
            setMessage('Problem, please try again later');
          }
          await axios.delete(`/api/picture/image/${imageKey.data}`);
        });
    } else {
      setMessage("Password doesn't match");
    }
  };

  return (
    <div id="renter-register-page">
      {!user ? (
        <div id="renter-register-container">
          <h1 id="renter-register-header">Register</h1>
          <div className="form">
            <div className="form-field">
              <label className="register-label">First Name</label>
              <input
                type="text"
                className="register-text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Last Name</label>
              <input
                type="text"
                className="register-text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Email</label>
              <input
                type="email"
                className="register-text"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Password</label>
              <input
                type="password"
                className="register-text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Confirm password</label>
              <div className="form-field confirm-password-container">
                <i
                  className={`fa fa-${
                    confirmPassword ? 'check' : 'times'
                  }-circle-o register-symbol`}
                  style={{ color: confirmPassword ? '#00887a' : '#e2144d' }}
                  aria-hidden="true"
                ></i>
                <input
                  type="password"
                  className="confirm-password"
                  onChange={(e) =>
                    password === e.target.value
                      ? setConfirmPassword(true)
                      : setConfirmPassword(false)
                  }
                />
              </div>
            </div>
            <div className="form-field">
              <label className="register-label">Picture</label>
              <div className="file-wrapper">
                <label className="file-name">{image.name}</label>
                <span> </span>
                <label className="file-label">upload</label>
                <input
                  className="input-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="form-field">
              <label className="register-label">Phone Number</label>
              <input
                type="text"
                className="register-text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Purpose</label>
              <textarea
                rows="5"
                cols="10"
                className="register-purpose"
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
          </div>
          <div className="register-btn" onClick={() => handleClick()}>
            Register
          </div>
          {message && <div className="error">{message}</div>}
          {redirect && <Redirect to="/login" />}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default RenterRegister;
