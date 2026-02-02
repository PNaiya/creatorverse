/* src/components/CreatorCard.jsx */
import { Link } from 'react-router-dom';

function CreatorCard({ creator }) {
  const { id, name, url, description, imageURL } = creator;

  return (
    <article className="creator-card">
      {imageURL && (
        <img
          src={imageURL}
          alt={name}
          style={{ maxWidth: '200px', display: 'block' }}
        />
      )}
      <h2>{name}</h2>
      <p>{description}</p>
      <a href={url} target="_blank" rel="noreferrer">
        Visit channel
      </a>
      <div style={{ marginTop: '0.5rem' }}>
        <Link to={`/creators/${id}`}>View</Link>{' '}
        <Link to={`/creators/${id}/edit`}>Edit</Link>
      </div>
    </article>
  );
}

export default CreatorCard;