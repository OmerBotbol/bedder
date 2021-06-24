import axios from "axios";

let cancelToken;

export default function Search({
  searchInput,
  setSearchInput,
  setError,
  setAssets,
  user,
  assets,
  setStartedAt,
  setEndedAt,
  startedAt,
  endedAt,
  setFilteredAssets,
}) {
  const searchByCity = () => {
    if (user && !user.isOwner) {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("new request");
      }

      cancelToken = axios.CancelToken.source();
      if (searchInput) {
        axios
          .get(
            `/api/asset?city=${searchInput}&startDate=${startedAt}&stopDate=${endedAt}`,
            {
              cancelToken: cancelToken.token,
            }
          )
          .then((res) => {
            setAssets(res.data);
            setFilteredAssets(res.data);
            if (res.data.length === 0) {
              setError("No city found");
            } else {
              setError("");
            }
          })
          .catch((err) => {
            console.log(err.message);
            setError("Server problem please try again");
          });
        console.log(assets);
      } else {
        axios
          .get(`/api/asset`, {
            cancelToken: cancelToken.token,
          })
          .then((res) => {
            setAssets(res.data);
            setFilteredAssets(res.data);
            if (res.data.length === 0) {
              setError("No city found");
            } else {
              setError("");
            }
          })
          .catch((err) => {
            console.log(err.message);
            setError("Server problem please try again");
          });
      }
    }
  };
  return (
    <div>
      <input
        type="search"
        placeholder="Search By City"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <label>Starts at</label>
      <input type="date" onChange={(e) => setStartedAt(e.target.value)} />
      <label>Ends at</label>
      <input type="date" onChange={(e) => setEndedAt(e.target.value)} />

      <button onClick={() => searchByCity()}>Search</button>
    </div>
  );
}
