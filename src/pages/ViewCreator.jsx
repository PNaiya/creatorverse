import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client.js';

function ViewCreator() {
    const { id } = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCreator() {
            setLoading(true);
            const { data, error } = await supabase
                .from('creators')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                setError(error.message);
            } else {
                setCreator(data);
            }
            setLoading(false);
        }

        fetchCreator();
    }, [id]);

    if (loading) return <p>Loading creator...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!creator) return <p>Creator not found.</p>;

    return (
        <section>
            <h2>{creator.name}</h2>
            {creator.imageURL && (
                <img
                    src={creator.imageURL}
                    alt={creator.name}
                    style={{ maxWidth: '300px' }}
                />
            )}
            <p>{creator.description}</p>
            <a href={creator.url} target="_blank" rel="noreferrer">
                Visit channel
            </a>
            <div style={{ marginTop: '1rem' }}>
                <Link to={`/creators/${creator.id}/edit`}>Edit</Link>{' '}
                <Link to="/">Back to all creators</Link>
            </div>
        </section>
    );
}

export default ViewCreator;