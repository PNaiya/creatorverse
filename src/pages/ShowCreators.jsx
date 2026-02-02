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
    <section>
      <h2>All Creators</h2>
      <Link to="/creators/new">+ Add Creator</Link>

      {creators.length === 0 ? (
        <p>No creators yet. Click “Add Creator” to create one.</p>
      ) : (
        <div className="creator-list">
          {creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ShowCreators;