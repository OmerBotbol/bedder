import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { postHttp } from '../../utils/httpRequests';

export default function ProfileAsset({ asset, user }) {
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [hideDates, setHideDates] = useState(true);
  const [error, setError] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

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

  useEffect(() => {
    axios
      .get(`/api/asset/unavailableDates?assetId=${asset.id}`)
      .then((result) => {
        const dates = result.data.map((date) => new Date(date.date));
        setUnavailableDates(dates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asset.id]);

  const Exists = (subject) => {
    const title = subject === 1 ? 'exists' : 'not-exists';
    return title;
  };

  const addUnavailableDates = () => {
    if (!startedAt || !endedAt) {
      setError('Fill all fields');
    } else {
      const dataToSend = {
        ownerId: user.id,
        asset_id: asset.id,
        startedAt,
        endedAt,
      };

      postHttp('/api/asset/addUnavailableDates', dataToSend)
        .then((data) => {
          const newUnavailable = [...unavailableDates];
          newUnavailable.push(data.data);
          setUnavailableDates(newUnavailable);
        })
        .catch((err) => console.log(err));
      setHideDates(!hideDates);
      setError('');
    }
  };

  const handleSelect = (i) => {
    setStartedAt(i.selection.startDate);
    setEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
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
          setHideDates(!hideDates);
        }}
      >
        <a className="add-dates" href="#demo-modal">
          Add unavailable dates
        </a>
      </button>
      <div id="demo-modal" className="modal">
        {!hideDates && (
          <div className="modal__content">
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              onChange={(i) => handleSelect(i)}
              ranges={[selectionRange]}
              minDate={new Date(asset.started_at)}
              maxDate={new Date(asset.ended_at)}
              disabledDates={unavailableDates}
            />
            <button
              className={`modal__send ${hideDates.toString()} add-button`}
              onClick={() => {
                addUnavailableDates();
              }}
            >
              +
            </button>
            <a href="#" className="modal__close">
              X
            </a>
            {error && <p>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
