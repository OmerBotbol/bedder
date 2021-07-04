import { useEffect, useState } from 'react';
import UnavailableDates from '../asset/UnavailableDates';
import axios from 'axios';

export default function ProfileAsset({ asset, user }) {
  const [hideDates, setHideDates] = useState(true);
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
    <div className="asset-container">
      <div className="asset-top">
        <img className="asset-picture" src={pictureUrl} alt="asset" />
        <div className="asset-address">
          {asset.address}, {asset.city}
        </div>
      </div>
      <div className="asset-middle">
        <div className="asset-details-left">
          <div className="detail">{asset.description}</div>
          <div className="detail">Hospitality: {asset.Hospitality}</div>
          <div className="detail">Room type: {asset.room_type}</div>
          <div className="detail">
            Number of people: {asset.number_of_peoples}
          </div>
          <div className="detail">Number of rooms: {asset.number_of_rooms}</div>
          <div className="detail">
            {new Date(asset.started_at).toLocaleDateString()} -{' '}
            {new Date(asset.ended_at).toLocaleDateString()}
          </div>
        </div>
        <div className="asset-details-right">
          <div className="detail">
            <i
              className={`fas fa-fan
              ${Exists(asset.ac)} `}
            />{' '}
            AC
          </div>
          <div className="detail">
            <i className={`fa fa-wheelchair ${Exists(asset.accessibility)} `} />{' '}
            accessibility
          </div>
          <div className="detail">
            <i className={`fa fa-paw ${Exists(asset.animals)} `} /> Animals
          </div>
          <div className="detail">
            <i className={`fa fa-baby-carriage ${Exists(asset.babies)} `} />{' '}
            Babies
          </div>
          <div className="detail">
            <i className={`fa fa-parking ${Exists(asset.parking)} `} /> Parking
          </div>
          <div className={`${Exists(asset.kosher)} detail`}>Kosher</div>
          <div className={`${Exists(asset.shabbat)} detail`}>Shabbat</div>
        </div>
      </div>
      <button
        className="add-unavailable-dates-button"
        onClick={() => {
          setHideDates((prev) => !prev);
        }}
      >
        Add unavailable dates
      </button>

      {!hideDates && (
        <UnavailableDates
          user={user}
          asset={asset}
          setHideDates={setHideDates}
        />
      )}
    </div>
  );
}
