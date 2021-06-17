import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
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
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage user={user} setUser={setUser} />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
