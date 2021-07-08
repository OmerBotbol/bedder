import React, { useState, useEffect } from 'react';
import ShowAsset from '../asset/ShowAsset';
import Search from '../Search';
import GoogleMapReact from 'google-map-react';

function RenterHomePage({ user }) {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [startedAt, setStartedAt] = useState();
  const [endedAt, setEndedAt] = useState();
  const [openFilters, setOpenFilters] = useState(false);
  const [position, setPosition] = useState();
  const [filterBy, setFilterBy] = useState([
    { name: 'Ac', value: false },
    { name: 'Accessibility', value: false },
    { name: 'Animals', value: false },
    { name: 'Babies', value: false },
    { name: 'Kosher', value: false },
    { name: 'Parking', value: false },
    { name: 'Shabat', value: false },
  ]);

  useEffect(() => {
    getLocation(); //gets user location
    constLocError();
  }, []);
  //  <GoogleMapReact let="map"/>;
  const GOOGLE_API_KEY = 'AIzaSyAp8kdGLx_yalgpdHP7aLZ_wpzd4jh0etA';
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const changeValue = (i) => {
    const copyArr = [...filterBy];
    copyArr[i].value = !filterBy[i].value;
    setFilterBy(copyArr);
  };

  const filterOptions = () => {
    const filters = filterBy.reduce((filtered, option) => {
      if (option.value) {
        filtered.push(option.name.toLowerCase());
      }
      return filtered;
    }, []);
    const filteredArr = assets.reduce((filtered, asset) => {
      let isValid = true;
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
    setOpenFilters((prev) => !prev);
    setError('');
    if (filteredArr.length === 0) {
      setError('no assets found');
    }
  };

  const usingNavigation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
    });
  };
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Sorry Geolocation is not supported by this browser.');
    }
  }
  const constLocError = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((res) => {
        if (res.state === 'denied') {
          alert(
            'Enable location permissions for this website in your browser settings'
          );
        }
      });
    } else {
      alert(
        'Unable to access your location. You can continue by submitting location manually.'
      );
    }
  };
  const showPosition = (position) => {
    console.log(position);
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };
  return (
    <div>
      <div className="search-container">
        <div
          id="search"
          style={{
            gridTemplateRows: `repeat(${
              filteredAssets.length > 0 ? '3' : '2'
            }, 1fr)`,
          }}
        >
          {position && (
            <div style={{ height: '70vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                defaultCenter={{ lat: position.lat, lng: position.lng }}
                defaultZoom={11}
              >
                <AnyReactComponent
                  lat={position.lat}
                  lng={position.lng}
                  text="My Marker"
                />
              </GoogleMapReact>
            </div>
          )}
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
          {filteredAssets.length > 0 && (
            <button
              className="open-filters-btn"
              onClick={() => setOpenFilters((prev) => !prev)}
            >
              Filters
            </button>
          )}
        </div>
        {filteredAssets.length > 0 && (
          <div
            className="filter"
            style={{
              maxHeight: openFilters ? '100vh' : '0vh',
              visibility: openFilters ? 'visible' : 'hidden',
            }}
          >
            <ul className="ks-cboxtags">
              {filterBy.map((option, i) => (
                <li key={i} className="filter-option">
                  <input
                    id={`checkbox-${i}`}
                    defaultChecked={option.value}
                    type="checkbox"
                    onChange={() => changeValue(i)}
                  />
                  <label className="label-for-check" htmlFor={`checkbox-${i}`}>
                    {option.name === 'Shabat' ? 'Shabbat' : option.name}
                  </label>
                </li>
              ))}
              <button className="filter-btn" onClick={() => filterOptions()}>
                Filter
              </button>
            </ul>
          </div>
        )}
      </div>
      {error ? <div>{error}</div> : ''}
      <div className="assets-container">
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
    </div>
  );
}

export default RenterHomePage;
