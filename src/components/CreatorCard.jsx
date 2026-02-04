/* src/components/CreatorCard.jsx */
import { Link } from 'react-router-dom';

function CreatorCard({ creator }) {
    const { id, name, url, description, imageURL } = creator;

    return (
        <article
            className="creator-card"
            style={{
                background: "var(--card-background-color)",
                color: "var(--card-text-color)",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                textAlign: "center",
                width: "100%",
                maxWidth: "280px",
                display: "inline-block"
            }}
        >
            {imageURL && (
                <img
                    src={imageURL}
                    alt={name}
                    style={{
                        width: "100%",
                        height: "180px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        marginBottom: "1rem"
                    }}
                />
            )}

            <h2 style={{ marginBottom: "0.5rem" }}>{name}</h2>

            <p style={{ fontSize: "0.9rem", color: "#666" }}>{description}</p>

            <a href={url} target="_blank" rel="noreferrer">
                Visit channel
            </a>

            <div style={{ marginTop: "1rem" }}>
                <Link to={`/creators/${id}`}>View</Link> •{" "}
                <Link to={`/creators/${id}/edit`}>Edit</Link>
            </div>
        </article>
    );
}

export default CreatorCard;