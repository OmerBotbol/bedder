import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
import axios from "axios";
import { eraseCookie, readCookie, createCookie } from "./utils/cookies";
import { getHttp, intercept } from "./utils/networkWrapper";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    intercept();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            children={<HomePage user={user} setUser={setUser} />}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
