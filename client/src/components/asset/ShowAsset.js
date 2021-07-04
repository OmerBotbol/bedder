import axios from 'axios';
import { useState, useEffect } from 'react';
import SendRequest from './SendRequest';
import '../../styles/assetCard.css';

export default function ShowAsset({ user, asset, startedAt, endedAt }) {
  const [pictureUrl, setPictureUrl] = useState('');
  const [openSendRequest, setOpenSendRequest] = useState(false);

  //Show asset on home page
  useEffect(() => {
    axios
      .get(`/api/picture/image/${asset.picture}`)
      .then((data) => {
        setPictureUrl(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [asset.picture]);

  return (
    <div className="asset">
      <img className="asset-image" src={pictureUrl} alt="asset" />
      <div className="asset-city">{asset.city}</div>
      <div className="card-footer">
        <button
          className="like-btn"
          onClick={() => setOpenSendRequest((prev) => !prev)}
        >
          <i className="fas fa-thumbs-up"></i> like
        </button>
        <span className="separator"></span>
        {/* need to complete after GPS and map added */}
        <div className="distance">X KM</div>
      </div>
      {openSendRequest && (
        <SendRequest
          user={user}
          asset={asset}
          setOpenSendRequest={setOpenSendRequest}
          startedAt={startedAt}
          endedAt={endedAt}
        />
      )}
    </div>
  );
}
