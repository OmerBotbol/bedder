import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { postHttp } from '../../utils/httpRequests';
import '../../styles/assetCard.css';

function SendRequest({ user, asset, setOpenSendRequest, startedAt, endedAt }) {
  const [comments, setComments] = useState('');
  const [newsStartedAt, setNewStartedAt] = useState(new Date(startedAt));
  const [newEndedAt, setNewEndedAt] = useState(new Date(endedAt));
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [opacity, setOpacity] = useState(1);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(startedAt),
    endDate: new Date(endedAt),
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

  //Add the request renter wants to send the asset owner
  const handleClick = () => {
    const dataToSend = {
      asset_id: asset.id,
      owner_id: asset.owner_id,
      renter_id: user.id,
      started_at: newsStartedAt,
      ended_at: newEndedAt,
      comments,
    };
    postHttp('/api/transaction/new', dataToSend)
      .then(() => {
        closeWindow();
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (i) => {
    setNewStartedAt(i.selection.startDate);
    setNewEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
  };

  const closeWindow = () => {
    setOpacity(0);
    setTimeout(() => {
      setOpenSendRequest(false);
    }, 500);
  };

  return (
    <div className="request-background" style={{ opacity: opacity }}>
      <div className="request-window">
        <button className="close-btn" onClick={() => closeWindow()}>
          X
        </button>
        <div className="request-content">
          <h3>Let's make sure we on the same page</h3>
          <div>The dates are: </div>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            onChange={(i) => handleSelect(i)}
            ranges={[selectionRange]}
            minDate={new Date(asset.started_at)}
            maxDate={new Date(asset.ended_at)}
            disabledDates={unavailableDates}
          />
          <div className="request-input-container">
            <input
              type="text"
              placeholder="Anything we need to know..."
              className="request-input-text"
              onChange={(e) => setComments(e.target.value)}
            />
            <button className="request-send-btn" onClick={() => handleClick()}>
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendRequest;
