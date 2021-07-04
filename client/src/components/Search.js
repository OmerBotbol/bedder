import axios from 'axios';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import '../styles/renterHomepage.css';

export default function Search({
  searchInput,
  setSearchInput,
  setError,
  setAssets,
  user,
  setStartedAt,
  setEndedAt,
  startedAt,
  endedAt,
  setFilteredAssets,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [count, setCount] = useState(0);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const searchByCity = () => {
    if (user && !user.isOwner) {
      if (!startedAt || !endedAt || !searchInput) {
        return setError('Please fill all the fields');
      }
      let searchUrl;
      searchInput
        ? (searchUrl = `/api/asset?city=${searchInput}&startDate=${startedAt}&stopDate=${endedAt}`)
        : (searchUrl = '/api/asset');
      axios
        .get(searchUrl)
        .then((res) => {
          setAssets(res.data);
          setFilteredAssets(res.data);
          res.data.length === 0 ? setError('No city found') : setError('');
        })
        .catch((err) => {
          console.log(err.message);
          setError('Server problem please try again');
        });
    }
  };

  const handleSelect = (i) => {
    setStartedAt(i.selection.startDate);
    setEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
    if (count === 1) {
      setShowCalendar((prev) => !prev);
      return setCount(0);
    }
    setCount(count + 1);
  };

  return (
    <>
      <input
        className="search-bar"
        type="search"
        placeholder="Search By City"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <div id="date-container">
        <div id="date-text" onClick={() => setShowCalendar((prev) => !prev)}>
          {startedAt
            ? startedAt.toLocaleString().split(' ')[0].slice(0, -1)
            : 'check-in'}{' '}
          -{' '}
          {endedAt
            ? endedAt.toLocaleString().split(' ')[0].slice(0, -1)
            : 'check-out'}
        </div>
      </div>
      {showCalendar && (
        <DateRange
          className="calendar"
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          onChange={(i) => handleSelect(i)}
          ranges={[selectionRange]}
          minDate={new Date()}
        />
      )}

      <button className="search-btn" onClick={() => searchByCity()}>
        Search
      </button>
    </>
  );
}
