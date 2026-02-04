import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client.js';
import CreatorCard from '../components/CreatorCard.jsx';

function ShowCreators() {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCreators() {
            setLoading(true);
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .order('id', { ascending: true });

            if (error) {
                setError(error.message);
            } else {
                setCreators(data || []);
            }
            setLoading(false);
        }

        fetchCreators();
    }, []);

    if (loading) return <p>Loading creators...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>All Creators</h2>

            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <Link to="/creators/new">+ Add Creator</Link>
            </div>

            {creators.length === 0 ? (
                <p style={{ textAlign: "center" }}>
                    No creators yet. Click “Add Creator” to create one.
                </p>
            ) : (
                <div
                    className="creator-list"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                        gap: "2rem",
                        justifyItems: "center",
                        padding: "2rem 0"
                    }}
                >
                    {creators.map((creator) => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ShowCreators;