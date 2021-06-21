export default function ProfileAsset({ user, asset }) {
  const Exists = (subject) => {
    if (subject === 1) {
      return <i className="fa fa-check" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-times" aria-hidden="true"></i>;
    }
  };
  return (
    <div className="profile-owner-asset">
      <p>{asset.picture}</p>

      <p>{asset.city}</p>
      <p>{asset.address}</p>
      <p>{asset.description}</p>
      <p>Number of people: {asset.number_of_peoples}</p>
      <p>Number of rooms: {asset.number_of_rooms}</p>
      <p>
        {asset.started_at.slice(0, 10).replaceAll('-', '/')}-
        {asset.ended_at.slice(0, 10).replaceAll('-', '/')}
      </p>
      <p>AC: {Exists(asset.ac)}</p>
      <p>Accessibility: {Exists(asset.accessibility)}</p>
      <p>Animals: {Exists(asset.animals)}</p>
      <p>Babies: {Exists(asset.babies)}</p>
      <p>Kosher: {Exists(asset.kosher)}</p>
      <p>Parking: {Exists(asset.parking)}</p>
      <p>Shabbat: {Exists(asset.shabat)}</p>
    </div>
  );
}
