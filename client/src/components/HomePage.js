import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eraseCookie } from '../utils/cookies';
import ShowAsset from './asset/ShowAsset';
import ClipLoader from 'react-spinners/ClipLoader';

let cancelToken;

function HomePage({ user, setUser }) {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');
  const [filterBy, setFilterBy] = useState([
    { name: 'Ac', value: false },
    { name: 'Accessibility', value: false },
    { name: 'Animals', value: false },
    { name: 'Babies', value: false },
    { name: 'Kosher', value: false },
    { name: 'Parking', value: false },
    { name: 'Shabbat', value: false },
  ]);

  const changeValue = (i) => {
    const copyArr = [...filterBy];
    copyArr[i].value = !filterBy[i].value;
    setFilterBy(copyArr);
  };
  const logout = () => {
    eraseCookie('accessToken');
    eraseCookie('refreshToken');
    setUser('');
  };

  const filterOptions = () => {
    let filterString = '';
    for (let i = 0; i < filterBy.length; i++) {
      if (filterBy[i].value) {
        if (filterString === '') {
          filterString = filterBy[i].name;
        } else {
          filterString = filterString + ',' + filterBy[i].name;
        }
      }
    }

    console.log(filterString);

    axios
      .get(`/api/asset?searchBy=${filterString}&city=${searchInput}`)
      .then((data) => {
        setAssets(data.data);
        console.log(data);
        console.log(data.data.length);
        if (data.data.length === 0) {
          setError('No match found');
        } else {
          setError('');
        }
      })
      .catch((err) => console.log(err));
    console.log(assets);
  };
  const getAssets = () => {
    axios
      .get('/api/asset')
      .then((data) => {
        console.log(data.data);
        setAssets(data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAssets();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const searchByCity = () => {
    if (user && !user.isOwner) {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel('new request');
      }

      cancelToken = axios.CancelToken.source();
      if (searchInput) {
        axios
          .get(`/api/asset?city=${searchInput}`, {
            cancelToken: cancelToken.token,
          })
          .then((res) => {
            setAssets(res.data);
            if (res.data.length === 0) {
              setError('No city found');
            } else {
              setError('');
            }
          })
          .catch((err) => {
            console.log(err.message);
            setError('Server problem please try again');
          });
        console.log(assets);
      } else {
        axios
          .get(`/api/asset`, {
            cancelToken: cancelToken.token,
          })
          .then((res) => {
            setAssets(res.data);
            if (res.data.length === 0) {
              setError('No city found');
            } else {
              setError('');
            }
          })
          .catch((err) => {
            console.log(err.message);
            setError('Server problem please try again');
          });
      }
    }
  };
  return (
    <>
      {loading ? (
        <ClipLoader color={'red'} loading={loading} size={150} />
      ) : (
        <div>
          <h1>Home Page</h1>
          {user ? (
            <>
              <div>{user.email}</div>
              <div>{user.isOwner ? 'Owner' : 'Renter'}</div>
              <button
                onClick={() => {
                  logout();
                }}>
                logout
              </button>
              {user.isOwner ? (
                ''
              ) : (
                <div>
                  <input
                    type="search"
                    placeholder="Search By City"
                    onChange={(event) => setSearchInput(event.target.value)}
                  />
                  <button onClick={() => searchByCity()}>Search</button>
                  <div className="filter">
                    {filterBy.map((option, i) => (
                      <div key={i} className={`${i} filter-option`}>
                        <label>{option.name}</label>
                        <input
                          type="checkbox"
                          onChange={() => changeValue(i)}
                        />
                      </div>
                    ))}
                    <button onClick={() => filterOptions()}>Filter</button>
                  </div>
                  {error ? <div>{error}</div> : ''}
                  {assets.map((asset, i) => (
                    <ShowAsset key={i} asset={asset} />
                  ))}
                </div>
              )}
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <>
              <div>welcome to bedder</div>
              <Link to="/login">login</Link>
              <br />
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default HomePage;
