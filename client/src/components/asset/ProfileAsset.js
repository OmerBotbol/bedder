import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfileAsset({ asset, showUnavailableDateWindow }) {
  const [pictureUrl, setPictureUrl] = useState('');

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

  return (
    <div className="profile-owner-asset">
      <img src={pictureUrl} alt="asset" />
      <div className="asset-details">
        <h4>{asset.city},</h4>
        <h4>{asset.address}</h4>
        <p>{asset.description}</p>
        <div className="asset-small-details">
          <p className="detail">Number of people: {asset.number_of_peoples}</p>
          <p className="detail">Number of rooms: {asset.number_of_rooms}</p>
          <p className="dates-asset">
            {asset.started_at.slice(0, 10).replaceAll('-', '/')}-
            {asset.ended_at.slice(0, 10).replaceAll('-', '/')}
          </p>
          <p className="detail">
            <i
              className={`fas fa-fan
            ${Exists(asset.ac)} `}
            />{' '}
            AC
          </p>
          <p className="detail">
            <i className={`fa fa-wheelchair ${Exists(asset.accessibility)} `} />{' '}
            accessibility
          </p>
          <p className="detail">
            <i className={`fa fa-paw ${Exists(asset.animals)} `} /> Animals
          </p>
          <p className="detail">
            <i className={`fa fa-baby-carriage ${Exists(asset.babies)} `} />{' '}
            Babies
          </p>
          <p className="detail">
            <i className={`fa fa-parking ${Exists(asset.parking)} `} /> Parking
          </p>
          <p className={`${Exists(asset.kosher)} detail`}>Kosher</p>
          <p className={`${Exists(asset.shabbat)} detail`}>Shabbat</p>
        </div>
      </div>
      <button
        onClick={() => {
          showUnavailableDateWindow(asset);
        }}
      >
        Add unavailable dates
      </button>
    </div>
  );
}
