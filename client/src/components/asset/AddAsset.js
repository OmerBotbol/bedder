import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

export default function AddAsset({ user }) {
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [numberOfRooms, setNumberOfRooms] = useState(0);
  const [kosher, setKosher] = useState(false);
  const [shabbat, setShabbat] = useState(false);
  const [parking, setParking] = useState(false);
  const [animals, setAnimals] = useState(false);
  const [AC, setAC] = useState(false);
  const [accessibility, setAccessibility] = useState(false);
  const [babies, setBabies] = useState(false);
  const [picture, setPicture] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [endedAt, setEndedAt] = useState("");
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
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
        !picture
      ) {
        setMessage("Please fill all the fields");
      } else {
        //Upload picture to S3
        const imageInForm = new FormData();
        imageInForm.append("file", picture);
        const imageKey = await axios.post("/api/picture/upload", imageInForm);
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
          picture: imageKey.data,
          ac: AC,
          accessibility,
          babies,
          started_at: startedAt,
          ended_at: endedAt,
        };

        //Create asset
        axios
          .post("/api/asset/create", dataToSend)
          .then(() => {
            setRedirect(true);
          })
          .catch(async (err) => {
            await axios.delete(`/api/picture/image/${imageKey.data}`);
            setMessage("Problem, please try again later");
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
    <div>
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
      <input type="checkbox" onChange={() => setKosher(!kosher)} />
      <br />
      <label>Shabbat</label>
      <input type="checkbox" onChange={() => setShabbat(!shabbat)} />
      <br />
      <label>Parking</label>
      <input type="checkbox" onChange={() => setParking(!parking)} />
      <br />
      <label>Animals</label>
      <input type="checkbox" onChange={() => setAnimals(!animals)} />
      <br />
      <label>AC</label>
      <input type="checkbox" onChange={() => setAC(!AC)} />
      <br />
      <label>Accessibility</label>
      <input
        type="checkbox"
        onChange={(e) => setAccessibility(!accessibility)}
      />
      <br />
      <label>Babies</label>
      <input type="checkbox" onChange={() => setBabies(!babies)} />
      <br />
      <label>Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      <br />
      <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        onChange={(i) => handleSelect(i)}
        ranges={[selectionRange]}
        minDate={new Date()}
      />
      <br />
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
