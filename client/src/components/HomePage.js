import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);

  const login = async () => {
    const user = {
      email: email,
      password: password,
      isOwner: isOwner,
    };
    console.log(user);
    let findUser;
    try {
      findUser = await axios.post("api/login", user);
      console.log("success logging in");
      console.log(findUser);
      setUser(findUser.data);
    } catch (error) {
      console.log("error invalid user");
    }
  };
  return (
    <div>
      <h1>Bedder</h1>
      <input
        type="text"
        placeholder="Enter user name"
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
      <button onClick={() => login()} className="start-btn" variant="contained">
        LOGIN
      </button>
    </div>
  );
}

export default HomePage;
