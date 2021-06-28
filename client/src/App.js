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
import { getHttp, intercept } from './utils/networkWrapper';

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    intercept();
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
        if (!err.message.slice(-3) === '403') {
          return console.log(err.message);
        }
        console.log('please refresh the page');
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
            <Register user={user} setUser={setUser} />
          </Route>
          <Route exact path="/renterRegister">
            <RenterRegister user={user} setUser={setUser} />
          </Route>
          <Route exact path="/ownerRegister">
            <OwnerRegister user={user} setUser={setUser} />
          </Route>
          <Route exact path="/profile">
            <Profile user={user} />
          </Route>
          <Route exact path="/addAsset">
            <AddAsset user={user} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
