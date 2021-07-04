import axios from 'axios';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/profile.css';

export default function Profile({ user }) {
  const [userDetails, setUserDetails] = useState({});
  const [pictureUrl, setPictureUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const route = user.isOwner ? 'owner' : 'renter';
        const userData = await axios.get(`/api/${route}/${user.id}`);
        const userPicture = await axios.get(
          `/api/picture/image/${userData.data.picture}`
        );
        setUserDetails(userData.data);
        setPictureUrl(userPicture.data);
      }
    }
    fetchData();
  }, [user]);
  return (
    <>
      {loading ? (
        <div className="loader">
          <ClipLoader color={'#00887a'} loading={loading} size={150} />
        </div>
      ) : (
        <div className="profile-container">
          {user ? (
            <div className={user.isOwner ? 'profile-owner' : 'profile-renter'}>
              <img src={pictureUrl} alt="profile" className="profile-picture" />
              <h1 className="profile-name">
                {userDetails.first_name} {userDetails.last_name}
              </h1>
              <p>{userDetails.email}</p>
              <p>{userDetails.phone_number}</p>
              <div></div>
            </div>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      )}
    </>
  );
}
