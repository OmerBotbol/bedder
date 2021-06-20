import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import RenterRegister from "./components/RenterRegister";
import OwnerRegister from "./components/OwnerRegister";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import { getHttp, intercept } from "./utils/networkWrapper";

function App() {
  const [user, setUser] = useState();

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
          console.log(err.message);
        }
      });
  }, []);

  return (
    <div className="App">
      {console.log(user)}
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/renterRegister">
            <RenterRegister setUser={setUser} />
          </Route>
          <Route exact path="/ownerRegister">
            <OwnerRegister setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} setUser={setUser} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
