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
  const [newsStartedAt, setNewStartedAt] = useState('');
  const [newEndedAt, setNewEndedAt] = useState('');
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(startedAt),
    endDate: new Date(endedAt),
    key: 'selection',
  });

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
        setOpenSendRequest(false);
      })
      .catch((err) => console.log(err));
  };

  const handleSelect = (i) => {
    setNewStartedAt(i.selection.startDate);
    setNewEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
  };

  return (
    <div>
      <p>Which dates would you like to arrive?</p>
      <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        onChange={(i) => handleSelect(i)}
        ranges={[selectionRange]}
        minDate={new Date(asset.started_at)}
        maxDate={new Date(asset.ended_at)}
        disabledDates={unavailableDates}
      />
      <p>add anything we need to know</p>
      <input type="text" onChange={(e) => setComments(e.target.value)} />
      <button onClick={() => handleClick()}>send</button>
    </div>
  );
}

export default SendRequest;
