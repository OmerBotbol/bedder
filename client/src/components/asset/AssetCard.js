import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AssetCard({ asset, setOpenAssetCard }) {
  const [pictureUrl, setPictureUrl] = useState('');
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    axios
      .get(`/api/picture/image/${asset.picture}`)
      .then((data) => {
        setPictureUrl(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asset.picture]);

  const Exists = (subject) => {
    const title = subject === 1 ? 'exists' : 'not-exists';
    return title;
  };

  const closeWindow = () => {
    setOpacity(0);
    setTimeout(() => {
      setOpenAssetCard((prev) => !prev);
    }, 500);
  };

  return (
    <div className="asset-full-card-background" style={{ opacity: opacity }}>
      <div className="asset-full-card">
        <div className="map">
          Map
          {/* include location of the address */}
        </div>
        <div className="asset-full-card-content">
          <img className="asset-big-image" src={pictureUrl} alt="asset" />
          <div className="asset-data">
            <div className="asset-text-details">
              <div className="asset-details">{asset.description}</div>
              <div className="asset-details">
                Hospitality: {asset.Hospitality}
              </div>
              <div className="asset-details">Room type: {asset.room_type}</div>
              <div className="asset-details">
                Number of people: {asset.number_of_peoples}
              </div>
              <div className="asset-details">
                Number of rooms: {asset.number_of_rooms}
              </div>
            </div>
            <div className="accessories">
              <div className="asset-details">
                <i
                  className={`fas fa-fan
              ${Exists(asset.ac)} `}
                />{' '}
                AC
              </div>
              <div className="asset-details">
                <i
                  className={`fa fa-wheelchair ${Exists(asset.accessibility)} `}
                />{' '}
                accessibility
              </div>
              <div className="asset-details">
                <i className={`fa fa-paw ${Exists(asset.animals)} `} /> Animals
              </div>
              <div className="asset-details">
                <i className={`fa fa-baby-carriage ${Exists(asset.babies)} `} />{' '}
                Babies
              </div>
              <div className="asset-details">
                <i className={`fa fa-parking ${Exists(asset.parking)} `} />{' '}
                Parking
              </div>
              <div className={`${Exists(asset.kosher)} `}>Kosher</div>
              <div className={`${Exists(asset.shabbat)} `}>Shabbat</div>
            </div>
          </div>
        </div>
        <button className="close-btn" onClick={() => closeWindow()}>
          X
        </button>
      </div>
    </div>
  );
}

export default AssetCard;
