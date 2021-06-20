import React from "react";
import { useState } from "react";
import { createCookie } from "../utils/cookies";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login({ user, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const login = async () => {
    const user = {
      email: email,
      password: password,
      isOwner: isOwner,
    };
    try {
      const findUser = await axios.post("api/login", user);
      createCookie("accessToken", findUser.data.accessToken, 120000);
      createCookie("refreshToken", findUser.data.refreshToken);
      console.log("success logging in");
      const userToSave = {
        email: findUser.data.email,
        isOwner: findUser.data.isOwner,
        id: findUser.data.id,
      };
      setUser(userToSave);
    } catch (error) {
      console.log("error invalid user");
    }
  };

  return (
    <>
      {!user ? (
        <div>
          <h1>Bedder</h1>
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <br />
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <input
            type="radio"
            name="customer"
            value={true}
            onChange={(e) => setIsOwner(e.target.value === "true")}
          />
          <label>owner</label>
          <input
            type="radio"
            name="customer"
            value={false}
            onChange={(e) => setIsOwner(e.target.value === "true")}
          />
          <label>renter</label>
          <button
            onClick={() => login()}
            className="start-btn"
            variant="contained"
          >
            LOGIN
          </button>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

export default Login;
