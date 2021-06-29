import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

export default function ProfileAsset({ asset, setLoading }) {
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
        console.log('stop loading');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asset.picture, setLoading]);

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
    const title = subject === 1 ? 'check' : 'times';
    return <i className={`fa fa-${title}`} aria-hidden="true"></i>;
  };

  const addUnavailableDates = () => {
    if (!startedAt || !endedAt) {
      setError('Fill all fields');
    } else {
      const dataToSend = {
        asset_id: asset.id,
        startedAt,
        endedAt,
      };

      axios
        .post('/api/asset/addUnavailableDates', dataToSend)
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

      <p>{asset.city}</p>
      <p>{asset.address}</p>
      <p>{asset.description}</p>
      <p>Number of people: {asset.number_of_peoples}</p>
      <p>Number of rooms: {asset.number_of_rooms}</p>
      <p>
        {asset.started_at.slice(0, 10).replaceAll('-', '/')}-
        {asset.ended_at.slice(0, 10).replaceAll('-', '/')}
      </p>
      <p>AC: {Exists(asset.ac)}</p>
      <p>Accessibility: {Exists(asset.accessibility)}</p>
      <p>Animals: {Exists(asset.animals)}</p>
      <p>Babies: {Exists(asset.babies)}</p>
      <p>Kosher: {Exists(asset.kosher)}</p>
      <p>Parking: {Exists(asset.parking)}</p>
      <p>Shabbat: {Exists(asset.shabat)}</p>

      <button
        onClick={() => {
          setHideDates(!hideDates);
        }}
      >
        Add unavailable dates
      </button>
      <div>
        {!hideDates && (
          <>
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
              className={hideDates.toString()}
              onClick={() => {
                addUnavailableDates();
              }}
            >
              +
            </button>
          </>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
