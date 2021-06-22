import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

let picture;

function OwnerRegister({ user, setUser }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    const dataToSend = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      picture,
      phone_number: phoneNumber,
    };
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      picture == null ||//check if image is exits 
      !phoneNumber
    ) {
      setMessage('Please fill all the fields');
    } else if (confirmPassword) {
      axios
        .post('/api/owner/create', dataToSend)
        .then((data) => {
          const userData = { email: email, isOwner: true, id: data.data.id };
          setRedirect(true);
        })
        .catch((err) => {
          if (err.message.slice(-3) === '401')
            setMessage('Invalid password or email');
          if (err.message.slice(-3) === '409')
            setMessage('Email already exists');
          else setMessage('Problem, please try again later');
        });
    } else {
      setMessage("Password doesn't match");
    }
  };
/**
 * This function gets an image path
 * it gets the image itself
 * after it gets the pic it update picture var
 * @param {*} file the file path gets from file picker
 */
  function onFileSelected(file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
      picture = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  }

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
            onChange={(e) => onFileSelected(e)}
          />
          <img id="output" style={{ height: 100, width: 100 }}></img>
          <label>Phone number</label>
          <input onChange={(e) => setPhoneNumber(e.target.value)} />
          <button
            onClick={() => {
              handleClick();
            }}
          >
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
