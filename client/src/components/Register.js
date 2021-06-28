import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/register.css';

function Register({ user }) {
  const [type, setType] = useState('');
  const [temp, setTemp] = useState('');

  return (
    <>
      {!user ? (
        <div id="register-container">
          <h1 id="register-header">Register as</h1>
          <div id="register-options">
            <div className="labelName">
              <div>
                <label className="loginAdd label">Owner</label>{' '}
                <input
                  className="loginAdd option-input radio"
                  type="radio"
                  name="customer"
                  onClick={() => setTemp('Owner')}
                />
              </div>
              <div>
                <label className="loginAdd label">Renter</label>{' '}
                <input
                  className="loginAdd option-input radio"
                  type="radio"
                  name="customer"
                  onClick={() => setTemp('Renter')}
                />
              </div>
            </div>
            <div
              className="next-btn"
              onClick={() => {
                setType(temp);
              }}
            >
              Next
            </div>
          </div>
          {type === 'Owner' && <Redirect to="/ownerRegister" />}
          {type === 'Renter' && <Redirect to="/renterRegister" />}
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Register;
