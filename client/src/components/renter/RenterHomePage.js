import React, { useState } from 'react';
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
  const [filterBy, setFilterBy] = useState([
    { name: 'Ac', value: false },
    { name: 'Accessibility', value: false },
    { name: 'Animals', value: false },
    { name: 'Babies', value: false },
    { name: 'Kosher', value: false },
    { name: 'Parking', value: false },
    { name: 'Shabat', value: false },
  ]);
  getLocation(); //gets user location
  const GOOGLE_API_KEY = 'AIzaSyBwiV5ssJ3sw79n3pHDAosob46P5wIw0F0';
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
  const defaultProps = {
    center: {
      lat: 59.955413,
      lng: 30.337844,
    },
    zoom: 11,
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
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              // bootstrapURLKeys={{ key: '' }}
              bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                defaultCenter={defaultProps}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
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

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
  }
}

function showPosition(position) {
  // x.innerHTML =
  //   'Latitude: ' +
  //   position.coords.latitude +
  //   '<br>Longitude: ' +
  //   position.coords.longitude;
  // AnyReactComponent(
  // lat={59.955413},
  // lng={30.337844},
  // text="My Marker");
  // defaultProps(position.coords.latitude, position.coords.longitude);
}

export default RenterHomePage;
