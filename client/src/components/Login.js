import React from 'react';
import '../styles/login.css';
import { useState } from 'react';
import { createCookie } from '../utils/cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
function Login({ user, setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [message, setMessage] = useState('');
  const [chooseCustomerType, setChooseCustomerType] = useState(false);
  const [customerTypeWindow, setCustomerTypeWindow] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const login = async () => {
    const user = {
      email: email,
      password: password,
    };
    try {
      const findUser = await axios.post('/api/login', user);
      if (findUser.data.length === 1) {
        const userData = findUser.data[0];
        createCookie('accessToken', userData.accessToken, 900000);
        createCookie('refreshToken', userData.refreshToken);
        console.log('success logging in');
        const userToSave = {
          email: userData.email,
          isOwner: userData.isOwner,
          id: userData.id,
        };
        setUser(userToSave);
      } else {
        setUserDetails(findUser.data);
        setCustomerTypeWindow(true);
      }
    } catch (error) {
      console.log('error invalid user');
      setMessage('User name, password or customer type are incorrect');
    }
  };

  const handleNext = () => {
    if (chooseCustomerType) {
      const userToSet = isOwner ? userDetails[0] : userDetails[1];
      createCookie('accessToken', userToSet.accessToken, 900000);
      createCookie('refreshToken', userToSet.refreshToken);
      setUser({
        email: userToSet.email,
        isOwner: userToSet.isOwner,
        id: userToSet.id,
      });
    } else {
      setOpacity(0);
      setTimeout(() => {
        setCustomerTypeWindow(false);
        setOpacity(1);
      }, 400);
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
                <div className="btns">
                  <button
                    onClick={() => login()}
                    className="btns_more"
                    variant="contained"
                  >
                    LOGIN
                  </button>
                </div>
                {customerTypeWindow && (
                  <div
                    className="labels-container"
                    style={{ opacity: opacity }}
                  >
                    <div className="login-customer-type">
                      <div className="labelName login-labels">
                        <div className="label">Host</div>
                        <input
                          className="option-input radio"
                          type="radio"
                          name="customer"
                          value={true}
                          onChange={(e) => {
                            setIsOwner(e.target.value === 'true');
                            setChooseCustomerType(true);
                          }}
                        />
                        <div className="label">Guest</div>
                        <input
                          className="option-input radio"
                          type="radio"
                          name="customer"
                          value={false}
                          onChange={(e) => {
                            setIsOwner(e.target.value === 'true');
                            setChooseCustomerType(true);
                          }}
                        />
                      </div>
                      <button className="next-btn" onClick={() => handleNext()}>
                        next
                      </button>
                    </div>
                  </div>
                )}
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
