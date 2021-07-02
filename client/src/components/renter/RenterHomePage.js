import React, { useState } from 'react';
import ShowAsset from '../asset/ShowAsset';
import Search from '../Search';

function RenterHomePage({ user }) {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [error, setError] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [startedAt, setStartedAt] = useState();
  const [endedAt, setEndedAt] = useState();
  const [openFilters, setOpenFilters] = useState(false);
  const [filterBy, setFilterBy] = useState([
    { name: 'Ac', value: false },
    { name: 'Accessibility', value: false },
    { name: 'Animals', value: false },
    { name: 'Babies', value: false },
    { name: 'Kosher', value: false },
    { name: 'Parking', value: false },
    { name: 'Shabbat', value: false },
  ]);

  const changeValue = (i) => {
    const copyArr = [...filterBy];
    copyArr[i].value = !filterBy[i].value;
    setFilterBy(copyArr);
  };

  const filterOptions = () => {
    const filters = filterBy.reduce((filtered, option) => {
      if (option.value) {
        filtered.push(option.name.toLowerCase());
      }
      return filtered;
    }, []);

    let isValid = true;
    const filteredArr = assets.reduce((filtered, asset) => {
      filters.forEach((filter) => {
        if (asset[filter] === 0) {
          isValid = false;
        }
      });
      if (isValid) {
        filtered.push(asset);
      }
      return filtered;
    }, []);
    setFilteredAssets(filteredArr);
    setError('');
    if (filteredArr.length === 0) {
      setError('no assets found');
    }
  };

  return (
    <div>
      <div
        id="search"
        style={{
          gridTemplateRows: `repeat(${
            filteredAssets.length > 0 ? '3' : '2'
          }, 1fr)`,
        }}
      >
        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setError={setError}
          setAssets={setAssets}
          user={user}
          assets={assets}
          setFilteredAssets={setFilteredAssets}
          setStartedAt={setStartedAt}
          setEndedAt={setEndedAt}
          startedAt={startedAt}
          endedAt={endedAt}
        />
        {filteredAssets.length > 0 && (
          <button
            className="open-filters-btn"
            onClick={() => setOpenFilters((prev) => !prev)}
          >
            Filters
          </button>
        )}
      </div>
      {openFilters && filteredAssets.length > 0 && (
        <div className="filter">
          <ul className="ks-cboxtags">
            {filterBy.map((option, i) => (
              <li key={i} className="filter-option">
                <input
                  id={`checkbox-${i}`}
                  type="checkbox"
                  onChange={() => changeValue(i)}
                />
                <label className="label-for-check" htmlFor={`checkbox-${i}`}>
                  {option.name}
                </label>
              </li>
            ))}
            <button className="filter-btn" onClick={() => filterOptions()}>
              Filter
            </button>
          </ul>
        </div>
      )}
      {error ? <div>{error}</div> : ''}
      {filteredAssets.map((asset, i) => (
        <ShowAsset
          key={i}
          user={user}
          asset={asset}
          startedAt={startedAt}
          endedAt={endedAt}
        />
      ))}
    </div>
  );
}

export default RenterHomePage;
