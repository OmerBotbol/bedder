import axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState } from "react";

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
  const [selectionRange, SetSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const searchByCity = () => {
    if (user && !user.isOwner) {
      if (!startedAt || !endedAt || !searchInput) {
        return setError("Please fill all the fields");
      }
      let searchUrl;
      searchInput
        ? (searchUrl = `/api/asset?city=${searchInput}&startDate=${startedAt}&stopDate=${endedAt}`)
        : (searchUrl = "/api/asset");
      axios
        .get(searchUrl)
        .then((res) => {
          setAssets(res.data);
          setFilteredAssets(res.data);
          res.data.length === 0 ? setError("No city found") : setError("");
        })
        .catch((err) => {
          console.log(err.message);
          setError("Server problem please try again");
        });
    }
  };

  const handleSelect = (i) => {
    setStartedAt(i.selection.startDate);
    setEndedAt(i.selection.endDate);
    SetSelectionRange(i.selection);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search By City"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <DateRange
        editableDateInputs={true}
        moveRangeOnFirstSelection={false}
        onChange={(i) => handleSelect(i)}
        ranges={[selectionRange]}
        minDate={new Date()}
      />

      <button onClick={() => searchByCity()}>Search</button>
    </div>
  );
}
