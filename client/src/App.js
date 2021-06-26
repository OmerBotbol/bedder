import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import AddAsset from "./components/asset/AddAsset";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import RenterRegister from "./components/renter/RenterRegister";
import OwnerRegister from "./components/owner/OwnerRegister";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import { getHttp, intercept } from "./utils/networkWrapper";

function App() {
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    intercept();
    getHttp("/api/data", "accessToken")
      .then((res) => {
        const userToSave = {
          email: res.data.email,
          isOwner: res.data.isOwner,
          id: res.data.id,
        };
        setUser(userToSave);
      })
      .catch((err) => {
        if (!err.message.slice(-3) === "403") {
          return console.log(err.message);
        }
        console.log("please refresh the page");
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  useEffect(() => {
    if (user) {
      if (user.isOwner) {
        axios
          .get(`/api/owner/${user.id}`)
          .then((data) => setUserDetails(data.data))
          .catch((err) => console.log(err));
      } else {
        axios
          .get(`/api/renter/${user.id}`)
          .then((data) => setUserDetails(data.data))
          .catch((err) => console.log(err));
      }
    }
  }, [user]);
  return (
    <div className="App">
      {user ? (
        <>
          {loading ? (
            ""
          ) : (
            <>
              {user.isOwner ? (
                <div>
                  <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                  <span> </span>
                  <span>
                    {userDetails.first_name} {userDetails.last_name}
                  </span>
                </div>
              ) : (
                <div>
                  <i className="fa fa-user-circle" aria-hidden="true"></i>
                  <span> </span>
                  <span>
                    {userDetails.first_name} {userDetails.last_name}
                  </span>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        ""
      )}
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/register">
            <Register user={user} setUser={setUser} />
          </Route>
          <Route exact path="/renterRegister">
            <RenterRegister user={user} setUser={setUser} />
          </Route>
          <Route exact path="/ownerRegister">
            <OwnerRegister user={user} setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route exact path="/addAsset">
            <AddAsset user={user} setUser={setUser} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
