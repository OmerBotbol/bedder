import React, { useState } from 'react';
import ShowAsset from '../asset/ShowAsset';
import Search from '../Search';

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
          <div id="map"></div>
          <script
            async
            defer
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBwiV5ssJ3sw79n3pHDAosob46P5wIw0F0&callback=initMap"
          ></script>
          {initMap()}
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

var map, infoWindow;
function initMap() {
  const google = window.google;
  // geocoder = new google.maps.Geocoder();
  var geocoder = new google.maps.Geocoder();

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode(
          { location: pos },
          function (results, status, infowindow) {
            if (status == 'OK') {
              console.log(results[0].formatted_address);
              infoWindow.setContent(
                'Location found: ' + results[0].formatted_address
              );
              infoWindow.setPosition(pos);
              infoWindow.open(map);
            } else {
              console.log(
                'Geocode was not successful for the following reason: ' + status
              );
            }
          }
        );

        map.setCenter(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? 'Error: The Geolocation service failed.'
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

export default RenterHomePage;
