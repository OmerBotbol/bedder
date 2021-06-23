import { useState } from "react";
import axios from "axios";
export default function ProfileAsset({ userDetails, asset }) {
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");
  const [hideDates, setHideDates] = useState(true);
  const [error, setError] = useState("");
  const Exists = (subject) => {
    if (subject === 1) {
      return <i className="fa fa-check" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-times" aria-hidden="true"></i>;
    }
  };

  const unavailableDates = () => {
    if (!startedAt || !endedAt) {
      setError("Fill all fields");
    } else {
      const dataToSend = {
        asset_id: asset.id,
        started_at: startedAt,
        ended_at: endedAt,
      };

      axios
        .post("/api/asset/addUnavailableDates", dataToSend)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      setHideDates(!hideDates);
      setError("");
    }
  };
  return (
    <div className="profile-owner-asset">
      <p>{asset.picture}</p>

      <p>{asset.city}</p>
      <p>{asset.address}</p>
      <p>{asset.description}</p>
      <p>Number of people: {asset.number_of_peoples}</p>
      <p>Number of rooms: {asset.number_of_rooms}</p>
      <p>
        {asset.started_at.slice(0, 10).replaceAll("-", "/")}-
        {asset.ended_at.slice(0, 10).replaceAll("-", "/")}
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
        <label className={hideDates.toString()}>Start date</label>
        <input
          className={hideDates.toString()}
          type="date"
          onChange={(e) => {
            setStartedAt(e.target.value);
          }}
        />
        <label className={hideDates.toString()}>End date</label>
        <input
          className={hideDates.toString()}
          type="date"
          onChange={(e) => {
            setEndedAt(e.target.value);
          }}
        />
        <button
          className={hideDates.toString()}
          onClick={() => {
            unavailableDates();
          }}
        >
          +
        </button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
