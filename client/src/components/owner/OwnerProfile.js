import { useState, useEffect } from 'react';
import axios from 'axios';

export default function OwnerProfile({ userDetails }) {
  const [pictureUrl, setPictureUrl] = useState('');

  //Get assets from database of owner
  useEffect(() => {
    axios
      .get(`/api/picture/image/${userDetails.picture}`)
      .then((data) => {
        setPictureUrl(data.data);
      })
      .catch((err) => console.log(err));
  }, [userDetails.picture]);
  return (
    <div>
      <img
        src={pictureUrl}
        style={{ height: 100, width: 100 }}
        alt="profile"
        className="profile-picture"
      />
    </div>
  );
}
