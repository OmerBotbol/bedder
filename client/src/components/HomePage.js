import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { eraseCookie } from '../utils/cookies';
import ShowAsset from './asset/ShowAsset';
import ClipLoader from 'react-spinners/ClipLoader';
import Search from './Search';

function HomePage({ user, setUser }) {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [startedAt, setStartedAt] = useState();
  const [endedAt, setEndedAt] = useState();

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
    const filters = filterBy.reduce((filtered, option) => {
      if (option.value) {
        filtered.push(option.name.toLowerCase());
      }
      return filtered;
    }, []);

    let isValid = true;
    const filteredArr = assets.reduce((filtered, asset) => {
      filters.forEach((filter) => {
        if (asset[filter] === 0) {
          isValid = false;
        }
      });
      if (isValid) {
        filtered.push(asset);
      }
      return filtered;
    }, []);
    setFilteredAssets(filteredArr);
    setError('');
    if (filteredArr.length === 0) {
      setError('no assets found');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
                  <Search
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    setError={setError}
                    setAssets={setAssets}
                    user={user}
                    assets={assets}
                    setFilteredAssets={setFilteredAssets}
                    setStartedAt={setStartedAt}
                    setEndedAt={setEndedAt}
                    startedAt={startedAt}
                    endedAt={endedAt}
                  />
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
                  {filteredAssets.map((asset, i) => (
                    <ShowAsset
                      key={i}
                      user={user}
                      asset={asset}
                      startedAt={startedAt}
                      endedAt={endedAt}
                    />
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
