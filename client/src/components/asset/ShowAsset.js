export default function ShowAsset({ asset }) {
  return (
    <div className="asset">
      <span>{asset.city}</span>
      <p>{asset.description}</p>
      <p>Availability</p>
      <p>
        {asset.started_at.slice(0, 10).replaceAll('-', '/')}-
        {asset.ended_at.slice(0, 10).replaceAll('-', '/')}
      </p>
    </div>
  );
}
