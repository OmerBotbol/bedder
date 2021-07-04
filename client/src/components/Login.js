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

  const login = async () => {
    const user = {
      email: email,
      password: password,
    };
    if (!chooseCustomerType) {
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
        }
      } catch (error) {
        console.log('error invalid user');
        setMessage('User name, password or customer type are incorrect');
      }
    } else {
      const userToSet = isOwner ? userDetails[0] : userDetails[1];
      createCookie('accessToken', userToSet.accessToken, 900000);
      createCookie('refreshToken', userToSet.refreshToken);
      setUser({
        email: userToSet.email,
        isOwner: userToSet.isOwner,
        id: userToSet.id,
      });
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
                {userDetails.length === 2 && (
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
                )}
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
