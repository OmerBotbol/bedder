import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { postHttp } from '../../utils/httpRequests';
import axios from 'axios';

function UnavailableDates({ asset, setHideDates, user }) {
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [error, setError] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(() => {
    axios
      .get(`/api/asset/unavailableDates/${asset.id}`)
      .then((result) => {
        const dates = result.data.map((date) => new Date(date.date));
        setUnavailableDates(dates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asset.id]);

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
      setError('');
      closeWindow();
    }
  };

  const closeWindow = () => {
    setOpacity(0);
    setTimeout(() => {
      setHideDates((prev) => !prev);
    }, 500);
  };

  const handleSelect = (i) => {
    setStartedAt(i.selection.startDate);
    setEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
  };

  return (
    <div id="demo-modal" className="modal" style={{ opacity: opacity }}>
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
          className={`modal__send add-button`}
          onClick={() => {
            addUnavailableDates();
          }}
        >
          +
        </button>
        <button onClick={() => closeWindow()} className="modal__close">
          X
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default UnavailableDates;
