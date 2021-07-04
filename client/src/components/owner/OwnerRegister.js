import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../../styles/renterRegister.css';
import { deleteHttp, postHttp } from '../../utils/httpRequests';

function OwnerRegister({ user }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordStatus, setConfirmPasswordStatus] = useState(false);
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
    } else if (confirmPasswordStatus) {
      const imageInForm = new FormData();
      imageInForm.append('file', image);
      const imageKey = await postHttp('/api/picture/upload', imageInForm);
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
          } else if (err.message.slice(-3) === '409') {
            setMessage('Email already exists');
          } else {
            setMessage('Problem, please try again later');
          }
          await deleteHttp(`/api/picture/image/${user.id}/${imageKey.data}`);
        });
    } else {
      setMessage("Password doesn't match");
    }
  };

  const changeConfirmPassword = (confirmPasswordValue) => {
    setConfirmPassword(confirmPasswordValue);
    setConfirmPasswordStatus(confirmPasswordValue === password ? true : false);
  };

  return (
    <div id="renter-register-page">
      {!user ? (
        <div id="renter-register-container">
          <h1 id="renter-register-header">Register</h1>
          <div className="form">
            <div className="form-field">
              <label className="register-label">First name</label>
              <input
                className="register-text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Last name</label>
              <input
                className="register-text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Email</label>
              <input
                className="register-text"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Password</label>
              <input
                className="register-text"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="register-label">Confirm password</label>
              <div className="form-field confirm-password-container">
                {confirmPassword && (
                  <i
                    className={`fa fa-${
                      confirmPasswordStatus ? 'check' : 'times'
                    }-circle-o register-symbol`}
                    style={{
                      color: confirmPasswordStatus ? '#00887a' : '#e2144d',
                    }}
                    aria-hidden="true"
                  />
                )}
                <input
                  type="password"
                  className="confirm-password"
                  onChange={(e) => changeConfirmPassword(e.target.value)}
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
              <label className="register-label">Phone number</label>
              <input
                className="register-text"
                onChange={(e) => setPhoneNumber(e.target.value)}
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

export default OwnerRegister;
