import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AddAsset from './components/asset/AddAsset';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import RenterRegister from './components/renter/RenterRegister';
import OwnerRegister from './components/owner/OwnerRegister';
import Profile from './components/Profile';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { intercept } from './utils/networkWrapper';
import { getHttp } from './utils/httpRequests';
import MyOrders from './components/MyOrders';

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    intercept();
  });

  useEffect(() => {
    getHttp('/api/data', 'accessToken')
      .then((res) => {
        const userToSave = {
          email: res.data.email,
          isOwner: res.data.isOwner,
          id: res.data.id,
        };
        setUser(userToSave);
      })
      .catch((err) => {
        if (!err.message.slice(-3) === '401') {
          return console.log(err.message);
        }
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      <Router>
        {user && !loading ? <NavBar user={user} setUser={setUser} /> : ''}
        <Switch>
          <Route exact path="/">
            <HomePage user={user} />
          </Route>
          <Route exact path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/register">
            <Register user={user} />
          </Route>
          <Route exact path="/renterRegister">
            <RenterRegister user={user} />
          </Route>
          <Route exact path="/ownerRegister">
            <OwnerRegister user={user} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} />
          </Route>
          <Route exact path="/addAsset">
            <AddAsset user={user} />
          </Route>
          <Route exact path="/orders">
            <MyOrders user={user} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
