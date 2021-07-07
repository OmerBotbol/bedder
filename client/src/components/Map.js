import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const AssetPin = ({ address, city }) => (
  <div className="asset-pin-container">
    <div className="asset-pin-name">
      {address}, {city}
    </div>
    <div className="asset-pin"></div>
    <div className="asset-pin-pulse"></div>
  </div>
);

const CurrentPin = () => (
  <div>
    <div className="current-pin-container"></div>
    <div className="current-pin"></div>
  </div>
);

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function Map({ asset, currentLocation, setCurrentLocation, setDistance }) {
  useEffect(() => {
    async function getMapData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            try {
              console.log(GOOGLE_API_KEY);
              const distanceData = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${asset.lat},${asset.lng}&destination=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API_KEY}&language=en`
              );
              console.log(distanceData);
              setDistance(distanceData.data.routes[0].legs[0].distance.text);
            } catch (err) {
              console.log(err);
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
    getMapData();
  }, [asset, setCurrentLocation, setDistance]);

  return (
    <div className="map-container">
      {currentLocation && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={{ lat: asset.lat, lng: asset.lng }}
          defaultZoom={15}
        >
          <AssetPin
            lat={asset.lat}
            lng={asset.lng}
            address={asset.address}
            city={asset.city}
          />
          <CurrentPin lat={currentLocation.lat} lng={currentLocation.lng} />
        </GoogleMapReact>
      )}
    </div>
  );
}

export default Map;
