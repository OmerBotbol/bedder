import axios from 'axios';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';

export default function AddAsset({ user, setUser }) {
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
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    if (user) {
      const dataToSend = {
        owner_id: user.id,
        city,
        address,
        description,
        number_of_peoples: numberOfPeople,
        number_of_rooms: numberOfRooms,
        kosher,
        shabat: shabbat,
        parking,
        animals,
        ac: AC,
        accessibility,
        babies,
        started_at: startedAt,
        ended_at: endedAt,
      };
      if (
        !city ||
        !address ||
        !description ||
        !numberOfPeople ||
        !numberOfRooms ||
        !startedAt ||
        !endedAt
      ) {
        setMessage('Please fill all the fields');
      } else {
        axios
          .post('/api/asset/create', dataToSend)
          .then((data) => {
            console.log(data);
            setRedirect(true);
          })
          .catch((err) => {
            setMessage('Problem, please try again later');
          });
      }
    }
  };
  return (
    <div>
      {console.log(user)}
      <h1>Add asset</h1>
      <label>City</label>
      <input type="text" onChange={(e) => setCity(e.target.value)} />
      <br />
      <label>Address</label>
      <input type="text" onChange={(e) => setAddress(e.target.value)} />
      <br />
      <label>Description</label>
      <input type="email" onChange={(e) => setDescription(e.target.value)} />
      <br />
      <label>Number of people</label>
      <input
        type="number"
        onChange={(e) => setNumberOfPeople(e.target.value)}
      />
      <br />
      <label>Number of rooms</label>
      <input type="number" onChange={(e) => setNumberOfRooms(e.target.value)} />
      <br />
      <label>Kosher</label>
      <input type="checkbox" onChange={(e) => setKosher(!kosher)} />
      <br />
      <label>Shabbat</label>
      <input type="checkbox" onChange={(e) => setShabbat(!shabbat)} />
      <br />
      <label>Parking</label>
      <input type="checkbox" onChange={(e) => setParking(!parking)} />
      <br />
      <label>Animals</label>
      <input type="checkbox" onChange={(e) => setAnimals(!animals)} />
      <br />
      <label>AC</label>
      <input type="checkbox" onChange={(e) => setAC(!AC)} />
      <br />
      <label>Accessibility</label>
      <input
        type="checkbox"
        onChange={(e) => setAccessibility(!accessibility)}
      />
      <br />
      <label>Babies</label>
      <input type="checkbox" onChange={(e) => setBabies(!babies)} />
      <br />
      <label>Picture</label>
      <input type="file" onChange={(e) => setPicture(e.target.value)} />
      <br />
      <label>Starts at</label>
      <input type="date" onChange={(e) => setStartedAt(e.target.value)} />
      <br />
      <label>Ends at</label>
      <input type="date" onChange={(e) => setEndedAt(e.target.value)} />
      <br />

      <div></div>
      <button
        onClick={() => {
          handleClick();
        }}
      >
        Add
      </button>
      {message && <p>{message}</p>}
      {redirect && <Redirect to="/login" />}
    </div>
  );
}
