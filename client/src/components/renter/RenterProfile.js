import { useState, useEffect } from 'react';
import axios from 'axios';
export default function RenterProfile({ userDetails }) {
  const [pictureUrl, setPictureUrl] = useState('');
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
