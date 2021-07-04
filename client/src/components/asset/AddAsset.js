import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { deleteHttp, postHttp } from '../../utils/httpRequests';
import '../../styles/addAsset.css';

export default function AddAsset({ user }) {
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [kosher, setKosher] = useState(false);
  const [shabbat, setShabbat] = useState(false);
  const [parking, setParking] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [AC, setAC] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [babies, setBabies] = useState(false);
  const [picture, setPicture] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');
  const [roomType, setRoomType] = useState('');
  const [hospitality, setHospitality] = useState('');
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleClick = async () => {
    if (user) {
      if (
        !city ||
        !address ||
        !description ||
        !numberOfPeople ||
        !numberOfRooms ||
        !startedAt ||
        !endedAt ||
        !picture ||
        !hospitality ||
        !roomType
      ) {
        setMessage('Please fill all the fields');
      } else {
        //Upload picture to S3
        const imageInForm = new FormData();
        imageInForm.append('file', picture);
        const imageKey = await postHttp('/api/picture/upload', imageInForm);
        const dataToSend = {
          owner_id: user.id,
          city,
          address,
          room_type: roomType,
          Hospitality: hospitality,
          description,
          number_of_peoples: numberOfPeople,
          number_of_rooms: numberOfRooms,
          kosher,
          shabat: shabbat,
          parking,
          animals,
          picture: imageKey.data,
          ac: AC,
          accessibility,
          babies,
          started_at: startedAt,
          ended_at: endedAt,
        };

        //Create asset
        postHttp('/api/asset/create', dataToSend)
          .then(() => {
            setRedirect(true);
          })
          .catch(async (err) => {
            await deleteHttp(`/api/picture/image/${user.id}/${imageKey.data}`);
            setMessage('Problem, please try again later');
          });
      }
    }
  };

  const handleSelect = (i) => {
    setStartedAt(i.selection.startDate);
    setEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
  };

  return (
    <div id="add-asset-container">
      <h1 id="add-asset-header">Add asset</h1>
      <div className="form">
        <div className="form-field">
          <label className="add-asset-label">City</label>
          <input
            type="text"
            className="add-asset-text"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Address</label>
          <input
            type="text"
            className="add-asset-text"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Description</label>
          <input
            className="add-asset-text"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Room Type</label>
          <select
            className="add-asset-text"
            onChange={(e) => setRoomType(e.target.value)}>
            <option value="1">Apartment</option>
            <option value="2">Couch</option>
            <option value="3">Separate room</option>
            <option value="4">Shared room</option>
            <option value="5">Tent</option>
          </select>
        </div>
        <div className="form-field">
          <label className="add-asset-label">Hospitality</label>
          <select
            className="add-asset-text"
            onChange={(e) => setHospitality(e.target.value)}>
            <option value="1">Full</option>
            <option value="2">Only sleep</option>
          </select>
        </div>

        <div className="form-field">
          <label className="add-asset-label">Number of people</label>
          <input
            className="add-asset-text"
            type="number"
            min="1"
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Number of rooms</label>
          <input
            className="add-asset-text"
            type="number"
            min="1"
            onChange={(e) => setNumberOfRooms(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Picture</label>
          <input
            className="add-asset-text"
            type="file"
            accept="image/*"
            onChange={(e) => setPicture(e.target.files[0])}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Kosher</label>
          <input
            className="option-input radio"
            type="checkbox"
            onChange={() => setKosher(!kosher)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Shabbat</label>
          <input
            type="checkbox"
            className="option-input radio"
            onChange={() => setShabbat(!shabbat)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Parking</label>
          <input
            type="checkbox"
            className="option-input radio"
            onChange={() => setParking(!parking)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Animals</label>
          <input
            type="checkbox"
            className="option-input radio"
            onChange={() => setAnimals(!animals)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">AC</label>
          <input
            type="checkbox"
            className="option-input radio"
            onChange={() => setAC(!AC)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Accessibility</label>
          <input
            className="option-input radio"
            type="checkbox"
            onChange={(e) => setAccessibility(!accessibility)}
          />
        </div>
        <div className="form-field">
          <label className="add-asset-label">Babies</label>
          <input
            type="checkbox"
            className="option-input radio"
            onChange={() => setBabies(!babies)}
          />
        </div>

        <div className="form-field">
          <label className="add-asset-label">Available dates</label>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            onChange={(i) => handleSelect(i)}
            ranges={[selectionRange]}
            minDate={new Date()}
          />
        </div>
      </div>
      <button
        className="add-asset-btn"
        onClick={() => {
          handleClick();
        }}>
        Add
      </button>
      {message && <p className="error">{message}</p>}
      {redirect && <Redirect to="/login" />}
    </div>
  );
}
