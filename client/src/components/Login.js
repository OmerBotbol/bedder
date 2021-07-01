import React from 'react';
import '../styles/login.css';
import { useState } from 'react';
import { createCookie } from '../utils/cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
function Login({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [message, setMessage] = useState('');
  const [chooseCustomerType, setChooseCustomerType] = useState(false);

  const login = async () => {
    const user = {
      email: email,
      password: password,
      isOwner: isOwner,
    };
    if (chooseCustomerType) {
      try {
        const findUser = await axios.post('/api/login', user);
        createCookie('accessToken', findUser.data.accessToken, 900000);
        createCookie('refreshToken', findUser.data.refreshToken);
        console.log('success logging in');
        const userToSave = {
          email: findUser.data.email,
          isOwner: findUser.data.isOwner,
          id: findUser.data.id,
        };
        console.log(findUser.data);
        setUser(userToSave);
      } catch (error) {
        console.log('error invalid user');
        setMessage('User name, password or customer type are incorrect');
      }
    } else {
      setMessage('Please select customer type');
    }
  };

  return (
    <>
      {!user ? (
        <div className="container">
          <div className="container_content">
            <div className="container_content_inner">
              <div className="title">
                <h1 className="headline">LOGIN</h1>
              </div>
              <div className="par">
                <input
                  className="loginAdd text"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
                <br />
                <input
                  className="loginAdd text"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></input>
                <div className="labelName">
                  <div className="loginAdd label">Host</div>
                  <input
                    className="loginAdd option-input radio"
                    type="radio"
                    name="customer"
                    value={true}
                    onChange={(e) => {
                      setIsOwner(e.target.value === 'true');
                      setChooseCustomerType(true);
                    }}
                  />
                  <div className="loginAdd label">Guest</div>
                  <input
                    className="loginAdd option-input radio"
                    type="radio"
                    name="customer"
                    value={false}
                    onChange={(e) => {
                      setIsOwner(e.target.value === 'true');
                      setChooseCustomerType(true);
                    }}
                  />
                </div>
                <div className="btns">
                  <button
                    onClick={() => login()}
                    className="btns_more"
                    variant="contained"
                  >
                    LOGIN
                  </button>
                </div>
                <div>{message}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/" />
      )}
      <div className="overlay"></div>
    </>
  );
}

export default Login;
