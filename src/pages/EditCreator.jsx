import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client.js';

function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setError(error.message);
      } else if (data) {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageURL || '');
      }
      setLoading(false);
    }

    loadCreator();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('creators')
      .update({
        name,
        url,
        description,
        imageURL: imageURL || null,
      })
      .eq('id', id);

    setSaving(false);

    if (error) {
      setError(error.message);
    } else {
      navigate(`/creators/${id}`);
    }
  }

  if (loading) return <p>Loading creator...</p>;

  async function handleDelete() {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this creator?'
  );
  if (!confirmDelete) return;

  console.log("Deleting creator with id:", id);

  const { error } = await supabase.from('creators').delete().eq('id', id);

  if (error) {
    setError(error.message);
  } else {
    navigate('/');
  }
  }
  return (
    <section>
      <h2>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          URL
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Image URL (optional)
          <input
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          style={{
              marginLeft: "1rem",
              backgroundColor: "red",
              color: "white"
          }}
        >
          Delete
        </button>
      </form>
    </section>
  );
}

export default EditCreator;
