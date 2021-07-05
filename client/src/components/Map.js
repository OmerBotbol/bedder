import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const AssetPin = ({ address, city }) => (
  <div className="asset-pin">
    {address}, {city}
  </div>
);

const CurrentPin = () => <div className="current-pin">your location</div>;

const GOOGLE_API_KEY = 'AIzaSyB2t_IXNKOGvCdrdQ8aX2PQ0yqogcQiHE8';

function Map({
  asset,
  currentLocation,
  setCurrentLocation,
  assetLocation,
  setAssetLocation,
  setDistance,
}) {
  useEffect(() => {
    async function getMapData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            const stringifyAddress = assetFormatted(asset.address, asset.city);
            try {
              const addressData = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${stringifyAddress},israel&key=${GOOGLE_API_KEY}`
              );
              const placeId = addressData.data.results[0].place_id;
              setAssetLocation(addressData.data.results[0].geometry.location);
              console.log(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${placeId}&destination=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API_KEY}`
              );
              const distanceData = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeId}&destination=${position.coords.latitude},${position.coords.longitude}&key=${GOOGLE_API_KEY}&language=en`
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
  }, [asset, setAssetLocation, setCurrentLocation, setDistance]);

  const assetFormatted = (address, city) => {
    const addressArr = address.split(' ');
    let addressNumber = '';
    if (Number(addressArr[-1])) {
      addressNumber = addressArr[-1];
      addressArr.splice(-2, 1);
    }
    const streetName = addressArr.join('+');
    const returnedString = addressNumber
      ? addressNumber + ',' + streetName + ',' + city
      : streetName + ',' + city;
    return returnedString;
  };

  return (
    <div className="map-container">
      {currentLocation && (
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={currentLocation}
          defaultZoom={15}
        >
          <AssetPin
            lat={assetLocation.lat}
            lng={assetLocation.lng}
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
